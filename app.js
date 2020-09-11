const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://thor:m%40%24%233%23%2435O432%23%24%23%40%25%235h%26%5E%25i56t@todocluster.ljatd.mongodb.net/todoCluster?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!")
}).catch(error => {
    console.log(error.message)
});

// var durationSchema = new mongoose.Schema({
//     type: Date,
//     default: Date.now;
//     expires: Number
// });

// var Duration = mongoose.model("Duration", durationSchema);

var todoSchema = new mongoose.Schema({
    taskName: String,
    taskDuration: String,
    creator: String,
    duration: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model("Todo", todoSchema);




app.get("/", (req, res) => {
    res.redirect("/list");
});

app.get("/list", (req, res) => {
    Todo.find({}, (err, foundTodos) => {
        if (err) {
            console.log(err);
        } else {
            res.send(foundTodos);
        }
    });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {
    Todo.create(req.body.todo, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/list");
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Todo API Server has started");
});