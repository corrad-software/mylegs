import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Send, Sparkles, Bot, User, Trash2, AlertCircle, Camera, X, Image as ImageIcon, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string; // To display uploaded image in chat history
}

const SUGGESTIONS = [
  "Explain Stare Decisis in Malaysia",
  "Jurisdiction of Syariah Courts",
  "Functions of the Federal Court",
  "Art. 121(1A) Federal Constitution"
];

// Strict System Instruction
const SYSTEM_INSTRUCTION = `
You are the official AI Tutor for "MyLegS" (Malaysian Legal System App).
YOUR MANDATE: Provide accurate, academic assistance strictly related to the Malaysian Legal System course.

STRICT SCOPE BOUNDARIES:
1. ONLY answer questions about Malaysian Statutes (e.g., Federal Constitution, Contracts Act), Case Law (Malaysian judgments), Court Hierarchy, and Legal Principles applicable in Malaysia.
2. IMMEDIATELY REJECT any topic outside this scope (e.g., general life advice, coding, foreign law, cooking) with: "I can only assist with the Malaysian Legal System."
3. DO NOT answer questions about specific real-world legal cases the user might be involved in (Avoid unauthorized legal advice). State: "I provide educational information only, not legal advice."

FACT-CHECKING PROTOCOL:
1. VERIFY FACTS: Only state principles found in written Malaysian law.
2. NO HALLUCINATION: If a case or section is ambiguous, state "The specific section is not in my immediate verified context" rather than inventing one.
3. CITATION: Where possible, mention the relevant Act or Constitution Article (e.g., "Under Article 5...").

RESPONSE FORMAT:
- Be concise and budget-conscious. Avoid fluff.
- Use Markdown for structure (Bold for keywords, bullet points for lists).
- Keep answers short (under 200 words unless detailed explanation is requested).
`;

const AIChat: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uiMessage, setUiMessage] = useState<{text: string, type: 'error' | 'info'} | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, selectedImage, uiMessage]);

  const handleCameraClick = () => {
    if (user?.tierId !== 'premium') {
      setUiMessage({
        text: "Image Analysis is a Premium feature. Upgrade to snap photos of textbook questions.",
        type: 'info'
      });
      setTimeout(() => setUiMessage(null), 4000);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUiMessage({ text: "Image too large (max 5MB)", type: 'error' });
        setTimeout(() => setUiMessage(null), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setUiMessage(null);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    e.target.value = '';
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage;
    
    setInput('');
    setSelectedImage(null); // Clear immediately for UI responsiveness
    
    // Optimistic UI Update
    setMessages(prev => [...prev, { role: 'user', text: userMessage, image: currentImage || undefined }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 600, 
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 0 } 
        },
      });

      let messagePayload: any = userMessage;

      // Handle Image Payload
      if (currentImage) {
        const base64Data = currentImage.split(',')[1];
        const mimeType = currentImage.substring(currentImage.indexOf(':') + 1, currentImage.indexOf(';'));
        
        // If text is empty but image exists, we must provide some text prompt usually, or just the image part.
        // But the SDK often requires text. If input is empty, we can provide a default prompt for the image.
        const textPrompt = userMessage || "Analyze this image in the context of Malaysian Law.";

        messagePayload = [
          { text: textPrompt },
          { inlineData: { mimeType: mimeType, data: base64Data } }
        ];
      }

      const result = await chat.sendMessageStream({ message: messagePayload });

      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newArr = [...prev];
            const lastMsg = newArr[newArr.length - 1];
            if (lastMsg.role === 'model') {
              lastMsg.text = fullResponse;
            }
            return newArr;
          });
        }
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "**System Error:** I could not connect to the legal database. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col animate-page-enter pb-safe">
      
      {/* HEADER (Standardized) */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 px-6 flex items-center justify-between border-b border-slate-200/50">
        <button onClick={() => navigate('/more')} className="group flex items-center text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1.5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold uppercase tracking-wide">Back</span>
        </button>
        <div className="flex items-center space-x-2">
            <h1 className="font-serif text-lg font-bold text-primary">AI Tutor</h1>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 rounded-md shadow-sm">
                <Sparkles className="w-3 h-3 text-white" />
            </div>
        </div>
        <button onClick={clearChat} className="text-secondary hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100" disabled={messages.length === 0}>
            <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60 mt-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100">
                <Bot className="w-8 h-8 text-brand" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">MyLegS AI</h3>
            <p className="text-sm text-secondary max-w-xs leading-relaxed mb-6 font-medium">
              Specialized assistance for the Malaysian Legal System course. Verified facts only.
            </p>
            
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                {SUGGESTIONS.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => setInput(s)}
                        className="text-xs font-bold text-secondary bg-surface border border-slate-200 py-3 px-4 rounded-xl hover:border-brand/40 hover:text-brand transition-colors shadow-sm text-left truncate active:scale-[0.98]"
                    >
                        {s}
                    </button>
                ))}
            </div>
            <div className="mt-8 flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wide">Educational Use Only</span>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end space-x-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0 mb-4 shadow-sm ring-2 ring-white">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="flex flex-col items-end max-w-[85%]">
              {/* Image in History */}
              {msg.image && (
                <div className="mb-2 rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-w-[200px]">
                  <img src={msg.image} alt="User upload" className="w-full h-auto" />
                </div>
              )}

              <div
                className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm w-full ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none shadow-blue-900/10 font-medium'
                    : 'bg-white text-primary border border-slate-100 rounded-bl-none'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap">{msg.text || (msg.image ? "Analyzed attached image." : "")}</div>
                ) : (
                  <div className="markdown-content">
                    <ReactMarkdown 
                      components={{
                        strong: ({node, ...props}) => <span className="font-bold text-black" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        h1: ({node, ...props}) => <h1 className="font-bold text-base mt-2 mb-1" {...props} />,
                        h2: ({node, ...props}) => <h2 className="font-bold text-sm mt-2 mb-1" {...props} />,
                        h3: ({node, ...props}) => <h3 className="font-bold text-sm mt-2 mb-1" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mb-4 ring-2 ring-white">
                 <User className="w-4 h-4 text-slate-500" />
               </div>
            )}
          </div>
        ))}

        {isLoading && (
            <div className="flex items-end space-x-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0 mb-1 ring-2 ring-white">
                    <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                    <div className="flex space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md p-4 border-t border-slate-100">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />

        {/* Premium UI Message */}
        {uiMessage && (
          <div className={`absolute -top-16 left-4 right-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg animate-slide-up ${
            uiMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-100'
          }`}>
             {uiMessage.type === 'info' && <Crown className="w-4 h-4 shrink-0 text-amber-500" />}
             {uiMessage.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
             {uiMessage.text}
          </div>
        )}

        <div className="relative max-w-md mx-auto">
          {/* Image Preview Area */}
          {selectedImage && (
             <div className="absolute bottom-full left-0 mb-3 bg-white p-2 rounded-xl border border-slate-200 shadow-lg animate-slide-up">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                   <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                   <button 
                    onClick={clearImage}
                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                   >
                     <X className="w-3 h-3" />
                   </button>
                </div>
             </div>
          )}

          <div className="flex items-center gap-2">
            {/* Camera Button */}
            <button
              onClick={handleCameraClick}
              className="p-3 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 active:scale-95 transition-all"
              title="Upload Image (Premium)"
            >
              <Camera className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={selectedImage ? "Add a caption..." : "Ask about the Malaysian Legal System..."}
                className="w-full bg-slate-50 text-primary placeholder-slate-400 rounded-full py-3.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-brand/10 focus:bg-white border border-slate-200 focus:border-brand/20 transition-all font-medium text-sm shadow-inner"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={(!input.trim() && !selectedImage) || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-brand transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;