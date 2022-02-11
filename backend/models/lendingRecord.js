import mongoose from "mongoose";

const lendingRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "users" },
  book: { type: mongoose.Schema.ObjectId, ref: "books" },
  lendingDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: Date.now },
});

const lendingRecord = mongoose.model("lendingRecord", lendingRecordSchema);

export default lendingRecord;
