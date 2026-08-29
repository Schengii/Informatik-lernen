/**
 * TCP Congestion Control Engine (Reno vs. CUBIC vs. BBR)
 * Simulates CWND (Congestion Window) evolution across RTT cycles,
 * Slow Start, AIMD loss recovery, Cubic polynomial curve, and BBR bandwidth probing.
 */

export function simulateTcpCongestion(algorithm = 'reno', rounds = 16, lossRound = 8) {
  let dataPoints = [];
  let cwnd = 1;
  let ssthresh = 16;
  let wMax = 16;

  for (let rtt = 1; rtt <= rounds; rtt++) {
    if (rtt === lossRound) {
      // Packet Loss Event
      if (algorithm === 'reno') {
        ssthresh = Math.max(2, Math.floor(cwnd / 2));
        cwnd = ssthresh; // Fast recovery
      } else if (algorithm === 'cubic') {
        wMax = cwnd;
        cwnd = Math.max(2, Math.floor(wMax * 0.7)); // Cubic beta = 0.7
      } else if (algorithm === 'bbr') {
        // BBR does not drop CWND on non-congestive loss, probes bottleneck rate
        cwnd = 24; // Pacing rate stable
      }
    } else if (rtt > lossRound) {
      // Recovery Phase
      if (algorithm === 'reno') {
        cwnd += 1; // Additive Increase (+1 MSS per RTT)
      } else if (algorithm === 'cubic') {
        const t = rtt - lossRound;
        const K = 2;
        cwnd = Math.max(2, Math.round(0.4 * Math.pow(t - K, 3) + wMax));
      } else if (algorithm === 'bbr') {
        cwnd = 24 + (rtt % 3 === 0 ? 4 : 0); // PROBE_BW pacing cycle
      }
    } else {
      // Slow Start & Pre-loss
      if (cwnd < ssthresh) {
        cwnd *= 2; // Exponential growth
      } else {
        cwnd += 1; // Linear growth
      }
    }

    dataPoints.push({
      rtt,
      cwnd: Math.min(64, Math.max(1, cwnd)),
      phase: rtt === lossRound ? 'PACKET_LOSS' : (cwnd < ssthresh ? 'SLOW_START' : 'CONGESTION_AVOIDANCE')
    });
  }

  let description = '';
  switch (algorithm) {
    case 'cubic':
      description = 'TCP CUBIC (Linux Standard): Nutzt kubische Wachstumsfunktion W(t) zur schnellen Bandbreitennutzung in High-BDP Netzen.';
      break;
    case 'bbr':
      description = 'TCP BBR (Google): Modellbasiert (Max-Bandbreite + Min-RTT). Ignoriert zufällige Paketverluste und verhindert Bufferbloat.';
      break;
    case 'reno':
    default:
      description = 'TCP Reno (Klassisch): Slow Start & AIMD (Additive Increase, Multiplicative Decrease). Halbiert CWND bei jedem Paketverlust.';
      break;
  }

  return {
    algorithm,
    rounds,
    lossRound,
    dataPoints,
    description
  };
}
