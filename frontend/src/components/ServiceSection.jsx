import { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

const ServiceSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const maxQuestionsPerDay = 10;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
  
    if (questionCount < maxQuestionsPerDay) {
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
  
      try {
        // Making a GET request using axios
        const response = await axios.get(`http://localhost:3000/api/clients/askDoctor`, {
          params: { input: input }, // Send input as query parameter
        });
        
  
        // Check if the response contains the expected data
        if (response.data && response.data.text) {
          setMessages((prev) => [...prev, { sender: "doctor", text: response.data.text }]);
        } else {
          throw new Error("Invalid response format.");
        }
  
      } catch (error) {
        console.error("Error fetching response:", error);
        alert("Failed to fetch response. Please try again.");
      }
  
      setInput("");
      setQuestionCount((prev) => prev + 1);
    } else {
      alert("You have reached the maximum number of questions for today.");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="p-4 border rounded-lg shadow-md mt-10 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Ask the Doctor</h2>
        <div className="h-60 overflow-y-auto border border-gray-300 rounded-lg p-2 mb-2">
          {messages.map((msg, index) => (
            <div key={index} className={`my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 border border-gray-300 p-2 rounded-lg"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
            Send
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-500">
          Questions remaining today: {maxQuestionsPerDay - questionCount}
        </p>
      </div>
    </div>
  );
};

export default ServiceSection;
