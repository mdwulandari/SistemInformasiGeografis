import Express from "express";
import Cors from "cors";

import Config from "./config.js";

const app = Express();

app.use(Cors());
app.use(Express.json());

app.get("/", (req, res) => {
  return res.json({
    msg: "Hello World",
  });
});

app.get("/mapmarker", (req, res) => {
  res.sendFile('./views/mapandmarker.html', {root: __dirname});
});

app.get("/moremarkers", (req, res) => {
  res.sendFile('./views/moremarker.html', {root: __dirname});
});

app.get("/markercluster", (req, res) => {
  res.sendFile('./views/markercluster.html', {root: __dirname});
});

app.get("/polyline", (req, res) => {
  res.sendFile('./views/polyline.html', {root: __dirname});
});

app.get("/routing", (req, res) => {
  res.sendFile('./views/routing.html', {root: __dirname});
});

app.listen(Config.PORT, () => {
  console.log(`Example app listening on port ${Config.PORT}`);
});
