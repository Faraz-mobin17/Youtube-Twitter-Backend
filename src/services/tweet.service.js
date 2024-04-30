class TweetService {
  constructor(TweetRepository) {
    this.TweetRepository = TweetRepository;
  }

  async getUserTweets(id) {
    return await this.TweetRepository.getUserTweets(id);
  }

  async createTweet(content) {
    return await this.TweetRepository.createTweet(content);
  }
  async updateTweet(content, id) {
    return await this.TweetRepository.updateUser(content, id);
  }

  async deleteTweet(id) {
    return await this.TweetRepository.deleteUser(id);
  }
}

export { TweetService };
