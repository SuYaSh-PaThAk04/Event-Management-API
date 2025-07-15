import { Router } from 'express';
import {
    createEvent,
    getEventDetails,
    registerUser,
    cancelRegistration,
    listUpcomingEvents,
    eventStats
} from '../Controllers/event.controllers.js';

const router = Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.post('/:id/register', registerUser);
router.delete('/:id/register', cancelRegistration);
router.get('/upcoming/list', listUpcomingEvents);
router.get('/:id/stats', eventStats);

export default router;
