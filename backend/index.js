require('dotenv').config()
const express = require("express");
const serverless = require('serverless-http')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index.js");

app.use('/api/vi',mainRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
  
module.exports.handler = serverless(app);

app.listen(PORT,()=>{
    console.log(`server is listening on Port ${PORT}`)
})




