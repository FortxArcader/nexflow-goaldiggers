require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");
const axios = require("axios");
const cors = require("cors");

const app = express(); // Move this up
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Environment Variables
const VEYRAX_API_KEY = process.env.VEYRAX_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Add this after your environment variables declarations
if (!VEYRAX_API_KEY || !OPENAI_API_KEY) {
  throw new Error("Missing required environment variables");
}

const headers = { VEYRAX_API_KEY: VEYRAX_API_KEY };

// Initialize OpenAI Client
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Fetch available tools from Veyrax
let available_tools;
(async () => {
  try {
    const response = await axios.get("https://veyraxapp.com/get-tools", {
      headers,
    });
    available_tools = response.data;
    console.log(available_tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
  }
})();

async function openaiCall(question) {
  const systemPrompt = `Available tools: ${JSON.stringify(available_tools)}. 
  Analyze if the user's question requires using any of these tools.
  If a tool is needed, respond with JSON containing: "needsTool": true, "tool", "method", "parameters".
  If no tool is needed, respond with JSON containing: "needsTool": false, "response": "your direct response"`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    response_format: { type: "json_object" },
  });
  return JSON.parse(response.choices[0].message.content);
}

async function callTool(toolName, methodName, parameters) {
  const url = `https://veyraxapp.com/tool-call/${toolName}/${methodName}`;
  const response = await axios.post(url, parameters, { headers });
  return response.data;
}

// Add this function after the callTool function
async function processResultWithGPT(question, toolResult) {
  const systemPrompt =
    "You are a helpful assistant that explains tool results in a clear and concise way on the behalf of the tool.";

  const userPrompt = `
  Original question: ${question}
  Tool execution result: ${JSON.stringify(toolResult)}
  Please provide a natural language response explaining the results.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0].message.content;
}

// Add root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NexFlow API",
    status: "active",
    timestamp: new Date().toISOString(),
  });
});

app.post("/process", async (req, res) => {
  console.log(req.body);
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Get initial GPT response
    const gptResponse = await openaiCall(question);

    let finalResponse;
    let toolResult = null;

    if (gptResponse.needsTool) {
      // Execute the tool if needed
      toolResult = await callTool(
        gptResponse.tool,
        gptResponse.method,
        gptResponse.parameters
      );
      // Process tool results with GPT
      finalResponse = await processResultWithGPT(question, toolResult);
    } else {
      // Use direct GPT response if no tool is needed
      finalResponse = gptResponse.response;
    }

    res.json({
      needs_tool: gptResponse.needsTool,
      gpt_response: gptResponse,
      tool_result: toolResult,
      final_response: finalResponse,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// Export for Vercel
module.exports = app;
