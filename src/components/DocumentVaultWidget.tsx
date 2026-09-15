export function DocumentVaultWidget() {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="font-bold text-xs text-slate-800">📂 Secure Document Vault</h3>
        <button 
          type="button"
          onClick={() => alert('Opening Uploader...')}
          className="text-[10px] bg-slate-900 text-white font-bold px-2.5 py-1 rounded hover:bg-slate-800"
        >
          + Upload File
        </button>
      </div>
      <div className="space-y-2 text-xs">
        <div className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-800 text-[11px]">W9_Form_Contractor.pdf</p>
            <p className="text-[9px] text-slate-400">Verified • 1.2 MB</p>
          </div>
          <button type="button" className="text-slate-600 hover:text-slate-900 font-bold text-[10px] underline">Download</button>
        </div>
      </div>
    </div>
  );
}
