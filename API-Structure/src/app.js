const express = require("express");

const port = 8500;
const app = express();
const dbConnect = require("./config/dbConnect");

//DB Connection
dbConnect();

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use("/uploads", express.static('src/uploads'));


//routes
app.use("/api", require("./routes/index.routes"));



app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});

/*
    GET - Retrive Data (Fetch Data)
    POST - Create Data
    PUT - Repalce Data
    PATCH - Update Data
    DELETE - Delete Data
*/
