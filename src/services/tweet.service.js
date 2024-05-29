class TweetService {
  constructor(TweetRepository) {
    this.TweetRepository = TweetRepository;
  }

  getInstance() {
    return this.TweetRepository;
  }

  async getUserTweets(id) {
    return await this.TweetRepository.getUserTweets(id);
  }

  async createTweet(content, userId) {
    return await this.TweetRepository.createTweet(content, userId);
  }
  async updateTweet(content, id) {
    return await this.TweetRepository.updateUser(content, id);
  }

  async deleteTweet(id) {
    return await this.TweetRepository.deleteUser(id);
  }
}

export { TweetService };
