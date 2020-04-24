import express from 'express';
import exampleController from '../controllers/example_controller';
import jwtController from '../controllers/jwt_controller';

const router = express.Router();

router.get('/example', jwtController, exampleController.get);
router.post('/example', jwtController, exampleController.insert);
router.put('/example', jwtController, exampleController.update);
router.delete('/example', jwtController, exampleController.destroy);

export default router;
