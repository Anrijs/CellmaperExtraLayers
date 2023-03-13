// diry hack? I couldn't access the constructors of the ol layers properly. This is my fix.
window.eval(`
class CMCustomLayers {
    constructor(map, layers) {
        console.log("Loading custom layers!");
        this.map = map;
        this.layers = layers;

        let modal_settings = document.getElementById("modal_mapsettings_content");

        let table = modal_settings.appendChild(document.createElement("table"));
        table.classList = "table table-sm modal_table";
        
        // thead
        table.appendChild(document.createElement("thead")).innerHTML = '<tr><td>Overlay Maps</td></tr>';

        // tbody
        let tbody = table.appendChild(document.createElement("tbody"));
        layers.forEach(layer => {
            this.initLayerControl(tbody, layer);
        });
    }

    addLayer(layer) {
        this.map.addLayer(layer.layer);
    }

    removeLayer(layer) {
        this.map.removeLayer(layer.layer);
    }

    initLayerControl(tbody, layer) {
        let cell = tbody.insertRow().insertCell();

        let label = cell.appendChild(document.createElement("label"));
        label.innerText = layer.name;

        let cb = label.appendChild(document.createElement("input"));
        cb.type = "checkbox";
        cb.style.display = "inline";
        cb.style.position = "absolute";
        cb.style.right = "8px";
        cb.style.margin = "8px auto";

        let self = this;
        cb.onclick = function(e) {
            e.target.checked ? self.addLayer(layer) : self.removeLayer(layer);
        }
    }
}

new CMCustomLayers(map, [
    {
        id: "ltm_5g",
        name: "LMT 5G",
        layer: new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https://karte.lmt.lv/geoserver/gwc/service/wms',
                params: {
                    'layers': 'lmt:internet_5g',
                    'VERSION': '1.1.1'
                },
                resolutions: [256]
            }),
            opacity: 0.7
        })
    },
    {
        id: "tele2_5g",
        name: "TELE2 5G",
        layer: new ol.layer.Tile({
           source: new ol.source.XYZ({
               attributions: [
                   baseAttrib,
                   '<span class="attribute_text">https://www.tele2.lv/karte/',
                   "</span>",
               ],
               url: "https://wms2.kartes.lv/TEL2/wgs/TELE2G5/{z}/{x}/{y}.png",
               maxZoom: 18,
           }),
           opacity: 0.7
        })
    }
]);
`);
