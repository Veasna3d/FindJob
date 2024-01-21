import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const CompanySchema = new Schema({
  name: {
    type: String,
    require: [true, "First Name is required"],
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
  contact: {
    type: String,
  },
  location: {
    type: String,
  },

  profileUrl: {
    type: String,
  },
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
});

CompanySchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

CompanySchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
};

CompanySchema.methods.createJWT = async function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Companies = mongoose.model("Companies", CompanySchema);
export default Companies;
