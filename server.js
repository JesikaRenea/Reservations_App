const express = require("express");
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const tables = [
//     {
//         customerID: "table1",
//         customerName: "Alex",
//         phoneNumber: 4076908746,
//         customerEmail: "mail@mail.com",
//     },
//     {
//         customerID: "table2",
//         customerName: "Alex",
//         phoneNumber: 4076908746,
//         customerEmail: "mail@mail.com",
//     }
//   ];
  
let tableData = [];
let waitlistData = [];


app.get("/", function(req, res) {
    // res.send("Welcome to the restaurant!");
    res.sendFile(path.join(__dirname, "templates/home.html"));
});

app.get("/tables", function(req, res) {
    // res.send("Tables");
    res.sendFile(path.join(__dirname, "templates/tables.html"));
});
app.get("/reserve", function(req, res) {
    // res.send("Reserve a Table");
    res.sendFile(path.join(__dirname, "templates/reserve.html"));
});
app.get("/api/tables", function(req, res) {
    return res.json(tableData);
}); 
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlistData);
}); 


app.get("/api/tables/:table", function(req, res) {
    const chosen = req.params.table;
    console.log(chosen);
    for (var i = 0; i < tableData.length; i++) {
      if (chosen === tableData[i].routeName) {
        return res.json(tableData[i]);
      }
    }
  
    return res.json(false);
});
app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();
    for (var i = 0; i < tableData.length; i++) {
    if (newTable.routeName === tableData[i].routeName){
        return false
    }};
    console.log(newTable);
    if (tableData.length < 5){
        tableData.push(newTable)
        console.log(tableData);
    } else {
        waitlistData.push(newTable);
        console.log(waitlistData);
    }
    // tableData.push(newTable);
    res.json(newTable);
});

app.listen(PORT, () => console.log("Listening at http://localhost:" + PORT));