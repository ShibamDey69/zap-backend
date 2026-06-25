import prisma from "../../plugins/prisma.js";
import AuthRepository from "./auth.repository.js";

export default class AuthService {
  constructor() {
    this.repository = new AuthRepository(prisma);
  }

  async register(data) {
    try {
      const existingUser = await this.repository.findByEmail(data.email);
      console.log(existingUser);
      if (existingUser) {
        throw new Error("User already exists");
      }
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
