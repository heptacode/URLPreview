const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async event => {
  let statusCode = 200;
  let title = "";
  let meta = {};
  let link = {};
  let keys = [];
  let result;
  try {
    let url = event.queryStringParameters.url;
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);

    title = $(`title`).text();

    $(`meta[name]`)
      .toArray()
      .forEach(el => {
        meta[el.attribs.name] = el.attribs.content;
      });

    $(`meta[property]`)
      .toArray()
      .forEach(el => {
        meta[el.attribs.property] = el.attribs.content;
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

    result = { title: title, meta: meta, link: link };
  } catch (err) {
    statusCode = 200;
    result = err;
  }
  const response = {
    statusCode,
    body: JSON.stringify(result),
  };
  return response;
};
