import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker API!");
});

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(
        `Subscription Tracker API is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server due to DB connection error:",
      error.message || error
    );
    process.exit(1);
  }
};

start();

// mongodb+srv://jayavel:jayavel@cluster0a.sr4twyq.mongodb.net/?appName=Cluster0a
