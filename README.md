This is the backend component of a web application that allows users to upload PDF files, 
parses the content, and converts it into JSON format. The backend is built with Node.js and Express,
uses MongoDB for data storage, and follows an MVC (Model-View-Controller) architecture to
keep code modular and maintainable.


Features
---------

* PDF Parsing: Parses content from uploaded PDF files, handling elements like headings, paragraphs,
and bullet points.
* JSON Conversion: Converts parsed content into JSON format.
* MongoDB Storage: Saves JSON data and file metadata to MongoDB.
* Modular Architecture: Implements an MVC structure for easy code organization and scaling.

Files
-----

1. controllers/pdfuploadController.js
The pdfController.js file contains the main logic for handling file uploads,
parsing the PDF content, and returning JSON data. The pdf-parse library is used to
convert PDF data into a JSON structure.

2. models/pdfModel.js
Defines a Mongoose schema for storing uploaded PDF files' metadata and parsed
JSON data in MongoDB.

3. routes/pdfRoutes.js
Contains the route definitions for handling PDF upload requests.
