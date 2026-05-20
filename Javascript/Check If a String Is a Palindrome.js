const isPalindrome = (word) => {
  const reversed = [...word].reverse().join('');

  if (word === reversed) {
    console.log(`The word ${word} is a palindrome.`);
  } else {
    console.log(`The word ${word} is not a palindrome.`);
  }
};

isPalindrome('redivider');
