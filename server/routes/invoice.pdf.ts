import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const { page } = await usePuppeteer()
  await page.goto(`${getRequestURL(event).origin}/_invoice`)

  setHeader(event, 'Content-Type', 'application/pdf')
  return page.pdf({ format: 'A4' })
});

async function usePuppeteer() {
  const nitroApp = useNitroApp()
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  nitroApp.hooks.hook('close', async () => {
    browser.close()
  })

  return {
    browser,
    page,
  }
}