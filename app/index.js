const {parse, stringify, toJSON, fromJSON} = require('flatted');
const express = require('express');
const app = express();

// Log and return the full request, note that this is a security issue - the purpose of this is to trace the security details, do not use with live environments
app.get('/test', function (req, res) {
    console.log(req);
    res.json(toJSON(req));
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});