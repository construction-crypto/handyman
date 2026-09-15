// js/config.js - Centralized Project & Partner Configurations
export const AFFILIATE_LINKS = {
  benjaminMoore: "https://www.awin1.com/awclick.php?gid=569543&mid=95853&awinaffid=3072519&linkid=4373397&clickref="
};

/**
 * Renders a supplier order CTA button inside a target container.
 * @param {string} containerId - Element ID where button will render
 * @param {string} label - Custom CTA button text
 */
export function renderPaintOrderButton(containerId, label = "Order Swatches & Supplies") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <a href="${AFFILIATE_LINKS.benjaminMoore}" 
       target="_blank" 
       rel="sponsored noopener noreferrer" 
       class="btn-supplier-link">
      <span class="icon">🎨</span> ${label}
    </a>
  `;
}
