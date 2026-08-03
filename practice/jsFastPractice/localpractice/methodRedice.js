const users = [
    {id: 1, name: "Name1"},
    {id: 2, name: "Name2"},
    {id: 3, name: "Name3"}
]
//Ожидаемый результат
// {
//     1 : "Name1",
//     2 : "Name2",
//     3 : "Name3"
// }
const uesrObject = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
}, {0 : "Hey!"})

console.log(uesrObject)

// let numbers = [1, 2, 3, 4, 5];
// let sum = numbers.reduce((total, number) => {
//     newSumm = total + number
//     return newSumm + 1
// }, 3);
//
// console.log(newSumm); // 15