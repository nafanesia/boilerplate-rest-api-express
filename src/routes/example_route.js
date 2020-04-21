import express from 'express';
import exampleController from '../controllers/example_controller';

const router = express.Router();

router.get('/example', exampleController.get);
router.post('/example', exampleController.insert);
router.put('/example', exampleController.update);
router.delete('/example', exampleController.destroy);

export default router;
