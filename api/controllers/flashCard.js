const FlashCard = require("../models/flashCard");

const createFlashCard = async(req,res)=>{
    const newFlash = new FlashCard(req.body)
    try{
        const savedFlash = await newFlash.save();
        res.status(200).json(savedFlash)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteFlashCard = async (req, res) => {
  try {
    await FlashCard.findByIdAndDelete(req.params.id);
    res.status(200).json("Flash Card has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateFlashCard = async (req, res) => {
  try {
    const updateFlashCard = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateFlashCard);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFlashCard = async (req, res) => {
  try {
    const flashCard = await FlashCard.findById(req.params.id);
    if (!flashCard) {
      return res.status(404).json({ error: 'Flash Card not found' });
    }
    flashCard.click += 1;
    await flashCard.save();
    res.status(200).json(flashCard);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllFlashCard = async (req, res) => {
  try {
    const flashCard = await FlashCard.find().populate("userID")
    res.status(200).json(flashCard);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createFlashCard,
  deleteFlashCard,
  updateFlashCard,
  getFlashCard,
  getAllFlashCard,
};
