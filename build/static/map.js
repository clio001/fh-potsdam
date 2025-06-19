getData = async () => {
    const response = await fetch('/static/LondonCongress.json');
  const participants = await response.json();
  
  setMarkers(participants)
  console.log(participants);

  
}

getData()

let map = L.map("map", {
    zoomControl: true,
    zoom: 3,
    scrollWheelZoom: false,
}).setView([52.516389, 13.397778]);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(map);



const setMarkers = (participants) => {
  const markers = L.markerClusterGroup();
  participants.rows.forEach((element) => {
    let marker = L.marker([Number(element["coordinate location lat"]), Number(element["coordinate location long"])])
  
    const popupCard = `
    <div class="card" style="width: 22rem; border: none;">
      <div class="card-body">
      
        <h2 class="mt-3">${element.Name}</h2>
        <p> <b>Stadt:</b> ${element["Place"]}</p>
        <p> <b>Land:</b> ${element["country"]}</p>
        <p> <b>Vortragstitel:</b> ${element["Title"]}</p>
        <p> <b>Rolle:</b> ${element["Role"]}</p>
        
        <div class="text-center">
        ${element["Wikidata-URL"] ? `<hr/><a class="btn " href="${element["Wikidata-URL"]}" target="_blank">Wikidata</a>` : ''}
     
        </div>
        
      </div>
    </div>`

    marker.bindPopup(popupCard, { maxWidth: 600 });
    markers.addLayer(marker);
  });
  map.addLayer(markers);
};


const textOverlay = L.control({ position: "topright" });

textOverlay.onAdd = function(map) {
  var div = L.DomUtil.create("div");
  div.innerHTML = "<div class='leaflet-control-textbox' style='opacity: 0.9; text-align: center; background: white; border: none; padding: 3rem; border-radius: 12px; font-family: serif; box-shadow: 0px 5px 5px grey'><div class='lead'>Participants of the </div><div class='display-6'>Third International Congress</div><div class='lead'>of the</div><div class='display-6'>World League for Sexual Reform</div><div class='lead mt-1'>London, 8-14 September 1929 </div></ div></div > ";
    return div;
};

textOverlay.addTo(map);

