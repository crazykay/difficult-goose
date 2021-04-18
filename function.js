
async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/html")) {
    const html = `<html>
      <p><b>Message:</b> Hello from Deno Deploy.</p>
      </html>`;

    return new Response(html, {
      headers: {
        // The interpretation of the body of the response by the client depends
        // on the 'content-type' header.
        // The "text/html" part implies to the client that the content is HTML
        // and the "charset=UTF-8" part implies to the client that the content
        // is encoded using UTF-8.
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }

  if (pathname.startsWith("/json")) {
    // Use stringify function to convert javascript object to JSON string.
    const json = JSON.stringify({
      message: "Hello from Deno Deploy",
    });

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  if (pathname.startsWith('/js')) {
    const url = new URL(pathname.slice(1), import.meta.url);
    return fetch(url);
  }

  if (pathname.startsWith("/ip")) {
    const ip = request.headers.get("x-forwarded-for");
    return  new Response(`Your IP address is <b>${ip}</b>`, {
      headers: { "content-type": "text/html" },
    });
  }
  if (pathname.startsWith("/cnr5.m3u8")) {
    return await fetch('http://ngcdn005.cnr.cn/live/zhzs/index.m3u8');
  }
  if (pathname.endsWith(".ts")) {
    const url = `http://ngcdn005.cnr.cn/live/zhzs${pathname}`;
    return await fetch(url);
  }
  const media_source = [
    {
      title: '中国之声',
      url: 'http://ngcdn001.cnr.cn/live/zgzs/index.m3u8'
    },
    {
      title: '海峡之声',
      url: 'http://ngcdn005.cnr.cn/live/zhzs/index.m3u8'
    }
  ]
  return new Response(
    `
    <header>
      <meta name="referrer" content="no-referrer">
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </header>
    <body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>Return JSON and/or HTML Example</h1>
      <h2>goose!!</h2>
      <p>
        <a href="/html">/html</a> - responds with HTML to the request.
      </p>
      <p>
        <a href="/json">/json</a> - responds with JSON to the request.
      </p>
      <p>
        <a href="/ip">/ip</a> - responds client ip.
      </p>
      <figure>
        <figcaption>Radio</figcaption>
        <video id="video" controls></video>
      </figure>
      <script>
        const video = document.getElementById('video');
        const videoSrc = '/cnr5.m3u8';
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        }
        // hls.js is not supported on platforms that do not have Media Source
        // Extensions (MSE) enabled.
        //
        // When the browser has built-in HLS support (check using canPlayType),
        // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
        // element through the src property. This is using the built-in support
        // of the plain video element, without using hls.js.
        //
        // Note: it would be more normal to wait on the 'canplay' event below however
        // on Safari (where you are most likely to find built-in HLS support) the
        // video.src URL must be on the user-driven white-list before a 'canplay'
        // event will be emitted; the last video event that can be reliably
        // listened-for when the URL is not on the white-list is 'loadedmetadata'.
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }
      </script>
    </body>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
