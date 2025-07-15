import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/DB/db.js';
import eventRoutes from './src/Routes/event.Routes.js';
import userRoutes from "./src/Routes/user.Routes.js"
import './src/Models/Event.Model.js';
import './src/Models/Registraction.Models.js';
import './src/Models/Users.Model.js';
dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error(' DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
