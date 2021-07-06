import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import { h, serve, serveStatic, jsx} from "https://deno.land/x/sift@0.3.2/mod.ts";

import Index from './page/Index.jsx';

// 电台
const fnFm = async (request, params) => {
  const station_name = params.station_name;
  let m3u8_url;
  switch (station_name) {
    case 'cnr1':
      m3u8_url = 'http://ngcdn001.cnr.cn/live/zhzs/index.m3u8';
      break;
    case 'cnr5':
      m3u8_url = 'http://ngcdn005.cnr.cn/live/zhzs/index.m3u8';
      break;
    default:
      break;
  }
  return await fetch(m3u8_url);
}
// async
const fnTs = async (request, params) => {
  const station_name = params.station_name;
  const pathname = params.pathname;
  let station_url;
  switch (station_name) {
    case 'cnr1':
      station_url = `http://ngcdn001.cnr.cn/live/zgzs/${pathname}.ts`;
      break;
    case 'cnr5':
      station_url = `http://ngcdn005.cnr.cn/live/zhzs/${pathname}.ts`;
      break;
    default:
      break;
  }
  console.log(station_url);
  return await fetch(station_url);
}

serve({
  '/': () => {
    return new Response(renderToString(<Index />), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
  '/fm/:station_name/:pathname.ts': fnTs,
  '/fm/:station_name/index.m3u8': fnFm,
  '/static/radio.webmanifest':  serveStatic("static/radio.webmanifest", { baseUrl: import.meta.url }),
  '/static/js/:filename': serveStatic("static/js", {
    baseUrl: import.meta.url,
    intervene: (request, response) => {
      response.headers.set("content-type", "text/javascript; charset=utf-8");
      return response;
    },
  }),
  '/static/css/:filename': serveStatic("static/css", {
    baseUrl: import.meta.url,
    intervene: (request, response) => {
      response.headers.set("content-type", "text/css; charset=utf-8");
      return response;
    },
  }),
  '/static/img/:filename': async (request, params) => {
    const image = new URL(`static/img/${params.filename}`, import.meta.url);
    return fetch(image);
  },
  404: () => new Response("not found"),
});