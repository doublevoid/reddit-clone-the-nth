'use strict'

import express from 'express';
const postRouter = express.Router();
const postController = require('../controllers/post.controller')

/* GET programming languages. */
postRouter.get('/', postController.list);

postRouter.get('/:id', postController.show);
  
/* POST programming language */
postRouter.post('/', postController.store);

/* PUT programming language */
postRouter.put('/:id', postController.update);

// /* DELETE programming language */
// router.delete('/:id', postController.remove);

module.exports = postRouter;