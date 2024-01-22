import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required");
  }

  try {
    const accountExist = await Companies.findOne({ email });
    if (accountExist) {
      next("Email Already Registered, Please Login");
      return;
    }

    const company = await Companies.create({
      name,
      email,
      password,
    });

    const token = company.createJWT();
    res.status(201).json({
      success: true,
      message: "Company Account Created Successfully",
      user: {
        _id: company._id,
        name: company.name,
        email: company.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = res.body;

  try {
    if (!email || !password) {
      next("Please Provide Currect Credentials");
      return;
    }

    const company = await Companies.findOne({ email }).select("+password");

    if (!company) {
      next("Invalid email or password");
      return;
    }

    const isMatch = await company.comparePassword(password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    company.password = undefined;
    const token = company.createJWT();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = res.body;

  try {
    if (!name || !contact || !location || !profileUrl || !about) {
      next("Please Provide all required fields");
      return;
    }

    const id = req.body.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const updateCompany = {
      name,
      contact,
      location,
      profileUrl,
      about,
      _id: id,
    };

    const company = await Companies.findByIdAndUpdate(id, updateCompany, {
      new: true,
    });

    const token = company.createJWT();
    company.password = undefined;

    res.status(200).json({
      success: true,
      message: "Company Profile Updated Successfulll",
      company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCompanyProfile = async (req, res, next) => {};

export const getCompanies = async (req, res, next) => {};
