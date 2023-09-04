import express from 'express';
import signupRoutes from './routes/local-auth/signup.js'
import loginRoutes from './routes/local-auth/login.js'
import {config} from 'dotenv';
config();

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
    res.send("Signup page")
});

// routes
app.use('/auth/', signupRoutes);
app.use('/auth/', loginRoutes);

export default app;