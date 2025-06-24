let upMarkers = [];

fetch("states/json/uttarpradesh.json")
  .then(res => res.json())
  .then(upData => {
    const upLayer = L.geoJSON(upData, {
      style: {
        color: 'black',
        weight: 0.1,
        fillOpacity: 0.15
      },
      onEachFeature: function (feature, layer) {
        const sampleLocations = [
          {
            name: "Lucknow Procurement Center",
            coords: [26.8467, 80.9462],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-taj-mahal-agra-uttar-pradesh-state-hero?qlt=82&ts=1726650592794",
            address: "Bara Imambara, Lucknow",
            contact: "+91-522-1234567",
            website: "https://lucknow-center.example.com",
            crops: "Wheat, Rice, Pulses",
            totalProcurement: "14,800 MT",
            lastUpdated: "2025-06-16"
          },
          {
            name: "Kanpur Procurement Center",
            coords: [26.4499, 80.3319],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-taj-mahal-agra-uttar-pradesh-state-hero?qlt=82&ts=1726650592794",
            address: "JK Temple, Kanpur",
            contact: "+91-512-8765432",
            website: "https://kanpur-center.example.com",
            crops: "Leather, Wheat, Cotton",
            totalProcurement: "11,400 MT",
            lastUpdated: "2025-06-14"
          },
          {
            name: "Varanasi Procurement Center",
            coords: [25.3176, 82.9739],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-taj-mahal-agra-uttar-pradesh-state-hero?qlt=82&ts=1726650592794",
            address: "Dashashwamedh Ghat, Varanasi",
            contact: "+91-542-9876543",
            website: "https://varanasi-center.example.com",
            crops: "Silk, Rice, Mango",
            totalProcurement: "9,700 MT",
            lastUpdated: "2025-06-12"
          },
          {
            name: "Prayagraj Procurement Center",
            coords: [25.4358, 81.8463],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-taj-mahal-agra-uttar-pradesh-state-hero?qlt=82&ts=1726650592794",
            address: "Sangam, Prayagraj",
            contact: "+91-532-5556667",
            website: "https://prayagraj-center.example.com",
            crops: "Guava, Wheat, Paddy",
            totalProcurement: "10,200 MT",
            lastUpdated: "2025-06-11"
          },
          {
            name: "Noida Procurement Center",
            coords: [28.5355, 77.3910],
            image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-taj-mahal-agra-uttar-pradesh-state-hero?qlt=82&ts=1726650592794",
            address: "Sector 18, Noida",
            contact: "+91-120-7778889",
            website: "https://noida-center.example.com",
            crops: "Vegetables, Dairy",
            totalProcurement: "7,500 MT",
            lastUpdated: "2025-06-10"
          }
        ];

        layer.on('click', function () {
          map.fitBounds(layer.getBounds());

          upMarkers.forEach(m => map.removeLayer(m));
          upMarkers = [];

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
            upMarkers.push(marker);
          });

          map._lastClickedUP = true;
        });

        layer.on('mouseover', function () {
          animateOpacity(layer, 0.15, 0.2, 200);

          const stateName = feature.properties?.name || "Uttar Pradesh";
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

    map.on("click", function () {
      if (!map._lastClickedUP) {
        upMarkers.forEach(m => map.removeLayer(m));
        upMarkers = [];
      }
      map._lastClickedUP = false;
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
