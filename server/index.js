const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "snakedatabase",
});

// Snake endpoints

app.get("/snakes", (req, res) => {
  db.query("SELECT * FROM 蛇的種類", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


// Hospital endpoints

app.get("/hospitals", (req, res) => {
  db.query("SELECT hospital.醫事機構代碼, hospital.醫院名稱, 醫院電話, 醫院地址, 藥品名稱 FROM hospital left join 存放位置 on hospital.醫事機構代碼 = 存放位置.醫事機構代碼 and hospital.醫院名稱 = 存放位置.醫院名稱;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/poisonLevels", (req, res) => {
  db.query("SELECT * FROM 蛇的毒性", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/snakeColors", (req, res) => {
  db.query("SELECT * FROM 蛇的顏色", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/snakePatterns", (req, res) => {
  db.query("SELECT * FROM `蛇的斑紋`", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/head", (req, res) => {
  db.query("SELECT * FROM `蛇的頭部形狀`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Add this to your existing server code
app.get("/cities", (req, res) => {
  db.query("SELECT city_id, city FROM city", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/sites", (req, res) => {
  const city = req.query.city;
  db.query(
    "SELECT site_id, site FROM site JOIN city ON site.city_id = city.city_id WHERE city.city = ?",
    [city],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/roads", (req, res) => {
  const site = req.query.site;
  db.query(
    "SELECT road_id, road FROM road JOIN site ON road.site_id = site.site_id WHERE site.site = ?",
    [site],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});



app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
app.put("/updateSnake", (req, res) => {
  const { id, field, value } = req.body;
  db.query(
    `UPDATE 蛇的種類 SET ${field} = ? WHERE Snake_ID = ?`,
    [value, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteSnake/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM 蛇的種類 WHERE Snake_ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Hospital endpoints
app.post("/createHospital", (req, res) => {
  const { code, name, address, phone } = req.body;
  db.query(
    "INSERT INTO hospital (醫事機構代碼, 醫院名稱, 醫院地址, 醫院電話) VALUES (?,?,?,?)",
    [code, name, address, phone],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/hospitals", (req, res) => {
  db.query("SELECT * FROM hospital", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateHospital", (req, res) => {
  const { code, field, value } = req.body;
  db.query(
    `UPDATE hospital SET ${field} = ? WHERE 醫事機構代碼 = ?`,
    [value, code],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteHospital/:code", (req, res) => {
  const code = req.params.code;
  db.query("DELETE FROM hospital WHERE 醫事機構代碼 = ?", code, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/poisonLevels", (req, res) => {
  db.query("SELECT * FROM 蛇的毒性", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/snakeColors", (req, res) => {
  db.query("SELECT * FROM 蛇的顏色", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/snakePatterns", (req, res) => {
  db.query("SELECT * FROM `蛇的斑紋`", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/head", (req, res) => {
  db.query("SELECT * FROM `蛇的頭部形狀`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Add this to your existing server code
app.get("/cities", (req, res) => {
  db.query("SELECT city FROM city", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
