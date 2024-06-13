/* eslint-disable import/no-extraneous-dependencies */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream');
const catchAsync = require('../helpers/catchAsync');
const ApiError = require('../helpers/ApiError');
/* eslint-disable import/no-extraneous-dependencies */

const createPdfController = catchAsync(async (req, res) => {
  // Create a document
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('output.pdf'));

  // Add another page
  doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();
  stream.on('finish', function () {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');

    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');
    res.status(200).send({ urlPdf: url });
  });
});

module.exports = {
  createPdfController,
};
