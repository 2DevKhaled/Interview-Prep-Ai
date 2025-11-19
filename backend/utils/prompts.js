const Question = require("../models/Question");

const questionAnswerPrompt = (
  role,
  experience,
  topicsToFoucs,
  numberOfQuestions
) => `
Generate exactly ${numberOfQuestions} unique technical interview questions.

Role: ${role}
Experience: ${experience} years
Topics: ${topicsToFoucs}

Requirements:
- Exactly ${numberOfQuestions} questions
- Short answers (max 80 words each)  
- No long code examples
- Focus on key concepts only
- Unique and different questions

Return ONLY valid JSON array:
[
  {
    "question": "Question text?",
    "answer": "Short concise answer"
  }
]

Ensure valid JSON format.
`;

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanation for a given interview questions 
    Task : 
    - Explain the following interview question and it's concept in depth as if you're teaching a bignner developer
    - Question: ${question}
    - after the explanation, provide a short and clear title that summarizes the concept for the article or page header
    - If the explanation includes a code example, provide a small code block. 
    - Keep the formating very clean and clear.
    - Return the result as a vilid JSON object in the following format : 
    {
    "title":"Short title here?", 
    "explanation": "Explanation Here"
    }
    Important : Do NOT add any extra text outside the JSON , Only return valid JSON
    `;
module.exports = { questionAnswerPrompt, conceptExplainPrompt };
