const Report = require("../models/report");

module.exports.addReport = function (req, res) {
  const reqReport = req.body.reportDetails;
  const findingCriteria = {
    marketID: reqReport.marketID,
    cmdtyID: reqReport.cmdtyID,
  };
  Report.findOne(findingCriteria, (err, report) => {
    if (err) {
      return res.json({ mssg: "Error occured while adding the Report", err });
    }
    if (report) {
      const userLength = report.userID.length;
      if (userLength == 2) {
        return res.status(400).json({ mssg: "Already 2 users reported" });
      }

      report.userID.forEach((user) => {
        if (user == reqReport.userID) {
          return res.status(403).json({ mssg: "User already reported" });
        }
      });

      report.userID.push(reqReport.userID);

      const totalPrice =
        userLength * Number(report.price) +
        Number(reqReport.price) / Number(reqReport.convFctr);

      report.price = totalPrice / report.userID.length;
      report.save();

      return res.json({ status: "success", reportID: report._id });
    } else {
      const newReport = new Report(reqReport);
      newReport.price = Number(newReport.price) / Number(newReport.convFctr);
      newReport.save();

      return res.json({ status: "success", reportID: newReport._id });
    }
  });
};

module.exports.getReport = function (req, res) {
  const query = new URLSearchParams(req.query);
  if (query.has("reportID")) {
    const ID = query.get("reportID");
    Report.findOne({ _id: ID }, (err, report) => {
      if (err) {
        return res.json({
          mssg: "Error occured while getting the Report",
          err,
        });
      }
      if (report) {
        return res.status(200).json(report);
      } else {
        return res.status(404).json({
          mssg: `Could not found report with reportID ${ID}`,
        });
      }
    });
  } else {
    return res.status(400).end("No Report ID Provided");
  }
};

module.exports.deleteReport = function (req, res) {
  const query = new URLSearchParams(req.query);
  if (query.has("reportID")) {
    const ID = query.get("reportID");
    Report.findByIdAndDelete(ID, (err) => {
      if (err) {
        return res.json({
          mssg: "Error occured while getting the Report",
          err,
        });
      } else {
        return res.status(200).json({ mssg: "Removed from Database" });
      }
    });
  } else {
    return res.status(400).end("No Report ID Provided");
  }
};
