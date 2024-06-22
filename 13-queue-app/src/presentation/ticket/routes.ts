import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from "../services";

export class TicketRoutes {
  constructor() {}

  static get routes() {
    const routes = Router();
    const ticketService = new TicketService();
    const ctrl = new TicketController(ticketService);

    routes.get("/", ctrl.getTickets);
    routes.get("/last", ctrl.getLastTicketNumber);
    routes.get("/pending", ctrl.pendingTickets);

    routes.post("/", ctrl.createTicket);

    routes.get("/draw/:desk", ctrl.drawTicket);
    routes.put("/done/:ticketId", ctrl.finishTicket);

    routes.get("/working-on", ctrl.workingOn);

    return routes;
  }
}
