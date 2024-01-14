
const express = require("express")
const loginRouter = express.Router()
const UserModle=require("../modle/RegisterModle")
const path = require("path")

loginRouter.post("/register", async (req, res) => {

  try {

    const { email, password, fname, lname, address, phone } = req.body;
    const NewUser = new UserModle({
      email: email,
      password: password,
      fname: fname,
      lname: lname,
      phone: phone,
      address: address,

    })
    await NewUser.save()
    res.render("User-login.hbs",{Message:"your account will approve withn 2 hours"})

  } catch (e) {
    res.render("User-login.hbs",{Message:"Error while signup try again"})

  }

});



loginRouter.post("/dashboard", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log();
     const user = await UserModle.findOne({ email: email });
    if (!user) {
      res.render("User-login.hbs", { sMessage: "user not found" });
    } else {
      if(user.status==true){

        const userpass = user.password
        if (userpass == password) {
          const username=user.fname
          const useremial=user.email
          const userphone=user.phone
          // const invite=Math.random()
          console.log(user);
          const deposit=user.deposit;
          const withdraw=user.withdraw;
          const profit=user.profit
          res.render("dashboard.hbs",{username,useremial,userphone,deposit,withdraw,profit})
          
          
        } else {
          res.render("User-login.hbs",{sMessage:"Incorrect details"})
        }
      }else{
        res.render("User-login.hbs",{sMessage:"Your account is in pending send money first to get started"})

      }
    }
  } catch (e) {
    res.render("User-login.hbs",{sMessage:"Incorrect details"})
  }
});





module.exports = loginRouter