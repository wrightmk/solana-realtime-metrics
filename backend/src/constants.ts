import dotenv from "dotenv";

dotenv.config();

export const EXTRNODE_URL = `https://solana-mainnet.rpc.extrnode.com/${process.env.EXTRNODE_API_TOKEN}`;
export const COINGECKO_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price";
export const API_TOKEN = process.env.EXTRNODE_API_TOKEN;

if (!API_TOKEN) {
  throw new Error(
    "API token for extrnode is missing. Set EXTRNODE_API_TOKEN in the .env file."
  );
}

export const SPL_TOKEN_MINT_ADDRESSES = [
  {
    name: "giga",
    id: "gigachad-2",
    mintAddress: "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
  },
  {
    name: "moodeng",
    id: "moo-deng",
    mintAddress: "ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY",
  },
  {
    name: "popcat",
    id: "popcat",
    mintAddress: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
  },
  {
    name: "goat",
    id: "goatseus-maximus",
    mintAddress: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
  },
  {
    name: "skibidi",
    id: "skibidi-toilet-2",
    mintAddress: "DPaQfq5sFnoqw2Sh9WMmmASFL9LNu6RdtDqwE1tab2tB",
  },
];

export const WALLETS = [
  "CbU4oSFCk8SVgW23NLvb5BwctvWcZZHfxRD6HudP8gAo",
  "61aq585V8cR2sZBeawJFt2NPqmN7zDi1sws4KLs5xHXV",
  "EXJHiMkj6NRFDfhWBMKccHNwdSpCT7tdvQeRf87yHm6T",
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
  "AVzP2GeRmqGphJsMxWoqjpUifPpCret7LqWhD8NWQK49",
  "Q6XprfkF8RQQKoQVG33xT88H7wi8Uk1B1CC7YAs69Gi",
  "9DrvZvyWh1HuAoZxvYWMvkf2XCzryCpGgHqrMjyDWpmo",
  "9uyDy9VDBw4K7xoSkhmCAm8NAFCwu4pkF6JeHUCtVKcX",
  "8pFhUqCU7Fkxfg2DLytRDf7a9oK4XGtN92PrYwtVQc6G",
  "LUXGeEU4huA2s3vn6ro5qEvpPt212tHpYrahGEDv6SU",
];
