import express from "express";

 
import { fetchuser } from "../middleware/fetchuser.js";
import { authorize } from "../middleware/authorize.js";
import { createProperty, deleteProperty, fetchAdminProperty, fetchProperty, updateProperty } from "../controller/propertyController.js";

const router = express.Router();

router.post("/addProperty", fetchuser,authorize, createProperty);
router.get("/getProperties", fetchProperty);
router.post("/updateProperty/:id", fetchuser,authorize, updateProperty);
router.post("/deleteProperty/:id", fetchuser,authorize, deleteProperty);
router.get("/admin/getproperty", fetchuser,authorize, fetchAdminProperty);

export default router;
