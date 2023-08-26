const mongo = require("mongoose");

ordersSchema = new mongo.Schema({
  orderTimeStamp: { type: Date, default: Date.now() },
  status: { type: Boolean, required: true },
  items: [
    {
      itemId: { type: mongo.Schema.Types.ObjectId, ref: "items" },
      quantity: Number,
    },
  ],
});

exports.ordersSchema = ordersSchema;
