-- PostgreSQL Schema Initialization for Handyman Painting L.L.C.
-- Database: Customer Accounts
-- User: HDM (fallback: postgres)

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS client_sessions;
DROP TABLE IF EXISTS client_accounts;

CREATE TABLE client_accounts (
    client_id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    property_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE client_sessions (
    session_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client_accounts(client_id) ON DELETE CASCADE,
    auth_token VARCHAR(512) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client_accounts(client_id) ON DELETE SET NULL,
    action_performed VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_email ON client_accounts(email);
CREATE INDEX idx_session_token ON client_sessions(auth_token);
