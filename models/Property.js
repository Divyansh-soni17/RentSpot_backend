import mongoose from "mongoose";
const { Schema } = mongoose;

const propertySchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  imageurl: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  roomheight: {
    type: Number,
    required: true,
  },
  roomwidth: {
    type: Number,
    required: true,
  },
  propertytype:{
    type: String,
    required: true,
  },
  moveindate:{
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
