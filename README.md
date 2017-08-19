# Embed depackt map

## Docs

### Using iframe

It's easy and you don't need to setup anything. Default tiles are openstreetmap.

    <iframe src="https://embed.depackt.be/?longitude=50&latitude=4&distanceKm=100" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>

### Custom

If you want custom titles, popup template and icons. You can use depackt-leaflet module and depackt api to populate the map with locations.

#### Installation

```sh
$ npm install https://github.com/depackt/depackt-leaflet --save
```

#### Example

```js    
const Minimap = require('depackt-leaflet')
const minimap = Minimap()

const mapComponent = minimap.render({
  coords: {lng: 50, lat: 4},
  zoom: 13,
  items: [...],
  tiles: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  mapbox: {},
  tilesAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  icons: [
    {
      name: 'default',
      template: `
        <div>custom icon</div>
      `
    },
    {
      name: 'featured',
      template: `
        <div>custom icon</div>
      `
    }
  ]
})


document.body.appendChild(mapComponent)
```

## See also

[depackt-leaflet](https://github.com/depackt/depackt-leaflet)

## Contributors

- Augustin Godiscal <hello@auggod.tech>

## License
[MIT](https://tldrlegal.com/license/mit-license)
