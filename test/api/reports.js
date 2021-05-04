const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");

const testCase = {
  report1: {
    reportDetails: {
      userID: "user-1",
      marketID: "market-1",
      marketName: "Vashi Navi Mumbai",
      cmdtyID: "cmdty-1",
      marketType: "Mandi",
      cmdtyName: "Potato",
      priceUnit: "Pack",
      convFctr: 50,
      price: 700,
    },
    reportID: "",
  },

  report2: {
    reportDetails: {
      userID: "user-2",
      marketID: "market-1",
      marketName: "Vashi Navi Mumbai",
      cmdtyID: "cmdty-1",
      marketType: "Mandi",
      cmdtyName: "Potato",
      priceUnit: "Quintal",
      convFctr: 100,
      price: 1600,
    },
    reportID: "",
  },

  report3: {
    reportDetails: {
      userID: "user-3",
      marketID: "market-1",
      marketName: "Vashi Navi Mumbai",
      cmdtyID: "cmdty-1",
      marketType: "Mandi",
      cmdtyName: "Potato",
      priceUnit: "Quintal",
      convFctr: 100,
      price: 1600,
    },
    reportID: "",
  },
};

// Assertion Style
chai.should();

chai.use(chaiHttp);

// TEST FOR REPORTS API
describe("Reports API", () => {
  /*
    Test to PUT route
  */
  describe("POST /reports", () => {
    it("it shoult POST a new Report of User 1", (done) => {
      const report = testCase.report1;
      chai
        .request(server)
        .post(`/reports`)
        .send(report)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.have.property("status").eq("success");
          response.body.should.have.property("reportID");
          testCase.report1.reportID = response.body.reportID;
          done();
        });
    });

    it("it shoult NOT POST same Report if User already present", (done) => {
      const report = testCase.report1;
      chai
        .request(server)
        .post(`/reports`)
        .send(report)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a("object");
          response.body.should.have
            .property("mssg")
            .eq("User already reported");
          done();
        });
    });

    it("it shoult POST a new Report of User 2", (done) => {
      const report = testCase.report2;
      chai
        .request(server)
        .post(`/reports`)
        .send(report)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.have.property("status").eq("success");
          response.body.should.have.property("reportID");
          testCase.report2.reportID = response.body.reportID;
          done();
        });
    });

    it("it shoult NOT POST Report with more than 2 Users", (done) => {
      const report = testCase.report3;
      chai
        .request(server)
        .post(`/reports`)
        .send(report)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("mssg")
            .eq("Already 2 users reported");
          done();
        });
    });
  });

  /*
    Test to GET (by id) route
  */
  describe("GET /reports?reportID=ID", () => {
    it("it should GET report by ID for user 1", (done) => {
      const reportID = testCase.report1.reportID;
      chai
        .request(server)
        .get(`/reports?reportID=${reportID}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("cmdtyName");
          response.body.should.have.property("cmdtyID");
          response.body.should.have.property("marketID");
          response.body.should.have.property("marketName");
          response.body.should.have.property("userID");
          response.body.should.have.property("timestamp");
          response.body.should.have.property("priceUnit").eq("kg");
          response.body.should.have.property("price");
          done();
        });
    });

    it("it should GET report by ID with average price of commodity", (done) => {
      const report1 = testCase.report1;
      const report2 = testCase.report2;
      const reportID = report2.reportID;
      const avgPrice =
        (report1.reportDetails.price / report1.reportDetails.convFctr +
          report2.reportDetails.price / report2.reportDetails.convFctr) /
        2;
      chai
        .request(server)
        .get(`/reports?reportID=${reportID}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("cmdtyName");
          response.body.should.have.property("cmdtyID");
          response.body.should.have.property("marketID");
          response.body.should.have.property("marketName");
          response.body.should.have.property("userID");
          response.body.should.have.property("timestamp");
          response.body.should.have.property("priceUnit").eq("kg");
          response.body.should.have.property("price").eq(avgPrice);
          done();
        });
    });

    it("it should NOT GET report by wrong ID", (done) => {
      const reportID = "-Wrong ID";
      chai
        .request(server)
        .get(`/reports?reportID=${reportID}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have
            .property("mssg")
            .eq(`Could not found report with reportID ${reportID}`);
          done();
        });
    });

    it("it should NOT GET report without ID", (done) => {
      chai
        .request(server)
        .get(`/reports`)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("No Report ID Provided");
          done();
        });
    });
  });

  /*
    Test to DELETE (by id) route
  */
  describe("DELETE /reports?reportID=ID", () => {
    it("it should DELETE report by ID", (done) => {
      const reportID = testCase.report1.reportID;
      chai
        .request(server)
        .delete(`/reports?reportID=${reportID}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("mssg")
            .eq("Removed from Database");
          done();
        });
    });

    it("it should NOT DELETE report without ID", (done) => {
      chai
        .request(server)
        .delete(`/reports`)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("No Report ID Provided");
          done();
        });
    });
  });
});
