var m = require("mithril")

var addDay = function(d) {
  var newDate = new Date(d)
  newDate.setDate(d.getDate()+1)
  return newDate
}

var addMonth = function(d) {
  var newDate = new Date(d)
  newDate.setMonth(d.getMonth()+1)
  return newDate
}

var CalendarState = function(start, onSelect) {
  this.start = start
  this.end = addMonth(start)
  this.selected = null
  this.onSelect = onSelect
  this.setSelected = (function(d) {
    this.selected = d
    this.onSelect(d)
  }).bind(this)
}

var CalendarComponent = function(calendarState) {
  this.oninit = function(vnode) {
    vnode.state.calendarState = calendarState
  }
  this.view = function(vnode) {
    var days = [
      m("li.day", "S"),
      m("li.day", "M"),
      m("li.day", "T"),
      m("li.day", "W"),
      m("li.day", "T"),
      m("li.day", "F"),
      m("li.day", "S"),
    ]
    for (var i = 0; i < vnode.state.calendarState.start.getDay(); i++) {
      days.push(m("li", ""))
    }
    for (var d = vnode.state.calendarState.start; d < vnode.state.calendarState.end; d = addDay(d)) {
      var classname = "valid"
      if (vnode.state.calendarState.selected != null && d.getDate() == vnode.state.calendarState.selected.getDate()) {
        classname += " selected"
      }
      days.push(m("li", {class: classname, onclick: function(){vnode.state.calendarState.setSelected(this)}.bind(d)}, d.getDate()))
    }
    return m("ul", days)
  }
}

var DropDownButton = function(toggle, calendarState) {
  this.oninit = function(vnode) {
    vnode.state.calendarState = calendarState
  }
  this.view = function(vnode) {
    var buttonText = vnode.state.calendarState.selected == null ? "Pick date" : vnode.state.calendarState.selected.toLocaleDateString();
    return m("button", {onclick: toggle}, buttonText)
  }
}

var Calendar = function(start, selected, onSelect) {
  this.oncreate = function(vnode) {
    vnode.state.clickHandler = (function(e) {
      if (!this.dom.contains(e.target)) {
        this.state.open = false
        m.redraw()
      }
    }).bind(vnode)

    document.addEventListener("click", vnode.state.clickHandler, true)
  }

  this.onremove = function(vnode) {
    document.removeEventListener("click", vnode.state.clickHandler, true)
  }

  this.oninit = function(vnode) {
    vnode.state.open = false;
    vnode.state.toggle = (function() {
      this.open = !this.open
    }).bind(vnode.state)
    vnode.state.calendarState = new CalendarState(start, onSelect)
    vnode.state.calendarState.selected = selected
  }

  this.view = function(vnode) {
    if (!vnode.state.open) {
      return m("div", m(new DropDownButton(vnode.state.toggle, vnode.state.calendarState)))
    }

    return m("div", [
      m(new DropDownButton(vnode.state.toggle, vnode.state.calendarState)),
      m("div.mithril-minimal-calendar", m(new CalendarComponent(vnode.state.calendarState)))
    ])
  }
}

module.exports = Calendar
