class SubscriptionRepository {
  constructor(db) {
    this.db = db;
  }
  async toggleSubscription(channelId) {}

  async getUserChannelSubscribers(channelId) {}

  async getSubscribedChannels(subscriberId) {}
}

export { SubscriptionRepository };
