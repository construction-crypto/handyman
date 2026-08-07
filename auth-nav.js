document.addEventListener("DOMContentLoaded", function () {
    const authContainer = document.getElementById("auth-menu-links");
    const userLabel = document.getElementById("user-menu-label");
    const staticLoginLink = document.querySelector('a[href="login.html"]');
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        // 1. Change menu button text to indicate active session
        if (userLabel) {
            userLabel.innerHTML = '<span class="text-red-600 font-black">●</span> My Account';
        }

        // 2. Hide static "Login" link inside the dropdown
        if (staticLoginLink) {
            staticLoginLink.style.display = "none";
        }

        // 3. Inject Logged-in Links (Dashboard & Logout)
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="dashboard.html" class="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100/70 hover:text-red-600 transition">Customer Portal</a>
                <a href="#" id="logout-btn" class="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-slate-100/70 transition border-t border-slate-200/80 mt-1 pt-2">Log Out</a>
            `;

            // Logout Handler
            document.getElementById("logout-btn")?.addEventListener("click", function(e) {
                e.preventDefault();
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userToken");
                alert("You have been logged out.");
                window.location.href = "index.html?v=" + new Date().getTime();
            });
        }
    }
});
