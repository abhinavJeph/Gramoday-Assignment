const Report = require("../models/report.js");

module.exports.home = async function (req, res) {
  try {
    let reports = await Report.find({}).sort("-createdAt");
    return res.render("home", {
      title: "Home",
      reports,
    });
  } catch (err) {
    return res.redirect("back");
  }
};

module.exports.postPage = function (req, res) {
  return res.render("post-page", {
    title: "Post",
  });
};

module.exports.deletePage = function (req, res) {
  return res.render("delete-page", {
    title: "Delete",
  });
};

module.exports.getPage = function (req, res) {
  return res.render("get-page", {
    title: "Get",
  });
};

module.exports.viewPage = function (req, res) {
  return res.render("view-page", {
    title: "View",
  });
};
