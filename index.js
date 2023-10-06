const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
const download = require("image-downloader");

// Change here whenever the selector changes
const DEFAULT_DOWNLOAD_QUERY_SELECTOR = ".dpLYmT";

puppeteer.use(
  RecaptchaPlugin({
    provider: { id: "2captcha", token: "XXXX" },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

(async () => {
  // for each line in imagesUrl.txt, put the image url in array
  const imagesUrl = await fs
    .readFileSync("imagesUrl.txt", "utf8")
    .split("\n")
    .filter((url) => url !== "");

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (let i = 0; i < imagesUrl.length; i++) {
    const imagePath = await downloadOriginalImage(imagesUrl[i]);

    await page.goto("https://www.watermarkremover.io/upload", {
      waitUntil: "load",
    });

    await page.waitForSelector("input[type=file]");
    const fileInput = await page.$("input[type=file]");
    await fileInput.uploadFile(imagePath);

    /* resolve captcha */
    await page.evaluate(() => {
      window.scroll(0, 0);
    });
    await sleep(1000);
    await page.solveRecaptchas();
    /* end resolve captcha */

    await page.waitForSelector(DEFAULT_DOWNLOAD_QUERY_SELECTOR);
    await page.click(DEFAULT_DOWNLOAD_QUERY_SELECTOR);

    await sleep(500);

    // To clear all previous uploaded images from the page
    await page.evaluate(() => {
      localStorage.clear();
    });
  }
})();

const downloadOriginalImage = async (imageUrl) => {
  const options = {
    url: imageUrl,
    dest: __dirname + "/original_images",
  };

  return download
    .image(options)
    .then(({ filename }) => {
      return filename;
    })
    .catch((err) => console.error(err));
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
