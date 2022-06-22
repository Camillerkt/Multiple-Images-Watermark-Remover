## Multiple Images Watermak Remover

### Mode of operation

The program uses the webscraping technique and uses the watermarkremover.io website to remove watermarks from images of your choice.
The edited files will be saved in the download directory of your machine.

The code is written in **NodeJS** (JavaScript) and uses the NPM package "_puppeteer_".

### Why use the program ?

You don't need this program if you are a simple person who wants to remove a watermark from an image of your choice.
But if you are a developer creating an ambitious project in which you want to use the watermark removal technique on multiple images and add other features, you can use the piece of code provided in the `index.js` file to adapt it to your needs.

### How to install and use it ?

**First of all, I'd like to point out that this program uses the 2captcha API to bypass any Captchas that may occur during scraping.
Create a developer account on 2captcha.com and get your token. You will have to pay a few dollars to make it work, but don't worry, it's not expensive at all (about 3 USD for 1000 captchas) !**

- Have `NodeJS` installed on your machine
- Download the project
- Run the `npm install` command in your terminal
- Put the URLs of your images in the file `imagesUrl.txt` (one URL per line)
- On line 9 of `index.js` : `provider: { id: "2captcha", token: "XXXX" }`, paste **your 2captcha token** in place of the `XXXX`.
- Run the program: `node index.js` in your terminal

### Author

Website : https://camillerakoto.fr

![enjoy !](https://memegenerator.net/img/instances/81307932.jpg)
