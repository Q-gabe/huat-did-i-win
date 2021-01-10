import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react'
import { XCircleFill, Camera } from 'react-bootstrap-icons'
import ResultCard from '../components/resultCard'

export default function Toto() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)
    const [winnings, setWinnings] = useState(0)
    const [errorDrawNum, setErrorDrawNum] = useState(false)
    const [errorBetNum, setErrorBetNum] = useState(false)
    const [winningBets, setWinningBets] = useState([])

    //const delay = t => new Promise(resolve => setTimeout(resolve, t))

    const clearErrors = () => {
        setErrorDrawNum(false)
        setErrorBetNum(false)
    }

    const scrollPageToBottom = () => {
        let element = document.getElementById("barcode");
        element.scrollIntoView({behavior: "smooth", block: "end"});
    }

    const handleImage = (file) => {
        // Set loading
        setLoading(true);
        setResult(false);
        console.log("set to true")

        var fileReader = new FileReader();
        
        // IMAGE COMPRESSION USING FILEREADER AND CANVAS
        fileReader.onload = (fileLoadedEvent) => {
            let img = new Image();
            img.onload = (imageLoadEvent) => {
                let canvas = document.getElementById('preview') as HTMLCanvasElement,
                    MAX_SIZE = 800,
                    width = img.width,
                    height = img.height;
                canvas.style.display = 'block';
                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                scrollPageToBottom();
                let dataUrl = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
                console.log("DEBUG: Image successfully compressed.")
                
                // Send request to GCP Vision API
                axios
                    .post('/api/vision', {
                        requests: [
                            {
                                image: {
                                    content: dataUrl
                                },
                                features: [
                                    {
                                        type: "TEXT_DETECTION",
                                        maxResults: 50
                                    }
                                ]
                            }
                        ]
                    })
                    .then((res) => {
                        let visionRes = res.data
                        console.log("Vision API Detected: " + res.data)
                        
                        // Process OCR data
                        // Draw Number - Find by extracting number with pattern 0000/00 with four digit number being the draw number S Pools uses
                        let drawNum : string = visionRes.match(/[0-9]{4}[/][0-9]{2}/g) + '';
                        let drawNum1 = ''
                        if (drawNum) {
                            drawNum1 = drawNum.split("/")[0]
                            console.log("drawNum = "+ drawNum1)
                        } else {
                            // Failed to find any draw number
                            console.log("No draw number found!")
                            setLoading(false);
                            setResult(false);
                            setErrorDrawNum(true);
                            scrollPageToBottom();
                            return;
                        }

                        // Stub data ( Only applicable for ordinary tickets )
                        let totalNumberOfParts = "1"
                        let partsPurchased = "1"
                        let isHalfBet = "false"

                        // Numbers - Extract by finding 6 double digit numbers joined with whitespace
                        let numbers = visionRes.match(/[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}/g);
                        let totalBets = 0
                        if (numbers) {
                            totalBets = numbers.length
                        } else {
                            // Failed to find any bet numbers
                            console.log("No bet number found!")
                            setLoading(false);
                            setResult(false);
                            setErrorBetNum(true);
                            scrollPageToBottom();
                            return;
                        }

                        let procNumbers = []
                        for (let i = 0; i < totalBets; i++) {
                            let temp = numbers[i] + ''
                            procNumbers.push(temp.replace(/\s/g,','))
                        }
                        console.log(procNumbers)

                        // Query Toto website per row of bet
                        let promises = []
                        for (let i = 0; i < totalBets; i++) {
                            promises.push(axios
                                .post('/api/toto', {
                                        "numbers": procNumbers[i],
                                        "drawNumber": drawNum1,
                                        "isHalfBet": isHalfBet,
                                        "totalNumberOfParts": totalNumberOfParts,
                                        "partsPurchased": partsPurchased
                                    }
                                )
                            );
                        }

                        // Calculate total winnings from all toto HTTP queries
                        let totalWinnings = 0
                        let winningBets = []
                        Promise.all(promises)
                            .then((results) => {
                                console.log("Results:")
                                console.log(results)

                                for (let i = 0; i < results.length; i++) {
                                    let drawResult = JSON.parse(results[i].data.d)
                                    if (drawResult.Prizes.length > 0) {
                                        console.log("Won Prize! " + drawResult.Prizes[0].Total)
                                        console.log("Winning bet: " + results[i].data.numbers)
                                        totalWinnings += drawResult.Prizes[0].Total
                                        winningBets.push(results[i].data.numbers)
                                    }
                                }

                                // Unset loading
                                clearErrors();
                                setLoading(false);
                                setResult(true);
                                setWinnings(totalWinnings);
                                setWinningBets(winningBets);
                                scrollPageToBottom();
                                return;
                            });  
                    })
            } 
            img.src = fileLoadedEvent.target.result as string;
        }

        // Read file
        if (file) {
            try {
                fileReader.readAsDataURL(file);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <main>
                <div className="main-display">
                    <h1 className="display-4 text-center">
                        Huat Did I Win?
                    </h1>
                    <blockquote className="blockquote text-center">Select the draw for your ticket:</blockquote>
                    <div className="drawButtons text-center">
                        <Link href="/toto"><a className="btn btn-lg btn-primary drawButton active">TOTO</a></Link>
                        <Link href="/"><a className="drawButton"><XCircleFill size={32} /></a></Link>
                    </div>
                    {/* TODO: REMOVE AFTER SYSTEM TICKET SUPPORT */}
                    <p className="text-center">Currently, only Ordinary tickets are supported.</p>
                    <blockquote className="blockquote text-center">Scan your ticket:</blockquote>
                    <div className="drawButtons text-center">
                        {!loading && 
                            <label className="btn btn-lg btn-primary mb-2">
                                <input type="file" accept="image/*" capture="camera" onChange={(e) => handleImage(e.target.files[0])} name="ticketImage" hidden/>
                                <Camera size={24} color="white"/> Camera
                            </label>
                        }
                        {loading &&
                            <button type="button" className="btn btn-lg btn-primary mb-2" disabled>
                                 <span className="spinner-border spinner-border-sm align-middle" role="status"></span>
                                 {' '}Loading
                            </button>
                        }
                        <canvas id="preview" className="preview m-auto"></canvas>
                        {errorDrawNum &&
                            <>
                                <blockquote className="blockquote text-center mt-3 warning">Failed to detect any draw number! Please try again.</blockquote>
                            </>
                        }
                        {errorBetNum &&
                            <>
                                <blockquote className="blockquote text-center mt-3 warning">Failed to detect any bet numbers! Please try again.</blockquote>
                            </>
                        }
                        {!loading && result &&
                            <>
                                <blockquote className="blockquote text-center mt-3 mb-0">Results:</blockquote>
                                <ResultCard winnings={winnings} winningBets={winningBets} />
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}