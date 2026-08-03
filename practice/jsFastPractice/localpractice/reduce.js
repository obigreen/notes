//reduce()
// const numbers = [1, 2, 3, 10, 4, 5]
// const res = numbers.reduce((acc, currentValue) => {
//     acc += currentValue / numbers.length
//     return acc
// }, 0)
//
// console.log(res)


// const numbers = [1, 2, 3, 10, 4, 20]
// const res = numbers.reduce((acc, currentValue, index) => {
//     acc += currentValue
//     if (index === numbers.length - 1) {
//         return acc / numbers.length
//
//     }
//     return acc
// }, 0)
//
// console.log(res)


// const resDoo = (numbers) => {
//     let res = 0
//     for (let i = 0; i < numbers.length; i++) {
//         res += numbers[i]
//     }
//
//     return res / numbers.length
// }
//
// console.log(resDoo(numbers))

const numbers = [1, 2, 3, 200, 4, 5, 20]
// const res = numbers.reduce((acc, currentValue) => {
//     if (acc > currentValue) {
//         currentValue = acc
//     }
//     return currentValue
// }, 0)

// console.log(res)

const resFoo = (numbers) => {
    let res = 0
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > res) {
            res = numbers[i]
        }
    }
    return res
}

console.log(resFoo(numbers))

























