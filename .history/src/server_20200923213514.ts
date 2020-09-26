import express, { request, response } from "express";

const app = express();

app.post("/projects", (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return response.json(user);
});
app.listen(3333, () => {
  console.log("server started on port 3333!");
});
