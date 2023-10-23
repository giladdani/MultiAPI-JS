import { Router } from 'express';
// import movies from './movies.js';
import games from './games.js';

let router = Router();
// router.use('/movies', movies);
router.use('/games', games);

export default router;