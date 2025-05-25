import { Request } from "express";
import multer, { StorageEngine } from "multer";
const storage: StorageEngine = multer.diskStorage({
  destination: function (_: Request, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_: Request, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
