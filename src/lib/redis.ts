import { createClient } from 'redis';

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  password: process.env.REDIS_PASSWORD,
  name: process.env.REDIS_CLIENT_NAME,
});

redisClient.connect().catch(console.error);

export const getRedisClient = () => {
  return redisClient;
};

export const quitRedisClient = () => {
  redisClient.quit();
};
