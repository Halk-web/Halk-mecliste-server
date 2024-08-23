import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { initializePassport } from './comman/strategy/jwt-strategy';
import { initializeLocalPassport } from './comman/strategy/local-strategy';
import authRouter from './routes/auth.router';
import { AuthService } from './services/auth.service';
import { authenticateToken } from './comman/middlewares/auth.middleware';
import cors from 'cors';
import dotenv from 'dotenv';
import {AppDataSource} from "./database/postgresql/database";
import postRouter from './routes/post.router';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;  // Port'u ortam değişkenlerinden al

// Initialize AuthService
const authService = new AuthService();

// Initialize Passport
initializePassport(authService);
initializeLocalPassport(authService);

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/post",postRouter);

app.get('/', authenticateToken, (req, res) => {
  res.send('Hello NOD Readers!');
});

// Veritabanı bağlantısını başlat ve server'ı çalıştır
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Express server is listening at http://localhost:${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
