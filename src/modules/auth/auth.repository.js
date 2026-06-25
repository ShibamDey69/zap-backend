export default class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async findById(id) {
    return await this.prisma.auth.findUnique({
      where: {
    id,
      },
    });
  }

  async findByEmail(email) {
    return await this.prisma.auth.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data) {
    return await this.prisma.auth.create({
      data,
    });
  }

  async update(id, data) {
    return await this.prisma.auth.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id) {
    return await this.prisma.auth.delete({
      where: {
        id,
      },
    });
  }
}
