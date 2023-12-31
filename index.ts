import FlightControllerFactory from "./Factories/FlightControllerFactory";
import express from "express";
import dotenv from "dotenv";
import PersonControllerFactory from "./Factories/PersonControllerFactory";
import PlaneControllerFactory from "./Factories/PlaneControllerFactory";
import TicketControllerFactory from "./Factories/TicketControllerFactory"
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(express.json());

const flightController = FlightControllerFactory.make();
const personController = PersonControllerFactory.make();
const planeController = PlaneControllerFactory.make();
const ticketController = TicketControllerFactory.make();

app.post("/flight/create", flightController.createFlight);
app.get("/flight/list", flightController.listFlight);
app.get("/flight/get/:id", flightController.getFlights);
app.patch("/flight/changeStatus/:id", flightController.changeStatus);
app.get("/flight/get/status/:id", flightController.getStatus);

app.post("/person/create", personController.createPerson);
app.get("/person/list", personController.listPerson);

app.post("/plane/create", planeController.createPlane);
app.get("/plane/get/:id", planeController.getFlight);

app.post("/ticket/emit", ticketController.emitTicket)
app.get("/ticket/get/:id", ticketController.getTicketById)

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
