const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

router.get("/post-page", homeController.postPage);
router.get("/delete-page", homeController.deletePage);
router.get("/get-page", homeController.getPage);
router.get("/view-page", homeController.viewPage);

module.exports = router;
