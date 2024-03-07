export const letters = /\p{L}+/u;

export const digits = /\d/;

export const symbols = /[!-\/:-@[-`{-~]/;

export const lettersAndNumbers = /(?=.*\d)(?=.*[a-z])/;

export const lettersAndSymbols = /(?=.*\d)((?=.*\W)|(?=.*_))^[^ ]+$/;

export const symbolsAndNumbers = /(?=.*[a-z])((?=.*\W)|(?=.*_))^[^ ]+$/;

export const lettersDigitsSymbols = /(?=.*\d)(?=.*[a-z])((?=.*\W)|(?=.*_))^[^ ]+$/
