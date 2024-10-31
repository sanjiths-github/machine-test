import pdfParse from 'pdf-parse';
import PdfModel from '../models/pdfModel.js';



export const uploadAndParsePdf = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    const dataBuffer = req.file.buffer;

    const data = await pdfParse(dataBuffer);

    const jsonData = processPdfContent(data.text);

    const pdfDocument = new PdfModel(jsonData);
    await pdfDocument.save();

    res.status(200).json({
      message: 'PDF file parsed and saved to database successfully',
      data: jsonData,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to process PDF', error: err.message });
  }
};

function processPdfContent(text) {
  const lines = text.split('\n');
  const jsonData = {
    headings: [],
    paragraphs: [],
    bulletPoints: [],
    tables: []
  };

  let currentParagraph = '';
  let currentTable = [];

  lines.forEach((line) => {
    line = line.trim();

    if (isHeading(line)) {
      if (currentParagraph) {
        jsonData.paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
      if (currentTable.length > 0) {
        jsonData.tables.push(currentTable);
        currentTable = [];
      }
      jsonData.headings.push(line);
    } else if (isBulletPoint(line)) {
      if (currentParagraph) {
        jsonData.paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
      jsonData.bulletPoints.push(line);
    } else if (isTableRow(line)) {
      const row = line.split(/\s{2,}|\|/).map(cell => cell.trim());
      currentTable.push(row);
    } else if (line) {
      currentParagraph += line + ' ';
    }
  });

  if (currentParagraph) jsonData.paragraphs.push(currentParagraph.trim());
  if (currentTable.length > 0) jsonData.tables.push(currentTable);

  return jsonData;
}

function isHeading(line) {
  return /^[A-Z\s]+$/.test(line) && line.length > 3;
}

function isBulletPoint(line) {
  return line.startsWith('•') || line.startsWith('-') || /^\d+\./.test(line);
}

function isTableRow(line) {
  return line.includes(' | ') || line.match(/\s{2,}/);
}
