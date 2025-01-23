import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = 3002;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db.json");

app.use(cors());

app.use(express.json());

// Helper function to read the database
const readDatabase = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// GET stats endpoint
app.get("/stats", (req, res) => {
  const db = readDatabase();
  const users = db.users;

  const usersByCityObj = users.reduce((acc, user) => {
    acc[user.city] = (acc[user.city] || 0) + 1;
    return acc;
  }, {});
  const usersByCity = Object.entries(usersByCityObj).map(([city, count]) => ({
    name:city,
    value:count,
  }));

  const usersByAgeCategoryObj = users.reduce(
    (acc, user) => {
      if (user.age < 20) acc["< 20"]++;
      else if (user.age <= 40) acc["20-40"]++;
      else acc["> 40"]++;
      return acc;
    },
    { "< 20": 0, "20-40": 0, "> 40": 0 }
  );

  const categoryColors = {
    "< 20": "rgba(93,30,91,1)",
    "20-40": "rgba(93,30,91,0.6)", 
    "> 40": "rgba(93,30,91,0.4)" 
  };
  

  const usersByAgeCategory = Object.entries(usersByAgeCategoryObj).map(
    ([category, count]) => ({
      name:category,
      value:count,
      color:categoryColors[category]
    })
  );

  const totalUsers = users.length;
  const totalCities = Object.keys(usersByCity).length;
  const highestAge = Math.max(...users.map((user) => user.age));
  const lowestAge = Math.min(...users.map((user) => user.age));

  const metrics = [
    {name:"Total Users", value: totalUsers, color:"green"},
    {name:"Total Cities", value: totalCities,color:"red"},
    {name:"Highest Age", value: highestAge,color:"blue"},
    {name:"Lowest Age", value: lowestAge,color:"orange"},
  ]     
  ;

  res.json({
    usersByCity,
    usersByAgeCategory,
    metrics,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
