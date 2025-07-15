import Event from '../Models/Event.Model.js';
import User from '../Models/Users.Model.js';
import { createEventSchema, registerSchema } from "../Validators/validationSchema.js"
import sequelize from '../DB/db.js';


export const createEvent = async (req, res) => {
  try {
    const { error } = createEventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, datetime, location, capacity } = req.body;
    const event = await Event.create({ title, datetime, location, capacity });

    return res.status(201).json({ message: 'Event created successfully', eventId: event.id });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getEventDetails = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: { association: 'Users', attributes: ['id', 'name', 'email'] }
        });
   
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { userId } = req.body;
    const event = await Event.findByPk(req.params.id, { include: { association: 'Users' }, transaction: t });
    if (!event) {
      await t.rollback();
      return res.status(404).json({ error: 'Event not found' });
    }

    if (new Date(event.datetime) < new Date()) {
      await t.rollback();
      return res.status(400).json({ error: 'Cannot register for past events' });
    }

    if (event.Users.length >= event.capacity) {
      await t.rollback();
      return res.status(400).json({ error: 'Event is full. Capacity reached.' });
    }

    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ error: 'User not found' });
    }

    const alreadyRegistered = await event.hasUser(user, { transaction: t });
    if (alreadyRegistered) {
      await t.rollback();
      return res.status(400).json({ error: 'User already registered for this event' });
    }

    await event.addUser(user, { transaction: t });
    await t.commit();
    return res.json({ message: 'User registered successfully' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const cancelRegistration = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { userId } = req.body;
    const event = await Event.findByPk(req.params.id, { transaction: t });
    if (!event) {
      await t.rollback();
      return res.status(404).json({ error: 'Event not found' });
    }

    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ error: 'User not found' });
    }

    const isRegistered = await event.hasUser(user, { transaction: t });
    if (!isRegistered) {
      await t.rollback();
      return res.status(400).json({ error: 'User is not registered for this event' });
    }

    await event.removeUser(user, { transaction: t });
    await t.commit();
    return res.json({ message: 'Registration cancelled successfully' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    const upcoming = events.filter(event => new Date(event.datetime) > new Date());

    upcoming.sort((a, b) => {
      const dateDiff = new Date(a.datetime) - new Date(b.datetime);
      return dateDiff !== 0 ? dateDiff : a.location.localeCompare(b.location);
    });

    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const eventStats = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, { include: User });
        if (!event) return res.status(404).json({ error: 'Event not found' });

        const totalRegistrations = event.Users.length;
        const remainingCapacity = event.capacity - totalRegistrations;
        const percentageUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2) + '%';

        res.json({ totalRegistrations, remainingCapacity, percentageUsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
