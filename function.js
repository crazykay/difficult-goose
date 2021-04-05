
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

  if (pathname.startsWith("/ip")) {
    const ip = request.headers.get("x-forwarded-for");
    return  new Response(`Your IP address is <b>${ip}</b>`, {
      headers: { "content-type": "text/html" },
    });
  }

  if (pathname.startsWith('/radio')) {
    const radioUrl = new URL('radio.html', import.meta.url);
    const result = await fetch(radioUrl);
    return new Response(result, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    })
  }

  return new Response(
    `<body
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
        <a href="/radio">/radio</a> - radio
      </p>
      <p>
        <a href="/ip">/ip</a> - responds client ip.
      </p>
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
