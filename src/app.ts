import axios from "axios";
import * as cheerio from "cheerio";

let fetch = async () => {
  try {
    let response = await axios.get("https://circles.hyunwoo.dev");
    let data = response.data;
    let $ = cheerio.load(data);
    // const getMeta = (name: string) => {
    //   return $(`meta[name='${name}']`).prop("content") || null;
    // };
    // const getOpenGraphMeta = (prop: string) => {
    //   return $(`meta[property='${prop}']`).prop("content") || null;
    // };
    // let title = $("title").text();
    // let meta = {
    //   title: getMeta("title"),
    //   keywords: getMeta("keywords"),
    //   description: getMeta("description"),
    //   author: getMeta("author"),
    //   og_image: getOpenGraphMeta("og:image"),
    //   og_video: getOpenGraphMeta("og:video"),
    // };
    // let icon = $("link[rel=icon]").attr("href");

    // console.log(Object.entries(meta));

    // console.log($(`meta[name]`)[0].attribs.name);
    let meta = {};
    for (let i = 0; i < $(`meta[name]`).length; i++) {
      meta[$(`meta[name]`)[i].attribs.name] = $(`meta[name]`)[i].attribs.content;
    }
    let ogmeta = {};
    for (let i = 0; i < $(`meta[property]`).length; i++) {
      ogmeta[$(`meta[property]`)[i].attribs.property] = $(`meta[property]`)[i].attribs.content;
    }
    let link = {};
    for (let i = 0; i < $(`link[rel]`).length; i++) {
      $(`link[rel]`);
      //키 중복시 배열 생성

      if ($(`link[rel]`)[i].attribs.rel in link) {
        link[$(`link[rel]`)[i].attribs.rel].push($(`link[rel]`)[i].attribs.href);
      }

      if (link[$(`link[rel]`)[i].attribs.rel]) {
        link[$(`link[rel]`)[i].attribs.rel] = [];
      } else {
        link[$(`link[rel]`)[i].attribs.rel] = $(`link[rel]`)[i].attribs.href;
      }
    }
    console.log(link);

    //

    // let data = response.data.replace(/['"]+/g, "");
    // let title = data.match(/<title>(.+)<\/title>/)[0].slice(7, -8);
    // let favicon = data.match(/rel=icon(.+)\/>/)[0].slice(14, -3);

    // let banner = data.match(/<meta property=og:image content=(.+)\/>/)[0];
    // console.log(banner);
  } catch (err) {
    console.log(err);
  }
};

fetch();
