import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(prisma.users);
  }

  async getUserChannelProfile(username: string) {
    // TODO: complete this method
  }

  async getWatchHistory(username: string) {}
}

export { UserRepository };
