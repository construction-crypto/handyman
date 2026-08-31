// Updated zoom and pan matrix calculation for exact node centering
function zoomToNode(nodeElement, svgContainer) {
    const rect = nodeElement.getBoundingClientRect();
    const containerRect = svgContainer.getBoundingClientRect();
    
    // Extract exact coordinates of the clicked node
    const nodeX = parseFloat(nodeElement.getAttribute('cx')) || rect.left + rect.width / 2;
    const nodeY = parseFloat(nodeElement.getAttribute('cy')) || rect.top + rect.height / 2;
    
    // Compute the center of the viewport container
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    
    // Calculate precise translation offsets to center the node
    const translateX = centerX - nodeX;
    const translateY = centerY - nodeY;
    
    // Apply dynamic transform origin and matrix scale/translation
    svgContainer.style.transformOrigin = `${nodeX}px ${nodeY}px`;
    svgContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(2.5)`;
}
