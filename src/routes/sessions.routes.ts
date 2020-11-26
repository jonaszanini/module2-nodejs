import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter: Router = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticatedUser = new AuthenticateUserService();

        const { user, token } = await authenticatedUser.execute({
            email,
            password,
        });

        delete user.password;

        return res.json({ user, token });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

export default sessionsRouter;
