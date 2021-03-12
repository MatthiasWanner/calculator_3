
const allButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculatorScreen = document.getElementById('calcul-screen').querySelector('p');
const messageScreen = document.getElementById('message-screen').querySelector('p');
const authorizedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "="];
const operators = ["+", "-", "*", "/"];
let textInScreen = "";

// To insert content at the end of string to the calculator screen
const addToScreen = (string) => {
  let isOperatorKey = operators.includes(string);
  if(isOperatorKey === true){
    string = ` ${string} `;
  }
  pushInScreen = calculatorScreen.textContent + string;
  calculatorScreen.innerHTML = pushInScreen;
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

const doTheCalcul = (string) => {
  strArray = string.split(" ");
  let firstValue = parseInt(strArray[0]);
  let operator = strArray[1];
  let secondValue = parseInt(strArray[2]);
  if( (operator === "/") && (secondValue === 0)){
    result = "Invalid operator";
  }else{
    switch (operator) {
        case '+':
            result = firstValue + secondValue;
            break;
        case '-':
            result = firstValue - secondValue;
            break;
        case '*':
            result = firstValue * secondValue;
            break;
        case '/':
            result = firstValue / secondValue;
            break;
        default:
            result = " ";
        }
  return result;
  }
}

const clicListener = (e) => {
  //console.log(e);
  if(e.target.textContent === "C"){
    removeFromScreen();
  }else if(e.target.textContent === "Calculate"){
    let operation = calculatorScreen.textContent;
    let calcul = doTheCalcul(operation);
    calculatorScreen.innerHTML = calcul;
  }else{
    isOperatorBtn = operators.includes(e.target.textContent);
    if(isOperatorBtn === true){
      textInScreen = calculatorScreen.textContent;
      replaceOperator(textInScreen, e.target.textContent, operators);
    }else{
      addToScreen(e.target.textContent);
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
    messageScreen.innerHTML = `C'est une calculette pas un dico :)`;
  }
  e.preventDefault();
}

// Function which manage listeners
// const listener = (e) => {
//   if(e.type === "click"){
//     //console.log(e);
//     if(e.target.textContent === "C"){
//       removeFromScreen();
//     }else if(e.target.textContent === "Calculate"){
//       let operation = calculatorScreen.textContent;
//       let calcul = doTheCalcul(operation);
//       calculatorScreen.innerHTML = calcul;
//     }else{
//       isOperatorBtn = operators.includes(e.target.textContent);
//       if(isOperatorBtn === true){
//         textInScreen = calculatorScreen.textContent;
//         replaceOperator(textInScreen, e.target.textContent, operators);
//       }else{
//         addToScreen(e.target.textContent);
//       }
//     }
//   }
//   if(e.type === "keypress"){
//     //console.log(e.key);
//     keyPressed = e.key;
//     let isAuthorizedKeys = authorizedKeys.includes(keyPressed);
//     let isOperatorKey = operators.includes(keyPressed);
//     if(keyPressed === "c"){
//     removeFromScreen();
//     }else if(isAuthorizedKeys === true && isOperatorKey === false){
//     addToScreen(keyPressed);
//     }else if(isOperatorKey === true){
//       textInScreen = calculatorScreen.textContent;
//       replaceOperator(textInScreen, keyPressed, operators);
//     }else if(keyPressed === "r"){
//       calculatorScreen.innerHTML = "";
//     }else if(keyPressed === "Enter"){
//       let operation = calculatorScreen.textContent;
//       let calcul = doTheCalcul(operation);
//       calculatorScreen.innerHTML = calcul;
//     }else{
//       messageScreen.innerHTML = `C'est une calculette pas un dico :)`;
//     }
//     e.preventDefault();
//   }
// }

// Listenning clics on numbers buttons and print his value in the screen
allButtons.forEach(function(item){
  item.addEventListener("click", clicListener);
});

// Listenning keyboard actions and print his value in the screen (if it's authorized)
document.addEventListener("keypress", keyboardListener);