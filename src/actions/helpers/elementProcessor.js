import Processor from './dataProcessor';

var ElementProcessor = function (id, elementProcessor) {
  Processor.call(this, id);
  var self = this;

  this.registerElementProcessor(elementProcessor);
};

ElementProcessor.prototype = Object.create(Processor.prototype);
ElementProcessor.prototype.constructor = ElementProcessor;
ElementProcessor.prototype.discardUndefinedResults = false;

// Process data simply calls processElement
ElementProcessor.prototype.processData = function (element, index, data) {
  return this.processElement(element, index, data);
};

// Override the registerElementProcessor prototype to only handle a single elementProcessor
ElementProcessor.prototype.registerElementProcessor = function (elementProcessor) {
  if (typeof elementProcessor === "function") {
    if (this.elementProcessors.length == 0) {
      this.elementProcessors.push(elementProcessor);
      this.elementProcessorRegistrations[this.processorId] = true;
    }
    else {
      this.elementProcessors = [];
      this.elementProcessorRegistrations = {};
      this.elementProcessors.push(elementProcessor);
      this.elementProcessorRegistrations[this.processorId] = true;
    }
  }
  else {
    throw "elementProcessor must be a function.";
  }
};

// Override the processElement prototype to call the elementProcessor function
// that was passed into the ElementProcessor
ElementProcessor.prototype.processElement = function (element, index, data) {
  if (this.elementProcessors.length > 0) {
    return this.elementProcessors[0](element, index, data);
  }
  else {
    throw "There is no element processor associated to this element processor.";
  }
};

/////////////////////////////////////////
// Look-Behind Element Processor
/////////////////////////////////////////
var LookBehindElementProcessor = function (id, elementProcessor) {
  ElementProcessor.call(this, id, elementProcessor);
  var self = this;
  self.lookBehind = {};
};

LookBehindElementProcessor.prototype = Object.create(ElementProcessor.prototype);
LookBehindElementProcessor.prototype.constructor = LookBehindElementProcessor;

// Process data simply calls processElement
LookBehindElementProcessor.prototype.processData = function (element, index, data) {
  return this.processElement(element, index, data);
};

/////////////////////////////////////////
// Event Processor
/////////////////////////////////////////
var eventProcessor = new ElementProcessor("Events", processEvent);
eventProcessor.discardUndefinedResults = true;

function processEvent(element, index, data) {
  return { date: new Date(element.d), speed: element.m13 || 0, rpm: element.m12 || 0 }
}

/////////////////////////////////////////
// Vehicle Data Processor
/////////////////////////////////////////
var vehicleDataProcessor = new ElementProcessor("VehicleData", processVehicleData);
vehicleDataProcessor.discardUndefinedResults = true;

function processVehicleData(element) {

}

/////////////////////////////////////////
// Trip Path Processor
/////////////////////////////////////////
var tripPathProcessor = new ElementProcessor("TripPath", processTripPath);
tripPathProcessor.discardUndefinedResults = true;

function processTripPath(element, index, data) {
  if (element.n && element.l) {
    return [element.n, element.l];
  }
}

/////////////////////////////////////////
// Trip Properties Processor
/////////////////////////////////////////
var tripPropertiesProcessor = new ElementProcessor("TripProperties", processTripProperties);
tripPropertiesProcessor.discardUndefinedResults = true;

function processTripProperties(element, index, data) {
  if (element.n && element.l) {
    return {
      GPRF: data[0].gprf,
      TimeStamp: element.d,
      Speed: element.m13,
      Rpm: element.m12,
      StartSpeed: element.ss,
      EndSpeed: element.es
    };
  }
}

/////////////////////////////////////////
// Speeding Path Processor
/////////////////////////////////////////
var speedingPathProcessor = new ElementProcessor("SpeedingPath", processSpeedingPath);
speedingPathProcessor.discardUndefinedResults = true;

function processSpeedingPath(element, index, data) {
  //if (data[0].gprf && data[0].gprf == 1) {
  if (element.s && element.s === 1) {
    this.speeding = true;
    this.speedingEventStart = {
      "type": "Feature",
      "properties": {
        "eventType": "Speeding",
        "properties": []
      },
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
  }

  if (this.speeding && element.s !== 0) {
    if (element.n && element.l) {
      var coordinatePair = [element.n, element.l];
      this.speedingEventStart.geometry.coordinates.push(coordinatePair);

      var property = {
        GPRF: data[0].gprf,
        TimeStamp: element.d,
        Speed: element.m13,
        Rpm: element.m12,
        StartSpeed: element.ss,
        EndSpeed: element.es
      };

      this.speedingEventStart.properties.properties.push(property);
    }
  }

  if (element.s === 0) {
    this.speeding = false;
    return this.speedingEventStart;
  }
  //}
}

/////////////////////////////////////////
// Trip Path Behavior Processor
/////////////////////////////////////////
var tripPathBehaviorProcessor = new ElementProcessor("TripPathBehavior", processTripPathBehavior);
tripPathBehaviorProcessor.discardUndefinedResults = true;

function processTripPathBehavior(element, index, data) {
  if (element.n && element.l && data[0].gprf && data[0].gprf == 1) {
    var coordinatePair = [element.n, element.l];
    var property = {
      GPRF: data[0].gprf,
      TimeStamp: element.d,
      Speed: element.m13,
      Rpm: element.m12,
      StartSpeed: element.ss,
      EndSpeed: element.es
    };

    switch (element.e) {
      case 1:
      return {
        "type": "Feature",
        "properties": {
          "eventType": "Hard Acceleration",
          "properties": property
        },
        "geometry": {
          "type": "Point",
          "coordinates": coordinatePair
        }
      };
      case 2:
      return {
        "type": "Feature",
        "properties": {
          "eventType": "Extreme Acceleration",
          "properties": property
        },
        "geometry": {
          "type": "Point",
          "coordinates": coordinatePair
        }
      };
      case 3:
      return {
        "type": "Feature",
        "properties": {
          "eventType": "Hard Braking",
          "properties": property
        },
        "geometry": {
          "type": "Point",
          "coordinates": coordinatePair
        }
      };
      case 4:
      return {
        "type": "Feature",
        "properties": {
          "eventType": "Extreme Braking",
          "properties": property
        },
        "geometry": {
          "type": "Point",
          "coordinates": coordinatePair
        }
      };
      default:
      break;
    }
  }
}

/////////////////////////////////////////
// Behavior Processor
/////////////////////////////////////////
var behaviorProcessor = new ElementProcessor("Behavior", processBehavior);
behaviorProcessor.discardUndefinedResults = true;

function processBehavior(element, index, data) {
  if (data[0].gprf && data[0].gprf == 1) {
    switch (element.e) {
      case 1:
      return {
        tripStart: data[0].d,
        eventTime: element.d,
        eventType: 'Hard Acceleration',
        startSpeed: element.ss || 0,
        endSpeed: element.es || 0,
        speedDifference: (element.es || 0) - (element.ss || 0),
        selected: ko.observable(false)
      };
      case 2:
      return {
        tripStart: data[0].d,
        eventTime: element.d,
        eventType: 'Extreme Acceleration',
        startSpeed: element.ss || 0,
        endSpeed: element.es || 0,
        speedDifference: (element.es || 0) - (element.ss || 0),
        selected: ko.observable(false)
      };
      case 3:
      return {
        tripStart: data[0].d,
        eventTime: element.d,
        eventType: 'Hard Braking',
        startSpeed: element.ss || 0,
        endSpeed: element.es || 0,
        speedDifference: (element.es || 0) - (element.ss || 0),
        selected: ko.observable(false)
      };
      case 4:
      return {
        tripStart: data[0].d,
        eventTime: element.d,
        eventType: 'Extreme Braking',
        startSpeed: element.ss || 0,
        endSpeed: element.es || 0,
        speedDifference: (element.es || 0) - (element.ss || 0),
        selected: ko.observable(false)
      };
      default:
      break;
    }
  }
}

/////////////////////////////////////////
// Speeding Behavior Processor
/////////////////////////////////////////
var speedingBehaviorProcessor = new LookBehindElementProcessor("SpeedingBehavior", processSpeedingBehavior);
speedingBehaviorProcessor.discardUndefinedResults = true;

function processSpeedingBehavior(element, index, data) {
  if (data[0].gprf && data[0].gprf == 1) {
    if ((element.s && element.s === 1) || (this.speeding && element.s !== 0)) {
      this.speeding = true;
      this.speedingEventStart = {
        TimeStamp: element.d,
        Speed: element.m13,
      }
    }

    if (element.s === 0) {
      this.speeding = false;
      return {
        tripStart: data[0].d,
        eventTime: this.speedingEventStart.TimeStamp,
        eventType: 'Speeding',
        startSpeed: this.speedingEventStart.Speed || 0,
        endSpeed: element.m13 || 0,
        speedDifference: (this.speedingEventStart.Speed || 0) - (element.m13 || 0),
        selected: ko.observable(false)
      };
    }
  }
}

var jsonProcessor = new Processor("JsonProcessor");
jsonProcessor.registerElementProcessor(eventProcessor);
jsonProcessor.registerElementProcessor(tripPathProcessor);
jsonProcessor.registerElementProcessor(tripPropertiesProcessor);
jsonProcessor.registerElementProcessor(behaviorProcessor);
jsonProcessor.registerElementProcessor(speedingPathProcessor);
jsonProcessor.registerElementProcessor(tripPathBehaviorProcessor);
jsonProcessor.registerElementProcessor(speedingBehaviorProcessor);

export default {
  jsonProcessor: jsonProcessor
};
