function checkLengthString(string, maxLength) {
  return string.length <= maxLength;
}

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';

  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  return reversedStr === normalizedStr;
}

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('довод');

