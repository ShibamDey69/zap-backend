import AuthService from "./auth.service.js";

export default class Auth {

  constructor() {
    this.controller = new AuthService();
    this.register = this.register.bind(this);
  }

  async register(req,res) {
    try {
    const {email} = req.body;
    const exist = await this.controller.register({email})
      console.log(exist)
    } catch (error) {
      throw new Error(error)
    }
  }
}
