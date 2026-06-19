import { useState } from "react";

export default function ChatIsland() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
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
      const aiMessage = { role: "ai", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error: could not reach API" }]);
    } finally {
      setLoading(false);
    }
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
              "max-w-3/4 p-1",
              msg.role === "user" ? "self-end" : "self-start",
              msg.role === "user"
                ? "border bg-white text-black"
                : "border border-white bg-black text-white",
            ].join(" ")}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="self-start">…AI is typing…</div>}
      </div>

      <div class="relative">
        <textarea
          className="min-h-20 w-full border p-2 dark:border-white"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="absolute right-2 bottom-2 cursor-pointer bg-black p-4 leading-0 text-white dark:bg-white dark:text-black"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
