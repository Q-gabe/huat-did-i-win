<h1 align="center">
  <a href="https://github.com/Q-gabe/huat-did-i-win"><img src="https://raw.githubusercontent.com/Q-gabe/huat-did-i-win/master/preview/Banner.png" alt="Huat Did I Win" width="100%"></a>
</h1>
<h3 align="center">Checking if you hit the big one, made easy!</h3>

<p align="center">
	<a href=""><img src="https://img.shields.io/badge/Devpost-HuatDidIWin-informational"></a>
	<a href = "https://developers.google.com/maps/documentation"><img src="https://img.shields.io/badge/Powered by-GCP-blue?logo=google-cloud"></a>
	<a href = "https://static.mlh.io/docs/mlh-code-of-conduct.pdf"><img src="https://img.shields.io/badge/Code of Conduct-MLH-important"></a>
	<a href = "https://github.com/Q-gabe/huat-did-i-win/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-informational"></a>
</p>

<h4 align="center">A Hack'n'Roll 2021 Submission by Team Silverhand (<a href="https://github.com/Q-gabe">@Q-gabe</a>). ♫</h4>


## _Huat Did I Win?_

Listening to the radio, checking the newspaper and online sources are the few avenues available for punters in Singapore to check the Singapore Pools lottery results every week. However, upon buying many tickets, it is often easy to miss a number or two in our haste. Even with proper concentration, the tedium of entering the numbers one-by-one can quickly get _loh soh_ (Singlish slang for _longwinded_).

Using GCP-provided Optical Character Recognition models, "_Huat_ Did I Win", a pun using "_Huat_" which in Hokkien means "prosper", provides gamblers and easy way to simply scan their physical tickets for a quick litmus test for a windfall!

## Demo

<h3 align="center"> Try it now at <a href="https://HuatDidI.Win">HuatDidI.Win</a>!</h4>

<a href="https://github.com/Q-gabe/huat-did-i-win"><img src="https://raw.githubusercontent.com/Q-gabe/huat-did-i-win/master/preview/Preview.png" alt="Preview" width="100%"></a>

<p align="center">
(Positive example sourced from <a href="https://mothership.sg/2019/01/9-million-toto-winnings-singapore/">this Mothership article of this lucky person</a>.)
</p>

## Disclaimer
> In no way shape or form am I encouraging gambling even in legalized forms such as those avenues provided by Singapore pools by building and publicizing this application. This application is built mainly to solve a user experience problem that I encountered.

## Getting Started

First, clone this repository, and run the Next.js development server:

```bash
git clone https://github.com/Q-gabe/huat-did-i-win.git
cd huat-did-i-win

npm install
# or
yarn

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on endpoints served from `pages/api`.

In order to access the GCP Vision API, follow the [setup guide from GCP documentation](https://cloud.google.com/vision/docs/setup). Ticket recognition will not work without a service account for the server.

The json credentials for a GCP service account must be provided in base64 and set as the environment variable `GCP_CREDENTIALS`. You can manually do this by editing value of `GCP_CREDENTIALS` in the `next.config.js` file.

## Technologies used

* Typescript, React, Bootstrap
* Next.js
* GCP Vision API

## Deployment

* Vercel

## Acknowledgements
* Credits to my partner-in-crime [Rachel](https://www.linkedin.com/in/rachelanya/) for the incredible name of the web app.
* Special thanks to my family for trying their luck at the recent $8 million prize pot and painstakingly using the Singapore pools website to enter every freaking $1 ordinary Toto bet. It was **so infuriating** to use that this idea was spawned.

## License
[MIT](https://github.com/Q-gabe/huat-did-i-win/blob/master/LICENSE)
