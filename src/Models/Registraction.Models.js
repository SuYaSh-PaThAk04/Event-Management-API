import { DataTypes } from 'sequelize';
import sequelize from '../DB/db.js';
import User from '../Models/Users.Model.js';
import Event from '../Models/Event.Model.js';

const Registration = sequelize.define('Registration', {}, { timestamps: false });

User.belongsToMany(Event, { through: Registration });
Event.belongsToMany(User, { through: Registration });


console.log('Event associations:', Event.associations);
console.log('User associations:', User.associations);
export default Registration;
