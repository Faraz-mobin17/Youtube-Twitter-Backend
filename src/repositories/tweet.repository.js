class TweetRepository {
  constructor(db) {
    this.db = db;
  }

  async getUserTweets(id) {
    const query = `SELECT content FROM Tweets WHERE user_id = ?`;
    const response = await this.db.executeQuery(query, [id]);
    return response;
  }

  async createTweet(user_id, content) {
    const query = `INSERT INTO tweets (user_id,content) VALUES(?,?)`;
    const response = await this.db.executeQuery(query, [user_id, content]);
    return response;
  }

  async updateTweet(content, id) {
    const query = `UPDATE tweets SET content = ? WHERE user_id = ?`;
    const response = await this.db.executeQuery(query, [content, id]);
    return response;
  }

  async deleteTweet(id) {
    const query = `DELETE FROM tweets WHERE user_id = ?`;
    const response = await this.db.executeQuery(query, [id]);
    return response;
  }
}
export { TweetRepository };
