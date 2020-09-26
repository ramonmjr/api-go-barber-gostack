import express, { request, response } from "express";

const app = express();

app.post("/projecats", (request, response) => {
  const { name, email } = request.body;
  return response.json({ message: "Hello rocketSeat" });
});
app.listen(3333, () => {
  console.log("server started on port 3333!");
});
