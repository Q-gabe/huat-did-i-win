import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react'
import { XCircleFill, Camera } from 'react-bootstrap-icons'
import ResultCard from '../components/resultCard'

export default function Toto() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)
    const [winnings, setWinnings] = useState(0)

    //const delay = t => new Promise(resolve => setTimeout(resolve, t))

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
                let canvas = document.getElementById('preview'),
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
                let dataUrl = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];

                 // let srcData = (fileLoadedEvent.target.result as string).split(',')[1];
                // console.log(srcData)
                console.log(dataUrl)
                
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
                        // Draw Number
                        let drawNum : string = visionRes.match(/[0-9]{4}[/][0-9]{2}/g) + '';
                        let drawNum1 = ''
                        if (drawNum) {
                            drawNum1 = drawNum.split("/")[0]
                            console.log("drawNum = "+ drawNum1)
                        }

                        // Stub data ( Only applicable for ordinary tickets )
                        let totalNumberOfParts = "1"
                        let partsPurchased = "1"
                        let isHalfBet = "false"

                        // Numbers
                        let numbers = visionRes.match(/[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}/g);
                        let totalBets = numbers.length
                        
                        let procNumbers = []
                        for (let i = 0; i < totalBets; i++) {
                            let temp = numbers[i] + ''
                            procNumbers.push(temp.replace(/\s/g,','))
                        }
                        console.log(procNumbers)

                        // Calculate totalWinnings from Toto website
                        let totalWinnings = 0
                        for (let i = 0; i < totalBets; i++) {
                            axios
                                .post('https://cors-anywhere.herokuapp.com/https://www.singaporepools.com.sg/_layouts/15/TotoApplication/TotoCommonPage.aspx/CalculatePrizeForTOTO', {
                                        "numbers": procNumbers[i],
                                        "drawNumber": drawNum1,
                                        "isHalfBet": isHalfBet,
                                        "totalNumberOfParts": totalNumberOfParts,
                                        "partsPurchased": partsPurchased
                                    }
                                )
                                .then((res) => {
                                    console.log(res.data)
                                    let parsed = JSON.parse(res.data.d)
                                    if (parsed.Prizes) {
                                        for (let j = 0; j < parsed.Prizes; j++) {
                                            totalWinnings += parsed.Prizes[j].Total;
                                        }
                                    }
                                })
                        }
                        
                        // Unset loading
                        setLoading(false);
                        setResult(true);
                        setWinnings(totalWinnings)
                        console.log("set to false");
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
                            <label className="btn btn-lg btn-primary">
                                <input type="file" accept="image/*" capture="camera" onChange={(e) => handleImage(e.target.files[0])} name="ticketImage" hidden/>
                                <Camera size={24} color="white"/> Camera
                            </label>
                        }
                        {loading &&
                            <button type="button" className="btn btn-lg btn-primary" disabled>
                                 <span className="spinner-border spinner-border-sm align-middle" role="status"></span>
                                 {' '}Loading
                            </button>
                        }
                        <canvas id="preview" className="preview m-auto"></canvas>
                        {!loading && result &&
                            <>
                                <blockquote className="blockquote text-center mt-2">Results:</blockquote>
                                <ResultCard winnings={winnings} />
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}