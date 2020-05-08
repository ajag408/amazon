var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server.js");
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);


describe ("Login check", function(){
   
    it ("Login should work when provided with correct credentials (should return JWT token)", (done)=>{
        var login = {email: 'pm@bjp.com', password: 'pm'};
        chai.request(server)
            .post("/users/login")
            .send(login)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", res.body);
                done()
            })
     })
    
})


describe ("Get all customer account details by ID", function(){
   
    it ("Should return all customer details required for rendering their account when logged in", (done)=>{
        // var newCard = {};
        chai.request(server)
            .get("/customer/getCustomer/5ea3ab017c376a636208a017")
            // .send(newCard)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", JSON.parse(res.text));
                done()
            })
     })    
})

describe ("Get all customer account details by ID", function(){
   
    it ("Should return all customer details required for rendering their account when logged in", (done)=>{
        // var newCard = {};
        chai.request(server)
            .get("/customer/getCustomer/5ea3ab017c376a636208a017")
            // .send(newCard)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("Response Body:", JSON.parse(res.text));
                done()
            })
     })
    
})

describe ("Get all orders for Seller", function(){
   
    it ("Should return all orders details ", (done)=>{
        // var newCard = {};
        chai.request(server)
            .get("/order/seller/getAllOrder/5ea337f842834e5c142f02d9/0")
            .end((err, res) => {
               // console.log(res.body);
                expect(res.body).to.be.an('array');
                done()
            })
     })
    
})

describe ("Get all orders for Customer", function(){
   
    it ("Should return all orders details ", (done)=>{
        chai.request(server)
            .get("/order/customer/getAllOrder/5ead4a39f6d4177e2139ffe6/0")
            .end((err, res) => {
               // console.log(res.body);
                expect(res.body).to.be.an('array');
                done()
            })
     }) 
})

describe ("Get Product From Product Id", function(){
   
    it ("Should have price grater than zero", (done)=>{
        chai.request(server)
            .get("/product/5ea6a3596d7efac6ca1edbfc")
            .end((err, res) => {
               // console.log(res.body);
                expect(res.body.price).to.be.greaterThan(0);
                done()
            })
     }) 
})

describe ("Search Product", function(){
   
    it ("Search Product Should return with 200", (done)=>{
        var search = {"sellerId":[],"lowerPrice":0,"upperPrice":20};
        chai.request(server)
            .post("/product/search-product")
            .send(search)
            .end((err, res) => {
                expect(res.body.status).to.be.equal(200);
                done()
            })
     })
    
})

describe ("Order Tracking Detail", function(){
   
    it ("Get Order Tracking Updates as an array from OrderId", (done)=>{
        chai.request(server)
            .get("/order/trackOrder/44")
            .end((err, res) => {
                expect(res.body.data).to.be.an('array');
                done()
            })
     })
    
})

describe ("Get Catagory detail from Amazon", function(){
   
    it ("Get Catagory detail as an object", (done)=>{
        let catagory = {categoryDetailsId: "5ea3c20831e08c30d9712c5f", pageIndex: 1};
        chai.request(server)
            .post("/admin/getProductCategoryDetails")
            .send(catagory)
            .end((err, res) => {
               // console.log("Type of response",typeof res.body);
                expect(res.body).to.be.an('object');
                done()
            })
     })
    
})

describe("Get Analytics", function(){
   
    it ("Get Order Tracking Updates as an array from OrderId", (done)=>{
        chai.request(server)
            .get("/analytics/getBestCustomers")
            .end((err, res) => {
                console.log("Type of response", res.body);
                expect(res.body).to.be.an('object');
                done()
            })
     })
    
})