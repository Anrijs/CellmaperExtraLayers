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

let cmCustomLayers = new CMCustomLayers(map, [
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
        id: "tele25g",
        name: "TELE2 5G",
        layers: [
            {
                name: 'N78',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=78&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
                name: 'N28',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=76&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
        ]
    },
    {
        id: "tele2lte",
        name: "TELE2 LTE",
        layers: [
            {
                name: 'B1',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=38,59&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
                name: 'B3',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=37,58&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
                name: 'B7',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=39,60&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
             {
                name: 'B8',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=57&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
                name: 'B20',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=35,56&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
        ]
    },
    {
        id: "tele22g",
        name: "TELE2 2G/3G",
        layers: [
            {
                name: '3G B8',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=27,48&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
                 })
            },
            {
                name: '3G B1',
                layer: new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [
                            baseAttrib,
                            '<span class="attribute_text">https://www.tele2.lv/karte/',
                            "</span>",
                        ],
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=29,50&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
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
                        url: "https://mim.tele2.com/MIMCore/api/Tile/GetOverlay?x={x}&y={y}&z={z}&viewType=1&serviceThresholdIds=22,23,43,44&countryCode=&currentServiceLayerNo=100",
                        maxZoom: 18,
                    }),
                    opacity: 1
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
