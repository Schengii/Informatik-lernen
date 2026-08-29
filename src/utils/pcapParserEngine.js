/**
 * PCAP (Libpcap) & Hex Packet Stream Engine
 * Handles binary PCAP file generation and parsing for Web-Wireshark Packet Sniffer.
 */

export const PCAP_MAGIC = 0xa1b2c3d4;
export const PCAP_VERSION_MAJOR = 2;
export const PCAP_VERSION_MINOR = 4;
export const LINKTYPE_ETHERNET = 1;

/**
 * Encodes an array of hex frame strings into a standard binary .pcap Uint8Array buffer
 */
export function exportToPcapBlob(packets) {
  // Calculate total buffer length: 24 byte global header + (16 byte header + payload len) per packet
  let totalLength = 24;
  const parsedPackets = packets.map(pkt => {
    const rawHex = (pkt.rawHex || pkt.hex || '').replace(/\s+/g, '');
    const bytes = new Uint8Array(rawHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
    totalLength += 16 + bytes.length;
    return { pkt, bytes };
  });

  const buffer = new ArrayBuffer(totalLength);
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);

  // Write Global Header (24 Bytes, Little Endian)
  view.setUint32(0, PCAP_MAGIC, true);        // Magic Number
  view.setUint16(4, PCAP_VERSION_MAJOR, true); // Major Version
  view.setUint16(6, PCAP_VERSION_MINOR, true); // Minor Version
  view.setInt32(8, 0, true);                  // ThisZone (GMT)
  view.setUint32(12, 0, true);                 // SigFigs
  view.setUint32(16, 65535, true);             // SnapLen
  view.setUint32(20, LINKTYPE_ETHERNET, true); // LinkType (Ethernet)

  let offset = 24;
  const nowSec = Math.floor(Date.now() / 1000);

  parsedPackets.forEach(({ bytes }, idx) => {
    const len = bytes.length;
    view.setUint32(offset, nowSec + idx, true); // ts_sec
    view.setUint32(offset + 4, idx * 1000, true); // ts_usec
    view.setUint32(offset + 8, len, true);       // incl_len
    view.setUint32(offset + 12, len, true);      // orig_len
    offset += 16;

    uint8.set(bytes, offset);
    offset += len;
  });

  return new Blob([buffer], { type: 'application/vnd.tcpdump.pcap' });
}

/**
 * Parses an ArrayBuffer containing a standard .pcap binary file into packet objects
 */
export function parsePcapBuffer(arrayBuffer) {
  if (!arrayBuffer || arrayBuffer.byteLength < 24) {
    throw new Error('Ungültige PCAP-Datei: Dateigröße unter 24 Bytes.');
  }

  const view = new DataView(arrayBuffer);
  const magic = view.getUint32(0, true);
  const isLittleEndian = magic === PCAP_MAGIC;
  const isBigEndian = magic === 0xd4c3b2a1;

  if (!isLittleEndian && !isBigEndian) {
    throw new Error(`Ungültiger PCAP Magic Header: 0x${magic.toString(16)}`);
  }

  const linkType = view.getUint32(20, isLittleEndian);
  const uint8 = new Uint8Array(arrayBuffer);
  const packets = [];
  let offset = 24;
  let frameId = 1;

  while (offset + 16 <= arrayBuffer.byteLength) {
    const _tsSec = view.getUint32(offset, isLittleEndian);
    const tsUsec = view.getUint32(offset + 4, isLittleEndian);
    const inclLen = view.getUint32(offset + 8, isLittleEndian);
    offset += 16;

    if (offset + inclLen > arrayBuffer.byteLength) {
      break; // Incomplete packet
    }

    const payload = uint8.slice(offset, offset + inclLen);
    offset += inclLen;

    // Convert to hex string
    const hex = Array.from(payload)
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');

    packets.push({
      id: frameId++,
      timeOffset: `+${(tsUsec / 1000).toFixed(1)}ms`,
      length: inclLen,
      rawHex: hex,
      protocol: detectProtocolFromPayload(payload),
      info: `Importierter Frame (${inclLen} Bytes)`
    });
  }

  return {
    linkType,
    packetCount: packets.length,
    packets
  };
}

function detectProtocolFromPayload(bytes) {
  if (bytes.length >= 14) {
    const etherType = (bytes[12] << 8) | bytes[13];
    if (etherType === 0x0800) { // IPv4
      if (bytes.length >= 24) {
        const ipProto = bytes[23];
        if (ipProto === 6) return 'TCP';
        if (ipProto === 17) return 'UDP';
        if (ipProto === 1) return 'ICMP';
      }
      return 'IPv4';
    }
    if (etherType === 0x86dd) return 'IPv6';
    if (etherType === 0x0806) return 'ARP';
  }
  return 'Ethernet';
}
