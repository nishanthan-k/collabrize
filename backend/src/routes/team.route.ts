import { Router } from "express";
import { createTeam } from "../controllers/team/team.controller";

const router = Router();

router.post('/create', createTeam);

export default router;