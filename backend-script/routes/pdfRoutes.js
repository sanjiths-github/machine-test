import express from 'express';
import multer from 'multer';
import { uploadAndParsePdf } from '../controllers/pdfuploadController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('pdf'), uploadAndParsePdf );

export default router;
