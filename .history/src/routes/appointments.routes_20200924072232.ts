import { request, response, Router } from "express";

const appointmentRoutes = Router();

// http://localhost:3333/appointments

appointmentRoutes.post("/", (request, response) => {});

export default appointmentRoutes;
