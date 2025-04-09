let currentInput = '0';        // Almacena el valor actual en pantalla
let previousInput = '';        // Almacena el valor anterior para operaciones
let operation = null;          // Almacena la operación actual (+, -, *, /)
let resetInput = false;        // Bandera para resetear la entrada
let operationHistory = '';     // Almacena el historial de operaciones

// Referencias a los elementos del DOM
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    display.textContent = currentInput;
    historyDisplay.textContent = operationHistory;
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number;
        resetInput = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetInput) {
        currentInput = '0.';
        resetInput = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !resetInput) {
        calculate();
    }
    
    // Actualizar el historial
    if (operationHistory === '' || resetInput) {
        operationHistory = currentInput + ' ' + op;
    } else {
        operationHistory += ' ' + currentInput + ' ' + op;
    }
    
    previousInput = currentInput;
    operation = op;
    resetInput = true;
    updateDisplay();
}

function calculate() {
    if (operation === null) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Actualizar el historial para mostrar la operación completa
    operationHistory = previousInput + ' ' + operation + ' ' + currentInput + ' =';
    
    currentInput = result.toString();
    operation = null;
    resetInput = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    operationHistory = '';
    resetInput = false;
    updateDisplay();
}