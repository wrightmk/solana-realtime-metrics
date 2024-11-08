import { API_TOKEN, EXTRNODE_URL } from "../constants.js";
import { TTpsResponse, TTps } from "../types.js";

// Fetch TPS data from the Solana RPC
export const fetchTps = async () => {
  try {
    const response = await fetch(EXTRNODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getRecentPerformanceSamples",
        params: [10], // Fetch the last 10 samples
      }),
    });

    const json = (await response.json()) as TTpsResponse;

    if (json.error) {
      throw new Error(`Error fetching TPS: ${json.error.message}`);
    }

    const samples = json?.result || [];

    // Transform each sample to calculate TPS and map it to slot and TPS
    const tpsData: TTps[] = samples.map((sample) => ({
      slot: sample.slot,
      tps: sample.numTransactions / sample.samplePeriodSecs, // TPS calculation
    }));

    return tpsData;
  } catch (error) {
    console.error("Error fetching TPS data:", error);
    return [];
  }
};
