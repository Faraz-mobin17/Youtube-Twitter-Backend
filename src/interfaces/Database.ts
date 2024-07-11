interface IDatabase {
  executeQuery(query: string, params: any[]): Promise<object>;
}

export { IDatabase };
