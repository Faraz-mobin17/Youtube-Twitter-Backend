export class CrudRepository {
  private model: any;
  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getById(id: number) {
    return await this.model.findUnique({
      where: { id: id },
    });
  }

  async create(data: object) {
    return await this.model.create({ data });
  }

  async update(id: number, data: object) {
    return await this.model.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: number) {
    return await this.model.delete({
      where: { id: id },
    });
  }
}
