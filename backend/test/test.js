var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server.js");
let should = chai.should();
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
