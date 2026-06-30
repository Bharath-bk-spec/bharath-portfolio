// ============================================================
// visit-tracker.js
// Add <script src="visit-tracker.js"></script> to ALL your
// HTML pages (index.html, swift-ticket.html, college-chatbot.html)
// Replace SUPABASE_URL and SUPABASE_KEY with your own values
// ============================================================

(function () {
  const SUPABASE_URL = 'https://inpcfzgxofwkmcmlbqgd.supabase.co'; // e.g. https://xxxx.supabase.co
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucGNmemd4b2Z3a21jbWxicWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4Mzk1MTIsImV4cCI6MjA5ODQxNTUxMn0.Tt1KTuCYncxB4uvF8VmVuih_AKsG_QQheVNlSHs5MRE';

  function getDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'Mobile';
    if (/Tablet|iPad/i.test(ua)) return 'Tablet';
    return 'Desktop';
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
    return 'Other';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Other';
  }

  function getSessionId() {
    let sid = sessionStorage.getItem('bbk_sid');
    if (!sid) {
      sid = Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
      sessionStorage.setItem('bbk_sid', sid);
    }
    return sid;
  }

  async function track() {
    // Skip if admin is viewing their own dashboard
    if (window.location.pathname.includes('dashboard')) return;

    const payload = {
      page: document.title || window.location.pathname,
      referrer: document.referrer || 'Direct',
      device: getDevice(),
      os: getOS(),
      browser: getBrowser(),
      screen_size: `${window.screen.width}x${window.screen.height}`,
      session_id: getSessionId(),
    };

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Silent fail — never break the portfolio
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', track);
  } else {
    track();
  }
})();
