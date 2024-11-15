# Oxido Project

This project is a recruitment task for the company Oxido. It integrates the OpenAI API to generate HTML content based on specific instructions.

## Requirements

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

Additionally, you'll need the following dependencies:

- openai (to interact with the OpenAI API)
- dotenv (to manage environment variables securely)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/zadanie_oxido.git
   ```

   ```bash
   cd zadanie_oxido
   ```

2. Install the required dependencies:

   ```bash
   npm install openai
   ```

   ```bash
   npm install dotenv
   ```

3. Set up your OpenAI API key:

   Create a `.env` file in the root of the project directory and add the following line:

   ```env
   OXIDO_OPENAI_API_KEY=your-openai-api-key-here
   ```

   Replace `your-openai-api-key-here` with the actual API key you obtained from OpenAI.

4. Run the project:

   After installing the dependencies and setting the environment variable, you can run the application with the following command:

   ```bash
   node app.js
   ```

   This will execute the logic inside `app.js`, and depending on your setup, it might interact with OpenAI's API to perform certain tasks.

## Project Structure

- **app.js**: Main application file where the logic for interacting with OpenAI and generating content resides.
- **.env**: Environment file to store sensitive data like the OpenAI API key.
- **.gitignore**: List of files and directories to be ignored by Git, such as `.env` for security reasons.

## How the Program Works

1. The program reads content from `artykul.txt`.
2. Combines it with a prompt.
3. Sends the prompt and content to the OpenAI API.
4. The API response contains HTML content, which is saved in artykul.html. The returned HTML includes only the content to be inserted between the <body> and </body> tags, without the <html>, <head>, or <body> tags.
5. Saves the API response in `artykul.html`.
