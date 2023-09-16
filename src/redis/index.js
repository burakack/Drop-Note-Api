const redis = require("redis");
class RedisService {
  constructor() {
    this.client = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });
  }
  async getClient() {
    await this.client.connect();
    return this.client;
  }
}

module.exports = RedisService;
