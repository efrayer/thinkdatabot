import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('http://localhost:3001/chat', { message: input });
            const botMessage = { sender: 'Eric Chatbot', text: response.data.reply };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
        setInput('');
    };

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <h2>Eric's AI Chatbot - Azure Version</h2>
            <div style={{ border: '1px solid gray', padding: 10, height: 400, overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                        <b>{msg.sender === 'user' ? 'User' : 'Chatbot Helper'}:</b> {msg.text}
                    </div>
                ))}
            </div>
            <br></br>
            <input value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%', padding: 10 }} />
            <button onClick={sendMessage} style={{ padding: 10 }}>Submit</button>
            <hr></hr>
            This is a prototype chatbot that can help with custom questions.
        </div>
        
    );
}

export default App;