const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const app = express();
let PORT = 3000;
const HOST = "127.0.0.1";

const ADMIN_USER = "admin";
const ADMIN_PASS = "Handyman2026!PQC";

const DATA_FILE = path.join(__dirname, "../data/projects.json");

if (!fs.existsSync(DATA_FILE)) {
    fs.ensureDirSync(path.dirname(DATA_FILE));
    fs.writeJsonSync(DATA_FILE, []);
}

app.use(express.json());

// Public static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/projects", express.static(path.join(__dirname, "../projects")));
app.use(express.static(path.join(__dirname, "../")));

// Simple Login Endpoint
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.json({ success: true, token: "authenticated_admin_session" });
    }
    return res.status(401).json({ error: "Invalid credentials" });
});

// Middleware checking custom header instead of browser Basic Auth
function verifyAuth(req, res, next) {
    const token = req.headers["x-admin-token"];
    if (token === "authenticated_admin_session") {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized" });
}

function getProjects() {
    try { return fs.readJsonSync(DATA_FILE); } catch (err) { return []; }
}

function saveProjects(projects) {
    fs.writeJsonSync(DATA_FILE, projects, { spaces: 2 });
}

app.use("/admin", express.static(path.join(__dirname, "../admin")));

app.get("/api/projects", verifyAuth, (req, res) => res.json(getProjects()));

app.post("/api/projects", verifyAuth, (req, res) => {
    const projects = getProjects();
    const newProj = req.body;
    newProj.evidence = newProj.evidence || [];
    projects.push(newProj);
    saveProjects(projects);
    res.json({ success: true });
});

app.delete("/api/projects/:id", verifyAuth, (req, res) => {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== req.params.id);
    saveProjects(projects);
    res.json({ success: true });
});

function startServer(port) {
    const server = app.listen(port, HOST, () => {
        console.log(`\n========================================`);
        console.log(`Dashboard running: http://${HOST}:${port}/admin/`);
        console.log(`========================================\n`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            startServer(port + 1);
        }
    });
}

startServer(PORT);
