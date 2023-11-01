import FlightControllerFactory from "./Factories/FlightControllerFactory";
import express from "express";
import dotenv from "dotenv";
import PersonControllerFactory from "./Factories/PersonControllerFactory";
import PlaneControllerFactory from "./Factories/PlaneControllerFactory";
import TicketControllerFactory from "./Factories/TicketControllerFactory"
dotenv.config();

const app = express();

app.use(express.json());

const flightController = FlightControllerFactory.make();
const personController = PersonControllerFactory.make();
const planeController = PlaneControllerFactory.make();
const ticketController = TicketControllerFactory.make();

app.get("/", (req, res) => {
	res.send("Comapania Aerea");
});

app.post("/flight/create", flightController.createFlight);
app.get("/flight/list", flightController.listFlight);
app.get("/flight/get/:id", flightController.getFlights);
app.patch("/flight/changeStatus/:id", flightController.changeStatus);

app.post("/person/create", personController.createPerson);
app.get("/person/list", personController.listPerson);

app.post("/plane/create", planeController.createPlane);
app.get("/plane/get/:id", planeController.getFlight);

app.post("/ticket/emit", ticketController.emitTicket)
app.get("/ticket/get/:id", ticketController.getTicketById)

app.listen(process.env.PORT);

console.log(`aplicação roando na porta ${process.env.PORT}`);
