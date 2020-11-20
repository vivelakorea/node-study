const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { encryptPassword } = require("./utils");
const { body, validationResult } = require("express-validator");

const { User } = require("./models/User");
const { Task } = require("./models/Task");

mongoose.connect(
  "mongodb+srv://ghostman:ghostman@cluster0.eysd2.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!22");
});

// 회원가입 명령이 오면 User를 만들어주기
/*
    name: string 4~8글자
    email: string 100자 이내의 sdfaf@naver.com
    password: string 30자 이내의 영어 대문자포함 ~
*/
app.post(
  "/signup",
  [
    body("name").isLength({ min: 3, max: 20 }),
    body("email").isEmail(),
    body("password").isLength({ min: 10, max: 20 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ errors: { email: "Already registered" } });
    }

    const encryptedPassword = encryptPassword(password);
    const user = new User({ email, name, password: encryptedPassword });
    await user.save();

    return res.sendStatus(200);
  }
);
// 4xx => client error

// 로그인 명령이 들어오면, valid한지 체크를 한 후에, key를 발급해준다.
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: encryptPassword(password)
  });

  if (!user) return res.sendStatus(400);

  const key = crypto.randomBytes(24).toString("hex");
  user.key = key;
  await user.save();
  res.send({ key });
});

// 내 할일
app.get("/tasks", async (req, res) => {
  const { authorization } = req.headers;
  const [bearer, key] = authorization.split(" ");
  if (bearer !== "Bearer") return res.sendStatus(401);
  const user = await User.findOne({ key });
  if (!user) return res.sendStatus(401);

  const tasks = await Task.find({ user });
  res.send(tasks);
});

// 내 할일 중 하나
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.sendStatus(404);
  }

  res.send(task);
});

// 내 할 일로 추가
app.post("/tasks", async (req, res) => {
  const { authorization } = req.headers;
  const [bearer, key] = authorization.split(" ");
  if (bearer !== "Bearer") return res.sendStatus(401);
  const user = await User.findOne({ key });
  if (!user) return res.sendStatus(401);

  const { title, description, dueDate } = req.body;
  const task = new Task({ title, description, dueDate, user: user });
  await task.save();

  res.send({
    _id: task._id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate
  });
});

// 내 할일인지 확인하고 수정
app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  if (!task) {
    return res.sendStatus(404);
  }

  const { title, description, dueDate } = req.body;
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;

  await task.save();

  res.send(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  if (!task) {
    return res.sendStatus(404);
  }
  await task.delete();

  res.sendStatus(200);
});

app.listen(3000);

/*

email, password => key 

key를 request보낼 때 같이 보내서 본인임을 인증.

*/
