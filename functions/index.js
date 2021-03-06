const functions = require("firebase-functions");
const app = require("express")();

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);


exports.api = functions.https.onRequest(app);
