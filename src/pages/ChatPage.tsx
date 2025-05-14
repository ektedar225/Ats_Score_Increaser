import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Paperclip as PaperClip, Clock, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Message {
  id: string;
  user_id: string;
  content: string;
  is_expert: boolean;
  created_at: string;
  attachment_url?: string;
}

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load initial messages
    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `user_id=eq.${currentUser.uid}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', currentUser?.uid)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            user_id: currentUser?.uid,
            content: newMessage,
            is_expert: false,
          },
        ]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${currentUser?.uid}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat_attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat_attachments')
        .getPublicUrl(filePath);

      await supabase
        .from('messages')
        .insert([
          {
            user_id: currentUser?.uid,
            content: `Shared file: ${file.name}`,
            is_expert: false,
            attachment_url: publicUrl,
          },
        ]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">ATS Expert Chat</h2>
          <p className="text-sm text-gray-600">Get help with your resume</p>
        </div>
        
        <div className="rounded-lg bg-primary-50 p-4">
          <h3 className="mb-2 font-medium text-primary-900">Session Info</h3>
          <div className="flex items-center text-sm text-primary-700">
            <Clock className="mr-2 h-4 w-4" />
            <span>24 hours remaining</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 font-medium text-gray-900">Quick Actions</h3>
          <button className="mb-2 flex w-full items-center rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100">
            <FileText className="mr-2 h-4 w-4" />
            Upload Resume
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.is_expert ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.is_expert
                      ? 'bg-white text-gray-900'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.attachment_url && (
                    <a
                      href={message.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center text-sm underline"
                    >
                      <PaperClip className="mr-1 h-4 w-4" />
                      View Attachment
                    </a>
                  )}
                  <span className="mt-1 block text-xs opacity-75">
                    {format(new Date(message.created_at), 'HH:mm')}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <PaperClip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={isLoading || !newMessage.trim()}
              className="flex-shrink-0 rounded-full bg-primary-600 p-2 text-white hover:bg-primary-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;