import Link from 'next/link'
import { useState } from 'react'
import { XCircleFill, Camera } from 'react-bootstrap-icons'

export default function SingSweep() {
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
                    <div className="drawButtons text-center mb-2">
                        <Link href="/singSweep"><a className="btn btn-lg btn-primary drawButton active">Singapore Sweep</a></Link>
                        <Link href="/"><a className="drawButton"><XCircleFill size={32} /></a></Link>
                    </div>
                    <blockquote className="blockquote text-center">Currently only Toto ordinary tickets are supported!</blockquote>
                </div>
            </main>
        </>
    )
}