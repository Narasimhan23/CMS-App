const express = require("express");
const connectDB = require("./config/db");
const app = express();

//DB Connection
connectDB();

//Init middleware for bodyparser
app.use(express.json({extended : false}));

app.get('/', (req, res) => res.send("API Running"));

//Routing
app.use('/registerUser', require("./routes/api/registerUser"));
app.use('/auth/user', require("./routes/api/user"));
app.use('/post', require("./routes/api/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start @ ${PORT}`))