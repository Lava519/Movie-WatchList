const express = require('express');
const cors = require('cors');
const {startBrowser, scrape} = require('./controller');

const app = express();
const browserInstance = startBrowser();
app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  scrape(browserInstance, req.body.data).then(data =>{console.log("data fetced");res.send({data:data})});
})

app.listen(3000);

