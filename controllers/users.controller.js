const pool = require("../db/connection.db.js");
async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return res.status(200).json({ rows });
  } catch (error) {
    console.error("Error while fetching Data: " + error);
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id * 1 || 1;
    // const [user] = await pool.query(`SELECT username FROM USERS WHERE id= ${userId}`); // another way
    const [user] = await pool.query(`SELECT username FROM USERS WHERE id= ?`, [
      userId,
    ]); // prepared stament to prevent sql injection
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error while fetching User: ", error);
    return res.status(500).json({ error });
  }
}

async function createUser(err, req, res) {
  try {
    const { username, email, fullname, avatar, coverImage, password } =
      req.body;
    if (
      [username, email, password, fullname, avatar, coverImage].some(
        (field) => field.trim() === ""
      )
    ) {
      throw err;
    }
    const [result] = pool.query(`INSERT INTO USERS VALUES(?,?,?,?,?,?)`, [
      username,
      email,
      fullname,
      avatar,
      coverImage,
      password,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error all fields are required");
    return res.status(400).json({ error });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
