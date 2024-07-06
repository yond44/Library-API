//Soal nomor 1
const input1 = "NEGIE1";

function reverseString(input) {
  const lastWord = input1.slice(-1);
  const restOfString = input.slice(0, -1);

  const reversedString = restOfString.split("").reverse().join("");

  return reversedString + lastWord;
}

console.log(reverseString(input1));

//Soal nomor 2
const input2 = "Saya sangat senang mengerjakan soal algoritma";

function longestWord(input) {
  const splitedSentenced = input.split(" ");

  let arrayCount = [];
  splitedSentenced.forEach((words) => {
    if (words) {
      arrayCount.push(words.length);
    }
  });
  return `Longest: ${Math.max(...arrayCount)} characters`;
}

console.log(longestWord(input2));

//Soal nomor 3
const input3 = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

function howManyQuery(input, query) {
  const queryCount = new Map();

  query.forEach((item) => {
    queryCount.set(item, 0);
  });

  input.forEach((entry) => {
    if (queryCount.has(entry)) {
      queryCount.set(entry, queryCount.get(entry) + 1);
    }
  });

  return Array.from(queryCount.values());
}

console.log(howManyQuery(input3, query));

//Soal nomor 4
const input4 = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

function diagonalMatrix(input) {
  let diagonal1 = 0;
  let diagonal2 = 0;

  for (let i = 0; i < input.length; i++) {
    diagonal1 += input[i][i];
    diagonal2 += input[i][input.length - 1 - i];
  }

  return diagonal1 - diagonal2;
}

console.log(diagonalMatrix(input4));
