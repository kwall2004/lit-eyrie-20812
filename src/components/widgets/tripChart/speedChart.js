import $ from 'jquery';
import moment from 'moment';
import * as d3 from 'd3';

export default function (element, data, timeZone) {

  // Default width and height
  var elmWidth = $(element).outerWidth(),
    elmHeight = $(element).outerHeight();

  // Margin definitions
  var margin = { top: 10, right: 60, bottom: 20, left: 40 };

  // Size definitions
  var brushHeight = 40 - margin.top - margin.bottom,
    graphWidth = elmWidth - margin.left - margin.right,
    graphHeight = elmHeight - margin.top - margin.bottom - brushHeight - 30;

  // Data bisector for date, used to retrieve the mouse-over y-values
  var bisectDate = d3.bisector(function (d) { return d.date; }).left;

  // Scales
  var xScale = d3.time.scale()
    .range([0, graphWidth])
    .nice();

  var yScaleSpeed = d3.scale.linear()
    .range([graphHeight, 0])
    .nice();

  var yScaleRpm = d3.scale.linear()
    .range([graphHeight, 0])
    .nice();

  var xScaleBrush = d3.time.scale()
    .range([0, graphWidth])
    .nice();

  var yScaleBrushSpeed = d3.scale.linear()
    .range([brushHeight, 0])
    .nice();

  var yScaleBrushRpm = d3.scale.linear()
    .range([brushHeight, 0])
    .nice();

  var myTimeFormatter = function (date) {
    // Do the time zone conversion here.
    return moment(date).format('h:mm');
  };

  // Axis
  var xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(myTimeFormatter);
  var xAxisBrush = d3.svg.axis().scale(xScaleBrush).orient('bottom').tickFormat(myTimeFormatter);
  var yAxisSpeed = d3.svg.axis().scale(yScaleSpeed).orient('left');
  var yAxisRpm = d3.svg.axis().scale(yScaleRpm).orient('right');
  var yAxisBrushSpeed = d3.svg.axis().scale(yScaleBrushSpeed).orient('left');
  var yAxisBrushRpm = d3.svg.axis().scale(yScaleBrushRpm).orient('right');

  // Reduce the number of ticks directly with div size
  var xNumTicks = Math.max(graphWidth / 80.0, 2);
  var yNumTicks = Math.max(graphHeight / 80.0, 2);

  xAxis.ticks(xNumTicks);
  yAxisSpeed.ticks(yNumTicks);
  yAxisRpm.ticks(yNumTicks);

  xAxisBrush.ticks(xNumTicks);
  yAxisBrushSpeed.ticks(yNumTicks);
  yAxisBrushRpm.ticks(yNumTicks);

  // Brush
  var brush = d3.svg.brush()
    .x(xScaleBrush)
    .on('brush', brushed);

  function brushed() {
    xScale.domain(brush.empty() ? xScaleBrush.domain() : brush.extent());
    mainGraph.select('.area.speed').attr('d', areaSpeed);
    mainGraph.select('.area.rpm').attr('d', areaRpm);
    mainGraph.select('.x.axis').call(xAxis);
  }

  // Provide the domains for each scale
  xScale.domain(d3.extent(data, function (d) { return d.date; }));
  yScaleSpeed.domain(d3.extent(data, function (d) { return d.speed; }));
  yScaleRpm.domain(d3.extent(data, function (d) { return d.rpm; }));

  xScaleBrush.domain(xScale.domain());
  yScaleBrushSpeed.domain(yScaleSpeed.domain());
  yScaleBrushRpm.domain(yScaleRpm.domain());

  // Extends the initial brush extent over the entire domain.
  brush.extent(xScaleBrush.domain());

  // Main Chart Areas
  var areaSpeed = d3.svg.area()
    .interpolate('linear')
    .x(function (d) {
      return xScale(d.date);
    })
    .y0(graphHeight)
    .y1(function (d) {
      return yScaleSpeed(d.speed);
    });

  var areaRpm = d3.svg.area()
    .interpolate('linear')
    .x(function (d) {
      return xScale(d.date);
    })
    .y0(graphHeight)
    .y1(function (d) {
      return yScaleRpm(d.rpm);
    });

  // Brush Areas
  var brushAreaSpeed = d3.svg.area()
    .interpolate('monotone')
    .x(function (d) {
      return xScaleBrush(d.date);
    })
    .y0(brushHeight)
    .y1(function (d) {
      return yScaleBrushSpeed(d.speed);
    });

  var brushAreaRpm = d3.svg.area()
    .interpolate('monotone')
    .x(function (d) {
      return xScaleBrush(d.date);
    })
    .y0(brushHeight)
    .y1(function (d) {
      return yScaleBrushRpm(d.rpm);
    });

  // Attach the SVG to the DOM element
  var svg = d3.select(element).append('svg')
    .attr('width', elmWidth)
    .attr('height', elmHeight);

  // A clipping box around the margined area of the chart.
  svg.append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', graphWidth)
    .attr('height', graphHeight);

  // The portion of the chart inside the margins
  var margins = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // The portion of the chart that
  var mainGraph = margins.append('g')
    .attr('class', 'main');

  // Add the x Axis
  mainGraph.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + graphHeight + ')')
    .call(xAxis);

  // Add the y axis for speed
  mainGraph.append('g')
    .attr('class', 'y axis speed')
    .call(yAxisSpeed)
    .append('text')
    .attr('class', 'axisLabel')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Speed (MPH)');

  // Add the y axis for rpm
  mainGraph.append('g')
    .attr('class', 'y axis rpm')
    .attr('transform', 'translate(' + graphWidth + ',0)')
    .call(yAxisRpm)
    .append('text')
    .attr('class', 'axisLabel')
    .attr('transform', 'rotate(-90)')
    .attr('y', -12)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('RPM');

  // The main portion of the chart needs to be clipped when brushed.
  // Add a clipping path to the plot.
  var plot = mainGraph.append('g')
    .attr('clip-path', 'url(#clip)');

  // Plot the Speed Data
  plot.append('path')
    .datum(data)
    .attr('class', 'area speed')
    .attr('d', areaSpeed);

  // Plot the RPM data
  plot.append('path')
    .datum(data)
    .attr('class', 'area rpm')
    .attr('d', areaRpm);

  var line = plot.append('line')
    .attr('class', 'speedlimit')
    .attr('x1', 0)
    .attr('y1', yScaleSpeed(80))
    .attr('x2', graphWidth)
    .attr('y2', yScaleSpeed(80));

  // Add the mouseover overlay
  var overlay = mainGraph.append('rect')
    .attr('class', 'overlay')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .on('mouseover', function () {
      rpmFocus.style('display', null);
      speedFocus.style('display', null);
    })
    .on('mouseout', function () {
      rpmFocus.style('display', 'none');
      speedFocus.style('display', 'none');
    })
    .on('mousemove', mousemove);

  function mousemove() {
    var x0 = xScale.invert(d3.mouse(this)[0]),
    i = bisectDate(data, x0, 1),
    d0 = data[i - 1],
    d1 = data[i],
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    rpmFocus.attr('transform', 'translate(' + xScale(d.date) + ',' + yScaleRpm(d.rpm) + ')');
    rpmFocus.select('text').text('RPM: ' + d.rpm);
    speedFocus.attr('transform', 'translate(' + xScale(d.date) + ',' + yScaleSpeed(d.speed) + ')');
    speedFocus.select('text').text('Speed: ' + d.speed);
  }

  // Add the mouse over info
  var rpmFocus = mainGraph.append('g')
    .attr('class', 'rpmfocus')
    .style('display', 'none');

  rpmFocus.append('circle')
    .attr('r', 4.5);

  rpmFocus.append('rect')
    .attr('x', 8)
    .attr('y', '-9')
    .attr('width', 80)
    .attr('height', '18');

  var rpmtext = rpmFocus.append('text')
    .attr('x', 10)
    .attr('dy', '.35em');

  var speedFocus = mainGraph.append('g')
    .attr('class', 'speedfocus')
    .style('display', 'none');

  speedFocus.append('circle')
    .attr('r', 4.5);

  speedFocus.append('rect')
    .attr('x', 8)
    .attr('y', '-9')
    .attr('width', 80)
    .attr('height', '18');

  var speedtext = speedFocus.append('text')
    .attr('x', 10)
    .attr('dy', '.35em');

  // Brush handles
  var arc = d3.svg.arc()
    .outerRadius(brushHeight - 1.5)
    .startAngle(0)
    .endAngle(function (d, i) { return i ? -Math.PI : Math.PI; });

  // The brush portion of the chart
  var brushControls = margins.append('g')
    .attr('class', 'brushcontrols')
    .attr('transform', 'translate(0,' + (graphHeight + margin.top + margin.bottom) + ')');

  // Plot the speed data for the brush
  brushControls.append('path')
    .datum(data)
    .attr('class', 'areaBrush speed')
    .attr('d', brushAreaSpeed);

  // Plot the rpm data for the brush
  brushControls.append('path')
    .datum(data)
    .attr('class', 'areaBrush rpm')
    .attr('d', brushAreaRpm);

  // Add the x axis for the brush
  brushControls.append('g')
    .attr('class', 'x axisBrush')
    .attr('transform', 'translate(0,' + brushHeight + ')')
    .call(xAxisBrush);

  // Add the brush path to the context
  brushControls.append('g')
    .attr('class', 'x brush')
    .call(brush)
    .selectAll('rect')
    .attr('y', -7)
    .attr('height', brushHeight + 7);

  // Add the brush handles
  brushControls.selectAll('.resize').append('path')
    .attr('transform', 'translate(0,' + (brushHeight / 2 - 3) + ')')
    .attr('d', arc);

  function remove() {
    svg.remove();
  };

  function resize() {
    elmWidth = $(element).outerWidth();
    elmHeight = $(element).outerHeight();

    svg.attr('width', elmWidth)
      .attr('height', elmHeight);

    brushHeight = 40 - margin.top - margin.bottom;
    graphWidth = elmWidth - margin.left - margin.right;
    graphHeight = elmHeight - margin.top - margin.bottom - brushHeight - 30;

    if (brushHeight <= 0 || graphWidth <= 0 || graphHeight <= 0) {
      return;
    }

    // Update the bounds of the clipping box
    var clip = svg.select('#clip rect');
    clip.attr('width', graphWidth);
    clip.attr('height', graphHeight);

    // Plot Scale Resize
    xScale.range([0, graphWidth]);
    yScaleSpeed.range([graphHeight, 0]).nice();
    yScaleRpm.range([graphHeight, 0]).nice();

    // Brush Scale Resize
    xScaleBrush.range([0, graphWidth]);
    yScaleBrushSpeed.range([brushHeight, 0]).nice();
    yScaleBrushRpm.range([brushHeight, 0]).nice();

    // Recalculate the ticks
    xNumTicks = Math.max(graphWidth / 80.0, 2);
    yNumTicks = Math.max(graphHeight / 80.0, 2);

    // Set the number of ticks on the axis
    xAxis.ticks(xNumTicks);
    yAxisSpeed.ticks(yNumTicks);
    yAxisRpm.ticks(yNumTicks);

    xAxisBrush.ticks(xNumTicks);
    yAxisBrushSpeed.ticks(yNumTicks);
    yAxisBrushRpm.ticks(yNumTicks);

    // Set the height of the areas
    areaSpeed.y0(graphHeight);
    areaRpm.y0(graphHeight);

    // Redraw the areas
    plot.select('.area.speed')
      .datum(data)
      .attr('d', areaSpeed);

    plot.select('.area.rpm')
      .datum(data)
      .attr('d', areaRpm);

    // Translate the axis and redraw
    mainGraph.select('.x.axis')
      .attr('transform', 'translate(0,' + graphHeight + ')')
      .call(xAxis);

    mainGraph.select('.y.axis.speed')
      .call(yAxisSpeed);

    mainGraph.select('.y.axis.rpm')
      .attr('transform', 'translate(' + graphWidth + ', 0)')
      .call(yAxisRpm);

    // Translate the brush x axis and redraw
    brushControls.select('.x.axisBrush')
      .attr('transform', 'translate(0,' + brushHeight + ')')
      .call(xAxisBrush);

    brushAreaSpeed.y0(brushHeight);
    brushAreaRpm.y0(brushHeight);

    // Redraw the areas in the brush
    brushControls.select('.areaBrush.speed')
      .datum(data)
      .attr('d', brushAreaSpeed);

    brushControls.select('.areaBrush.rpm')
      .datum(data)
      .attr('d', brushAreaRpm);

    // Resize and redraw the brush
    brush.x(xScaleBrush);
    brush.extent(xScaleBrush.domain());

    brushControls.select('.brush')
      .call(brush);

    // Resize overlay
    overlay.attr('width', graphWidth)
      .attr('height', graphHeight);

    // Resize line
    line.attr('x1', 0)
      .attr('y1', yScaleSpeed(80))
      .attr('x2', graphWidth)
      .attr('y2', yScaleSpeed(80));
  }

  return {
    remove: remove,
    svg: svg,
    resize: resize
  };
};
