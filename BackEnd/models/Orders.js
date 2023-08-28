import mongoose from "mongoose";
import itemModel from "./Items.js";
const mongo = mongoose;

// status = ["ordered", "paid", "cancelled", "completed"]

const ordersSchema = new mongo.Schema({
  orderTimeStamp: { type: Date, default: Date.now() },
  status: { type: String, required: true },
  items: [
    {
      itemId: { type: mongo.Schema.Types.ObjectId, ref: "items" },
      quantity: Number,
      sub_total: { type: mongo.Schema.Types.Decimal128 },
    },
  ],
  orderTotal: { type: mongo.Schema.Types.Decimal128 },
  statusUpdateTimeStamp: { type: Date, default: null },
});

//calculate orderTotal and subtotals before saving
ordersSchema.pre("save", async function (next) {
  let total = 0;

  for (const item of this.items) {
    const itemObj = await itemModel
      .findById(item?.itemId)
      .select({ price: 1, _id: 0 });

    item.sub_total = itemObj?.price * item?.quantity;
    total += Number(item.sub_total);
  }
  this.orderTotal = total;
  next();
});

const ordersModel = mongo.model("orders", ordersSchema);

export default ordersModel;
