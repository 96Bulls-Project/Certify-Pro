import Redis from "ioredis";

let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URI);

export default redis;