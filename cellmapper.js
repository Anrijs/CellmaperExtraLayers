// dirty hack? I couldn't access the constructors of the ol layers properly. This is my fix.
window.eval(`
class CMCustomLayers {
    constructor(map, groups) {
        console.log("Loading custom layers!");
        this.map = map;
        this.layers = groups;

        let modal_settings = document.getElementById("modal_mapsettings_content");

        let table = modal_settings.appendChild(document.createElement("table"));
        table.classList = "table table-sm modal_table";
        
        // thead
        table.appendChild(document.createElement("thead")).innerHTML = '<tr><td>Overlay Maps</td></tr>';

        // tbody
        let tbody = table.appendChild(document.createElement("tbody"));
        groups.forEach(group => {
            this.initLayerControl(tbody, group);
        });
    }

    addLayer(layer) {
        this.map.addLayer(layer.layer);
    }

    removeLayer(layer) {
        this.map.removeLayer(layer.layer);
    }

    initLayerControl(tbody, group) {
        let cell = tbody.insertRow().insertCell();

        let label = cell.appendChild(document.createElement("label"));
        label.innerText = group.name;

        group.layers.forEach(layer => {
            let labelc = cell.appendChild(document.createElement("label"));
            labelc.style.float = "right";
            labelc.style.marginLeft = "8px";
            labelc.innerText = layer.name;

            let cb = labelc.appendChild(document.createElement("input"));
            cb.type = "checkbox";
            cb.style.display = "inline";
            cb.style.marginLeft = "4px";

            let self = this;
            cb.onclick = function(e) {
                e.target.checked ? self.addLayer(layer) : self.removeLayer(layer);
            }
        });
    }
}

new CMCustomLayers(map, [
    {
        id: "lmt",
        name: "LMT",
        layers: [
            {
                name: '5G',
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
                name: 'LTE',
                layer: new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: 'https://karte.lmt.lv/geoserver/gwc/service/wms',
                        params: {
                            'layers': 'lmt:lmt_internet_4g',
                            'VERSION': '1.1.1'
                        },
                        resolutions: [256]
                    }),
                    opacity: 0.7
                })
            },
            {
                name: '3G',
                layer: new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: 'https://karte.lmt.lv/geoserver/gwc/service/wms',
                        params: {
                            'layers': 'lmt:lmt_internet_3G',
                            'VERSION': '1.1.1'
                        },
                        resolutions: [256]
                    }),
                    opacity: 0.7
                })
            },
            {
                name: '2G',
                layer: new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: 'https://karte.lmt.lv/geoserver/gwc/service/wms',
                        params: {
                            'layers': 'lmt:lmt_pamata',
                            'VERSION': '1.1.1'
                        },
                        resolutions: [256]
                    }),
                    opacity: 0.7
                })
            },
        ]
    },
    {
        id: "tele2",
        name: "TELE2",
        layers: [
            {
                name: '5G+',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://www.tele2.lv/coverage/?cmd=get&cid=12756&coverage_tile=1&z={z}&x={x}&y={y}&t=5G&q=3",
                        maxZoom: 18,
                    }),
                    opacity: 0.7
                 })
            },
            {
                name: '5G',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://www.tele2.lv/coverage/?cmd=get&cid=12756&coverage_tile=1&z={z}&x={x}&y={y}&t=5G&q=2",
                        maxZoom: 18,
                    }),
                    opacity: 0.7
                 })
            },
            {
                name: 'LTE',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://www.tele2.lv/coverage/?cmd=get&cid=12756&coverage_tile=1&z={z}&x={x}&y={y}&t=4G&q=1,2,3",
                        maxZoom: 18,
                    }),
                    opacity: 0.7
                 })
            },
            {
                name: '2G',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://www.tele2.lv/coverage/?cmd=get&cid=12756&coverage_tile=1&z={z}&x={x}&y={y}&t=2G&q=1,2,3",
                        maxZoom: 18,
                    }),
                    opacity: 0.7
                 })
            },
        ]
    },
    {
        id: "bite",
        name: "BITE",
        layers: [
            {
                name: 'NBIoT',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.bite.lv/lv/parklajums',
                            "</span>",
                        ],
                        url: "https://tiles.anrijs.lv/parklajums/bite/nbiot/{z}/{x}/{y}.png",
                        maxZoom: 12,
                    }),
                    opacity: 0.7
                 })
            },
            {
                name: 'All',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.bite.lv/lv/parklajums',
                            "</span>",
                        ],
                        maxZoom: 16,
                        tileUrlFunction: function(coord){
                            var z = coord[0];
                            var x = coord[1];
                            var y = coord[2];

                            const padLeft = function padLeft(a,b,cnt) {
                                while(a.length<cnt) {
                                    a = b+a;
                                }
                                return a;
                            };

                            if ((z-7<0)||(z-7>9)) {
                                return null;
                            }

                            let crl = {
                                x: "C" + padLeft(x.toString(16),"0",8),
                                y: "R" + padLeft(y.toString(16),"0",8),
                                z: "L" + padLeft(""+(z-7),"0",2)
                            }

                            return 'https://arcgiscache.bite.lt/arcgiscache/gbitelv/Layers/LV_data_all/' +
                                crl.z + '/' + crl.y + '/' + crl.x + '.png';
                        }
                    }),
                    opacity: 0.7
                 })
            }
        ]
    }
]);
`);
