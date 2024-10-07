const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
const port = 3000;

const users = [];
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email === data.email);
    if (findUser) {
      return res.status(400).send("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    console.log(users);
    res.status(201).send("Registered successfully!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email === data.email);
    if (!findUser) {
      return res.status(400).send("Wrong email or password!");
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      const token = jsonwebtoken.sign({ email: findUser.email }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: "Logged in successfully!", token });
    } else {
      res.status(400).send("Wrong email or password!");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.sendStatus(403);
  }
  jsonwebtoken.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.json({ message: 'Welcome to the protected route!', user });
  });
});

app.listen(port, () => {
  console.log(`The server started on port ${port}`);
});