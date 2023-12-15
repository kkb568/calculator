export function calculate(prev, curr) {
  // Split the prevInput by whitespace character.
  const prevSplits = prev.split(/(\s)/)
  // Get the number from the prevInput
  const prev_num = Number(prevSplits[0])
  // Get the symbol from prevInput.
  const symbol = prevSplits[prevSplits.length - 1]
  var result;
  // Do the calculations depending on the symbol.
  switch (symbol) {
    case '+':
      result = prev_num + curr
      break;
    case '-':
      result = prev_num - curr
    break;
    case '/':
      result = checkDivision(prev_num, curr)
    break;
    case 'x':
      const resultToCheck = prev_num * curr
      if (checkDecimal(resultToCheck)) {
        result = roundDecimalResult(resultToCheck)
      } else {
        result = resultToCheck
      }
    break;
  }
  return result
}

// Function to check if a number is an 
// integer or a double/float.
function checkDecimal(val) {
  const result = val % 1
  if (result != 0) {
    return true
  } else {
    return false
  }
}

function roundDecimalResult(result) {
  let roundResult
  // Convert the result to a string.
  const resultString = result.toString()
  // Get the position of the decimal point.
  const decIndex = resultString.indexOf('.')
  // Count the number of decimal places.
  const decPlaces = resultString.length - decIndex - 1
  if (decPlaces > 2) {
    roundResult = Number(resultString).toFixed(2)
  } else {
    roundResult = Number(resultString)
  }
  return roundResult
}

// Function to check for divisibility.
function checkDivision(prev, curr) {
  if (curr == 0) {
    return 'Cannot divide by 0'
  }
  else {
    const result = prev / curr
    if (checkDecimal(result)) {
      return roundDecimalResult(result)
    } else {
      return result
    }
  }
}

// Function to check if the value is a symbol.
export function checkSymbol(value) {
  if (value == '+' || value == '-' || 
  value == 'x' || value == '/') {
    return true
  } else {
    return false
  }
}

export function checkDot(value) {
  const valueChars = value.split('')
  return valueChars.includes('.')
}