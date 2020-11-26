import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find(); // To find All

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

export default appointmentsRouter;
