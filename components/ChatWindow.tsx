import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { User } from '../types';

interface ChatWindowProps {
  chatWithUser: User;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatWithUser, onClose }) => {
  const { user: currentUser } = useAuth();
  const { messages, addMessage } = useData();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory = messages.filter(
    msg =>
      (msg.senderId === currentUser?.id && msg.receiverId === chatWithUser.id) ||
      (msg.senderId === chatWithUser.id && msg.receiverId === currentUser?.id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    addMessage({
      senderId: currentUser.id,
      receiverId: chatWithUser.id,
      content: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-0 right-4 w-96 bg-white border-t-4 border-brand-primary rounded-t-lg shadow-2xl flex flex-col z-50">
      <header className="bg-brand-primary text-white p-3 flex justify-between items-center rounded-t-md">
        <div className="flex items-center space-x-2">
          <img src={chatWithUser.avatarUrl} alt={chatWithUser.name} className="w-8 h-8 rounded-full" />
          <h3 className="font-bold">{chatWithUser.name}</h3>
        </div>
        <button onClick={onClose} className="text-white text-2xl hover:opacity-75">&times;</button>
      </header>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 h-80 bg-gray-50">
        {chatHistory.length > 0 ? chatHistory.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.senderId === currentUser?.id ? 'bg-brand-secondary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              <p>{msg.content}</p>
              <p className="text-xs opacity-75 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 pt-16">No messages yet. Start the conversation!</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t flex space-x-2">
        <input 
          type="text" 
          value={newMessage} 
          onChange={e => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-grow border p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-secondary" 
        />
        <button type="submit" className="bg-brand-primary text-white font-bold px-4 py-2 rounded-full hover:bg-brand-dark flex-shrink-0">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
