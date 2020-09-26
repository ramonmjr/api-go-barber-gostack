import { Router } from "express";
import appointmentRoutes from "./appointments.routes";

const routes = Router();

routes.get("/appointments", appointmentRoutes);

export default routes;
