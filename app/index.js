const express = require('express');
const app = express();

// Log the full request, note that this is a security issue - the purpose of this is to trace the security details, do not use with live environments
app.get('/test', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});