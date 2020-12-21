
function between(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max))
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed(precision: number) {
    return between(0, precision, 20)
}

function numbersToCurrency(numbers: string, precision: number) {
    const exp = Math.pow(10, precision)
    const float = parseFloat(numbers) / exp
    return float.toFixed(fixed(precision))
}

function toStr(value: number) {
    return value ? value.toString() : ''
}

function onlyNumbers(input: any) {
    return toStr(input).replace(/\D+/g, '') || '0'
}

function unformat(input: any, precision: any) {
    const negative = input.indexOf('-') >= 0 ? -1 : 1
    const numbers = onlyNumbers(input)
    const currency = numbersToCurrency(numbers, precision)
    return parseFloat(currency) * negative
}


export {
    unformat
}