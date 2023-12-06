const express = require('express');
const { deleteFlashCard, updateFlashCard, getFlashCard, getAllFlashCard, createFlashCard } = require('../controllers/flashCard');
const router = express.Router();

router.post('/flashCard',createFlashCard);
router.delete('/flashCard/:id',deleteFlashCard);
router.put('/flashCard/:id',updateFlashCard);
router.get('/flashCard/:id',getFlashCard);
router.get('/flashCard',getAllFlashCard);

module.exports = router