const express=require("express")
const app= express()
const path=require("path")
const hbs = require("hbs")




require("./db")
//requires-END

app.use(express.json()); // To parse JSON
app.use(express.urlencoded({ extended: false })); // To parse form data


app.set("view engine","hbs")
app.use(express.static(path.join(__dirname, '../public')));

// const publicpath=
// console.log(publicpath);
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));



app.get("/",(req,res)=>{
    res.render("/public/index.html")

})
app.get("/login",(req,res)=>{
    res.render("User-login.hbs")

})







const LoginRouter=require("./router/login")
app.use(LoginRouter)


const AdminRoute=require("./router/Admin")

app.use(AdminRoute)

const userRouter=require("./router/UserRouter")
app.use(userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server started at port 3000")
})