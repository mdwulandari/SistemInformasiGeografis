import Express from "express";
import Cors from "cors";
import Config from "./config.js";

import mysql from "mysql";

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

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_2105551075",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/process", (req, res) => {
  const { lat_lng, nama_rs, alamat_rs, type_rs} = req.body;

  if (!lat_lng || !nama_rs || !alamat_rs || !type_rs) {
    res.status(400).send('Data tidak lengkap');
    console.log('Data yang diterima:', req.body);
    return;
  }

  const sql = `INSERT INTO tb_rs (lat_lng, nama_rs, alamat_rs, type_rs) VALUES (?, ?, ?, ?)`;
  const values = [lat_lng, nama_rs, alamat_rs, type_rs];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Data inserted into database");
    console.log('Data yang diterima:', req.body);
    res.send("Data inserted into database");
  });
});

var btnKirim = document.getElementById('btnKirim');
        btnKirim.addEventListener('click', function() {
            var namaRS = document.getElementById('namaRS').value;
            var latitude = document.getElementById('latitude').value;
            var longitude = document.getElementById('longitude').value;
            var alamatRS = document.getElementById('alamatRS').value;

            var data = {
                nama_rs: namaRS,
                latlng_rs: latitude + ',' + longitude,
                alamat_rs: alamatRS
            };

            fetch("/process", { 
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
            }).catch(function(error) {
                console.log(error);
            });
        });

        fetch("/getData").then(function(response) { 
            return response.json();
        }).then(function(data) {
            data.forEach(function(c, i) {
                var latlng = L.latLng(c.latlng_rs.split(',')[0], c.latlng_rs.split(',')[1]); 
                var randomHospitalName = hospitalNames[Math.floor(Math.random() * hospitalNames.length)];
                var newMarker = addMarker(latlng, markers.length, randomHospitalName);
                markers.push(newMarker);
            })
        }).catch(function(error) {
            console.log(error);
});
