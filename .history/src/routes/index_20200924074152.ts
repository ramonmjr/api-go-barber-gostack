import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

routes.get("/appointments", appointmentsRouter);

export default routes;
