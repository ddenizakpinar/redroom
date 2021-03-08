const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

const corsOptions = {
  origin: "https://reddroom.netlify.app",
  optionsSuccessStatus: 200, 
};

const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const noteRouter = require("./routes/note");

app.use("/user", cors(corsOptions), userRouter);
app.use("/category", cors(corsOptions), categoryRouter);
app.use("/note", cors(corsOptions), noteRouter);

exports.api = functions.https.onRequest(app);
