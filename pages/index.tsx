import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <main>
            <div className="main-display">
                    <h1 className="display-4 text-center">
                        Huat Did I Win?
                    </h1>
                    <blockquote className="blockquote text-center">Select the draw for your ticket:</blockquote>
                    <div className="drawButtons text-center">
                        <Link href="/fourd"><a className="btn btn-lg btn-primary drawButton">4D</a></Link>
                        <Link href="/toto"><a className="btn btn-lg btn-primary drawButton">TOTO</a></Link>
                        <Link href="/singSweep"><a className="btn btn-lg btn-primary drawButton">Singapore Sweep</a></Link>
                    </div>
                </div>
            </main>
        </>
    )
}
