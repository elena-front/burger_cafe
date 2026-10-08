import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import type { AuthService } from '../services/auth-service';

const email = z.string().trim().toLowerCase().email();
const password = z.string().min(8).max(128);
const name = z.string().trim().min(1).max(80);
const tokenBody = z.object({ token: z.string().trim().min(1) }).strict();

export const createAuthRouter = (authService: AuthService): Router => {
	const router = Router();

	router.post('/register', async (req, res) => {
		const body = z.object({ name, email, password }).strict().parse(req.body);
		res
			.status(201)
			.json({
				success: true,
				...(await authService.register(body.name, body.email, body.password)),
			});
	});

	router.post('/login', async (req, res) => {
		const body = z
			.object({ email, password: z.string().min(1) })
			.strict()
			.parse(req.body);
		res.json({
			success: true,
			...(await authService.login(body.email, body.password)),
		});
	});

	router.post('/token', (req, res) => {
		const { token } = tokenBody.parse(req.body);
		res.json({ success: true, ...authService.refresh(token) });
	});

	router.post('/logout', (req, res) => {
		const { token } = tokenBody.parse(req.body);
		authService.logout(token);
		res.json({ success: true, message: 'Successful logout' });
	});

	router.get('/user', requireAuth(authService), (req, res) => {
		res.json({ success: true, user: authService.toPublicUser(req.user!) });
	});

	router.patch('/user', requireAuth(authService), async (req, res) => {
		const body = z
			.object({
				name: name.optional(),
				email: email.optional(),
				password: password.optional(),
			})
			.strict()
			.refine(
				(value) => Object.keys(value).length > 0,
				'At least one field is required'
			)
			.parse(req.body);
		res.json({
			success: true,
			user: await authService.updateUser(req.user!, body),
		});
	});

	return router;
};
