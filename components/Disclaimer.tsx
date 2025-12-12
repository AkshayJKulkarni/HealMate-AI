import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 border-t border-slate-200 p-2 text-center text-xs text-slate-500">
      <p className="font-semibold text-red-500 inline-block mr-1">EMERGENCY:</p> 
      If you have severe chest pain, difficulty breathing, or a life-threatening emergency, call your local emergency number immediately. HealMate AI is an automated system and does not replace professional medical advice.
    </div>
  );
};