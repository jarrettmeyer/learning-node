function countWords(arrayOfWords) {
  return arrayOfWords.reduce(function (wordCounts, word) {
    // If the word exists in wordCounts, then increment the existing
    // count by 1. If the word does not exist, then initialize the
    // word count to 1.
    if (wordCounts[word]) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
    return wordCounts;
  }, {});
}
module.exports = countWords;
