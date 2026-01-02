import { serve } from "@upstash/workflow";
import Subscription from "../models/subscription.model";
import dayjs from "dayjs";

const REMAINDERS = [7, 5, 3, 1];

export const sendRemainders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscrition ${subscriptionId}. Stopping reminders.`
    );
  }

  for (const daysBefore of REMAINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilRemainder(context, `Remainder ${daysBefore} days`, reminderDate);
    }

    await triggerRemainder(context, `Remainder ${daysBefore} days`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", {
      select: "name email",
    });
  });
};

const sleepUntilRemainder = async (context, label, date) => {
  console.log(`Sleeping until ${label} remainder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerRemainder = async (context, label) => {
  return await context.run(label, () => {
    log(`Triggered ${label} reminder`);
  });
};
