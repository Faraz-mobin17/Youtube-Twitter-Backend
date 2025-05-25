import { Document, Types } from "mongoose";

export interface ICrudRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  read(id: string | Types.ObjectId): Promise<T>;
  readAll(): Promise<T[]>;
  update(id: string | Types.ObjectId, data: Partial<T>): Promise<T>;
  delete(id: string | Types.ObjectId): Promise<T>;
}
