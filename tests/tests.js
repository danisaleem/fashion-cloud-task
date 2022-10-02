var chai = require("chai");
var should = chai.should();
var chaiHttp = require("chai-http");
var server = require("../app");
// var Cache = require("../src/models/cache.model");
const db = require("../src/models/index.js");
const Cache = db.Cache;
chai.use(chaiHttp);
var mockCache;

describe("Cache crud unit tests", () => {
  beforeEach((done) => {
    mockCache = new Cache({
      _id: "6239bbfe8f8ad00933c68612",
      value: "valueforUnitTest",
    });
    mockCache.save(function (err) {
      done();
    });
  });

  afterEach((done) => {
    Cache.findByIdAndRemove(mockCache._id, { useFindAndModify: false });
    done();
  });

  describe("/cache", () => {
    it("should retrieve list of ALL caches", (done) => {
      chai
        .request(server)
        .get("/cache/")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body[0].should.have.property("id");
          res.body[0].should.have.property("value");
          res.body[0].should.have.property("createdAt");
          res.body[0].should.have.property("updatedAt");

          //   res.body[0].value.should.equal("6239bbfe8f8ad00933c68614");
          //   res.body[0].id.should.equal(mockCache.id);
          res.body[0].value.should.equal(mockCache.value);
          res.body[0].id.should.equal(mockCache.id);
          done();
        });
    });

    it("should retrieve cache by id", (done) => {
      chai
        .request(server)
        .get("/cache/6239bbfe8f8ad00933c68612")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("object");
          res.body.should.have.property("id");
          res.body.should.have.property("value");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");

          res.body.value.should.equal(mockCache.value);
          res.body.id.should.equal(mockCache.id);
          done();
        });
    });

    it("should delete cache by id", (done) => {
      chai
        .request(server)
        .delete("/cache/6239bbfe8f8ad00933c68612")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("object");
          res.body.should.have.property("message");
          res.body.message.length.should.be.above(
            0,
            "1 Caches were deleted successfully!"
          );

          done();
        });
    });

    it("should delete all cache records", (done) => {
      chai
        .request(server)
        .delete("/cache/")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("object");
          res.body.should.have.property("message");

          res.body.message.length.should.be.above(
            0,
            "0 Caches were deleted successfully!"
          );

          done();
        });
    });
  });
});
