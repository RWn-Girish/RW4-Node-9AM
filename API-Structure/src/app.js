const express = require("express");
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const dbConnect = require("./config/dbConnect");
const morgan = require('morgan');
const cors = require('cors');

//DB Connection
dbConnect();

//middleware
app.use(cors());
app.use(morgan('dev'));
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
    Token => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTk2OGFkMDdhOGM1YTJhZDFiNmRkYzUiLCJpYXQiOjE3NzE1NTg4NzN9.yH8_qcVT6N2qlbsCFD2cxRf99fsQkDSp734Pksh_hts
*/
