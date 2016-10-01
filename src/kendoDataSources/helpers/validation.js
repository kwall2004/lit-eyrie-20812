
export function minLength(inputName, minStringLength, ruleName)
{
  return function (input)
  {
    if (input.is('[name=' + inputName + ']') && input.val().length < minStringLength)
    {
      input.attr('data-kendo-' + ruleName + '-msg', 'Min length is ' + minStringLength);
      return false;
    }
    return true;
  };
}

export function maxLength(inputName, maxStringLength, ruleName)
{
  return function (input)
  {
    if (input.is('[name=' + inputName + ']') && input.val().length > maxStringLength)
    {
      input.attr('data-kendo-' + ruleName+ '-msg', 'Max length is ' + maxStringLength);
      return false;
    }
    return true;
  }
}
