// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   phone: { type: String, required: true },       // String to support +country codes
//   email: { type: String, required: true },
//   city: { type: String, required: true },
//   zip: { type: String, required: true },
//   landmark: { type: String, required: true },
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   distance: { type: Number, required: true },    // NEW: distance from store
// });

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   addresses: [addressSchema], // multiple addresses stored here
// });

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;

// userModel.js
// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   firebaseId: { type: String, required: true, unique: true },
//   username: String,
//   email: String,
//   mobile: String,
//   addresses: [
//     {
//       firstName: String,
//       lastName: String,
//       phone: String,
//       email: String,
//       city: String,
//       zip: String,
//       landmark: String,
//       latitude: Number,
//       longitude: Number,
//       distance: String,
//     }
//   ],
// });

// const userSchema = new mongoose.Schema({
//   // firebaseId: { type: String, required: true, unique: true }, // ✅ store Google/Firebase uid
//   firebaseId: { type: String, unique: true, sparse: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true },
//   addresses: [addressSchema],
// }, { timestamps: true });

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;


// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   phone: String,
//   email: String,
//   city: String,
//   zip: String,
//   landmark: String,
//   latitude: Number,
//   longitude: Number,
//   distance: String,
// });

// const userSchema = new mongoose.Schema(
//   {
//     firebaseId: { type: String, required: true, unique: true }, // ✅ Firebase UID
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: String, required: true },
//     addresses: [addressSchema], // ✅ array of addresses
//   },
//   { timestamps: true }
// );

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    mpin: {
      type: String,
      required: true
    },
    addresses: [
      {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        city: String,
        zip: String,
        landmark: String,
        latitude: Number,
        longitude: Number,
        distance: Number,
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
