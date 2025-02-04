let currentInput = '';
let previousInput = '';
let operator = '';
let resultCalculated = false; // checks if the result has been calculated
function addToDisplay(value) {
    if (resultCalculated) {
        // if the result has been calculated, starts a new operation from the current result
        currentInput = value;
        resultCalculated = false;
    } else {
        // If the display is set to "0", substitute with the input number. Multiple "0" are not allowed
        if (currentInput === '0' && value === '0') {
            return; // Don't do anything when "0" is already displayed
        }

        // Adds a comma after checking if it's already present
        if (value === ',' && !currentInput.includes(',')) {
            currentInput += value;
        } else if (value !== ',') {
            // If the number is int, add it normally
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
    }

    // Limits input to a length of 11
    if (currentInput.length > 11) {
        currentInput = currentInput.slice(0, 11);
    }

    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultCalculated = false; // resets the state after "CE" is pressed
    updateDisplay('0');
}

function operate(op) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay('0');
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    // Switches the "." with a comma for floats (The dev is european)
    const num1 = parseFloat(previousInput.replace(',', '.'));
    const num2 = parseFloat(currentInput.replace(',', '.'));

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                result = 'Error';
            }
            break;
        default:
            return;
    }

      if (result < 0) {
        result = 0; // Sets the result to "0" if the output is negative
    }

    // Limits result to 11 characters, floats included
    currentInput = formatResult(result);
    operator = '';
    previousInput = '';
    resultCalculated = true; // Sets the state to true after the result is displayed
    updateDisplay(currentInput);
}

function formatResult(result) {
    
    if (typeof result === 'number') {
        let resultStr = result.toString();
        
        // Displays a maximum of 11 numbers for the result
        if (resultStr.length > 11) {
            // same for floats
            resultStr = parseFloat(result).toFixed(10); // limits the float to 10 decimals
        }

        
        if (resultStr.length > 11) {
            resultStr = resultStr.slice(0, 11); 
        }

        // Shows a comma in place of the point for float results
        return resultStr.replace('.', ',');
    }
    return result.toString();
}

function updateDisplay(value) {
    document.getElementById('display').textContent = value;
}

function showCat() {
    const catImage = document.getElementById('catImage');

    // If the image is visible, hide it
    if (catImage.style.display === 'block') {
        catImage.style.display = 'none';
    } else {
        // Show the image
        catImage.style.display = 'block';
    }
}
