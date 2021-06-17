const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs').promises;

/* Asynchronní funkce pro načtení JSON souboru */
async function readJSON(path) {
    const data = await fs.readFile(path)
    .catch(err => console.error('Chyba načtení souboru: ', err));
    return JSON.parse(data.toString());
}

/* Test
readJSON('data/events.json')
    .then(data => console.log(data))
    .catch(err => console.error('Nemám data', err));
*/

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));