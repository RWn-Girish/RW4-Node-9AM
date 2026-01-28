const express = require("express");
const port = 8080;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

let students = [
  {
    id: "101",
    name: "Rohit Sharma",
    email: "rohit@test.in",
    course: "MERN Stack Developement",
  },
  {
    id: "102",
    name: "Abhishek Sharma",
    email: "abhi@test.in",
    course: "Game Developement",
  },
  {
    id: "103",
    name: "Virat Kohli",
    email: "kingKohli@test.in",
    course: "UI/UX Designer",
  },
  {
    id: "104",
    name: "Hardik Pandya",
    email: "kunfuPandya@test.in",
    course: "Android Developement",
  },
];


const middleware = (req, res, next) => {
  // console.log(req.query);
  if(req.query.age >= 18){
    next();
  }else{
    res.end("You are not eligible");
  }
}

// app.use(middleware);

app.get("/",  (req, res) => {
  res.render("dashboard");
});
// app.get("/", middleware, (req, res) => {
//   res.render("index", { students });
// });

app.post("/add-student", (req, res) => {
  // console.log('Body: ', req.body);
  students.push(req.body);
  return res.redirect("/");
});

app.get("/delete-student/:id", (req, res) => {
  // console.log(req.params.id);
  let id = req.params.id;
  students = students.filter((stu) => stu.id != id);
  return res.redirect("/");
});

app.get("/edit-student/:id", (req, res) => {
  let id = req.params.id;
  let student =  students.find(stu => stu.id == id);
  return res.render("editStudent", {student});
});

app.post("/update-student/:id", (req, res)=> {
  // console.log(req.body);
  let id = req.params.id;
  let updateData = students.map(stu => {
    if(stu.id == id){
      return {
        ...req.body,
        id: id
      }
    }else{
      return stu;
    }
  })

  students = updateData;
  return res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});

// MVC => M- model, V-views, C - Controller


// static, json, urlencoded => express 4.0 => body-parser