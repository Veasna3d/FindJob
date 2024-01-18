import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      require: [true, "Last Name is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      validator: validator.isEmail,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [6, "Password must be at least"],
      select: true,
    },

    accoutType: {
      type: String,
      default: "seeker",
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timeseries: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
};

userSchema.methods.createToken = async function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model('Users', userSchema);
export default Users;