import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react'
import { XCircleFill, Camera } from 'react-bootstrap-icons'
import ResultCard from '../components/resultCard'

export default function Toto() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    //const delay = t => new Promise(resolve => setTimeout(resolve, t))

    const handleImage = (file) => {
        // Set loading
        setLoading(true);
        setResult(false);
        console.log("set to true")

        var fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            let srcData = (fileLoadedEvent.target.result as string).split(',')[1];
            //console.log(srcData)
            
            axios
                .post('/api/vision', {
                    requests: [
                        {
                            image: {
                                source: {
                                    imageUri: srcData
                                }
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
                    console.log(res.data)

                    // Unset loading
                    setLoading(false);
                    setResult(true);
                    console.log("set to false");
                })
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
                        {!loading && result &&
                            <>
                                <blockquote className="blockquote text-center mt-2">Results:</blockquote>
                                <ResultCard drawDate="TRUE" />
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}