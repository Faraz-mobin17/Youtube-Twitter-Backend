import prisma from "../db/prisma-connection.js";
import { CrudRepository } from "./crud-repository.js";

class VideoRepository extends CrudRepository {
  constructor() {
    super(prisma.videos);
  }
}

export { VideoRepository };
