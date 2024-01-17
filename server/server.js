import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

//MONGODB CONNECTION