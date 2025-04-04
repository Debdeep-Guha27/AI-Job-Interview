import { Mic, Nfc, Send, Trash } from "lucide-react";
import React, { useState } from "react";

const Questions = ({ question, onAnswerChange }) => {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(question);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() !== "") {
      setSubmittedAnswer(answer);
      onAnswerChange(answer); // Call parent function
      setAnswer("");
    }
  };

  const voiceMessage = () => {
    if (!speaking) {
      setSpeaking(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; // Keep listening even after pauses
      recognition.interimResults = true; // Get live feedback while speaking
      recognition.lang = "en-IN";

      let finalTranscript = ""; // Store finalized text

      recognition.onresult = (e) => {
        let interimTranscript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) {
            finalTranscript += e.results[i][0].transcript + " "; // Append finalized text
          } else {
            interimTranscript += e.results[i][0].transcript + " "; // Temporary results
          }
        }

        // Set final text + latest interim text (avoiding duplication)
        setAnswer(finalTranscript + interimTranscript);
        onAnswerChange(finalTranscript + interimTranscript);
      };

      recognition.onend = () => {
        if (speaking) {
          recognition.start(); // Restart if the user hasn't stopped manually
        }
      };

      recognition.start();

      // Store reference to stop it later
      window.recognitionInstance = recognition;
    } else {
      setSpeaking(false);
      if (window.recognitionInstance) {
        window.recognitionInstance.stop();
      }
    }
  };




  return (
    <div className="bg-gray-900 p-4 m-4 rounded-lg shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-white text-lg font-medium">{question}</p>
        <button className="bg-violet-600 hover:bg-violet-500 p-2 rounded-lg text-white transition" onClick={speak}>
          <Nfc size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            onAnswerChange(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button className={`ml-2 p-2 ${!speaking ? "bg-blue-600 hover:bg-blue-500" : "bg-red-600 scale-150 hover:bg-red-500"} rounded-lg `} onClick={voiceMessage}>
          <Mic size={20} />
        </button>

        <button onClick={handleSubmit} className="p-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg shadow-md text-white flex items-center">
          <Send size={20} />
        </button>
      </div>

      {submittedAnswer && (
        <div className="flex justify-between">
          <p className="text-green-400 mt-2">Ans: {submittedAnswer}</p>
          <button className="bg-red-500 p-2 rounded-md hover:bg-red-400" onClick={() => setSubmittedAnswer("")}>
            <Trash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
