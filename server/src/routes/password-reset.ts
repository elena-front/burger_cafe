import { Router } from 'express';
import { z } from 'zod';
import type { AuthService } from '../services/auth-service';

export const createPasswordResetRouter = (authService: AuthService): Router => {
	const router = Router();
	router.post('/', (req, res) => {
		const { email } = z
			.object({ email: z.string().trim().toLowerCase().email() })
			.strict()
			.parse(req.body);
		authService.requestPasswordReset(email);
		res.json({ success: true, message: 'Reset email sent' });
	});
	router.post('/reset', async (req, res) => {
		const { password, token } = z
			.object({
				password: z.string().min(8).max(128),
				token: z.string().min(1),
			})
			.strict()
			.parse(req.body);
		await authService.resetPassword(password, token);
		res.json({ success: true, message: 'Password successfully reset' });
	});
	return router;
};
