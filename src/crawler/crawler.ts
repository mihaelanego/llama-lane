import puppeteer from "puppeteer";

export interface CrawlItem {
  domain: string;
  text: string | null;
}

const TIMEOUT_MS = 10_000; // 10s

export async function crawlDomains(domains: string[]): Promise<CrawlItem[]> {
  const browser = await puppeteer.launch();

  const pending = domains.map(async (domain) => {
    const page = await browser.newPage();
    await page.goto(`http://${domain}`, {
      waitUntil: "networkidle2",
      timeout: TIMEOUT_MS,
    });
    const text = await page.evaluate("document.body.innerText");

    return text as string;
  });

  const results = await Promise.allSettled(pending);

  await browser.close();

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return {
        domain: domains[index],
        text: result.value,
      };
    } else {
      return {
        domain: domains[index],
        text: null,
      };
    }
  });
}
