import axios from "axios";
import * as cheerio from "cheerio";

let meta = {},
  ogmeta = {},
  link = {},
  keys = [];

let fetch = async () => {
  try {
    let response = await axios.get("https://hyunwoo.kim");
    let $ = cheerio.load(response.data);
    $(`meta[name]`)
      .toArray()
      .forEach(el => {
        meta[el.attribs.name] = el.attribs.content;
      });

    $(`meta[property]`)
      .toArray()
      .forEach(el => {
        ogmeta[el.attribs.property] = el.attribs.content;
      });

    $(`link[rel]`)
      .toArray()
      .forEach(el => {
        let _key = el.attribs.rel;
        keys.push(_key);
        if (keys.indexOf(_key)) {
          if (!Array.isArray(link[_key])) {
            link[_key] = [el.attribs.href];
          } else {
            link[_key].push(el.attribs.href);
          }
        } else {
          link[_key] = el.attribs.href;
        }
      });
    console.log(link);
  } catch (err) {
    console.log(err);
  }
};

fetch();
