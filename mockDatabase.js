// In a real application, you would use a library like 'mammoth' or 'docx-extractor'
// to parse 'questions.docx' and extract the data.
// Example:
// const mammoth = require('mammoth');
// const fs = require('fs');
//
// async function parseDocxQuestions(filePath) {
//   const result = await mammoth.extractRawText({ path: filePath });
//   const text = result.value; // The raw text from the .docx
//   // Implement complex parsing logic here to extract questions, options, and correct answers
//   // based on the specific formatting (e.g., question numbers, (a), (b), (c), (d) options,
//   // and parenthesis markup for correct answers).
//   // This would involve regular expressions and careful state management.
//   // For demonstration, we are providing a hardcoded, simulated dataset.
//   return simulatedQuestions;
// }
//
// const questions = parseDocxQuestions('C:/DOM/Traffice/questions.docx');
// For this simulation, we'll use a hardcoded array of 433 questions.

const questions = [];

for (let i = 1; i <= 433; i++) {
  questions.push({
    id: i,
    text: {
      rw: `Ikibazo cya ${i}: Ni ubuhe umuvuduko ntarengwa wemewe mu gace katuwe mu Rwanda, keretse habaye ikindi kimenyetso?`,
      en: `Question ${i}: What is the maximum speed limit in a residential area in Rwanda, unless otherwise indicated?`,
      fr: `Question ${i}: Quelle est la limite de vitesse maximale dans une zone résidentielle au Rwanda, sauf indication contraire ?`
    },
    options: [
      { id: 1, text: { rw: "40 km/h", en: "40 km/h", fr: "40 km/h" } },
      { id: 2, text: { rw: "50 km/h", en: "50 km/h", fr: "50 km/h" } },
      { id: 3, text: { rw: "60 km/h", en: "60 km/h", fr: "60 km/h" } },
      { id: 4, text: { rw: "80 km/h", en: "80 km/h", fr: "80 km/h" } }
    ],
    // Correct option will cycle for variety in simulation
    correctOptionId: (i % 4) + 1
  });
}

module.exports = { questions };