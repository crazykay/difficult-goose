import { h } from "https://deno.land/x/sift@0.3.2/mod.ts";
const Test = () => {
  return (
    <html>
      <head>
        <title>Test JSX</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/static/radio.webmanifest"></link>
        <link rel="stylesheet" href="/static/css/index.css"></link>
        <script src="/static/js/RadioPlayer.js"></script>
      </head>
      <body style="{{margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
        <h1>Test JSX</h1>
        <radio-player></radio-player>
      </body>
    </html>
  )
}

export default Test;