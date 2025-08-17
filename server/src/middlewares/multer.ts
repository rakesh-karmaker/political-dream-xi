import multer from "multer";

const LIMIT: number = 10 * 1024 * 1024; // 10MB

// Configure storage (in memory for processing with Sharp)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: LIMIT,
  },
});

export default upload;
