import type { NextFunction, Request, Response } from 'express';
import type { StoredUser } from '../domain/types';
import { HttpError } from '../errors';
import type { AuthService } from '../services/auth-service';

declare global {
	namespace Express {
		interface Request {
			user?: StoredUser;
		}
	}
}

export const requireAuth =
	(authService: AuthService) =>
	(req: Request, _res: Response, next: NextFunction): void => {
		try {
			const authorization = req.header('authorization');
			if (!authorization?.startsWith('Bearer ')) {
				throw new HttpError(401, 'You should be authorised');
			}
			req.user = authService.verifyAccessToken(
				authorization.slice('Bearer '.length)
			);
			next();
		} catch (error) {
			next(error);
		}
	};
