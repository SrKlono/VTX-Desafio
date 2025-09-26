import express from "express";
import cors from "cors";
import router from "./routes/onusRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/onus", router);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
