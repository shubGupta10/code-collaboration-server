import express from "express";
import { getCode, updateCode } from "../controller/codeController.js";

const codeRouter = express.Router();

codeRouter.post("/update-code", updateCode);
codeRouter.get("/get-code/:roomId", getCode)

export default codeRouter;
