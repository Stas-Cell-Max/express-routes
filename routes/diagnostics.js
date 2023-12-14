const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');
const path = require('path');
const diagnosticsFilePath = path.join(__dirname, '..', 'db', 'diagnostics.json');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile(diagnosticsFilePath).then((data) => res.json(JSON.parse(data)));                              
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
// TODO: Logic for appending data to the db/diagnostics.json file
const { errors } = req.body;

  if (errors && Object.keys(errors).length > 0) {
    const newDiagnosticEntry = {
      time: Date.now(),
      error_id: uuidv4(),
      errors: errors
    };

    readAndAppend(newDiagnosticEntry, diagnosticsFilePath);
    res.json(`Diagnostic data added successfully: ${newDiagnosticEntry.error_id}`);
  } else {
    res.json('No errors to log.');
  }
  
});

module.exports = diagnostics;
