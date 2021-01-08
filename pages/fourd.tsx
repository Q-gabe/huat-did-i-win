import Link from 'next/link'
import { useState } from 'react'
import { XCircleFill, Camera } from 'react-bootstrap-icons'

export default function FourD() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    const delay = t => new Promise(resolve => setTimeout(resolve, t))

    const handleImage = (file) => {
        setLoading(true);
        setResult(false);
        console.log("set to true")

        delay(3000)
            .then(()=> {
                setLoading(false);
                setResult(true);
                console.log("set to false");
            })
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
                        <Link href="/fourd"><a className="btn btn-lg btn-primary drawButton active">4D</a></Link>
                        <Link href="/"><a className="drawButton"><XCircleFill size={32} /></a></Link>
                    </div>
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
                                
                            </>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}