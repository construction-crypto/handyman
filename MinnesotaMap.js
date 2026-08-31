// Minnesota State Outline and Precise Regional Node Layout
export const MinnesotaMapSVG = `
<svg viewBox="0 0 600 650" class="mn-state-map" id="mnMapContainer">
    <!-- Official Minnesota Border Path -->
    <path class="state-boundary" d="M180,20 L420,20 L440,80 L520,110 L560,190 L530,250 L560,310 L510,380 L470,440 L450,520 L430,620 L380,630 L350,560 L320,530 L290,560 L240,510 L220,440 L160,390 L120,400 L80,340 L100,280 L70,220 L120,160 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="4" />

    <!-- Regional Hub Nodes -->
    <!-- Twin Cities -->
    <g class="map-node" data-region="twin-cities" onclick="zoomToNode(this, document.getElementById('mnMapContainer'))" style="cursor: pointer;">
        <circle cx="390" cy="420" r="8" fill="#60a5fa" class="node-dot" />
        <text x="405" y="425" fill="#f8fafc" font-size="12" font-family="sans-serif">Twin Cities</text>
    </g>

    <!-- Rochester -->
    <g class="map-node" data-region="rochester" onclick="zoomToNode(this, document.getElementById('mnMapContainer'))" style="cursor: pointer;">
        <circle cx="440" cy="520" r="8" fill="#60a5fa" class="node-dot" />
        <text x="455" y="525" fill="#f8fafc" font-size="12" font-family="sans-serif">Rochester</text>
    </g>

    <!-- Duluth -->
    <g class="map-node" data-region="duluth" onclick="zoomToNode(this, document.getElementById('mnMapContainer'))" style="cursor: pointer;">
        <circle cx="460" cy="180" r="8" fill="#60a5fa" class="node-dot" />
        <text x="475" y="185" fill="#f8fafc" font-size="12" font-family="sans-serif">Duluth</text>
    </g>

    <!-- St. Cloud -->
    <g class="map-node" data-region="st-cloud" onclick="zoomToNode(this, document.getElementById('mnMapContainer'))" style="cursor: pointer;">
        <circle cx="330" cy="380" r="8" fill="#60a5fa" class="node-dot" />
        <text x="250" y="385" fill="#f8fafc" font-size="12" font-family="sans-serif">St. Cloud</text>
    </g>

    <!-- Montevideo -->
    <g class="map-node" data-region="montevideo" onclick="zoomToNode(this, document.getElementById('mnMapContainer'))" style="cursor: pointer;">
        <circle cx="220" cy="430" r="8" fill="#f43f5e" class="node-dot" />
        <text x="135" y="435" fill="#f8fafc" font-size="12" font-family="sans-serif">Montevideo</text>
    </g>
</svg>
`;
