const express = require('express');
const { deleteUser, updateUser, getUser, getAlluser } = require('../controllers/user');

const router = express.Router();

router.delete('/user/:id',deleteUser);
router.put('/user/:id',updateUser);
router.get('/user/:id',getUser);
router.get('/user',getAlluser);

module.exports = router