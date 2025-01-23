import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const app = express();
const PORT = 3002;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());

app.use(express.json());

// Helper function to read the database
const readDatabase = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// GET stats endpoint
app.get('/stats', (req, res) => {
  const db = readDatabase();
  const users = db.users;

  const usersByCity = users.reduce((acc, user) => {
    acc[user.city] = (acc[user.city] || 0) + 1;
    return acc;
  }, {});

  const usersByAgeCategory = users.reduce((acc, user) => {
    if (user.age < 20) acc['below 20']++;
    else if (user.age <= 40) acc['20-40']++;
    else acc['above 40']++;
    return acc;
  }, { 'below 20': 0, '20-40': 0, 'above 40': 0 });

  const totalUsers = users.length;
  const totalCities = Object.keys(usersByCity).length;
  const highestAge = Math.max(...users.map((user) => user.age));
  const lowestAge = Math.min(...users.map((user) => user.age));

  res.json({
    usersByCity,
    usersByAgeCategory,
    totalUsers,
    totalCities,
    highestAge,
    lowestAge,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});