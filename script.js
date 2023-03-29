const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const  randomFunc = {
    lower: getRnadomLower,
    upper: getRnadomUpper,
    number: getRnadomNumber,
    symbol: getRnadomSymbols
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText;

    if(!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = gerneratePassword(hasLower, hasUpper, hasSymbols, hasNumbers, length);
})

function gerneratePassword(lower, upper, symbol, number, length){
    let gerneratedPassword = '';
    const typesCount = lower + upper + symbol + number;
    // console.log(typesCount)
    const typesArr = [{lower} , {upper} , {symbol} , {number}].filter(item => Object.values(item)[0]);
    // console.log(typesArr)

    if(typesCount === 0){
        return ''
    }

    for(let i=0;i<length; i+= typesCount){
        typesArr.forEach(type => {
            // console.log(type)
            const funcName = Object.keys(type)[0];

            gerneratedPassword += randomFunc[funcName]();
        })
    }

    // console.log(gerneratedPassword.slice(0, length));

    const finalPassword  = gerneratedPassword.slice(0, length);
    return finalPassword;
}


function getRnadomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}

function getRnadomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

function getRnadomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
}

function getRnadomSymbols(){
    const symbols = "!@#$%^&*()<>?{}[]";
    return symbols[Math.floor(Math.random() * symbols.length)]
}

// console.log(getRnadomSymbols());