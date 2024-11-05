import { getCachedData, setCachedData } from "../cache.js";
import {
  API_TOKEN,
  COINGECKO_PRICE_URL,
  EXTRNODE_URL,
  SPL_TOKEN_MINT_ADDRESSES,
} from "../constants.js";
import { SupplyResponse } from "../types.js";

// Fetch token supply, price, and calculate market cap
export const fetchMarketCap = async () => {
  try {
    const mintAddresses = SPL_TOKEN_MINT_ADDRESSES.map(
      (token) => token.mintAddress
    );

    // Fetch supplies and prices concurrently
    const [supplyResponses, priceResponses] = await Promise.all([
      fetchTokenSupplies(mintAddresses),
      fetchTokenPrices(SPL_TOKEN_MINT_ADDRESSES),
    ]);

    // Calculate market cap data by mapping supplies and prices
    const marketCapData = SPL_TOKEN_MINT_ADDRESSES.map((token) => {
      const supply = supplyResponses[token.mintAddress] || 0; // Default to 0 if not found
      const price = priceResponses[token.name] || 0; // Default to 0 if not found
      return { name: token.name, marketCap: supply * price };
    });

    return marketCapData;
  } catch (error) {
    console.error("Error fetching market cap data:", error);
    return [];
  }
};

// Fetch prices for multiple tokens in a single request from coingecko
const fetchTokenPrices = async (
  tokens: { name: string; id: string; mintAddress: string }[]
): Promise<Record<string, number>> => {
  const tokenIds = tokens.map((token) => token.id).join(",");
  const response = await fetch(
    `${COINGECKO_PRICE_URL}?ids=${tokenIds}&vs_currencies=usd`
  );
  const json = (await response.json()) as { [key: string]: { usd: number } };

  const priceMap: Record<string, number> = {};
  tokens.forEach((token) => {
    priceMap[token.name] = json[token.id]?.usd || 0;
  });

  return priceMap;
};

// Fetch token supplies for multiple mint addresses concurrently
const fetchTokenSupplies = async (
  mintAddresses: string[]
): Promise<Record<string, number>> => {
  const supplies = await Promise.all(
    mintAddresses.map(async (address) => {
      const balance = await getTokenSupply(address);
      return { address, balance };
    })
  );

  // Convert supplies array to a hash map for O(1) access
  const supplyMap: Record<string, number> = {};
  supplies.forEach(({ address, balance }) => {
    supplyMap[address] = balance;
  });
  return supplyMap;
};

// Fetch the token supply for a given address from extrnode
const getTokenSupply = async (address: string): Promise<number> => {
  const response = await fetch(EXTRNODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenSupply",
      params: [address],
    }),
  });

  const json = (await response.json()) as SupplyResponse;

  if (json.error) {
    throw new Error(
      `Error fetching balance for ${address}: ${json.error.message}`
    );
  }

  return json.result.value.uiAmount;
};
