// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { resolveHref } from 'next/dist/next-server/lib/router/router';

// Proxies request for browser to bypass CORS to S Pools website
export default (req, res) => {
    if (req.method === "POST") {
        axios
            .post('https://www.singaporepools.com.sg/_layouts/15/TotoApplication/TotoCommonPage.aspx/CalculatePrizeForTOTO', req.body)
            .then((response) => {
                console.log(response.data)
                response.data.numbers = req.body.numbers
                res.status(200).end(JSON.stringify(response.data))
            })
            .catch((err) => {
                console.log(err)
                res.status(400).end(JSON.stringify({ success: "false" }))
        })
    } else {
        res.status(405);
        res.end()
    }
}
