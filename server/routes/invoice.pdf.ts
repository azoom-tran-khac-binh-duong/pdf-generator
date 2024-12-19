import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`${getRequestURL(event).origin}/_invoice`)

  setHeader(event, 'Content-Type', 'application/pdf')
  return page.pdf({ format: 'A4' })
});
