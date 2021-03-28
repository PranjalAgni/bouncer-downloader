const puppeteer = require('puppeteer');
const { getPath, parseDate } = require('../utils');

const decideDownload = (fileName) => true;

const startBouncer = async ({ envName, startDate, endDate }) => {
  console.log({ envName, startDate, endDate });

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  });

  const page = await browser.newPage();

  const waitNavigation = page.waitForNavigation({
    timeout: 0,
  });

  await page.goto('https://bouncer.highradius.com', {
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  await waitNavigation;

  await page.$eval(
    '#textfield-1012-inputEl',
    (el, email) => (el.value = email),
    process.env.EMAIL
  );
  await page.$eval(
    '#textfield-1013-inputEl',
    (el, password) => (el.value = password),
    process.env.PASSWORD
  );

  await page.evaluate(() => {
    // click remember username to enable submit
    document.querySelector('#checkbox-1010-displayEl').click();
  });

  await page.waitForTimeout(1000);

  // button for login
  await page.$eval('#button-1015-btnInnerEl', (elt) => elt.click());

  await page.waitForNavigation({
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: 'C:\\Users\\pranjal.a\\Downloads\\a',
  });

  await page.evaluate((envName) => {
    document.querySelector('#ext-element-135').click();
    const targetEnv = document.querySelector(
      '#blobExplorerEnvironmentId-inputEl'
    );

    targetEnv.value = envName;
  }, envName);

  for (
    let date = parseDate(startDate);
    date < parseDate(endDate);
    date.setDate(date.getDate() + 1)
  ) {
    const currentPath = getPath(date);
    await page.type('#blobExplorerSearchInputStringId-inputEl', currentPath);

    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      document.querySelector('#button-1693-btnInnerEl').click();
    });

    await page.waitForTimeout(1000);

    const filesList = await page.evaluate(() => {
      const grid = document.querySelector('#tableview-1658');

      const tableList = [...grid.children[1].children];

      const fileNames = [];

      tableList.forEach((table) => {
        const currentRow = table.children[0].children[0];

        const downloadWrapper = currentRow.children[2].children[0].children[0];

        const fileName = downloadWrapper.children[0].innerHTML;

        if (decideDownload(fileName)) {
          downloadWrapper.click();
          fileNames.push(fileName);
        }
      });

      return fileNames;
    });

    console.log({ filesList });
  }

  // await browser.close();
};

module.exports = startBouncer;
