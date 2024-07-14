const partsOfSpeech = {
   
   "徐々に消えてゆく": "fade away",
"革命": "revolution",
"ほうっておかれる、延期される": "wait",
"心、精神": "soul",
"うぬぼれさせる、慢心させる": "go to one's head",
"怒り": "anger",
"真っ盛りで、咲いて": "in bloom",
"素晴らしい": "splendid",
"分かち合う": "share",
"視点、考え方": "point of view",
"地平線": "horizon",
"時間を割く": "spare",
"あえてする": "dare",
"を追いかける": "pursue",
"に没頭している": "lost in",
"を大切にする": "treasure",
"の近くに": "close to",
"眠りに落ちる": "fall asleep",
"息をする、呼吸する": "breathe",
"見逃す": "miss",
"瞬間": "moment",











};

let mistakes = [];
let currentPartOfSpeech = '';
let currentCategory = '';
let correctAnswers = 0;
let totalQuestions = 0;
let askedQuestions = [];

function getRandomPartOfSpeech() {
    const categories = Object.keys(partsOfSpeech).filter(category => !askedQuestions.includes(category));
    const category = categories[Math.floor(Math.random() * categories.length)];
    const partOfSpeech = partsOfSpeech[category];
    return { category, partOfSpeech };
}

function startQuiz() {
    if (totalQuestions < 21) {
        const { category, partOfSpeech } = getRandomPartOfSpeech();
        currentPartOfSpeech = partOfSpeech;
        currentCategory = category;
        askedQuestions.push(category);
        document.getElementById('part-of-speech-display').innerText = `品詞: '${category}'`;
        totalQuestions++;
    } else {
        showFinalResults();
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('category-input').value.toLowerCase().trim();
    if (userAnswer !== currentPartOfSpeech) {
        alert(`Wrong! The correct answer is '${currentPartOfSpeech}'.`);
        mistakes.push({ category: currentCategory, partOfSpeech: currentPartOfSpeech });
    } else {
        alert('Correct!');
        correctAnswers++;
    }
    document.getElementById('category-input').value = '';
    startQuiz();
}

function retryMistakes() {
    if (mistakes.length === 0) {
        alert("No mistakes to retry.");
        return;
    }
    const { category, partOfSpeech } = mistakes.shift();
    currentPartOfSpeech = partOfSpeech;
    currentCategory = category;
    document.getElementById('part-of-speech-display').innerText = `Retry: 品詞: '${category}'`;
}

function showFinalResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('final-result-container').classList.remove('hidden');
    document.getElementById('show-results-button').classList.add('hidden');

    const resultList = document.getElementById('final-result-list');
    resultList.innerHTML = `<li>Correct Answers: ${correctAnswers}</li><li>Total Questions: ${totalQuestions}</li>`;

    if (mistakes.length > 0) {
        const mistakesList = document.createElement('ul');
        mistakesList.innerHTML = "<li>Mistakes:</li>";
        mistakes.forEach(mistake => {
            const listItem = document.createElement('li');
            listItem.innerText = `${mistake.category} (${mistake.partOfSpeech})`;
            mistakesList.appendChild(listItem);
        });
        resultList.appendChild(mistakesList);
    }
}

window.onload = function() {
    startQuiz();
};
