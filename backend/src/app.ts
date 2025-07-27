import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3030;
const SECRET_KEY = "samplepav";

app.use(cors());
app.use(express.json());

const user = {
  username: "pavangujjari",
  password: bcrypt.hashSync("pavanGujj123", 8),
};

//Login Endpoint
app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    username !== user.username ||
    !bcrypt.compareSync(password, user.password)
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ Token: token });
});
