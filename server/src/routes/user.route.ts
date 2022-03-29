const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

/* GET programming languages. */
router.get('/', userController.list);

router.get('/:id', userController.show)
  
/* POST programming language */
router.post('/', userController.store);

/* PUT programming language */
router.put('/:id', userController.update);

// /* DELETE programming language */
// router.delete('/:id', userController.remove);

module.exports = router;