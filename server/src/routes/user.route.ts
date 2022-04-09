import express from 'express';
const userRouter = express.Router();
import userController from '../controllers/user.controller';

/* GET programming languages. */
userRouter.get('/', userController.list);

userRouter.get('/:id', userController.show);

/* POST programming language */
userRouter.post('/', userController.store);

/* PUT programming language */
userRouter.put('/:id', userController.update);

// /* DELETE programming language */
// router.delete('/:id', userController.remove);

export default userRouter;
