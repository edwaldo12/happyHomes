import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../src/routes/routes";
import db from "./config/db";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(routes);

// For Dropping DB
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
