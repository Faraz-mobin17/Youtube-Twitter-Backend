import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(prisma.tweets);
  }
}
export { TweetRepository };
