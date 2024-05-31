class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    const query = `SELECT * FROM USERS`;
    return await this.db.executeQuery(query);
  }

  async getUser(id) {
    const query = `SELECT * FROM USERS WHERE id = ?`;
    const response = await this.db.executeQuery(query, [id]);

    return response[0];
  }

  async updateUser(params = {}, id) {
    const columnsToUpdate = Object.keys(params)
      .map((key) => `${key} = ?`)
      .join(", ");
    const valuesToUpdate = Object.values(params);
    const query = `UPDATE USERS SET ${columnsToUpdate} WHERE id = ?`;
    try {
      const result = await this.db.executeQuery(query, [...valuesToUpdate, id]);
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    const query = `DELETE FROM USERS WHERE id = ?`;
    const response = await this.db.executeQuery(query, [id]);
    return response;
  }

  async loginUser(email, password) {
    const query = `SELECT * FROM USERS WHERE email = ? AND password = ?`;
    const response = await this.db.executeQuery(query, [email, password]);
    return response;
  }

  async checkRegisteringUserExists(username, email) {
    try {
      const query = `SELECT * FROM users WHERE username = ? OR email = ?`;

      const response = await this.db.executeQuery(query, [username, email]);

      return response.length > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async checkLoginUserExists(email) {
    try {
      const query = `SELECT * FROM USERS where email = ?`;
      const response = await this.db.executeQuery(query, [email]);

      return response[0];
    } catch (error) {
      throw error;
    }
  }
  async registerUser({
    username,
    email,
    firstname,
    lastname,
    avatar,
    coverImage,
    password,
  }) {
    const query = `INSERT INTO USERS (username, email, firstname, lastname, avatar, coverImage, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return await this.db.executeQuery(query, [
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password,
    ]);
  }
  async changeCurrentPassword(id, { password }) {
    try {
      const query = `UPDATE USERS SET password = ? WHERE id = ?`;
      return await this.db.executeQuery(query, [password, id]);
    } catch (error) {
      throw error;
    }
  }

  async getUserChannelProfile(username) {
    try {
      const query = `
      SELECT 
      u.firstname, 
      u.lastname, 
      u.avatar, 
      u.coverImage, 
      u.email, 
      s.channel_id as subscriber, 
      s.subscriber_id as subscribedTo, 
      COUNT(s.channel_id) as subscriberCount
  FROM USERS u
  JOIN subscriptions s ON u.id = s.subscriber_id
  WHERE u.username = ?
  GROUP BY 
      u.id, 
      u.firstname, 
      u.lastname, 
      u.avatar, 
      u.coverImage, 
      u.email, 
      s.channel_id, 
      s.subscriber_id;
       `;
      return await this.db.executeQuery(query, [username]);
    } catch (error) {
      throw error;
    }
  }

  async getWatchHistory(username) {
    try {
      const query = `SELECT 
      vh.watched_at,
      v.videoFile,
      v.thumbnail,
      v.title,
      v.description,
      v.duration,
      v.views,
      u.username
  FROM 
      WatchHistory vh
  JOIN 
      videos v ON vh.video_id = v.id
  JOIN 
      users u ON vh.user_id = u.id
  WHERE 
      u.username = ?
  ORDER BY 
      vh.watched_at DESC; `;
      return await this.db.executeQuery(query, [username]);
    } catch (error) {
      throw error;
    }
  }
  async updateAvatar(id, avatar) {
    try {
      const query = `UPDATE USERS SET avatar = ? WHERE id = ?`;
      return await this.db.executeQuery(query, [avatar, id]);
    } catch (error) {
      throw error;
    }
  }
  async updateCoverImage(id, coverImage) {
    try {
      const query = `UPDATE USERS SET coverImage = ? WHERE id = ?`;
      return await this.db.executeQuery(query, [coverImage, id]);
    } catch (error) {
      throw error;
    }
  }
}

export { UserRepository };
