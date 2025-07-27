const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path')

const app = express();
app.use(cors);
app.use(express.json);

const termsData = JSON.parse(
    fs.readFileSync(path.join(__dirname,'data','terms.json'), 'utf-8')
);

app.get('/api/terms',(req,res) =>{
res.json(termsData.terms)
});

app.get('/api/terms/category/:category', (req,res) => {
    const { category } = req.params;
    const filteredTerms = termsData.terms.filter(
        term => term.category.toLowerCase() === category.toLowerCase()
    );
    res.json(filteredTerms);
});