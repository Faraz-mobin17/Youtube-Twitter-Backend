class SubscriptionRepository {
  constructor(db) {
    this.db = db;
  }
  async toggleSubscription(userId = 1, channelId) {
    try {
      console.log(userId, channelId);
      let query = `SELECT isSubscribed FROM subscriptions WHERE subscriber_id = ? AND channel_id = ?`;
      let response = await this.db.executeQuery(query, [userId, channelId]);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserChannelSubscribers(channelId) {}

  async getSubscribedChannels(subscriberId) {}
}

export { SubscriptionRepository };
