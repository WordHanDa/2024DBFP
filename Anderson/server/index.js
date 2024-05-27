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
app.post("/createSnake", (req, res) => {
  const { snakeID, name, poison, time, color, pattern, headShape, antivenomId } = req.body;
  db.query(
    "INSERT INTO 蛇的種類 (Snake_ID, 種類, 毒性, 出沒時間, 顏色, 斑紋, 頭部形狀, Antivenom_ID) VALUES (?,?,?,?,?,?,?,?)",
    [snakeID, name, poison, time, color, pattern, headShape, antivenomId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/snakes", (req, res) => {
  db.query("SELECT * FROM 蛇的種類", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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

app.get("/getPoisonTypes", (req, res) => {
  db.query("SELECT 蛇的毒性 FROM 蛇的毒性", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
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

app.get("/getPoisonTypes", (req, res) => {
  db.query("SELECT 蛇的毒性 FROM 蛇的毒性", (err, result) => {
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
