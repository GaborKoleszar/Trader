import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import expressEjsLayouts from "express-ejs-layouts";

/* CONFIGURATIONS */
dotenv.config();
//const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();
console.log(__dirname);
const PORT = process.env.PORT || 6001;
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

/* SECURITY */
//app.use(cors());
//app.use(helmet());
//app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* EXPRESS EJS */
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(express.static("public"));

/* EXPRESS ROUTES */
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.redirect("auth/login");
});

/* MONGOOSE SETUP */
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server port: ${PORT}`));
    })
    .catch((err) => console.log(`Could not connect : ${err}`));
