import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface StreamResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
}

export function Chatbot() {

  const BASE_HOST = process.env.NEXT_PUBLIC_OLLAMA;
  const API_URL = `${BASE_HOST}` + "/api/generate";

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamedMessage]);

  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    const decoder = new TextDecoder();
    let currentMessage = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          try {
            const response: StreamResponse = JSON.parse(line);
            currentMessage += response.response;
            setCurrentStreamedMessage(currentMessage);

            if (response.done) {
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                content: currentMessage,
                type: 'bot',
                timestamp: new Date()
              }]);
              setCurrentStreamedMessage('');
              break;
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Stream processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: userMessage.content,
        }),
      });

      if (!response.body) throw new Error('No response body');
      const reader = response.body.getReader();
      await processStream(reader);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Lo siento, ocurrió un error al conectar con el servicio.',
        type: 'bot',
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    scrollToBottom();
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? 'inset-4 md:inset-6 lg:inset-8'
        : 'bottom-4 right-4'
    }`}>
      {isOpen ? (
        <div className={`bg-white rounded-lg shadow-2xl flex flex-col ${
          isExpanded
            ? 'w-full h-full'
            : 'w-80 sm:w-96 h-[500px]'
        }`}>
          {/* Header */}
          <div className="bg-indigo-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-white" size={24} />
              <h2 className="text-white font-semibold">Ollama AI</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleExpand}
                className="text-white hover:bg-indigo-700 rounded-full p-1 transition-colors"
                aria-label={isExpanded ? 'Minimize chat' : 'Maximize chat'}
              >
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-indigo-700 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.type === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  <div className={`flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-indigo-600'
                      : 'bg-gray-600'
                  } rounded-full p-2`}>
                    {message.type === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {currentStreamedMessage && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="flex-shrink-0 bg-gray-600 rounded-full p-2">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    {currentStreamedMessage}
                  </div>
                </div>
              </div>
            )}
            {isLoading && !currentStreamedMessage && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-indigo-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}