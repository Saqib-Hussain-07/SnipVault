const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAll, create, getOne, update, remove, getPublic
} = require('../controllers/snippetController');

router.get('/share/:shareId', getPublic);

router.use(auth);
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
