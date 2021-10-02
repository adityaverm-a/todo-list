const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = ["Complete Docs"];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));

app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  let day = today.toLocaleDateString("en-IN", options);

  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", (req, res) => {
  res.render("list", {listTitle:"Work List", newListItems: workItems});
})

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
