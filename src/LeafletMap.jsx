import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";

const LeafletMap = () => {
  const [showTable, setShowTable] = useState(true);
  const [selectedArea, setSelectedArea] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const navigate = useNavigate();

  const cropData = [
    // Palm Oil Plantations
    {
      cropId: 1,
      cropName: "Palm Oil",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 5000,
      cropProduction: 15000,
      Area: "Membalong",
      details: "Large scale plantation, mature trees"
    },
    {
      cropId: 2,
      cropName: "Palm Oil",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 4500,
      cropProduction: 13500,
      Area: "Sijuk",
      details: "Mixed age plantation"
    },
    
    // Rubber Plantations
    {
      cropId: 3,
      cropName: "Rubber",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 3000,
      cropProduction: 2500,
      Area: "Badau",
      details: "Traditional rubber plantation"
    },
    {
      cropId: 4,
      cropName: "Rubber",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 2800,
      cropProduction: 2300,
      Area: "Gantung",
      details: "Mixed with other crops"
    },

    // Food Crops
    {
      cropId: 5,
      cropName: "Rice",
      cropType: "Food Crop",
      cropSeason: "Rainy Season",
      cropArea: 2000,
      cropProduction: 4000,
      Area: "Dendang",
      details: "Lowland rice fields"
    },
    {
      cropId: 6,
      cropName: "Corn",
      cropType: "Food Crop",
      cropSeason: "Dry Season",
      cropArea: 800,
      cropProduction: 1200,
      Area: "Manggar",
      details: "Rotation crop"
    },

    // Cash Crops
    {
      cropId: 7,
      cropName: "White Pepper",
      cropType: "Cash Crop",
      cropSeason: "Year-round",
      cropArea: 1200,
      cropProduction: 800,
      Area: "Tanjung Pandan",
      details: "Premium quality pepper"
    },
    {
      cropId: 8,
      cropName: "Coconut",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 1500,
      cropProduction: 3000,
      Area: "Selat Nasik",
      details: "Coastal plantation"
    },

    // Additional Areas
    {
      cropId: 9,
      cropName: "Mixed Vegetables",
      cropType: "Food Crop",
      cropSeason: "Year-round",
      cropArea: 500,
      cropProduction: 750,
      Area: "Air Seruk",
      details: "Small-scale farming"
    },
    {
      cropId: 10,
      cropName: "Fruits",
      cropType: "Food Crop",
      cropSeason: "Seasonal",
      cropArea: 1000,
      cropProduction: 2000,
      Area: "Kelapa Kampit",
      details: "Various tropical fruits"
    },
    
    // New Areas
    {
      cropId: 11,
      cropName: "Palm Oil",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 3500,
      cropProduction: 10500,
      Area: "Simpang Pesak",
      details: "New plantation area"
    },
    {
      cropId: 12,
      cropName: "Cassava",
      cropType: "Food Crop",
      cropSeason: "Year-round",
      cropArea: 600,
      cropProduction: 1800,
      Area: "Petikan",
      details: "Local consumption"
    },
    {
      cropId: 13,
      cropName: "Rubber",
      cropType: "Plantation",
      cropSeason: "Year-round",
      cropArea: 2500,
      cropProduction: 2000,
      Area: "Buluh Tumbang",
      details: "Community plantation"
    },
    {
      cropId: 14,
      cropName: "Mixed Farming",
      cropType: "Various",
      cropSeason: "Year-round",
      cropArea: 800,
      cropProduction: 1200,
      Area: "Pegantungan",
      details: "Integrated farming system"
    }
  ];

  const districtCoordinates = {
    "Tanjung Pandan": [-2.7410, 107.7007],
    "Membalong": [-2.8833, 107.7833],
    "Sijuk": [-2.7167, 107.6333],
    "Badau": [-2.8000, 107.7000],
    "Manggar": [-2.8819, 108.2937],
    "Gantung": [-2.7333, 108.2000],
    "Dendang": [-2.8500, 108.1500],
    "Selat Nasik": [-2.7500, 107.9667],
    "Air Seruk": [-2.7100, 107.6500],
    "Kelapa Kampit": [-2.8600, 108.1000],
    "Simpang Pesak": [-2.8900, 108.2000],
    "Petikan": [-2.7800, 107.8500],
    "Buluh Tumbang": [-2.8200, 107.9000],
    "Pegantungan": [-2.7600, 107.8000]
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && !mapContainer._leaflet_id) {
      // Initialize map centered on Belitung
      const map = L.map("map").setView([-2.7410, 107.7007], 10);
      var locationMarker;

      // Fix for default icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Custom icon configuration
      const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Function to create popup content for each district
      function createDistrictPopup(district) {
        const crops = cropData.filter(crop => crop.Area === district);
        let popupContent = `
          <div class="font-bold text-lg mb-2">${district}</div>
        `;
        
        if (crops.length > 0) {
          popupContent += '<div class="text-sm">Main Crops:';
          popupContent += '<ul class="list-disc pl-4">';
          crops.forEach(crop => {
            popupContent += `
              <li>${crop.cropName} (${crop.cropType})
                <br>Area: ${crop.cropArea} Ha
                <br>Production: ${crop.cropProduction} Tons
              </li>
            `;
          });
          popupContent += '</ul></div>';
        } else {
          popupContent += '<div class="text-sm text-gray-600">No crop data available</div>';
        }
        
        return popupContent;
      }

      // Add markers for each district
      Object.entries(districtCoordinates).forEach(([district, coords]) => {
        L.marker(coords, { icon: customIcon })
          .addTo(map)
          .bindPopup(createDistrictPopup(district), {
            maxWidth: 300,
            className: 'custom-popup'
          });
      });

      // Function to calculate statistics for an area
      function calculateStatistics(crops) {
        return {
          totalArea: crops.reduce((sum, crop) => sum + crop.cropArea, 0),
          totalProduction: crops.reduce((sum, crop) => sum + crop.cropProduction, 0),
          cropTypes: [...new Set(crops.map(crop => crop.cropType))],
          cropCount: crops.length
        };
      }

      // Function to update the info container with crop cards
      function updateInfoContainer(crops) {
        const container = document.getElementById("info-div-container");
        container.innerHTML = "";
        
        if (crops.length > 0) {
          crops.forEach(crop => {
            const cropCard = createCropCard(crop);
            container.appendChild(cropCard);
          });
        } else {
          container.innerHTML = `
            <div class="w-full px-4 mb-2">
              <div class="bg-red-800 text-white p-3 rounded-lg">
                No agricultural data available for this area
              </div>
            </div>
          `;
        }
      }

      // Handle map click events
      map.on("click", function(e) {
        if (locationMarker) {
          map.removeLayer(locationMarker);
        }

        // Find nearest district to clicked point
        let nearestDistrict = null;
        let shortestDistance = Infinity;

        Object.entries(districtCoordinates).forEach(([district, coords]) => {
          const distance = L.latLng(e.latlng).distanceTo(L.latLng(coords));
          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestDistrict = district;
          }
        });

        if (nearestDistrict) {
          const coords = districtCoordinates[nearestDistrict];
          
          // Add marker at clicked location
          locationMarker = L.marker(coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(createDistrictPopup(nearestDistrict))
            .openPopup();

          // Filter crops for selected district
          const cropsInArea = cropData.filter(
            crop => crop.Area.toLowerCase() === nearestDistrict.toLowerCase()
          );

          // Update state and UI
          setSelectedArea(nearestDistrict);
          setStatistics(calculateStatistics(cropsInArea));
          updateInfoContainer(cropsInArea);

          // Add a circle to highlight the district area
          L.circle(coords, {
            color: 'green',
            fillColor: '#3f6212',
            fillOpacity: 0.2,
            radius: 2000 // 2km radius
          }).addTo(map);
        }
      });

      // Add zoom controls
      map.zoomControl.setPosition('topright');

      // Add scale control
      L.control.scale({
        imperial: false,
        position: 'bottomright'
      }).addTo(map);

      // Clean up function
      return () => {
        map.remove();
      };
    }
  }, []); // Empty dependency array since we only want to initialize once

  function createCropCard(crop) {
    const div = document.createElement("div");
    div.className = "w-full px-4 mb-2";
    div.innerHTML = `
      <div class="bg-green-800 text-white p-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
        <div class="text-lg font-bold">${crop.cropName}</div>
        <div class="text-sm">Type: ${crop.cropType}</div>
        <div class="text-sm">Area: ${crop.cropArea} Ha</div>
        <div class="text-sm">Production: ${crop.cropProduction} Tons</div>
        <div class="text-sm">Season: ${crop.cropSeason}</div>
        <div class="text-xs mt-1 text-green-200">${crop.details}</div>
      </div>
    `;
    div.addEventListener("click", () => makeAnalysis(crop.Area));
    return div;
  }

  function makeAnalysis(area) {
    setSelectedArea(area);
    setShowTable(false);
    navigate(`/crop-analysis/${encodeURIComponent(area)}`);
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col lg:flex-row bg-green-900 min-h-screen">
        <div
          id="map"
          className="w-full lg:w-2/3 h-[400px] lg:h-screen"
        />
        <div className="w-full lg:w-1/3 p-4 overflow-y-auto">
          <h1 className="text-2xl text-white mb-4">
            Agricultural Areas in {selectedArea || "Belitung"}
          </h1>
          
          {statistics && (
            <div className="bg-green-800 p-4 rounded-lg mb-4">
              <h2 className="text-xl text-white mb-2">Statistics</h2>
              <div className="text-green-100">
                <p>Total Area: {statistics.totalArea} Ha</p>
                <p>Total Production: {statistics.totalProduction} Tons</p>
                <p>Crop Types: {statistics.cropTypes.join(', ')}</p>
                <p>Number of Crops: {statistics.cropCount}</p>
              </div>
            </div>
          )}

          <div
            id="info-div-container"
            className="space-y-2"
          />
          
          <div className="mt-4 border-2 border-green-500 p-2 rounded-md cursor-pointer text-white hover:bg-green-800 transition-colors text-center">
            Click for detailed analysis
          </div>
        </div>
      </div>
    </>
  );
};

export default LeafletMap;