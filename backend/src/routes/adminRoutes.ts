import { Router, Request, Response } from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/isAuthenticated';

const adminRouter: Router = Router();


