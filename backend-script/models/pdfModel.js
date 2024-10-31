import mongoose from 'mongoose'


 const pdfSchema = new mongoose.Schema({
    headings: [String],
    bulletPoints: [String],
    paragraphs: [String],
    tables: [
        {
            headers: [String],
            rows: [[String]],
        },
    ],

 })
 export default mongoose.model('Pdf',pdfSchema)