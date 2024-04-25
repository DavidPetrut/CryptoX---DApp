import express from 'express';
import User from '../models/User';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const router = express.Router();


const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file:any, cb:any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/upload/:username", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err.message);
    } else {
      if (req.file == undefined) {
        return res.status(400).send("Error: No File Selected!");
      } else {
        const username = req.params.username;
        const newImagePath = `/uploads/${req.file.filename}`;

        try {
          const user = await User.findOne({ username: username });
          if (!user) {
            return res.status(404).send("User not found.");
          }

          if (user.profileImage) {
            const oldImagePath = path.join(
              __dirname,
              "../public",
              user.profileImage
            );
            fs.unlink(oldImagePath, (unlinkErr) => {
              if (unlinkErr)
                console.error("Error deleting old image:", unlinkErr);
              else console.log("Old image deleted successfully.");
            });
          }

          const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { profileImage: newImagePath } },
            { new: true }
          );

          res.send({
            message: "File uploaded and profile updated!",
            filePath: newImagePath,
            user: updatedUser,
          });
        } catch (error) {
          console.error("Database operation failed", error);
          res.status(500).send("Database operation failed.");
        }
      }
    }
  });
});

export default router;
