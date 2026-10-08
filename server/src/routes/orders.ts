import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import type { AuthService } from '../services/auth-service';
import type { OrderService } from '../services/order-service';

export const createOrdersRouter = (
	authService: AuthService,
	orderService: OrderService
): Router => {
	const router = Router();
	router.post('/', requireAuth(authService), (req, res) => {
		const { ingredients } = z
			.object({ ingredients: z.array(z.string().min(1)).min(3) })
			.strict()
			.parse(req.body);
		const order = orderService.create(req.user!, ingredients);
		res.status(201).json({ success: true, name: order.name, order });
	});
	router.get('/:number', (req, res) => {
		const number = z.coerce.number().int().positive().parse(req.params.number);
		res.json({ success: true, orders: [orderService.findByNumber(number)] });
	});
	return router;
};
