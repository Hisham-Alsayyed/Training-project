
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
  document.getElementById('currentOperand').innerText = currentOperand;
  
  if (operation != null) {
    document.getElementById('previousOperand').innerText = previousOperand + ' ' + operation;
  } else {
    document.getElementById('previousOperand').innerText = '';
  }
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  
  if (previousOperand !== '') {
    compute();
  }
  
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+': result = prev + current; break;
    case '−': 
    case '-': result = prev - current; break;
    case '×': result = prev * current; break;
    case '÷':
      if (current === 0) {
        alert("لا يمكن القسمة على صفر!");
        clearDisplay();
        return;
      }
      result = prev / current; 
      break;
    default: return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
  updateDisplay();
}

function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

function deleteLast() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", function() {
  
  document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => {
      appendNumber(button.innerText);
    });
  });

  document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => {
      chooseOperation(button.innerText);
    });
  });

  document.querySelector('.btn-equals').addEventListener('click', () => {
    compute();
  });

  document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    clearDisplay();
  });

  document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    deleteLast();
  });

});