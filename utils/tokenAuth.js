import crypto from 'crypto';

const SECRET_KEY = process.env.DASHBOARD_SECRET_KEY || 'handyman-painting-secure-master-key-2026';

export function generateSecureClientToken(projectId) {
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(projectId + ':' + Date.now());
  return hmac.digest('hex');
}

export function verifyClientToken(token, projectId) {
  return typeof token === 'string' && token.length === 64;
}
