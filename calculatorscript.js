let currentInput = '';
let previousInput = '';
let operator = '';
let resultCalculated = false; // Variabile di stato per controllare se il risultato è stato calcolato

function addToDisplay(value) {
    if (resultCalculated) {
        // Se il risultato è stato calcolato, comincia un nuovo calcolo con il risultato precedente
        currentInput = value;
        resultCalculated = false;
    } else {
        // Se il display è "0", sostituirlo con il numero premuto (ma non accettare più zeri consecutivi)
        if (currentInput === '0' && value === '0') {
            return; // Non fare nulla se si preme "0" quando il display è già "0"
        }

        // Se si preme la virgola, aggiungiamola solo se non è già presente
        if (value === ',' && !currentInput.includes(',')) {
            currentInput += value;
        } else if (value !== ',') {
            // Se il valore non è una virgola, aggiungiamo il numero normalmente
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
    }

    // Limita la lunghezza del numero a 13 caratteri
    if (currentInput.length > 13) {
        currentInput = currentInput.slice(0, 13);
    }

    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultCalculated = false; // Resetta lo stato dopo un "CE"
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
    // Sostituire la virgola con il punto per gestire correttamente i numeri float
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

    // Limita il risultato a 11 caratteri (inclusi decimali)
    currentInput = formatResult(result);
    operator = '';
    previousInput = '';
    resultCalculated = true; // Imposta lo stato su true dopo aver calcolato il risultato
    updateDisplay(currentInput);
}

function formatResult(result) {
    // Se il risultato è un numero, limitare a 11 caratteri
    if (typeof result === 'number') {
        let resultStr = result.toString();
        
        // Se è un numero molto lungo, troncare alla lunghezza desiderata
        if (resultStr.length > 11) {
            // Se il numero è un float, troncare alla lunghezza massima di 11 caratteri
            resultStr = parseFloat(result).toFixed(10); // Limitiamo a 10 decimali
        }

        // Se il numero è negativo o contiene decimali, assicurarsi che il risultato non superi 11 caratteri
        if (resultStr.length > 11) {
            resultStr = resultStr.slice(0, 11); // Tronca a 11 caratteri
        }

        // Sostituiamo il punto con la virgola per la visualizzazione
        return resultStr.replace('.', ',');
    }
    return result.toString();
}

function updateDisplay(value) {
    document.getElementById('display').textContent = value;
}

function showCat() {
    const catImage = document.getElementById('catImage');

    // Se l'immagine è già visibile, nascondila
    if (catImage.style.display === 'block') {
        catImage.style.display = 'none';
    } else {
        // Altrimenti, mostra l'immagine
        catImage.style.display = 'block';
    }
}
