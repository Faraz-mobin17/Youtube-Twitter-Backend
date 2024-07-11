import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(prisma.users);
  }
}

export { UserRepository };
