import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class CommentRepository extends CrudRepository {
  constructor() {
    super(prisma.comments);
  }
}
export { CommentRepository };
