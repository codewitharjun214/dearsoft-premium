const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
  {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `
You are DearSoft IT Solutions AI Assistant.

Company Details:
- Company: DearSoft IT Solutions
- Location: Pune, India

Services:
- Web Development
- MERN Stack Development
- UI/UX Design
- E-Commerce Solutions
- Cloud Services
- API Development
- Website Maintenance

Instructions:
- Reply professionally
- Keep answers short and helpful
- Encourage users to contact dearsoft0205@gmail.com

User Message:
${userMsg}
              `,
            },
          ],
        },
      ],
    }),
  }
);

const data = await response.json();

console.log('Gemini Response:', data);

if (data.error) {
  throw new Error(data.error.message);
}

const aiText =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  'Sorry, AI is not responding right now.';

setMessages((prev) => [
  ...prev,
  {
    role: 'ai',
    text: aiText,
  },
]);
