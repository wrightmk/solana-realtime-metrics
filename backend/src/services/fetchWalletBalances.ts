import { getCachedData, setCachedData } from "../cache.js";
import { API_TOKEN, EXTRNODE_URL, WALLETS } from "../constants.js";

// Fetch wallet balances for the specified wallets
export const fetchWalletBalances = async () => {
  try {
    const balances = await getMultipleAccountsBalances(WALLETS);

    return balances;
  } catch (error) {
    console.error("Error fetching wallet balances:", error);
    return [];
  }
};

// Get balances of multiple accounts in a single request from extrnode
const getMultipleAccountsBalances = async (
  walletAddresses: string[]
): Promise<{ address: string; balance: number }[]> => {
  const response = await fetch(EXTRNODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getMultipleAccounts",
      params: [walletAddresses],
    }),
  });

  const json = (await response.json()) as {
    result: {
      value: {
        data: string[];
        executable: boolean;
        lamports: number;
        owner: string;
        rentEpoch: number;
        space: number;
      }[];
    };
    error?: { message: string };
  };

  // Check for errors
  if (json.error) {
    throw new Error(`Error fetching multiple accounts: ${json.error.message}`);
  }

  return (json.result?.value || []).map((account: any, index: number) => {
    const balance = account?.lamports || 0;
    return {
      address: walletAddresses[index],
      balance: balance / 1e9, // Convert lamports to SOL
    };
  });
};
