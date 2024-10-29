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
