import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

// Helper to format the structured response specifically for the Triage format
const TriageFormatter: React.FC<{ text: string }> = ({ text }) => {
  // Split by headers to create distinct sections
  const sections = text.split(/(?=### )/g);

  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const trimmed = section.trim();
        if (!trimmed) return null;

        // Clean up the header mark for display content
        // We use includes() to match because of potential extra spaces or emojis

        if (trimmed.includes('Triage Summary')) { // ### 🟩 Triage Summary
          return (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
              <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                <span className="mr-2 text-xl">🟩</span>
                Triage Summary
              </h3>
              <div className="text-blue-900 text-sm whitespace-pre-line leading-relaxed pl-1">
                {trimmed.replace(/###.*Triage Summary/, '').trim()}
              </div>
            </div>
          );
        }

        if (trimmed.includes('Personalized Care Pathway')) { // ### 🩺 Personalized Care Pathway
          return (
            <div key={index} className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r shadow-sm">
              <h3 className="font-bold text-emerald-800 mb-2 flex items-center">
                <span className="mr-2 text-xl">🩺</span>
                Personalized Care Pathway
              </h3>
              <div className="text-emerald-900 text-sm whitespace-pre-line leading-relaxed pl-1">
                 {trimmed.replace(/###.*Personalized Care Pathway/, '').trim()}
              </div>
            </div>
          );
        }

        if (trimmed.includes('Warning Signs')) { // ### ⚠️ Warning Signs...
          return (
            <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
              <h3 className="font-bold text-red-800 mb-2 flex items-center">
                <span className="mr-2 text-xl">⚠️</span>
                Warning Signs
              </h3>
              <div className="text-red-900 text-sm whitespace-pre-line leading-relaxed pl-1">
                 {trimmed.replace(/###.*Warning Signs.*/, '').trim()}
              </div>
            </div>
          );
        }

        if (trimmed.includes('Updated Insights')) { // ### 🔁 Updated Insights
          return (
            <div key={index} className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r shadow-sm">
              <h3 className="font-bold text-indigo-800 mb-2 flex items-center">
                <span className="mr-2 text-xl">🔁</span>
                Updated Insights
              </h3>
              <div className="text-indigo-900 text-sm whitespace-pre-line leading-relaxed pl-1">
                 {trimmed.replace(/###.*Updated Insights/, '').trim()}
              </div>
            </div>
          );
        }

        if (trimmed.includes('Follow-up Questions')) { // ### ❓ Follow-up Questions
          return (
            <div key={index} className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r shadow-sm">
              <h3 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="mr-2 text-xl">❓</span>
                Follow-up Questions
              </h3>
              <div className="text-amber-900 text-sm whitespace-pre-line leading-relaxed pl-1 font-medium">
                 {trimmed.replace(/###.*Follow-up Questions.*/, '').trim()}
              </div>
            </div>
          );
        }

        if (trimmed.includes('Exportable Summary')) { // ### 📄 Exportable Summary
          return (
            <div key={index} className="bg-slate-100 border border-slate-200 p-3 rounded-lg shadow-inner mt-4">
              <h3 className="font-bold text-slate-600 mb-1 text-xs uppercase tracking-wider flex items-center">
                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 Doctor Shareable Summary
              </h3>
              <div className="text-slate-700 text-xs font-mono whitespace-pre-wrap bg-white p-2 rounded border border-slate-200">
                 {trimmed.replace(/###.*Exportable Summary.*/, '').trim()}
              </div>
            </div>
          );
        }

        // Hide the language meta tag if it appears, or just render it plainly if it has content
        if (trimmed.includes('Language')) {
           return null;
        }

        if (trimmed.includes('Disclaimer')) {
          // We have a sticky footer, so we can display this faintly
          return (
             <div key={index} className="text-xs text-slate-400 mt-2 italic border-t border-slate-100 pt-2">
                {trimmed.replace(/###.*Disclaimer/, '').trim()}
             </div>
          )
        }
        
        // Default text rendering for introductions or other sections
        return (
          <div key={index} className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
             {trimmed.replace(/^### /, '')} 
          </div>
        );
      })}
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[95%] md:max-w-[85%] rounded-2xl p-4 shadow-sm
          ${isUser 
            ? 'bg-teal-600 text-white rounded-br-none' 
            : 'bg-white border border-slate-100 rounded-bl-none'
          }
        `}
      >
        <div className="flex items-center gap-2 mb-1 opacity-75 text-xs">
          <span className="font-semibold capitalize">{isUser ? 'You' : 'HealMate AI'}</span>
          <span>•</span>
          <span>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <TriageFormatter text={message.content} />
        )}
      </div>
    </div>
  );
};