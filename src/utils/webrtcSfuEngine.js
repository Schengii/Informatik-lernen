/**
 * WebRTC Architecture Comparison Engine: Mesh vs. MCU vs. SFU
 * Calculates client bandwidth (uplink/downlink), server CPU transcoding load,
 * and simulcast layer routing efficiency.
 */

export function calculateWebRtcMetrics(participantCount = 6, bitRateKbps = 1500, topology = 'sfu') {
  const n = Math.max(2, participantCount);
  const bitRate = Math.max(200, bitRateKbps);

  let clientUplinkKbps = 0;
  let clientDownlinkKbps = 0;
  let serverCpuLoadPercent = 0;
  let totalStreamsInNetwork = 0;
  let description = '';

  switch (topology) {
    case 'mesh':
      // Full Mesh: Each participant sends to and receives from everyone else
      clientUplinkKbps = (n - 1) * bitRate;
      clientDownlinkKbps = (n - 1) * bitRate;
      totalStreamsInNetwork = n * (n - 1);
      serverCpuLoadPercent = 0;
      description = `P2P Full Mesh: Jeder Client sendet an alle ${n - 1} Peers. Überlastet Client-Upload ab ~5 Teilnehmern.`;
      break;

    case 'mcu':
      // MCU: Single stream to server, server decodes, mixes into 1 video grid, re-encodes
      clientUplinkKbps = bitRate;
      clientDownlinkKbps = bitRate;
      totalStreamsInNetwork = n * 2;
      serverCpuLoadPercent = Math.min(100, Math.round(n * 16.5)); // Heavy transcoding
      description = `MCU (Multipoint Control Unit): Server rendert Grid-Video. Minimale Client-Bandbreite, aber extreme Server-CPU-Kosten.`;
      break;

    case 'sfu':
    default:
      // SFU: Single upload with Simulcast (High/Med/Low ~ 1.5x bitrate), server routes packets without transcoding
      clientUplinkKbps = Math.round(bitRate * 1.35); // Simulcast 3 layers
      clientDownlinkKbps = (n - 1) * Math.round(bitRate * 0.45); // Dynamic downscaled layers
      totalStreamsInNetwork = n + (n * (n - 1));
      serverCpuLoadPercent = Math.min(100, Math.round(n * 1.8)); // Pure packet forwarding (no transcoding)
      description = `SFU (Selective Forwarding Unit): Paket-Routing ohne Dekodierung. Industriestandard für Zoom, Discord & Teams.`;
      break;
  }

  return {
    participantCount: n,
    topology,
    clientUplinkKbps,
    clientDownlinkKbps,
    clientTotalBandwidthKbps: clientUplinkKbps + clientDownlinkKbps,
    serverCpuLoadPercent,
    totalStreamsInNetwork,
    description
  };
}
