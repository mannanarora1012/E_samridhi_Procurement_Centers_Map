let tnMarkers = [];

fetch("states/json/tamilnadu.json")
  .then(res => res.json())
  .then(tnData => {
    const tnLayer = L.geoJSON(tnData, {
      style: {
        color: 'black',
        weight: 0.1,
        fillOpacity: 0.15
      },
      onEachFeature: function (feature, layer) {
        const sampleLocations = [
          {
            name: "Chennai Procurement Center",
            coords: [13.0827, 80.2707],
            image: "https://tourismtn.com/wp-content/uploads/2020/11/Masani-Amman-Temple.jpg",
            address: "Chennai Central, Tamil Nadu",
            contact: "+91-44-12345678",
            website: "https://chennai-center.example.com",
            crops: "Rice, Millets, Pulses",
            totalProcurement: "15,200 MT",
            lastUpdated: "2025-06-15"
          },
          {
            name: "Coimbatore Procurement Center",
            coords: [11.0168, 76.9558],
            image: "https://tourismtn.com/wp-content/uploads/2020/11/Masani-Amman-Temple.jpg",
            address: "Gandhipuram, Coimbatore",
            contact: "+91-422-8765432",
            website: "https://coimbatore-center.example.com",
            crops: "Cotton, Coconut",
            totalProcurement: "9,800 MT",
            lastUpdated: "2025-06-12"
          },
          {
            name: "Madurai Procurement Center",
            coords: [9.9252, 78.1198],
            image: "https://tourismtn.com/wp-content/uploads/2020/11/Masani-Amman-Temple.jpg",
            address: "Meenakshi Amman Temple, Madurai",
            contact: "+91-452-4567890",
            website: "https://madurai-center.example.com",
            crops: "Banana, Paddy",
            totalProcurement: "7,600 MT",
            lastUpdated: "2025-06-10"
          },
          {
            name: "Tiruchirappalli Procurement Center",
            coords: [10.7905, 78.7047],
            image: "https://tourismtn.com/wp-content/uploads/2020/11/Masani-Amman-Temple.jpg",
            address: "Rockfort, Trichy",
            contact: "+91-431-1234567",
            website: "https://trichy-center.example.com",
            crops: "Sugarcane, Rice",
            totalProcurement: "8,100 MT",
            lastUpdated: "2025-06-09"
          },
          {
            name: "Salem Procurement Center",
            coords: [11.6643, 78.1460],
            image: "https://tourismtn.com/wp-content/uploads/2020/11/Masani-Amman-Temple.jpg",
            address: "Yercaud Road, Salem",
            contact: "+91-427-7890123",
            website: "https://salem-center.example.com",
            crops: "Turmeric, Tapioca",
            totalProcurement: "5,900 MT",
            lastUpdated: "2025-06-08"
          }
        ];

        layer.on('click', function () {
          map.fitBounds(layer.getBounds());

          // Remove existing markers
          tnMarkers.forEach(m => map.removeLayer(m));
          tnMarkers = [];

          // Add new markers with detailed popups
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
            tnMarkers.push(marker);
          });

          map._lastClickedTamilnadu = true;
        });

        layer.on('mouseover', function () {
          animateOpacity(layer, 0.15, 0.2, 200);

          const stateName = feature.properties?.name || "Tamil Nadu";
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
      if (!map._lastClickedTamilnadu) {
        tnMarkers.forEach(m => map.removeLayer(m));
        tnMarkers = [];
      }
      map._lastClickedTamilnadu = false;
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
