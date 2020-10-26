const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async event => {
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
      .forEach(tag => {
        meta[tag.attribs.name] = tag.attribs.content;
      });

    $(`meta[property]`)
      .toArray()
      .forEach(tag => {
        meta[tag.attribs.property] = tag.attribs.content;
      });

    $(`link[rel]`)
      .toArray()
      .forEach(tag => {
        let _key = tag.attribs.rel;
        keys.push(_key);
        if (keys.indexOf(_key)) {
          if (!Array.isArray(link[_key])) {
            link[_key] = [tag.attribs.href];
          } else {
            link[_key].push(tag.attribs.href);
          }
        } else {
          link[_key] = tag.attribs.href;
        }
      });

    result = { title: title, meta: meta, link: link };
  } catch (err) {
    result = err;
  }
  const response = {
    200,
    body: JSON.stringify(result),
  };
  return response;
};
