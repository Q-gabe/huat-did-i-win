// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    // 1. Process image via GCP Vision API
    req.setHeader('Content-Type', 'application/json')
    req.setHeader('Accept', '*/*')
    req.json({ name: 'John Doe' })
    req.body()

    // 2. Extract data

    // 3. Process image via GCP
}
