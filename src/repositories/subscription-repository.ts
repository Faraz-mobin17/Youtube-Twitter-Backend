import { CrudRepository } from "./crud-repository.js";
import prisma from "../db/prisma-connection.js";

class SubscriptionRepository extends CrudRepository {
  constructor() {
    super(prisma.subscriptions);
  }
}

export { SubscriptionRepository };
