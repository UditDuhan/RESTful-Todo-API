const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://thor:lAYOPTLYhQGKahWo@todocluster.ljatd.mongodb.net/todoCluster?retryWrites=true&w=majority", {
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
            todoSchema.index({
                createdAt: 1
            }, {
                expireAfterSeconds: req.body.todo.duration
            });
            res.redirect("/list");
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Todo API Server has started");
});