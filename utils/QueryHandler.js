import db from "../db/connection.db.js";

async function userExists(username = "", email) {
  const [existingUsers] = await db.query(
    `SELECT username,email FROM USERS WHERE username = ? OR email = ?`,
    [username, email]
  );
  if (existingUsers.length !== 0) {
    return false;
  }
  return existingUsers;
}

export { userExists };
