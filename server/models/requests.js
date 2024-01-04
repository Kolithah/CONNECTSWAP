import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
      reqStatus: Number,
    },
  ],
  exchangeScheme: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "exchangeSchema",
  },
  notificationsA: [
    { state: { type: Number, default: 0 }, time: { type: Date } },
  ],
  notificationsB: [
    { state: { type: Number, default: 0 }, time: { type: Date } },
  ],
  messages: [
    {
      message: { type: String, defualt: "" },
      user: { type: Number, default: 2 },
      time: { type: Date },
    },
  ],
});

var requestScheme = mongoose.model("exchangeRequest", requestSchema);

export default requestScheme;
