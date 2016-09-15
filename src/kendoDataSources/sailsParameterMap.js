const getSailsParams = function (kendoParams) {
    var sailsParams = {};
    sailsParams.limit = kendoParams.take;
    sailsParams.skip = kendoParams.skip;
    if (kendoParams.filter) {
        sailsParams.where = {};
        var logic = kendoParams.filter.logic;
        if (logic === 'and') {
            logic = '$and';
        }
        sailsParams.where[logic] = [];
        kendoParams.filter.filters.forEach(function (element, index, array) {
            var pair = {};
            switch (element.operator) {
                case 'eq':
                    pair[element.field] = element.value;
                    break;
                case 'neq':
                    pair[element.field] = {};
                    pair[element.field]['!'] = element.value;
                    break;
                case 'startswith':
                    pair[element.field] = {};
                    pair[element.field]['startsWith'] = element.value;
                    break;
                case 'endswith':
                    pair[element.field] = {};
                    pair[element.field]['endsWith'] = element.value;
                    break;
                default:
                    pair[element.field] = {};
                    pair[element.field][element.operator] = element.value;
            }
            sailsParams.where[logic].push(pair);
        });
    }
    if (kendoParams.sort) {
        sailsParams.sort = {};
        kendoParams.sort.forEach(function (element, index, array) {
            sailsParams.sort[element.field] = element.dir;
        });
    }

    return sailsParams;
}

export default getSailsParams;
