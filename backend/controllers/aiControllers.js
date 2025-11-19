const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// @desc Generate interview questions and inswers using Gemini
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuerstions = async (req, res) => {
  try {
    const { role, experience, topicsToFoucs, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFoucs || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFoucs,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    const rawText = response.text;
    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/i, "") // يشيل البداية ```json + مسافات/أسطر
      .replace(/```\s*$/i, "") // يشيل النهاية ```
      .trim();

    // Now safe to parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Generate Questions",
      error: error.message,
    });
  }
};
// @desc Generate explains interview questions
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    const rawText = response.text;
    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/i, "") // يشيل البداية ```json + مسافات/أسطر
      .replace(/```\s*$/i, "") // يشيل النهاية ```
      .trim();
    // Now safe to parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Generate Questions",
      error: error.message,
    });
  }
};
module.exports = { generateConceptExplanation, generateInterviewQuerstions };
