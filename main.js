for (let i = 0; i < 16; i++) {
    let str = "cell" + i
    eval(str).addEventListener('click', clickButton, false)
}
exponentOperator.addEventListener('click', exponent, false)
equalsOperator.addEventListener('click', equals, false)
deleteLast.addEventListener('click', deleteFunc, false)
minusNum.addEventListener('click', timesMinusOne, false)

let bool = false;

function timesMinusOne() {
    result.textContent += "(-"
}

function computeWithExponential(textInput) {
    let arr = textInput.split("")
    let countOpen = 0
    let countClose = 0
    let resultToBeSquared = 0
    let exponent = 0
    let result = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "^") {
            countOpen = 0
            countClose = 0
            if(arr[i-1] === ")") {
                for (let j = i; j >= 0; j--) {
                    if (arr[j] === "(") {
                        countOpen ++
                    } else if (arr[j] === ")") {
                        countClose ++
                    }
                    if(countOpen === countClose && countClose !== 0) {
                        resultToBeSquared = arr.splice(j, i-j+2)
                        exponent = resultToBeSquared[resultToBeSquared.length-1]
                        resultToBeSquared.pop()
                        resultToBeSquared.pop()
                        result = expo(eval(resultToBeSquared.join("")), exponent)
                        arr.splice(j,0,result)
                        i = 0
                        j = -1
                    }
                }
            } else {
                arr[i-1] = expo(arr[i-1],arr[i+1])
                arr.splice(i,2)
                
            }
            
        } 
        

    }
    console.log(arr)
    arr = eval(arr.join(""))
    return arr
}

function expo(num1, num2) {
    if (num2 === 0) {
        return 1
    }
    return num1*(expo(num1, num2-1))
}

function deleteFunc() {
    restart()
    result.textContent = result.textContent.substring(0, result.textContent.length - 1);
    result.textContent.length === 0 ? formula.textContent="" : null
}

function restart() {
    bool===true? result.textContent = "" : null
    bool = false
}

function countBrackets(formula) {
    let formulaArr = formula.split("");
    let openCount = 0;
    let closeCount = 0;
    for (let i = 0; i < formulaArr.length; i++) {
        formulaArr[i] === "(" ? openCount++ : formulaArr[i] === ")" ? closeCount++ : 0
    }
    return openCount === closeCount
}

function equals() {
    if (countBrackets(result.textContent)) {
        try{
            formula.textContent = result.textContent
        if (result.textContent.includes("^")) {
            result.textContent = computeWithExponential(result.textContent)
        } else {
            result.textContent = eval(result.textContent)
        }
        bool = true
        formula.classList.remove("error")
        }
        catch (e) {
            formula.textContent = "There was an error. Check your function!"
            formula.classList.add("error")
        }
    } else {
        cell15.classList.add("closeBracket")
    }
    
}

function exponent() {
    !bool? result.textContent += "^" : null
}

function clickButton() {
    restart()
    
    cell15.classList.remove("closeBracket")
    if(result.textContent==="Waiting for input...") {
        result.textContent = ""
    }
    let content = result.textContent
    content += this.textContent
    result.textContent = content   
}