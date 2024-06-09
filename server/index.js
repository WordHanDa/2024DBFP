const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use((req,res,next)=> {
  res.header('ngrok-skip-browser-warming', 'true');
  next();
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "snakedatabase",
});

// Snake endpoints
app.post("/createSnake", (req, res) => {
  const { name, poison, time, color, pattern, headShape, antivenomId, url, url2 } = req.body;
  db.query("SELECT Snake_ID FROM 蛇的種類 ORDER BY Snake_ID", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let snakeID = 1;
    for (const result of results) {
      if (result.Snake_ID != snakeID) break;
      snakeID++;
    }

    db.query(
      "INSERT INTO 蛇的種類 (Snake_ID, 種類, 毒性, 出沒時間, 顏色, 斑紋, 頭部形狀, 藥品名稱, 圖片URL, 圖片URL2) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [snakeID, name, poison, time, color, pattern, headShape, antivenomId, url, url2],
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

// Hospital endpoints
app.post("/createHospital", (req, res) => {
  const { code, name, address, phone } = req.body;
  db.query(
    "INSERT INTO hospital (醫事機構代碼, 醫院名稱, 醫院地址, 醫院電話) VALUES (?,?,?,?)",
    [code, name, address, phone],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send("Hospital with the same code or name already exists.");
        }
        console.log(err);
        return res.status(500).send("Failed to add hospital.");
      }
      res.send("Values Inserted");
    }
  );
});


app.get("/hospitals", (req, res) => {
  db.query("SELECT * FROM hospital", (err, result) => {
    if (err) {
      console.error("Error fetching hospitals:", err);
      res.status(500).send("Failed to fetch hospitals");
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

app.delete("/deleteHospital/:code/:name", (req, res) => {
  const { code, name } = req.params;
  db.query(
    "DELETE FROM hospital WHERE 醫事機構代碼 = ? AND 醫院名稱 = ?",
    [code, name],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting hospital.");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Hospital not found.");
      } else {
        res.send("Hospital deleted successfully.");
      }
    }
  );
});


//--------------
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
  db.query("SELECT * FROM 蛇的種類 RIGHT JOIN 蛇的顏色 ON 蛇的種類.顏色 = 蛇的顏色.蛇的顏色", (err, result) => {
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

//------------
app.post("/createColor", (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO `蛇的顏色` (蛇的顏色) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        // 如果出现主键重复错误，则返回适当的状态码和错误信息
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send("Color with the same name already exists.");
        }
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.send("Color Added");
      }
    }
  );
});


app.get("/colors", (req, res) => {
  db.query("SELECT * FROM `蛇的顏色`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateColor", (req, res) => {
  const { name, value } = req.body;
  db.query(
    "UPDATE `蛇的顏色` SET 蛇的顏色 = ? WHERE 蛇的顏色 = ?",
    [value, name],
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

app.delete("/deleteColor/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM `蛇的顏色` WHERE 蛇的顏色 = ?", [name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

//------------
app.post("/createPattern", (req, res) => {
  const { name, URL } = req.body;
  db.query(
    "INSERT INTO `蛇的斑紋` (蛇的斑紋, patternImageURL) VALUES (?,?)",
    [name, URL],
    (err, result) => {
      if (err) {
        // 如果出现主键重复错误，则返回适当的状态码和错误信息
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send("Pattern with the same name already exists.");
        }
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.send("Pattern Added");
      }
    }
  );
});


app.get("/patterns", (req, res) => {
  db.query("SELECT * FROM `蛇的斑紋`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatePattern", (req, res) => {
  const { name, value } = req.body;
  db.query(
    "UPDATE `蛇的斑紋` SET 蛇的斑紋 = ? WHERE 蛇的斑紋 = ?",
    [value, name],
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

app.delete("/deletePattern/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM `蛇的斑紋` WHERE 蛇的斑紋 = ?", [name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

//----------------------------------
app.post('/createHeadShape', (req, res) => {
  const { headShapeName } = req.body;
  db.query(
    'INSERT INTO 蛇的頭部形狀 (頭部形狀) VALUES (?)',
    [headShapeName],
    (err, result) => {
      if (err) {
        // 如果出现主键重复错误，则返回适当的状态码和错误信息
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send("Head shape with the same name already exists.");
        }
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});


app.get('/headShapes', (req, res) => {
  db.query('SELECT * FROM 蛇的頭部形狀', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateHeadShape', (req, res) => {
  const { headShape, value } = req.body;
  db.query(
    'UPDATE 蛇的頭部形狀 SET 頭部形狀 = ? WHERE 頭部形狀 = ?',
    [value, headShape],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/deleteHeadShape/:headShape', (req, res) => {
  const { headShape } = req.params;
  db.query(
    'DELETE FROM 蛇的頭部形狀 WHERE 頭部形狀 = ?',
    [headShape],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//----------------------------------------
app.post("/createLocation", (req, res) => {
  const { hname, aname, hnumber } = req.body;
  db.query(
    "INSERT INTO 存放位置 (醫院名稱, 藥品名稱, 醫事機構代碼) VALUES (?,?,?)",
    [hname, aname, hnumber],
    (err, result) => {
      if (err) {
        // 检查主键冲突错误
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send("A record with the same hospital name, antivenom name, and hospital number already exists.");
        }
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.get("/Location", (req, res) => {
  db.query("SELECT * FROM 存放位置", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateLocation", (req, res) => {
  const { hospital, medicine, medicalCode, field, value } = req.body;

  // 构建更新语句
  let updateQuery = "UPDATE 存放位置 SET ";
  let queryParams = [];

  // 添加要更新的字段和值到更新语句中
  if (field === '醫院名稱' || field === '藥品名稱' || field === '醫事機構代碼') {
    updateQuery += `${field} = ? WHERE `;
    queryParams.push(value);
  } else {
    res.status(400).send("无效的字段名");
    return;
  }

  // 添加 WHERE 条件
  if (hospital && medicine && medicalCode) {
    updateQuery += "醫院名稱 = ? AND 藥品名稱 = ? AND 醫事機構代碼 = ?";
    queryParams.push(hospital, medicine, medicalCode);
  } else {
    res.status(400).send("缺少必要的参数");
    return;
  }

  // 执行更新查询
  db.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("更新记录时出错。");
    } else {
      res.send(result);
    }
  });
});


app.delete("/deleteLocation/:hospital/:medicine/:medicalCode", (req, res) => {
  const hospital = req.params.hospital;
  const medicine = req.params.medicine;
  const medicalCode = req.params.medicalCode;
  db.query("DELETE FROM 存放位置 WHERE 醫院名稱 = ? AND 藥品名稱 = ? AND 醫事機構代碼 = ?", [hospital, medicine, medicalCode], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//-----------------------------
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

app.get("/snakeSerum", (req, res) => {
  db.query("SELECT * FROM `蛇的血清`", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/hospital", (req, res) => {
  db.query("SELECT road, site, city, hospital.醫事機構代碼, hospital.醫院名稱, 醫院電話, 醫院地址, 藥品名稱 FROM hospital NATURAL JOIN road NATURAL JOIN site NATURAL JOIN city left join 存放位置 on hospital.醫事機構代碼 = 存放位置.醫事機構代碼 and hospital.醫院名稱 = 存放位置.醫院名稱;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
