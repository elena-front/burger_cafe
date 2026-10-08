import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../errors';

export const notFound: RequestHandler = (_req, _res, next) => {
	next(new HttpError(404, 'Route not found'));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	if (error instanceof ZodError) {
		res
			.status(400)
			.json({
				success: false,
				message: error.issues[0]?.message ?? 'Invalid request',
			});
		return;
	}
	if (error instanceof SyntaxError && 'body' in error) {
		res.status(400).json({ success: false, message: 'Invalid JSON' });
		return;
	}
	if (error instanceof HttpError) {
		res.status(error.status).json({ success: false, message: error.message });
		return;
	}
	console.error('Unexpected server error', error);
	res.status(500).json({ success: false, message: 'Internal server error' });
};
