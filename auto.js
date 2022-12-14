const puppeteer = require("puppeteer");
const fetch = require(`node-fetch`);
const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : "https://imdbbot.onrender.com";
let shuffled;
let first1 = 10000;
let second2 = 60000;
let name = `nm3271132`;

function Immediate() {
  fetch(`${server}/shuffles`)
    .then((response) => response.json())
    .then(({ msg }) => {
      shuffled = msg[0].name;
      const first = (shuffled * 7) / 10;
      first1 = (24 * 3600000) / first;
      const second = (shuffled * 3) / 10;
      second2 = (24 * 3600000) / second;
    });

  fetch(`${server}/shuffle`)
    .then((response) => response.json())
    .then(({ msg }) => {
      if (msg[0].input === `Sascha Lorren`) {
        return (name = `nm3271132`);
      }
      name = `nm2018790`;
    });
}

Immediate();

myInterval2 = setTimeout(() => {
  main();
}, second2);

async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--incognito`, `--no-sandbox`],
    });
    const [page] = await browser.pages();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    await Immediate();
    clearTimeout(myInterval2);
    await page.setViewport({
      width: 1536,
      height: 780,
      deviceScaleFactor: 1,
    });
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`https://www.imdb.com/name/${name}/`);
    let all = await page.$$(`.knownfor-title-role a`);
    const a = Math.floor(4 * Math.random());
    if (!all[a]) {
      all = await page.$$(`.ipc-primary-image-list-card__title`);
      const a = Math.floor(4 * Math.random());
    }

    const [response] = await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      all[a].click(),
    ]);
    console.log(second2);
    await browser.close();
    setTimeout(() => {
      main();
    }, second2);
  } catch (err) {
    console.error(err);
  }
}

myInterval = setTimeout(() => {
  others();
}, first1);

async function others() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--incognito`, `--no-sandbox`],
    });
    const [page] = await browser.pages();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    await Immediate();
    clearTimeout(myInterval);

    await page.setViewport({
      width: 1536,
      height: 780,
      deviceScaleFactor: 1,
    });
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`https://www.imdb.com/name/${name}/`, {
      waitUntil: "load",
      timeout: 0,
    });
    let all = await page.$$(`.odd b`);
    if (name === `nm3271132`) {
      number = 10;
    } else {
      number = 13;
    }
    const a = Math.floor(number * Math.random());
    console.log(a);
    if (!all[a]) {
      all = await page.$$(`.ipc-metadata-list-summary-item__t`);
      const a = Math.floor(number * Math.random());
    }

    const [response] = await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      all[a].click(),
    ]);
    console.log(first1);
    await browser.close();
    setTimeout(() => {
      others();
    }, first1);
  } catch (err) {
    console.error(err);
  }
}
