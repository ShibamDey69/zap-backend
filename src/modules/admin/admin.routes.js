import { Router } from "express";
import { isAdmin } from "../../middlewares/auth.middleware";
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "./admin.controller";

const router = Router();

router.get("/", isAdmin, getAdmins);
router.get("/:id", isAdmin, getAdmin);
router.post("/", isAdmin, createAdmin);
router.put("/:id", isAdmin, updateAdmin);
router.delete("/:id", isAdmin, deleteAdmin);

export default router;
