import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(prisma.likes);
  }
}

export { LikeRepository };
