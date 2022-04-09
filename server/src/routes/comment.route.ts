'use strict';

import express from 'express';
const commentRouter = express.Router();
import commentController from '../controllers/comment.controller';

/* GET programming languages. */
commentRouter.get('/', commentController.list);

commentRouter.get('/:id', commentController.show);

/* POST programming language */
commentRouter.post('/', commentController.store);

/* PUT programming language */
commentRouter.put('/:id', commentController.update);

// /* DELETE programming language */
// router.delete('/:id', commentController.remove);

export default { commentRouter };
