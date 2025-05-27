import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated';
import { getAllUsers, deleteUser, getUserById } from '../controllers/adminController';


const adminRoutes: Router = Router();

adminRoutes.get('/dashboard', isAuthenticated, isAdmin, getAllUsers);

adminRoutes.delete('/dashboard/delete/:id', isAuthenticated, isAdmin, deleteUser);

adminRoutes.get('/dashboard/:id', isAuthenticated, isAdmin, getUserById);

export default adminRoutes;