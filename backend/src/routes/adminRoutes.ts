import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated';
import { getAllUsers, deleteUser } from '../controllers/adminController';


const adminRoutes: Router = Router();

adminRoutes.get('/dashboard', isAuthenticated, isAdmin, getAllUsers);

adminRoutes.delete('/dashboard/delete/:id', isAuthenticated, isAdmin, deleteUser);

export default adminRoutes;