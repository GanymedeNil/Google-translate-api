const express = require('express')
const bodyParser = require('body-parser');
const google= require('./google');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    
    if (req.body.content.length>5000){
        res.json({"status":"500","massage":"word out 5000","result":[]})
    }
    google.core(req.body.source,req.body.target,req.body.content,
        function(content){
            var result = '';
            for (let index = 0; index < content[0].length-1; index++) {
                const element = content[0][index][0];
                result+=element
            }
            res.json({"status":"200","massage":"ok","result":{"response":result}})
        })
    
  })
  
  app.listen(8080)