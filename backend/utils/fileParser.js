const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

/**
 * Extract text from a PDF file
 * @param {Buffer} pdfBuffer - Buffer of PDF file
 * @returns {Promise<string>} - Extracted text
 */
const extractFromPdf = async (pdfBuffer) => {
  try {
    const pdfData = await pdfParse(pdfBuffer);
    return pdfData.text;
  } catch (error) {
    throw new Error(`Error extracting text from PDF: ${error.message}`);
  }
};

/**
 * Extract text from a DOCX file
 * @param {Buffer} docxBuffer - Buffer of DOCX file
 * @returns {Promise<string>} - Extracted text
 */
const extractFromDocx = async (docxBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: docxBuffer });
    return result.value;
  } catch (error) {
    throw new Error(`Error extracting text from DOCX: ${error.message}`);
  }
};

/**
 * Extract text from a TXT file
 * @param {Buffer} txtBuffer - Buffer of TXT file
 * @returns {string} - Extracted text
 */
const extractFromTxt = (txtBuffer) => {
  try {
    return txtBuffer.toString('utf8');
  } catch (error) {
    throw new Error(`Error extracting text from TXT: ${error.message}`);
  }
};

/**
 * Extract text from a file based on its type
 * @param {Buffer} fileBuffer - Buffer of the file
 * @param {string} fileType - Type of the file (pdf, docx, txt)
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromFile = async (fileBuffer, fileType) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return extractFromPdf(fileBuffer);
    case 'docx':
      return extractFromDocx(fileBuffer);
    case 'txt':
      return extractFromTxt(fileBuffer);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};

module.exports = {
  extractTextFromFile,
  extractFromPdf,
  extractFromDocx,
  extractFromTxt
};