import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Allow usage in the browser (not recommended for production)
});

console.log(process.env.REACT_APP_OPENAI_API_KEY);

export default openai;
