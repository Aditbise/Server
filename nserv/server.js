const { readFileSync, writeFileSync } = require('fs');
const path = require('path');  // Import the path module
const express = require('express');
const app = express();

// Serve static files from the 'memepage-main' directory
app.use(express.static(path.join(__dirname, 'memepage-main')));

app.get('/', (req, res) => {
    const countFilePath = path.join(__dirname, 'memepage-main', 'count.txt');
    const count = readFileSync(countFilePath, 'utf-8');  // Ensure the encoding is specified
    console.log('count', count);

    const newCount = parseInt(count) + 1;
    writeFileSync(countFilePath, newCount);

    let html = readFileSync(path.join(__dirname, 'memepage-main', 'index.html'), 'utf-8');
    html = html.replace('${count}', newCount);
    res.send(html);
    
});

app.listen(5000, () => console.log('http://localhost:5000'));
