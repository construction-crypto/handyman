module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/projects/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tokenAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/tokenAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$emailDispatcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/emailDispatcher.js [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { id, currentPhase, progress, cureStatus, clientEmail, clientName } = body;
        if (!id || !currentPhase) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Project ID and current phase are required"
            }, {
                status: 400
            });
        }
        const clientToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$tokenAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateSecureClientToken"])(id);
        const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "api", "database.sqlite");
        const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
        const sql = "INSERT OR REPLACE INTO projects (id, client_token, current_phase, progress, cure_status, created_at) VALUES (?, ?, ?, ?, ?, ?)";
        const insert = db.prepare(sql);
        insert.run(id, clientToken, currentPhase, progress || 0, cureStatus || "Initialized", new Date().toISOString());
        const dashboardUrl = `/dashboard?token=${clientToken}`;
        let emailResult = {
            success: false,
            skipped: true
        };
        if (clientEmail) {
            emailResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$emailDispatcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendClientPortalEmail"])({
                clientEmail,
                clientName,
                dashboardUrl
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            projectId: id,
            clientToken,
            dashboardUrl,
            emailResult
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create project and dispatch email",
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
"[project]/utils/emailDispatcher.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendProjectPortalEmail",
    ()=>sendProjectPortalEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY || "re_dummy_key");
async function sendProjectPortalEmail({ clientEmail, clientName, projectId, clientToken }) {
    const portalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard?token=${clientToken}`;
    try {
        const data = await resend.emails.send({
            from: "Handyman Painting L.L.C. <portal@handymanpaintingllc.co>",
            to: [
                clientEmail
            ],
            subject: `Your Project Portal Access - Project #${projectId}`,
            html: `
        <div style="font-family: Inter, sans-serif; background-color: #F8F9FA; padding: 40px; color: #1A1A1A;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 24px 32px; border-bottom: 2px solid #C5A059;">
              <h2 style="color: white; margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em;">Handyman Painting L.L.C.</h2>
              <span style="color: #C5A059; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Customer Project Center</span>
            </div>
            <div style="padding: 32px;">
              <h3 style="color: #0F172A; margin-top: 0; font-size: 20px;">Hello ${clientName},</h3>
              <p style="color: #4A5568; font-size: 14px; line-height: 1.6;">Your project portal has been successfully initialized. You can track your real-time phases, view cure status, and access project tools instantly via your secure link below:</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${portalUrl}" style="background-color: #0F172A; color: #C5A059; padding: 14px 28px; border-radius: 4px; font-weight: bold; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; display: inline-block; border: 1px solid #C5A059;">Open Your Secure Portal</a>
              </div>

              <p style="color: #718096; font-size: 12px; line-height: 1.5; border-top: 1px solid #F1F5F9; paddingTop: 20px;">If you have any questions or need to reach your crew lead directly, call us at <strong>320-321-9359</strong>. You Betcha, Quality Guaranteed.</p>
            </div>
          </div>
        </div>
      `
        });
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error("Failed to send portal email:", error);
        return {
            success: false,
            error
        };
    }
}
}),
"[project]/utils/tokenAuth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateSecureClientToken",
    ()=>generateSecureClientToken,
    "verifyClientToken",
    ()=>verifyClientToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const SECRET_KEY = process.env.DASHBOARD_SECRET_KEY || 'handyman-painting-secure-master-key-2026';
function generateSecureClientToken(projectId) {
    const hmac = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', SECRET_KEY);
    hmac.update(projectId + ':' + Date.now());
    return hmac.digest('hex');
}
function verifyClientToken(token, projectId) {
    return typeof token === 'string' && token.length === 64;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__03se5t9._.js.map