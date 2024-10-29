import { getCachedData, setCachedData } from "../cache.js";
import { API_TOKEN, EXTRNODE_URL } from "../constants.js";
import { TpsResponse } from "../types.js";

// Fetch TPS data from the Solana RPC
export const fetchTps = async () => {
  try {
    const cacheKey = "tpsData";
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) return cachedData;

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

    const json = (await response.json()) as TpsResponse;

    if (json.error) {
      throw new Error(`Error fetching TPS: ${json.error.message}`);
    }

    const samples = json?.result || [];

    // Transform each sample to calculate TPS and map it to slot and TPS
    const tpsData = samples.map((sample) => ({
      slot: sample.slot,
      tps: sample.numTransactions / sample.samplePeriodSecs, // TPS calculation
    }));

    await setCachedData(cacheKey, tpsData, 60); // Cache for 1 minute to keep data fresh since samplePeriodSecs is 1 minute
    return tpsData;
  } catch (error) {
    console.error("Error fetching TPS data:", error);
    return [];
  }
};
