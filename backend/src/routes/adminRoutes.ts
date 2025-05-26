import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated';
import { getAllUsers } from '../controllers/adminController';


const adminRoutes: Router = Router();

adminRoutes.get('/dashboard', isAuthenticated, isAdmin, getAllUsers);

export default adminRoutes;