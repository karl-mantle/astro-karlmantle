import { marked } from "marked";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function ChatIsland() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: DOMPurify.sanitize(marked.parse(input)) };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://karlmantle-ai-interface.karlmantle.workers.dev/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      let streamed = "";

      typeMessage(data.answer, (partial) => {
        streamed = partial;

        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "ai",
            content: DOMPurify.sanitize(marked.parse(streamed)),
          };
          return copy;
        });
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: marked.parse("**Error:** could not reach API") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const typeMessage = (fullText, onUpdate, speed = 10) => {
    let i = 0;

    const interval = setInterval(() => {
      i++;

      onUpdate(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-80 flex-col gap-2 overflow-y-auto border p-2 dark:border-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={[
              "max-w-3/4 p-2",
              msg.role === "user" ? "self-end" : "self-start",
              msg.role === "user"
                ? "border bg-white text-black"
                : "border border-white bg-black text-white",
            ].join(" ")}
            dangerouslySetInnerHTML={{
              __html: msg.content,
            }}
          ></div>
        ))}
        {loading && <div className="self-start">AI is typing...</div>}
      </div>

      <div className="relative">
        <textarea
          className="min-h-20 w-full border p-2 dark:border-white"
          placeholder="Enter a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="absolute right-4 bottom-4 cursor-pointer bg-black p-4 leading-0 text-white dark:bg-white dark:text-black"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
