import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

export const getCachedData = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCachedData = async (key: string, value: any, ttl: number) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};

export const getOrSetCache = async <T>(
  cacheKey: string,
  fetchFunction: () => Promise<T>,
  ttl: number
): Promise<T> => {
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const data = await fetchFunction();
  await setCachedData(cacheKey, data, ttl);
  return data;
};
