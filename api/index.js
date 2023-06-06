const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const { error, log } = require('console');
require('dotenv').config();
const uploadMiddleware = multer({ dest: 'uploads/' });

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({ credentials: true, origin: 'https://dailyblogger1.netlify.app' }));
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // dev

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://khubithakkar.netlify.app/');
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.DATABASE_INFO);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
  } catch (err) {
    console.error('[ERROR] ', err.message);
    res.status(400).json({ e: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('----------username: ', username);
    console.log('----------password: ', password);
    const userDoc = await User.findOne({ username });
    console.log('----------userDoc: ', userDoc);
    // Load hash from your password DB.
    if (userDoc == null || userDoc == undefined) {
      throw new Error('UserName not found');
    } else {
      bcrypt
        .compare(password, userDoc.password)
        .then(function (result) {
          if (result == true) {
            // if the password entered is correct and the hashes match
            console.log('Login Successful');
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
              if (err) {
                throw new Error(err.message);
              } else {
                console.log('----------token: ', token);
                res
                  .cookie('token', token, {
                    sameSite: 'none',
                    secure: true
                  })
                  .json({
                    id: userDoc._id,
                    username
                  });
              }
            });
          } else {
            // if the password entered is incorrect and the hashes don't match
            throw new Error('Incorrect Password');
          }
        })
        .catch((err) => {
          console.error('[ERROR] ', err.message);
          res.status(400).json({ e: err.message });
        });
    }
  } catch (err) {
    // to catch any other type of error
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.get('/profile', (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        console.error('[ERROR] ', err);
        res.status(400).json({ e: err.message });
      } else {
        res.json(info);
      }
    });
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.post('/logout', (req, res) => {
  try {
    res
      .cookie('token', '', {
        sameSite: 'none',
        secure: true
      })
      .json('ok');
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.post('/post', uploadMiddleware.single('files'), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    console.log('--------req.cookies: ', req.cookies);
    console.log('--------token: ', token);
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error('[ERROR] ', err);
        res.status(400).status({ e: err.message });
      } else {
        console.log('------------info: ', info);
        console.log('------------req.body: ', req.body);
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
          title,
          summary,
          content,
          cover: newPath,
          author: info.id
        });
        res.json(postDoc);
      }
    });
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.put('/post', uploadMiddleware.single('files'), async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error('[ERROR] ', err);
        res.status(400).json({ e: err.message });
      } else {
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
          return res.status(400).json('Not the author');
        }
        postDoc.set({
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover
        });
        await postDoc.save();
        res.json(postDoc);
      }
    });
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.get('/post', async (req, res) => {
  try {
    res.json(await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20));
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});

app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  } catch (err) {
    console.error('[ERROR] ', err);
    res.status(400).json({ e: err.message });
  }
});
