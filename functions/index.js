const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");

app.use("/users", usersRouter);
app.use("/categories", categoryRouter);

exports.api = functions.https.onRequest(app);
