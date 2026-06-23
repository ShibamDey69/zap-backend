import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND || "*",
  credentials: true
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.disable('x-powered-by');

app.get("/", (req, res) => {
  res.json({"hello":"world"})
})

export default app;
