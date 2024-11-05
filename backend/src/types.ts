interface TResponseBase {
  error?: { message: string };
}

export interface TSupplyResponse extends TResponseBase {
  result: {
    value: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  };
}

export interface TTpsResponse extends TResponseBase {
  result: {
    numTransactions: number;
    samplePeriodSecs: number;
    numNonVoteTransactions: number;
    numSlots: number;
    slot: number;
  }[];
}

export interface TWalletBalanceResponse extends TResponseBase {
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
}

export type TPriceResponse = {
  [key: string]: { usd: number };
};

export type TTMarketCap = { name: string; marketCap: number };
export type TTps = { slot: number; tps: number };
export type TWalletBalance = { address: string; balance: number };
