# mithril-minimal-calendar

![Screenshot](https://user-images.githubusercontent.com/379404/27163599-7866ac7a-5156-11e7-8ad2-f80e956b5688.png)

## Usage

```js
var m = require("mithril")
var calendar = require("./calendar")

var App = {
  oninit: function(vnode) {
    vnode.state.calendar = new calendar(new Date(2017, 05, 01), null, function(d) {console.log('selected', d)})
  },
  view: function(vnode) {
    return [
      m("h1", "Mithril.js Calendar Component"),
      m("p", "This is a simple calendar component written for Mithril.js."),
      m("div", m(vnode.state.calendar))
    ]
  }
}
```

## License

MIT
