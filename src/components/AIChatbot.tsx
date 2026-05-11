import { useState } from 'react';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hello! Welcome to DearSoft IT Solutions.',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage,
      },
    ]);

    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
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

Company Services:
- Web Development
- MERN Stack Development
- UI/UX Design
- API Development
- Cloud Deployment

Reply professionally and briefly.

User Message:
${userMessage}
                    `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      const aiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'AI not responding.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Something went wrong.',
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: '#facc15',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 9999,
        }}
      >
        AI
      </button>

      {/* Chatbot */}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '340px',
            background: '#111',
            border: '1px solid #333',
            borderRadius: '14px',
            padding: '15px',
            color: 'white',
            zIndex: 9999,
          }}
        >
          <h3>Dear AI Assistant</h3>

          <div
            style={{
              height: '320px',
              overflowY: 'auto',
              marginBottom: '10px',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '10px',
                    background:
                      msg.role === 'user' ? '#facc15' : '#222',
                    color: msg.role === 'user' ? '#000' : '#fff',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <p>Typing...</p>}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message"
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
              }}
            />

            <button
              onClick={handleSend}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '8px',
                background: '#facc15',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
