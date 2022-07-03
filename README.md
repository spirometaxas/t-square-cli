# t-square-cli
Print the T-Square Fractal to the console!

## Usage
### Via `npx`:
```
$ npx t-square-cli <n>
$ npx t-square-cli <n> <size>
```

### Via Global Install
```
$ npm install --global t-square-cli
$ t-square-cli <n>
$ t-square-cli <n> <size>
```

### Via Import
```
$ npm install t-square-cli
```
then:
```
const t_square = require('t-square-cli');
console.log(t_square.create(<n>));
console.log(t_square.create(<n>, <size>));
console.log(t_square.create(<n>, <size>, <character>));
```

