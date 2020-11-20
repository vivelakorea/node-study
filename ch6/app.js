const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs').promises;
const morgan = require('morgan');
const multer = require('multer');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');

const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// multer

// fs.readdir('uploads')
//   .catch(() => {
//     console.error('uploads 폴더가 없어 uploads 폴더를 만듭니다');
//     fs.mkdir('uploads');
//   });

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads/');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// app.get('/upload', (req, res) => {
//   res.sendFile(path.join(__dirname, '/multipart.html'));
// });

// app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
//   console.log(req.files, req.body);
//   res.redirect('/');
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
