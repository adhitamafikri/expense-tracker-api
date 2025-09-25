import express from "express";
import coursesRouter from "./routes/courses";
import usersRouter from "./routes/users";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/courses", coursesRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
