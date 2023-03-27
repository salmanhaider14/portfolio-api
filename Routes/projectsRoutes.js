const express = require("express");
const router = express.Router();
const Item = require("../Models/Projects");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Create a new item
router.post("/", upload.single("image"), async (req, res) => {
  const { title, tag, link } = req.body;
  const item = new Item({
    title,
    tag,
    link,
    image: req.file.originalname,
    // {
    //   // data: req.file.buffer,
    //   // contentType: req.file.mimetype,
    // },
  });
  try {
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// Update an item
router.patch("/:id", getItem, async (req, res) => {
  const { title, tag, link } = req.body;

  if (title != null) {
    res.item.title = title;
  }
  if (tag != null) {
    res.item.tag = tag;
  }
  if (link != null) {
    res.item.link = link;
  }
  if (req.file != null) {
    res.item.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.deleteOne({ _id: res.item._id });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an item by ID
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.item = item;
  next();
}

module.exports = router;
