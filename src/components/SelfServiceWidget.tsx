export function SelfServiceWidget() {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="font-bold text-xs text-slate-800">🛠️ Centralized Self-Service Tools</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button 
          type="button"
          onClick={() => alert('Requesting Bid...')}
          className="p-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-left flex flex-col justify-between"
        >
          <span className="font-bold text-[11px]">📋 Request Bid</span>
          <span className="text-[9px] text-slate-300 mt-1">Get instant estimates</span>
        </button>
        <button 
          type="button"
          onClick={() => alert('Opening Scheduler...')}
          className="p-2.5 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition text-left flex flex-col justify-between"
        >
          <span className="font-bold text-[11px]">📅 Schedule Service</span>
          <span className="text-[9px] text-slate-800 font-medium mt-1">Book a site visit</span>
        </button>
      </div>
    </div>
  );
}
