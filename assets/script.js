
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculatorScreen = document.getElementById('calcul-screen').querySelector('p');
const messageScreen = document.getElementById('message-screen').querySelector('p');
const calculatorTitle = messageScreen.textContent;
const authorizedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", ".", ","];
const operators = ["+", "-", "X", "/", "*"];
let textInScreen = "";

// To insert content at the end of string to the calculator screen
const addToScreen = (string) => {
  let isOperatorKey = operators.includes(string);
  if(isOperatorKey === true){
    string = ` ${string} `;
  }else if(string === "," || string === "."){
    string = ".";
    if(checkDecimal(calculatorScreen.textContent) === true){
      errorMessage("Il y a déjà assez de décimale", calculatorTitle);
    }else{
      pushInScreen = calculatorScreen.textContent + string;
      calculatorScreen.innerHTML = pushInScreen;
    }
  }else{
    pushInScreen = calculatorScreen.textContent + string;
    calculatorScreen.innerHTML = pushInScreen;
  } 
}

// To remove last caracter writen in the claculator screen
const removeFromScreen = () => {
  textInScreen = calculatorScreen.textContent.split('');
  if (textInScreen[textInScreen.length - 1] === " "){
    textInScreen.pop();
    textInScreen.pop();
    textInScreen.pop();
  }else{
    textInScreen.pop();
  }
  let newTextInScreen = textInScreen.join("");
  calculatorScreen.innerHTML = newTextInScreen;
}

/*
Function that replace operator if already exist
Parametre 1: string in which we want to replace operator
Parmetre 2: Operator (typeof = string) we have to push in string
Paremètre 3: Comparison array
*/
const replaceOperator = (string, operator, array) => {
  let strArray = string.split("");
  let operatorAtIndex = null;
  for(let i=0; i<strArray.length; i++){
    array.forEach(function(item){
      if(item === strArray[i]){
        operatorAtIndex = i;
      }
    })
  }
  if(operatorAtIndex === null){
    newString = strArray.join('') + ` ${operator} `;
  }else{
    strArray[operatorAtIndex] = operator;
    newString = strArray.join('');
  }
  calculatorScreen.innerHTML = newString;
};

// Check if décimal is already written in current number
const checkDecimal = (string) => {
  let isAlreadyDecimal = false;
  strArray = string.split(" ");
  strArray.forEach(function(item){
    let splittedWord = [];
    splittedWord = item.split('');
    splittedWord.forEach(function(){
      isAlreadyDecimal = splittedWord.includes(".");
    })
  })
  return isAlreadyDecimal; //true or false
}


const doTheCalcul = (string) => {
  //convert string in array like ["number1", "operator", "number2"];
  strArray = string.split(" ");
  let firstValue = parseFloat(strArray[0]);
  let operator = strArray[1];
  let secondValue = parseFloat(strArray[2]);
  if( (operator === "/") && (secondValue === 0)){
    errorMessage(`Division par 0 impossible`, calculatorTitle);
  }else{
    switch (operator) {
        case '+':
            result = firstValue + secondValue;
            break;
        case '-':
            result = firstValue - secondValue;
            break;
        case 'X':
            result = firstValue * secondValue;
            break;
        case '/':
            result = firstValue / secondValue;
            break;
        default:
            result = firstValue;
        }
  }
  return result;
}

const clicListener = (e) => {
  //console.log(e);
  let buttonClicked = e.target.textContent;
  if(buttonClicked === "C"){
    removeFromScreen();
  }else if(buttonClicked === "R"){
    calculatorScreen.innerHTML = "";
  }else if(buttonClicked === "Calculate"){
    let operation = calculatorScreen.textContent;
    let calcul = doTheCalcul(operation);
    calculatorScreen.innerHTML = calcul;
  }else{
    isOperatorBtn = operators.includes(buttonClicked);
    if(isOperatorBtn === true){
      textInScreen = calculatorScreen.textContent;
      replaceOperator(textInScreen, buttonClicked, operators);
    }else{
      addToScreen(buttonClicked);
    }
  }
  e.preventDefault();
}

const keyboardListener = (e) => {
  //console.log(e.key);
  keyPressed = e.key;
  let isAuthorizedKeys = authorizedKeys.includes(keyPressed);
  let isOperatorKey = operators.includes(keyPressed);
  if(keyPressed === "c"){
  removeFromScreen();
  }else if(isAuthorizedKeys === true && isOperatorKey === false){
  addToScreen(keyPressed);
  }else if(isOperatorKey === true){
    textInScreen = calculatorScreen.textContent;
    replaceOperator(textInScreen, keyPressed, operators);
  }else if(keyPressed === "r"){
    calculatorScreen.innerHTML = "";
  }else if(keyPressed === "Enter"){
    let operation = calculatorScreen.textContent;
    let calcul = doTheCalcul(operation);
    calculatorScreen.innerHTML = calcul;
  }else{
    errorMessage(`C'est une calculette pas un dico :)`, calculatorTitle);
  }
  e.preventDefault();
}

const errorMessage = (string, initialString) => {
  document.getElementById('calcul-screen').classList.add("error");
  messageScreen.innerHTML = string;
  setTimeout(function(){
    document.getElementById('calcul-screen').classList.remove("error")
  }, 3000);
  setTimeout(function(){
    messageScreen.innerHTML = initialString;
  }, 3000);
}

// Listenning clics on numbers buttons and print his value in the screen
allButtons.forEach(function(item){
  item.addEventListener("click", clicListener);
});

// Listenning keyboard actions and print his value in the screen (if it's authorized)
document.addEventListener("keypress", keyboardListener);