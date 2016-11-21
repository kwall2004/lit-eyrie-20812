const getParams = function (kendoParams) {
  var params = {};
  params.limit = kendoParams.take;
  params.skip = kendoParams.skip;
  if (kendoParams.filter) {
    params.where = {};
    var logic = kendoParams.filter.logic;
    if (logic === 'and') logic = '$and';
    params.where[logic] = [];
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
      params.where[logic].push(pair);
    });
  }
  if (kendoParams.sort) {
    params.sort = {};
    kendoParams.sort.forEach(function (element, index, array) {
      params.sort[element.field] = element.dir;
    });
  }

  return params;
}

export default getParams;
