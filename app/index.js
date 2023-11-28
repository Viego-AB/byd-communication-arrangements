const {parse, stringify, toJSON, fromJSON} = require('flatted');
const express = require('express');
const app = express();
const crypto = require('crypto');

const sAuthorizedHost = process.env.AUTHORIZED_HOST;


app.get('/test', function (req, res) {
    console.log(req);
    //Find the PEM-encoded cert in the raw header array
    const certIndex = 1 + req?.rawHeaders.findIndex((x) => x === 'X-Forwarded-Client-Cert');

    if (certIndex > 0){
        const sRawCert = req?.rawHeaders[certIndex];
        //Add standard certificate start and end line as required by crypto class
        const sCert = `-----BEGIN CERTIFICATE-----\n${sRawCert}\n-----END CERTIFICATE-----`; 
        const cert = new crypto.X509Certificate(sCert);

        //Check that the host is authorized
        const sVerifiedHost = cert.checkHost(sAuthorizedHost);

        if (sVerifiedHost) {
            console.log(`Verified host: ${sVerifiedHost}`);
            res.status(200).json("Authorized");
        } else{
            //Get the subject common name
            const sHost = cert.subject.split("\n").find((x) => x.includes("CN=")).split("=")[1];
            console.log(`Warning: Unauthorized host. ${sHost}`);
            res.status(401).json("Unauthorized");
        }   
    }    
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});