const puppeteer = require("puppeteer");
const fetch = require(`node-fetch`);
const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://automations-w3yx.onrender.com";
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
      args: [`--incognito`],
    });
    const [page] = await browser.pages();
    await Immediate();
    clearTimeout(myInterval2);
    await page.setViewport({
      width: 1536,
      height: 780,
      deviceScaleFactor: 1,
    });
    await page.setDefaultNavigationTimeout(90000);
    await page.goto(`https://www.imdb.com/name/${name}/`);
    const all = await page.$$(`.inline a`);
    const a = Math.floor(4 * Math.random());

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
      args: [`--incognito`],
    });
    const [page] = await browser.pages();
    await Immediate();
    clearTimeout(myInterval);

    await page.setViewport({
      width: 1536,
      height: 780,
      deviceScaleFactor: 1,
    });
    await page.goto(`https://www.imdb.com/name/${name}/`, {
      waitUntil: "load",
      timeout: 0,
    });
    const all = await page.$$(`.filmo-category-section a`);
    if (name === `nm3271132`) {
      number = 23;
    } else {
      number = 43;
    }
    const a = Math.floor(number * Math.random());

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
