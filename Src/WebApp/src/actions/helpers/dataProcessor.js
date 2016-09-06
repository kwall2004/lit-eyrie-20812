import Q from 'q';

var Processor = function (id) {
    var self = this;

    // An identifier for this processor
    self.processorId = id;

    self.results = {};

    self.elementProcessorRegistrations = {};
    self.elementProcessors = [];
};

Processor.prototype.registerElementProcessor = function (elementProcessor) {
    if (elementProcessor instanceof Processor) {
        if (typeof this.elementProcessorRegistrations[elementProcessor.processorId] === "undefined") {
            this.elementProcessors.push(elementProcessor);
            this.elementProcessorRegistrations[elementProcessor.processorId] = true;
        }
        else {
            throw "This processor has already been registered.";
        }
    }
    else {
        throw "elementProcessor must be an instance of ElementProcessor.";
    }
};

// Process an array of data
// Multiple simulataneous calls to processData will be possible
Processor.prototype.processData = function (element, index, data) {
    // Iterate through the data and get the result as a resolved promise
    return this.iterate(element);
};

// Progresses through the data array and calls the processElement method
// on each element.
Processor.prototype.iterate = function (data) {
    // Holds a promise for each element in the data array.
    var promises = [];
    // This is a hash that holds the results of processing the data.
    // Each key is the processorId of the element processor. The
    // value is an array of results. An element processor may return
    // undefined when processing. If the element processor has
    // discardUndefinedResults set to true, the result array could
    // potentially have fewer elements than the initial data array.
    var dataResult = prepareResultObject(this.elementProcessors);

    for (var i = 0; i < data.length; i++) {
        // parameters: element, index, data array
        var promise = this.processElement(data[i], i, data);
        promises.push(promise);
    }

    return Q.allSettled(promises).then(function (allResults) {
        allResults.forEach(function (result, index) {
            if (result.state === "fulfilled") {
                for (var i = 0; i < this.elementProcessors.length; i++) {
                    var processor = this.elementProcessors[i];
                    var value = result.value[processor.processorId];
                    // An element processor may return undefined when processing.
                    // If the element processor has discardUndefinedResults set to
                    // true, the undefined elements are not added to the result set.
                    if (typeof value !== "undefined" && processor.discardUndefinedResults) {
                        dataResult[processor.processorId].push(value);
                    }
                }
            }
            //else {
            //    var reason = result.reason;
            //}
        }.bind(this));

        return dataResult;
    }.bind(this));

    function prepareResultObject(processors) {
        var results = {};
        for (var i = 0; i < processors.length; i++) {
            var processor = processors[i];
            results[processor.processorId] = [];
        }
        return results;
    }
};

// Process a single element through all the registered processors
Processor.prototype.processElement = function (element, index, data) {
    var promises = [];
    var elementResult = {};

    for (var i = 0; i < this.elementProcessors.length; i++) {
        var processor = this.elementProcessors[i];
        promises.push(Q.fcall(processor.processData.bind(processor), element, index, data));
    }

    return Q.allSettled(promises).then(function (results) {
        results.forEach(function (result, index) {
            if (result.state === "fulfilled") {
                var processor = this.elementProcessors[index];
                var value = result.value;
                elementResult[processor.processorId] = value;
            }
            //else {
            //    var reason = result.reason;
            //}
        }.bind(this));

        return elementResult;
    }.bind(this));
};

export default Processor;
