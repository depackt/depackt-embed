const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const app = choo()
const xhr = require('xhr')

const Leaflet = require('depackt-leaflet')
const leaflet = Leaflet()

css('./assets/leaflet.css')
css('./assets/reset.css')
css('./assets/icons.css')
css('./assets/flex.css')
css('leaflet.markercluster/dist/MarkerCluster.css')
css('leaflet.markercluster/dist/MarkerCluster.Default.css')

const root = document.createElement('div')
document.body.appendChild(root, document.body.firstChild)
root.id = 'app'

app.route('*', (state, emit) => {
  return html`
    <div id="app">
      ${leaflet.render({
        coords: state.coords,
        zoom: state.zoom,
        items: state.locations,
        selectedIndex: state.selectedIndex,
        tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        mapbox: {},
        tilesAttribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        icons: [
          {
            name: 'default',
            template: `
              <svg viewBox="0 0 16 16" class="icon icon-small icon-arrow-north-east">
                <use xlink:href="#icon-arrow-north-east" />
              </svg>
            `
          },
          {
            name: 'featured',
            template: `
              <svg viewBox="0 0 16 16" class="icon icon-small icon-arrow-north-east">
                <use xlink:href="#icon-arrow-north-east" />
              </svg>
            `
          }
        ]
      })}
    </div>
  `
})

app.mount('#app')

app.use((state, emitter) => {
  state.zoom = 13
  state.locations = state.locations || []
  state.selecteddex = 0
  state.coords = state.coords || [0, 0]

  emitter.on(state.events.DOMCONTENTLOADED, () => {
    const { longitude = 4.351710, latitude = 50.850340, distanceKm = 50 } = state.query

    state.coords = [latitude, longitude]
    state.distanceKm = distanceKm

    xhr({
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=1000'
      },
      json: true,
      url: `https://api.depackt.be/locations?latitude=${latitude}&longitude=${longitude}&distanceKm=${distanceKm}`
    }, (err, response, body) => {
      if (err) throw err
      state.locations = body.data

      emitter.emit('render')
    })
  })
})

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">
      <symbol viewBox='0 0 100 100' id='icon-home'>
      <title>home</title>
      <path d="M98.811803,51.0857287 L83.6082105,35.8821362 L83.6082105,8.82379583 C83.6082105,6.5842053 81.7935097,4.7695045 79.5539192,4.7695045 L70.8566534,4.7695045 C68.6170629,4.7695045 66.8023621,6.5842053 66.8023621,8.82379583 L66.8023621,19.0762878 L52.8669519,5.14087758 C51.3457818,3.61970747 48.6537324,3.61970747 47.134184,5.14087758 L1.18771113,51.0857287 C0.0281838081,52.245256 -0.31886353,53.9886013 0.308740768,55.5049063 C0.936345067,57.0195895 2.41535055,58.0072149 4.05490596,58.0072149 L8.07189782,58.0072149 L8.07189782,96.612177 L36.7308724,96.612177 L36.7308724,59.7538036 C36.7308724,57.5142131 38.5455732,55.6995122 40.7851637,55.6995122 L59.2143504,55.6995122 C61.453941,55.6995122 63.2686418,57.5142131 63.2686418,59.7538036 L63.2686418,96.612177 L91.9292381,96.612177 L91.9292381,58.0072149 L95.9462299,58.0072149 C97.5857853,58.0072149 99.0647908,57.0195895 99.6923951,55.5049063 C100.318378,53.9886013 99.9713304,52.245256 98.811803,51.0857287 Z"></path>
      </symbol>
      <symbol viewBox='0 0 100 100' id='icon-marker'>
      <title>marker</title>
      <path d="M49.7325334,0 C28.9270094,0 12,16.9270094 12,37.7343084 C12,57.36119 43.4523573,94.582505 47.0397614,98.7610054 C47.7142857,99.5473587 48.6976711,100 49.7343084,100 C50.7709458,100 51.7543312,99.5473587 52.4288554,98.7610054 C56.0162596,94.582505 87.4686169,57.36119 87.4686169,37.7343084 C87.4668418,16.9270094 70.5380574,0 49.7325334,0 Z M63.2514201,36.4846634 C63.2514201,43.9399318 57.1860267,50.0053252 49.7307583,50.0053252 C42.2754899,50.0053252 36.2100966,43.9399318 36.2100966,36.4846634 C36.2100966,29.0293951 42.277265,22.9640017 49.7325334,22.9640017 C57.1878018,22.9640017 63.2514201,29.0293951 63.2514201,36.4846634 Z"></path>
      </symbol>
      <symbol viewBox='0 0 100 100' id='icon-marker-star'>
      <title>marker star</title>
      <path d="M49.7325334,0 C28.9270094,0 12,16.9270094 12,37.7343084 C12,57.36119 43.4523573,94.582505 47.0397614,98.7610054 C47.7142857,99.5473587 48.6976711,100 49.7343084,100 C50.7709458,100 51.7543312,99.5473587 52.4288554,98.7610054 C56.0162596,94.582505 87.4686169,57.36119 87.4686169,37.7343084 C87.4668418,16.9270094 70.5380574,0 49.7325334,0 Z M61.6059358,55.6234024 L49.7325334,49.3805027 L37.8591309,55.6234024 L40.1258875,42.4027265 L30.5210168,33.0392644 L43.7949446,31.10977 L49.7325334,19.0819369 L55.6683471,31.111545 L68.9422749,33.0410395 L59.3374041,42.4045016 L61.6059358,55.6234024 Z"></path>
      </symbol>
      <symbol viewBox='0 0 100 100' id='icon-marker-plain'>
      <title>marker plain</title>
      <path d="M49.7325334,0 C28.9270094,0 12,16.9270094 12,37.7343084 C12,57.36119 43.4523573,94.582505 47.0397614,98.7610054 C47.7142857,99.5473587 48.6976711,100 49.7343084,100 C50.7709458,100 51.7543312,99.5473587 52.4288554,98.7610054 C56.0162596,94.582505 87.4686169,57.36119 87.4686169,37.7343084 C87.4668418,16.9270094 70.5380574,0 49.7325334,0 Z"></path>
      </symbol>
      <symbol viewBox='0 0 100 100' id='icon-marker-arrow'>
      <title>marker arrow</title>
      <path d="M49.7325334,0 C28.9270094,0 12,16.9270094 12,37.7343084 C12,57.36119 43.4523573,94.582505 47.0397614,98.7610054 C47.7142857,99.5473587 48.6976711,100 49.7343084,100 C50.7709458,100 51.7543312,99.5473587 52.4288554,98.7610054 C56.0162596,94.582505 87.4686169,57.36119 87.4686169,37.7343084 C87.4668418,16.9270094 70.5380574,0 49.7325334,0 Z M63.6525845,45.7575973 L49.7325334,59.6776484 L35.8142573,45.7575973 C34.4279324,44.3712724 34.4279324,42.1240415 35.8142573,40.7377166 C37.1988072,39.3513917 39.4495882,39.3513917 40.834138,40.7377166 L46.1824056,46.0859841 L46.1824056,27.22238 C46.1824056,25.2627095 47.7728628,23.6722522 49.7325334,23.6722522 C51.6922039,23.6722522 53.2826612,25.2627095 53.2826612,27.22238 L53.2826612,46.0859841 L58.6327038,40.7377166 C60.0190287,39.3513917 62.2680346,39.3513917 63.6525845,40.7377166 C65.0389094,42.1240415 65.0389094,44.3730474 63.6525845,45.7575973 Z"></path>
      </symbol>
    </svg>
  `

const div = document.createElement('div')
div.innerHTML = svg

document.body.appendChild(div, document.body.firstChild)
