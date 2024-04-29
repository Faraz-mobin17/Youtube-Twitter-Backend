import db from "../db/connection.db.js";
import { ApiError } from "../utils/ApiHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
class Model {
  static async getAllVideos(title) {
    const query = `SELECT * FROM Videos WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)`;
    const value = [title];
    const [rows] = await db.execute(query, value);
    if (rows.length === 0) {
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Videos not found");
    }
    return rows;
  }
}

export default Model;
