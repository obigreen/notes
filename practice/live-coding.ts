export type User = {
    name: string;
    isActive: boolean;
}


const users: User[] = [
    {name: "Ann", isActive: true},
    {name: "Bob", isActive: false},
    {name: "Kate", isActive: true},
];


const oldUsers: User[] = [
    {name: "Lila", isActive: false},
    {name: "Gleb", isActive: false},
    {name: "Monica", isActive: true},
];


function getActiveUserNames(users: User[]) {
    return users.filter((user) => {return user.isActive}).map(user => user.name);
}


console.log(getActiveUserNames(users));
console.log(getActiveUserNames(oldUsers));