const express = require("express");
const router = express.Router();

const reportsController = require("../../controllers/reports_controller");

router.get("/", reportsController.getReport);

router.post("/", reportsController.addReport);

router.delete("/", reportsController.deleteReport);

module.exports = router;
