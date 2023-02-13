const { createClient } = require("redis");

class RedisService {
  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.connect();
  }

  set(key, value, time) {
    if (key && value && time) this.client.set(key, value, "EX", time);
  }

  exists(key) {
    if (key) return this.client.exists(key);
  }
}

module.exports = new RedisService();
