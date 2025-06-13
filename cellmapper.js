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

    createLayer(layer) {
        let lyr = undefined;

        switch (layer.type) {
            case "WMS": {
                lyr = new ol.layer.Tile({
                    source: new ol.source.TileWMS(layer.source),
                    opacity: layer.opacity
                })
                break;
            }
            case "XYZ": {
                lyr = new ol.layer.Tile({
                    source: new ol.source.XYZ(layer.source),
                    opacity: layer.opacity
                });
                break;
            }
            case "CRL": {
                let source = new ol.source.XYZ({
                    url: layer.url,
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
                            c: "C" + padLeft(x.toString(16),"0",8),
                            r: "R" + padLeft(y.toString(16),"0",8),
                            l: "L" + padLeft(""+(z-7),"0",2)
                        }

                        return this.url.replace('{c}', crl.c).replace('{r}', crl.r).replace('{l}', crl.l);
                    }
                });

                for (const [key, value] of Object.entries(layer.source)) {
                    source[key] = value;
                }

                lyr = new ol.layer.Tile({
                    source: source,
                    opacity: layer.opacity
                 })
            }
        }

        return lyr;
    }

    addLayer(layer) {
         this.map.addLayer(layer);
    }

    removeLayer(layer) {
        this.map.removeLayer(layer);
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

            const lyr = this.createLayer(layer);

            if (lyr) {
                let self = this;
                cb.onclick = function(e) {
                    e.target.checked ? self.addLayer(lyr) : self.removeLayer(lyr);
                }
            } else {
               cb.disabled = true;
            }
        });
    }
}

fetch('https://raw.githubusercontent.com/Anrijs/CellmaperExtraLayers/refs/heads/main/layers.json')
   .then(response => response.json())
   .then(json => new CMCustomLayers(map, json.groups));
`);
