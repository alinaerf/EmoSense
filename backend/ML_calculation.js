function interpretSentiment(score) {
    if (score > 0.5) return "Strongly Positive";
    if (score > 0) return "Positive";
    if (score === 0) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Strongly Negative";
  }

var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
// getSentiment expects an array of strings
//console.log(analyzer.getSentiment(["I", "hate", "my", 'life', 'but', 'it', 'is', 'amazing']));

const tests = [
    { input: "I love this tutorial" },
    { input: "I hate this tutorial" },
    { input: "This is an average tutorial" },
    { input: "This is the best tutorial ever" },
    { input: "This is the worst tutorial ever" },
  ];

tests.forEach((test, index) => {
    const result = analyzer.getSentiment(test.input.split(" "));
    const humanReadable = interpretSentiment(result);

    console.log(`Test ${index + 1}: Score is ${result} - ${humanReadable}`);
});