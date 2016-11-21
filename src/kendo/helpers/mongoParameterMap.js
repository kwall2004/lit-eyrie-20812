const getParams = function (kendoParams) {
  var params = {};
  params.limit = kendoParams.take;
  params.skip = kendoParams.skip;
  params.match = {};
  params.match.clientId = { $exists: true }
  params.sort = {};
  if (kendoParams.filter) {
    var logic = kendoParams.filter.logic;
    if (logic === 'and') logic = '$and';
    if (logic === 'or') logic = '$or';

    params.match[logic] = [];
    kendoParams.filter.filters.forEach(function (element, index, array) {
      var pair = {};
      switch (element.operator) {
        case 'eq':
          pair[element.field] = {};
          pair[element.field]['$regex'] = '^' + element.value + '$';
          pair[element.field]['$options'] = 'i';
          break;
        case 'neq':
          pair[element.field] = {};
          pair[element.field]['$regex'] = '[^' + element.value + '$]';
          pair[element.field]['$options'] = 'i';
          break;
        case 'startswith':
          pair[element.field] = {};
          pair[element.field]['$regex'] = '^' + element.value;
          pair[element.field]['$options'] = 'i';
          break;
        case 'endswith':
          pair[element.field] = {};
          pair[element.field]['$regex'] = element.value + '$';
          pair[element.field]['$options'] = 'i';
          break;
        case 'contains':
          pair[element.field] = {};
          pair[element.field]['$regex'] = '.*' + element.value + '.*';
          pair[element.field]['$options'] = 'i';
          break;
        case 'doesnotcontain':
          pair[element.field] = {};
          pair[element.field]['$regex'] = '^((?!' + element.value + ').)*$';
          pair[element.field]['$options'] = 'i';
          break;
        default:
          pair[element.field] = {};
          pair[element.field][element.operator] = element.value;
      }
      params.match[logic].push(pair);
    });
  }
  if (kendoParams.sort) {
    kendoParams.sort.forEach(function (element, index, array) {
      if (element.dir == 'asc') params.sort[element.field] = 1;
      if (element.dir == 'desc') params.sort[element.field] = -1;
    });
  }
  params.sort.createdAt = 1;

  return params;
}

export default getParams;
