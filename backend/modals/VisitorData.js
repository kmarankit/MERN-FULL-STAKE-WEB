import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionStartTime: { type: String, required: true },
  sessionEndTime: { type: String },
  sessionDurationSeconds: { type: Number },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  locationName: { type: String }, // ✅ Add this line
  distanceFromStoreKM: { type: String },
  ipAddress: { type: String },
  isp: { type: String },
  device: {
    browser: { type: String },
    os: { type: String },
    type: { type: String }
  }
}, { _id: false });

const visitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  sessions: [sessionSchema]
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;