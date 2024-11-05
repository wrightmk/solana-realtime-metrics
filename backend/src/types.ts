export type SupplyResponse = {
  result: {
    value: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  };
  error?: { message: string };
};

export type TpsResponse = {
  result: {
    numTransactions: number;
    samplePeriodSecs: number;
    numNonVoteTransactions: number;
    numSlots: number;
    slot: number;
  }[];
  error?: { message: string };
};

export type MarketCap = { name: string; marketCap: number };
export type Tps = { slot: number; tps: number };
export type WalletBalance = { address: string; balance: number };
