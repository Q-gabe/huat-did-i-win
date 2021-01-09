// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
const vision = require('@google-cloud/vision');

// Sends request to GCP Vision API
export default (req, res) => {
    const credential = JSON.parse(
        Buffer.from(process.env.GCP_CREDENTIALS, 'base64').toString()
    );
    
    // Authenticate with the GCP Vision
    const client = new vision.ImageAnnotatorClient({
        credentials: credential
    });

    // 1. Process image via GCP Vision API
    if (!req.body){
        res.statusCode = 400
        res.json({ success: "false"})
    } else {
        client
            .annotateImage(req.body.requests[0])
            .then((annotations) => {
                // 2. Send back text annotations
                res.statusCode = 200
                res.json(annotations[0].fullTextAnnotation.text)
            })
            .catch((err) => {
                console.log(err)
                res.statusCode = 400
                res.json({ success: "false"})
            })
    }
}