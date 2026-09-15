import { useState } from 'react';

export function DirectChatWidget() {
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (!msg.trim()) return;
    alert(`Sent message: ${msg}`);
    setMsg('');
  };

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
      <h3 className="font-bold text-xs text-slate-800 pb-2 border-b border-slate-100">💬 Contractor Direct Chat</h3>
      <div className="my-3 space-y-2 text-xs">
        <div className="bg-slate-100 p-2 rounded-lg max-w-[85%] text-slate-800">
          <p className="font-bold text-[10px] text-slate-500 mb-0.5">Project Manager</p>
          <p>Hello! Let us know if you need to adjust color swatches for your estimate.</p>
        </div>
      </div>
      <div className="flex gap-1.5 pt-2 border-t border-slate-200 text-xs">
        <input 
          type="text" 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..." 
          className="w-full border border-slate-300 rounded px-2 py-1"
        />
        <button 
          type="button" 
          onClick={handleSend}
          className="bg-slate-900 text-white font-bold px-3 py-1 rounded hover:bg-slate-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
