const { Router } = require("express");
const router = Router();
const { unlink } = require("fs-extra");
const path = require("path");
const Image = require("../models/ImageSchema.js");

router.get("/", async (req, res) => {
  const images = await Image.find();
  images.sort((a, b) => b.created_at - a.created_at);
  res.render("index", { images });
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  image.orinalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;
  image.created_at = Date.now();

  await image.save();

  res.redirect("/");
});

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;

  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public" + image.path));

  res.redirect("/");
});

router.post("/image/:id/update", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    created_at,
    filename,
    path,
    mimetype,
    orinalname,
    size,
  } = req.body;
  const newImg = await Image.replaceOne(
    { _id: id },
    {
      id,
      title,
      description,
      created_at,
      filename,
      path,
      mimetype,
      orinalname,
      size,
    }
  );
  console.log(newImg);
  res.redirect("/");
});

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const imagen = await Image.findById(id);
  res.render("image", { imagen });
});

module.exports = router;
