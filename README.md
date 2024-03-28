![llama lane logo](/assets/logo.png)

# Llama Lane: Attempting to extract addresses from text using a LLM

Hey there! 👋 Thanks for stopping by. I've embarked on a pretty cool journey to solve a problem that might seem simple at first glance but is filled with details – extracting addresses from a bunch of company websites. The goal? To grab all the valid addresses in a structured format: we're talking country, region, city, postcode, road, and even road numbers. This isn't just about scraping data; it's about making sense of it in a way that's useful for all sorts of needs, from understanding business locations to planning logistics.

Before we dive into the details, let's get an overview of what this journey entails. This project unfolds in three main parts: First, we'll explore the Crawler, a dynamic tool designed to navigate the web and gather data. Then, we transition to the Extractor, where we leverage AI to make sense of the information collected. Finally, we'll see how all this data is transformed and made user-friendly through a transition from JSON to Excel.

## Part 1: The Crawler

### The Idea Behind It

The internet is a wild place, especially with how modern websites love to show content dynamically. That means just peeking at the HTML source isn't enough anymore. You've got stuff rendering on the server, on the client... it's a mess. So, I decided the only way to really get at the data I needed was to go full spy mode with a Chrome-based, dynamic crawler. Enter Puppeteer, my tool of choice for this mission, allowing me to crawl through websites like I'm just another user browsing around.

### How I Made It Happen

Choosing [Puppeteer](https://pptr.dev/): Puppeteer lets me interact with web pages in a very human way, which is perfect for those sneaky sites that load content on the fly with JavaScript. It's like having a superpower where I can see everything a regular user can see, but I'm automating it. Magic! 🪄

Storing the Loot with [DuckDB](https://duckdb.org/): Every piece of data I collect gets stashed in DuckDB. Why DuckDB? Because it's quick, it's light, and it doesn't fuss. For a solo project like this, keeping things simple and efficient is key. So, every domain and its content are safely stored away for me to query later.

Working Smart with Parallel Processing: I'm not one to wait around. So, I split my list of domains into smaller chunks and tackle them all at once. This way, I'm not crawling through websites one by one like it's 1999. Instead, I'm blasting through them with all the power my computer can muster. It's all about getting things done faster and smarter.

## Part 2: The Extractor

### The Journey to AI

After conquering the wilds of the web with my Crawler, it was time to tackle the beast of data extraction. I wanted more than just the basics. I mean, who wants to settle for the same old tech, right? So, I turned to the cutting-edge world of AI, which led me to [OLLAMA](https://ollama.com/)and, by extension, inspired the name of my project: LLAMA LANE.

### Choosing My Tools: Mistral Over Llama

Now, this is where things get spicy. In the vast menu of AI technologies, I had to pick my main ingredient. I was torn between [Llama](https://llama.meta.com/) and [Mistral](https://mistral.ai/), but after a bit of a tussle, Mistral won me over. Why, you ask? Simple: context. Mistral boasts a 32k context window (v0.2 with just 4GB VRAM requirement), while Llama sits at 4-8k. And let me tell you, I've got a mountain of content to sift through.⛰️

To bring this AI-powered Extractor to life, I needed some serious hardware. Enter my trusty VM on AWS EC2, sporting a G5 instance with an Nvidia A10G GPU. We're talking 24GB of VRAM here.

### Embracing JSON

Why JSON, you ask? It’s like the universal language of data on the web – lightweight, easy to read (both by humans and machines), and super flexible. Choosing JSON meant that the addresses could easily be integrated into virtually any application, stored efficiently, and shared without hassle.

## Part 3: From JSON to Excel

Transitioning from the complexity of AI-driven extraction to something as universally accessible as Excel was the final piece of the puzzle. This step is about transforming the technical output into a format that's easily navigable and usable for a wide audience.

This phase was essential in making the data not only accessible but also actionable. It represents the bridge between the complexity of data extraction and the simplicity of data use.

### Using ExcelJS for the Perfect Transition

[ExcelJS](https://www.npmjs.com/package/exceljs) played a crucial role in bridging the gap between JSON and Excel. It allowed for a smooth conversion, ensuring the data retained its structure and integrity. Moreover, it gave the opportunity to fine-tune the appearance and usability of the Excel sheets, making sure that they are not only functional but also user-friendly.

The result of this process is two-fold: results.json for those who need the raw, structured data, and results.xlsx for users who prefer the accessible and familiar interface of Excel. This ensures that the valuable address information we’ve extracted is usable by anyone, regardless of their preference or technical background.
