import { Router, type IRouter } from "express";
import conciergeRouter from "./concierge";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(conciergeRouter);

export default router;
