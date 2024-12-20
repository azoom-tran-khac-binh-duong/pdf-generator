import { H3Event } from "h3";
import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const { page } = await usePuppeteer()
  await page.goto(`${getRequestURL(event).origin}/_invoice`)

  setHeader(event, 'Content-Type', 'application/pdf')
  return page.pdf({ format: 'A4' })
});

async function usePuppeteer() {
  const currentEvent = useEvent()
  const nitroApp = useNitroApp()
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  nitroApp.hooks.hook('close', async () => {
    browser.close()
  })

  nitroApp.hooks.hookOnce('afterResponse', async (event: H3Event) => {
    if (currentEvent !== event) return;
    await page.close()
  })

  return {
    browser,
    page,
  }
}