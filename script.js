const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const btns = document.querySelectorAll('.btn');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const negative = document.querySelector('#negative');
let displayValue = '';
let num1;
let operator;
let isNewNum = false;
let isError = false;

function add(a, b) {
	return Number(a) + Number(b);
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, a, b) {
	switch (operator) {
		case 'add': 
		 return add(a, b)
		case 'subtract':
		 return subtract(a, b);
		case 'multiply':
		 return multiply(a, b);
		case 'divide':
		 return divide(a, b);
		default:
		 throw 'No operator selected';
	}
}

function changeOpacity() {
 this.classList.add('active');
 setTimeout(() => this.classList.remove('active'), 100);
}

function displayNumbers() {
 if (isNewNum) displayValue = '';
 if (isError || typeof displayValue != 'string') reset();
 if (displayValue.length < 8) {
  isNewNum = false;
  const addedNum = (this.dataset.value == '.' 
   && displayValue.includes('.')) ? '' : this.dataset.value;
  displayValue += addedNum;
  display.textContent = displayValue;
 }
}

function storeNumAndOp() {
 if (isError) reset();
 if (num1 && displayValue) showResult();
 num1 = displayValue;
 operator = this.id;
 isNewNum = true;
}

function showResult() {
 if (isError) reset();
 if (!operator || isNewNum) return;
 if (operator == 'divide' && displayValue == 0) {
  display.textContent = '#DIV/0';
  isError = true;
  return;
 }
 displayValue = Math.round((operate(operator, num1, displayValue) + Number.EPSILON) * 100) / 100;
 if (String(displayValue).length > 11) {
  display.textContent = '#OVERFLOW';
  isError = true;
  return;
 }
 display.textContent = displayValue;
 operator = null;
}

function reset() {
 display.textContent = '';
 num1 = null;
 operator = null;
 displayValue = '';
 isNewNum = false;
 isError = false;
}

function clearLastDigit() {
 if (isError) reset();
 if (typeof displayValue != 'string') return;
 displayValue = displayValue.slice(0, -1);
 display.textContent = displayValue;
}

function multiplyMinusOne() {
 if (typeof displayValue != 'string') return;
 displayValue = displayValue ? String(displayValue * -1) : '-';
  display.textContent = displayValue;
}

btns.forEach(btn => btn.addEventListener('click', changeOpacity));

numbers.forEach(number => number.addEventListener('click', displayNumbers));

operators.forEach(operator => operator.addEventListener('click', storeNumAndOp));

equal.addEventListener('click', showResult);

clear.addEventListener('click', reset);

backspace.addEventListener('click', clearLastDigit);

negative.addEventListener('click', multiplyMinusOne);
