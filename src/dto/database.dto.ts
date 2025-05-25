/**
 * Singleton class to manage the MongoDB connection.
 * @class DatabaseConnection
 */
export interface IDatabaseConnection {
  connect: () => Promise<void>;
  getInstance: () => DatabaseConnection;
}
