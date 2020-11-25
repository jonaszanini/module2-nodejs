import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter: Router = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

export default usersRouter;
