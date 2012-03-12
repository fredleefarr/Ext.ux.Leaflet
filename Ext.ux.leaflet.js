/* 
A simple wrapper for Cloudmade Leaflet for use with Sencha Touch 2.

Example usage: 

    Ext.application({
        name: 'Sencha',
        launch: function () {
            var map = Ext.create('Ext.Leaflet', {});
            Ext.create('Ext.Panel', {
                fullscreen: true,
                layout: 'fit',
                items: [map]
            });
        }
    });
*/

Ext.define('Ext.Leaflet', {
    extend: 'Ext.Component',
    map: null,
    config: {
        map: null
    },
    constructor: function () {
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
        this.on('painted', this.renderMap, this);
    },
    renderMap: function () {
        if (this.map) {
            return true;
        }
        this.map = new L.Map(this.element.dom, {
            zoomControl: true,
            trackResize: false
        });
        var cloudmade = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        });

        this.map.addLayer(cloudmade).setView(new L.LatLng(37.381592, -122.135672), 10);

    },

    onUpdate: function (map, e, options) {
        this.setHtml((options || {}).data);
    },


    onDestroy: function () {
        this.callParent();
    }

}, function () {

});

