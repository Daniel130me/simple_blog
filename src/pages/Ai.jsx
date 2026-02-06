import { useState } from "react";
import Groq from "groq-sdk";
const Ai = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      console.error(
        "API key not configured. Please set VITE_GROQ_API_KEY in your .env file.",
      );
      return;
    }

    // First API call with reasoning
    let response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "user",
              content: "How many r's are in the word 'strawberry'?",
            },
          ],
          reasoning: { enabled: true },
        }),
      },
    );

    // Extract the assistant message with reasoning_details and save it to the response variable
    const result = await response.json();
    response = result.choices[0].message;

    // Preserve the assistant message with reasoning_details
    const messages = [
      {
        role: "user",
        content: "How many r's are in the word 'strawberry'?",
      },
      {
        role: "assistant",
        content: response.content,
        reasoning_details: response.reasoning_details, // Pass back unmodified
      },
      {
        role: "user",
        content: "Are you sure? Think carefully.",
      },
    ];
  };
  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about programming..."
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default Ai;
