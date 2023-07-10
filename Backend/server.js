const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require('path')

const commentRouter = require("./routes/commentRouter");
const blogRouter = require("./routes/blogRouter");

// import routes
const authRoute = require("./routes/userRouter");

// middlewear

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(blogRouter);
app.use(commentRouter);

// use routes
app.use(authRoute);
app.use(blogRouter);
app.use(commentRouter);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Starting server on port ${process.env.PORT}`);
        });
      });
  },
};
