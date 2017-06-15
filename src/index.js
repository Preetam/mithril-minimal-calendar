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

m.mount(document.getElementById("app"), App)
