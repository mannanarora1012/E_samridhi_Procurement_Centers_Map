let markers = [];

fetch("states/json/maharashtra.json")
  .then(res => res.json())
  .then(mahaData => {
    const mahaLayer = L.geoJSON(mahaData, {
      style: {
        color: 'black',
        weight: 0.1,
        fillOpacity: 0.15
      },
      onEachFeature: function (feature, layer) {
          const sampleLocations = [
          {
            name: "Mumbai Procurement Center",
            coords: [19.0760, 72.8777],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/960px-F7xZ48abwAAgNst.jpg",
            address: "Gateway of India, Mumbai, Maharashtra",
            contact: "+91-22-12345678",
            website: "https://mumbaicenter.example.com",
            crops: "Rice, Wheat, Pulses",
            totalProcurement: "12,500 MT",
            lastUpdated: "2025-06-10"
          },
          {
            name: "Pune Procurement Center",
            coords: [18.5204, 73.8567],
            image: "https://www.yukio.in/blog/wp-content/uploads/2025/04/Tallest-Buildings-in-Pune.jpg",
            address: "Shaniwar Wada, Pune, Maharashtra",
            contact: "+91-20-87654321",
            website: "https://punecenter.example.com",
            crops: "Sugarcane, Wheat",
            totalProcurement: "8,900 MT",
            lastUpdated: "2025-06-08"
          },
          {
            name: "Nagpur Procurement Center",
            coords: [21.1458, 79.0882],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/2-ramtek-temple-nagpur-maharashtra-city-hero?qlt=82&ts=1726669879265",
            address: "Sitabuldi, Nagpur, Maharashtra",
            contact: "+91-71-1234567",
            website: "https://nagpurcenter.example.com",
            crops: "Cotton, Soybean",
            totalProcurement: "7,100 MT",
            lastUpdated: "2025-06-12"
          },
          {
            name: "Nashik Procurement Center",
            coords: [19.9975, 73.7898],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-trimbakeshwar-nashik--maharashtra_-city-hero?qlt=82&ts=1726675387974",
            address: "Trimbak Road, Nashik, Maharashtra",
            contact: "+91-25-12345678",
            website: "https://nashikcenter.example.com",
            crops: "Onion, Grapes",
            totalProcurement: "6,250 MT",
            lastUpdated: "2025-06-09"
          }
        ];

        layer.on('click', function (e) {
          map.fitBounds(layer.getBounds());

          markers.forEach(m => map.removeLayer(m));
          markers = [];

          sampleLocations.forEach(loc => {
            const popupContent = `
              <div class="custom-popup">
                <img src="${loc.image}" alt="${loc.name}" class="popup-img"/>
                <div class="custom-popup-content">
                  <h3>${loc.name}</h3>
                  <p><strong>Address:</strong> ${loc.address}</p>
                  <p><strong>Contact:</strong> ${loc.contact}</p>
                  <p><strong>Crops Procured:</strong> ${loc.crops}</p>
                  <p><strong>Total Procurement:</strong> ${loc.totalProcurement}</p>
                  <p><strong>Last Updated:</strong> ${loc.lastUpdated}</p>
                  <a href="${loc.website}" target="_blank" class="popup-link">Visit Website</a>
                </div>
              </div>
            `;
            const marker = L.marker(loc.coords).bindPopup(popupContent, { className: 'custom-popup-class', maxWidth: 320 });
            marker.addTo(map);
            markers.push(marker);
          });

          // Flag to indicate last clicked was Maharashtra
          map._lastClickedMaha = true;
        });

        layer.on('mouseover', function () {
          animateOpacity(layer, 0.15, 0.2, 200);

          const stateName = feature.properties?.name || "Maharashtra";
          if (!layer.getTooltip()) {
            layer.bindTooltip(stateName, {
              direction: "center",
              sticky: true,
              opacity: 0.9,
              className: "hover-label"
            });
          }
          layer.openTooltip();
        });

        layer.on('mouseout', function () {
          animateOpacity(layer, 0.2, 0.15, 200);
          layer.closeTooltip();
        });
      }
    }).addTo(map);

    map.on("click", function (e) {
      if (!map._lastClickedMaha) {
        markers.forEach(m => map.removeLayer(m));
        markers = [];
      }
      map._lastClickedMaha = false; // reset for next click
    });
  });

function animateOpacity(layer, from, to, duration) {
  const start = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = from + (to - from) * progress;
    layer.setStyle({ fillOpacity: current });
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
