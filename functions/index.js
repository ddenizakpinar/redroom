const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const noteRouter = require("./routes/note");

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/note", noteRouter);

exports.api = functions.https.onRequest(app);
