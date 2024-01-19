import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
    },
    jobTitle: {
      type: String,
      require: [true, "Job Title is required"],
    },
    jobType: {
      type: String,
      require: [true, "Job Type is required"],
    },
    location: {
      type: String,
      require: [true, "Location is required"],
    },
    salary: { type: String, require: [true, "Salary is required"] },
    vacancies: {
      type: Number,
    },
    experiences: {
      type: Number,
      default: 0,
    },
    detail: [
      {
        desc: { type: String },
        requirements: { type: String },
      },
    ],
    application: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
