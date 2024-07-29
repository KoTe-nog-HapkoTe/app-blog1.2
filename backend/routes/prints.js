const router = require("express").Router()
const Print = require("../model/Print")


router.post("/", async (req, res) => {
  // Генерация рандомного цифрового title
  const randomTitle = Math.floor(Math.random() * 1000000) + Date.now();

  const newPrint = new Print({
    ...req.body,
    title: randomTitle,
    
  });

  try {
    const savePrint = await newPrint.save();
    res.status(200).json(savePrint);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const print = await Print.findById(req.params.id)
    res.status(200).json(print)
  } catch (error) {
    res.status(404).json(error)
  }
})


//get all
router.get("/", async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let print
    if (username) {
      print = await Print.find({ username: username })
    } else if (catName) {
      print = await Print.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      print = await Print.find()
    }
    res.status(200).json(print)
  } catch (error) {
    res.status(404).json(error)
  }
})

module.exports = router
