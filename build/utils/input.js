const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function input(text) {
  return new Promise(resolve => {
    rl.question(text, answer => {
      resolve(answer);
    });
  });
}
input.rl = rl;
module.exports = input;
