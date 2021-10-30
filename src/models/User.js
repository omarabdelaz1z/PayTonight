const mongoose = require("mongoose");
const connect = require("../utils/db");

const options = {
  toJSON: {
    virtuals: true,
  },
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    organization: {
      type: String,
      required: [true, "organization is required"],
    },
    apikey: {
     type:String,
    }
  },
  options
);

userSchema.virtual("id").get(function getId() {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

userSchema.path("email").validate(async (value) => {
  const count = await mongoose.models.User.countDocuments({ email: value });
  return count === 0;
}, `email is already in use.`);

userSchema.path("username").validate(async (value) => {
  const count = await mongoose.models.User.countDocuments({ username: value });
  return count === 0;
}, `username is unavailable.`);

const User = mongoose.model("User", userSchema);

const findUser = async (filter) => {
  await connect();
  return User.findOne(filter).select("-__v");
};

const createUser = async (body) => {
  await connect();
  return User.create(body);
};

const findUserById = async (id) => {
  await connect();
  return User.findById(id, "-__v");
};

const createKey = async (userID, appDetails) => {
  const id = {_id:new mongoose.mongo.ObjectId(userID)};
  await connect();
  return User.findOneAndUpdate(id, appDetails, { new: true });
};

module.exports = { findUser, createUser, createKey, findUserById };
