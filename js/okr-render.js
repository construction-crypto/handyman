async function loadOkrMetrics() {
  const container = document.getElementById('okr-container');
  if (!container) return;

  try {
    const res = await fetch('/api/okrs');
    const data = await res.json();

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="empty-state p-4 text-center text-muted">
          <p class="mb-0">No active OKR metrics found. Production metrics will appear once generated.</p>
        </div>`;
      return;
    }

    // Render live metrics if present
    container.innerHTML = data.map(item => `
      <div class="okr-card">
        <h6>${item.title}</h6>
        <p>${item.current_value} / ${item.target_value} ${item.unit}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load OKRs:', err);
    container.innerHTML = `<div class="text-danger p-3">Unable to load metrics.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', loadOkrMetrics);
