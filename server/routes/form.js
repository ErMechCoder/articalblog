import express from "express";
const router = express.Router();

import { createForm,getForms,updateForm ,deleteForm,updateStatus,setOrder} from "../controllers/form.js";


router.post("/", createForm);
router.get("/", getForms);
// router.patch("/:id", updateForm);
router.delete("/:id", deleteForm);
router.patch("/status/update/:id", updateStatus);
router.patch("/set-order", setOrder);


export default router;




