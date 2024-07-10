class SubscriptionService {
  constructor(SubscriptionRepository) {
    this.SubscriptionRepository = SubscriptionRepository;
  }

  async toggleSubscription(channelId) {
    return await this.SubscriptionRepository.toggleSubscription(
      userId,
      channelId
    );
  }
  async getUserChannelSubscribers(channelId) {
    return await this.SubscriptionRepository.getUserChannelSubscribers(
      channelId
    );
  }
  async getSubscribedChannels(subscriberId) {
    return await this.SubscriptionRepository.getSubscribedChannels(
      subscriberId
    );
  }
}

export { SubscriptionService };
