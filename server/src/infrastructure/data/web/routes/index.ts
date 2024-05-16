import express from 'express';
/* import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes'; */
import clientRoutes from './clientRoutes';

const router = express.Router();

/* router.use('/posts', postRoutes);
router.use('/comments', commentRoutes) */
router.use('/clients', clientRoutes);

export default router;