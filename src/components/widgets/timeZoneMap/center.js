import $ from 'jquery';
import moment from 'moment-timezone';

function Center(component, data) {
  this.component = component;
  this.name = data.name;
  this.x = (180 + data.long) / 360;
  this.y = (90 - data.lat) / 180;
  this.dom = $('<span>').appendTo(this.component.$map).css({
    left: this.x * 100 + '%',
    top: this.y * 100 + '%'
  });
  if (this.name === 'America/Los_Angeles') {
    this.component.changeCenter(this);
  }
}

Center.prototype = {
  distSqr: function (x, y) {
    var dx = this.x - x,
    dy = this.y - y;
    return dx * dx + dy * dy;
  },
  activate: function () {
    var m = moment().tz(this.name);
    this.component.$labelName.text(this.name);
    this.component.$labelTime.text(m.format('hh:mm a ') + m.zoneAbbr());
    this.component.$axisX.css('left', this.x * 100 + '%');
    this.component.$axisY.css('top', this.y * 100 + '%');
  },
  deactivate: function () {
    this.dom.removeClass('active');
  }
};

export default Center;
