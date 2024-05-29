class TweetRepository {
  constructor(db) {
    this.db = db;
  }

  getInstance() {
    return this.db;
  }

  async getUserTweets(id) {
    try {
      const query = `SELECT content FROM Tweets WHERE user_id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTweet(content, userId) {
    try {
      const query = `INSERT INTO tweets (content, user_id) VALUES (?, ?)`;
      const response = await this.db.executeQuery(query, [content, userId]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTweetById(id) {
    try {
      const query = `SELECT * FROM tweets WHERE id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateTweet(content, id) {
    try {
      const query = `UPDATE tweets SET content = ? WHERE id = ?`;
      const response = await this.db.executeQuery(query, [content, id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTweet(id) {
    try {
      const query = `DELETE FROM tweets WHERE id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateTweet(content, id) {
    try {
      const query = `UPDATE tweets SET content = ? WHERE user_id = ?`;
      const response = await this.db.executeQuery(query, [content, id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTweet(id) {
    try {
      const query = `DELETE FROM tweets WHERE user_id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export { TweetRepository };
