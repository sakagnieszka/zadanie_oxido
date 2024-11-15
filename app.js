const fs = require("fs").promises;
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OXIDO_OPENAI_API_KEY,
});

async function readArticle(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Błąd podczas odczytu pliku:", error);
    throw error;
  }
}

async function generateHtml(articleContent) {
  const prompt = `
      Przetwórz poniższy tekst artykułu na kod HTML z odpowiednią strukturą sekcji. 
      Dodaj znaczniki <h1>, <h2>, <p> oraz miejsca na obrazki <img src="image_placeholder.jpg"> 
      z odpowiednimi atrybutami alt, w alcie prompt powinien zaczynać się od słów "wygeneruj obraz przedstawiający", opisującymi obrazek. Pod każdym obrazkiem dodaj podpis w <figcaption>. 
      Zwróć kod tylko do umieszczenia pomiędzy <body> i </body> bez użycia znaczników <body> i </body>. Nie używaj formatowania składni.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Jestem asystentem, który pomaga generować kod HTML na podstawie tekstu.",
        },
        {
          role: "user",
          content: `${prompt}\n\n${articleContent}`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.5,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Błąd podczas generowania HTML:", error);
    throw error;
  }
}

async function saveHtml(htmlContent, outputFile) {
  try {
    await fs.writeFile(outputFile, htmlContent, "utf8");
    console.log(`HTML został zapisany w pliku: ${outputFile}`);
  } catch (error) {
    console.error("Błąd podczas zapisywania pliku:", error);
    throw error;
  }
}

async function main() {
  const inputFile = "artykul.txt";
  const outputFile = "artykul.html";

  try {
    const articleContent = await readArticle(inputFile);

    const htmlContent = await generateHtml(articleContent);

    await saveHtml(htmlContent, outputFile);
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
}

main();
