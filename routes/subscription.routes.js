import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions,} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("All subscriptions");
});

// Static and more specific routes come before parameterized routes
subscriptionRouter.get("/user/:id",authorize, getUserSubscriptions )


subscriptionRouter.get("/upcoming", (req, res) => {
  res.send("Upcoming subscription");
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/:id", (req, res) => {
  res.send("Get details by id");
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("cancel subscription");
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send("update subscription");
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send("delete subscription");
});

export default subscriptionRouter;
