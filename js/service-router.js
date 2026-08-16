(function () {
    const mountPoint = document.getElementById('service-router-mount');
    if (!mountPoint) return;

    let currentStep = 1;
    let selectedService = '';

    function render() {
        if (currentStep === 1) {
            mountPoint.innerHTML = `
                <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
                    <span class="text-amber-600 font-bold text-xs uppercase tracking-wider block mb-1">Step 1 of 2: Select Service</span>
                    <h3 class="text-2xl font-black text-slate-900 mb-2">What project can we help you with today?</h3>
                    <p class="text-slate-600 text-sm mb-6">Choose a service category to find the fastest estimation path.</p>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button onclick="window.ServiceRouter.selectService('roofing')" class="p-5 border-2 border-slate-200 hover:border-amber-500 rounded-xl text-left transition bg-slate-50 hover:bg-amber-50/30">
                            <span class="text-2xl block mb-2">🏠</span>
                            <span class="font-bold text-slate-900 block text-base">Roofing</span>
                            <span class="text-xs text-slate-500 mt-1 block">Full replacements, storm damage & repairs.</span>
                        </button>

                        <button onclick="window.ServiceRouter.selectService('painting')" class="p-5 border-2 border-slate-200 hover:border-amber-500 rounded-xl text-left transition bg-slate-50 hover:bg-amber-50/30">
                            <span class="text-2xl block mb-2">🎨</span>
                            <span class="font-bold text-slate-900 block text-base">Painting</span>
                            <span class="text-xs text-slate-500 mt-1 block">Exterior siding, trim, and interior walls.</span>
                        </button>

                        <button onclick="window.ServiceRouter.selectService('handyman')" class="p-5 border-2 border-slate-200 hover:border-amber-500 rounded-xl text-left transition bg-slate-50 hover:bg-amber-50/30">
                            <span class="text-2xl block mb-2">🛠️</span>
                            <span class="font-bold text-slate-900 block text-base">Handyman</span>
                            <span class="text-xs text-slate-500 mt-1 block">General repairs, fixes, & property upkeep.</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (currentStep === 2) {
            mountPoint.innerHTML = `
                <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-amber-600 font-bold text-xs uppercase tracking-wider block">Step 2 of 2: Service Route</span>
                        <button onclick="window.ServiceRouter.reset()" class="text-xs text-slate-500 hover:text-slate-900 font-semibold underline">← Start Over</button>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">How would you like to proceed with your ${selectedService.toUpperCase()} quote?</h3>
                    
                    <div class="space-y-4 mt-6">
                        <div onclick="window.location.href='${selectedService}.html#quote'" class="p-4 border border-slate-200 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition flex justify-between items-center">
                            <div>
                                <span class="font-bold text-slate-900 block text-sm">Standard Automated Estimate</span>
                                <span class="text-xs text-slate-600">Calculates an instant quote range on your dashboard using parcel data.</span>
                            </div>
                            <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded">FREE</span>
                        </div>

                        <div onclick="window.location.href='${selectedService}.html#quote?type=eagleview'" class="p-4 border border-slate-200 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition flex justify-between items-center">
                            <div>
                                <span class="font-bold text-slate-900 block text-sm">EagleView Precision Satellite Report</span>
                                <span class="text-xs text-slate-600">3D satellite surface measurements & verified line-item estimate.</span>
                            </div>
                            <span class="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded">+$50 Expedited</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Expose standalone controller functions safely under a global namespace
    window.ServiceRouter = {
        selectService: function (service) {
            selectedService = service;
            currentStep = 2;
            render();
        },
        reset: function () {
            currentStep = 1;
            selectedService = '';
            render();
        }
    };

    document.addEventListener('DOMContentLoaded', render);
})();
