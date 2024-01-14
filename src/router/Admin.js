const express = require("express");
const AdminRoute = express.Router();

const Admin = require("../modle/AdminModle"); // Adjust the path accordingly

const usermodle = require("../modle/RegisterModle")


AdminRoute.get("/admin", (req, res) => {

    res.render("admin.hbs");
});



AdminRoute.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const finduser = await Admin.findOne({ email: email });

        if (finduser) {
            const compass = finduser.password;

            if (password !== compass) {
                res.render("admin.hbs", { Message: "Invalid Login" });
            } else {

                res.redirect("/admindash")

            }
        } else {
            res.render("admin.hbs", { Message: "Invalid Login" });
        }
    } catch (e) {
        // Handle any errors
        res.render("admin.hbs", { Message: "Invalid Login" });
    }
});




AdminRoute.get("/admindash", async (req, res) => {
    const users = await usermodle.find()

    res.render("admindash.hbs", { users })
});


AdminRoute.get("/requestaccount", async (req, res) => {
    const users = await usermodle.find()

    res.render("requests.hbs", { users })
})




AdminRoute.post("/update", async (req, res) => {
    const id = req.body.id

    const finduser = await usermodle.findOne({ _id: id });


    res.render("updateuser.hbs", { finduser })
});

//allow user
AdminRoute.post("/allowuser", async (req, res) => {
    const id = req.body.id;

    try {
        // Update the user status to true
        const updatedUser = await usermodle.findOneAndUpdate(
            { _id: id },
            { $set: { status: true } },
            { new: true } // To return the updated document
        );

        if (!updatedUser) {
            // Handle case where the user with the specified ID was not found
            return res.status(404).send("User not found");
        }
                    const users=await usermodle.find()
        res.render("admindash.hbs", { users });
    } catch (error) {
        // Handle other errors, e.g., database errors
        console.error(error);
        res.status(500).render("updateuser.hbs", { finduser: null, error: "Error updating user status" });
    }
});


AdminRoute.post("/updateuser", async (req, res) => {
    const { fname, email, phone, profit, deposit, withdraw } = req.body;
    console.log(email);

    try {
        // Find the user by email
        const userfind = await usermodle.findOne({ email: email });

        if (!userfind) {
            // Handle case where the user with the specified email was not found
            return res.status(404).send("User not found");
        }

        // Update the user data
        const updatedUser = await usermodle.findOneAndUpdate(
            { email },
            { $set: { fname, email, phone, profit, deposit, withdraw } },
            { new: true } // To return the updated document
        );

        res.redirect("/admindash")
    } catch (error) {
        // Handle other errors, e.g., database errors
        console.error(error);
        res.status(500).render("updateuser.hbs", { finduser: null, error: "Error updating user" });
    }
});






module.exports = AdminRoute;
