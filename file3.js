
const quizData = {
    science: {
        easy: [
            { q: "What planet is known as the Red Planet?", options: ["Mars","Earth","Venus","Jupiter"], ans: 0 },
            { q: "Water's chemical formula?", options: ["H2O","CO2","O2","NaCl"], ans: 0 },
            { q: "What is the center of an atom called?", options: ["Neutron","Mass","Electron","Nucleus"], ans: 3 },
            { q: "I cover most of the Earth and I'm salty. What am I?", options: ["Ocean","Lake","River","Pond"], ans: 0 },
            { q: "What is the main gas in the air we breathe?", options: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], ans: 1 }
        ],
        medium: [
            { q: "What gas do plants absorb?", options: ["Oxygen","Nitrogen","Carbon Dioxide","Helium"], ans: 2 },
            { q: "Which blood cells fight infection?", options: ["RBC","WBC","Platelets","Plasma"], ans: 1 },
            { q: "Strongest gravity planet?", options: ["Earth","Mars","Jupiter","Pluto"], ans: 2 },
            { q: "Unit of resistance?", options: ["Ohm","Volt","Ampere","Watt"], ans: 0 },
            { q: "Boiling point of water?", options: ["80°C","90°C","100°C","120°C"], ans: 2 }
        ],
        hard: [
            { q: "Speed of light?", options: ["3×10⁸ m/s","3×10⁶","3×10⁵","3×10⁷"], ans: 0 },
            { q: "Cell division?", options: ["Mitosis","Meiosis","Fusion","Fission"], ans: 0 },
            { q: "Water transport in plants?", options: ["Phloem","Xylem","Root","Leaf"], ans: 1 },
            { q: "Powerhouse of cell?", options: ["Ribosome","Nucleus","Golgi","Mitochondria"], ans: 3 },
            { q: "Largest heart chamber?", options: ["LA","RA","LV","RV"], ans: 2 }
        ]
    },

    gk: {
        easy: [
            { q: "Capital of Pakistan?", options: ["Lahore","Karachi","Islamabad","Quetta"], ans: 2 },
            { q: "Largest ocean?", options: ["Indian","Atlantic","Pacific","Arctic"], ans: 2 },
            { q: "Leap year days?", options: ["365","366","364","360"], ans: 1 },
            { q: "Largest human organ?", options: ["Heart","Skin","Liver","Brain"], ans: 1 },
            { q: "Reason for seasons?", options: ["Rotation","Tilt","Moon","Distance"], ans: 1 }
        ],
        medium: [
            { q: "Regenerating organ?", options: ["Heart","Brain","Liver","Kidney"], ans: 2 },
            { q: "Great Barrier Reef?", options: ["USA","Australia","Japan","Turkey"], ans: 1 },
            { q: "Sun vitamin?", options: ["A","B","C","D"], ans: 3 },
            { q: "Smallest living unit?", options: ["Atom","Cell","Molecule","Tissue"], ans: 1 },
            { q: "Ozone layer?", options: ["Troposphere","Stratosphere","Mesosphere","Thermosphere"], ans: 1 }
        ],
        hard: [
            { q: "Rarest blood group?", options: ["O+","A+","B+","AB-"], ans: 3 },
            { q: "Produces bile?", options: ["Pancreas","Liver","Stomach","Gall bladder"], ans: 1 },
            { q: "Largest desert?", options: ["Sahara","Arabian","Gobi","Antarctic"], ans: 3 },
            { q: "Richter scale?", options: ["Flood","Earthquake","Tornado","Volcano"], ans: 1 },
            { q: "Shortest day planet?", options: ["Mars","Earth","Saturn","Jupiter"], ans: 3 }
        ]
    },

    maths: {
        easy: [
            { q: "2 + 2 = ?", options: [3,4,5,6], ans: 1 },
            { q: "5 × 3 = ?", options: [8,15,10,12], ans: 1 },
            { q: "Triangle angles sum?", options: [90,180,360,120], ans: 1 },
            { q: "4 pencils at $2?", options: ["$6","$8","$10","$12"], ans: 1 },
            { q: "Next: 2,4,6,8?", options: [9,10,11,12], ans: 1 }
        ],
        medium: [
            { q: "√144?", options: [10,11,12,13], ans: 2 },
            { q: "Area 10×5?", options: [30,40,50,60], ans: 2 },
            { q: "3,6,12,24?", options: [36,48,42,30], ans: 1 },
            { q: "5x = 25?", options: [3,4,5,6], ans: 2 },
            { q: "3² + 4²?", options: [25,16,12,20], ans: 0 }
        ],
        hard: [
            { q: "3x + 5 = 20?", options: [3,4,5,6], ans: 1 },
            { q: "3(2x−4)+5=17", options: [4,3,5,6], ans: 0 },
            { q: "1,4,9,16?", options: [25,30,36,49], ans: 0 },
            { q: "150km in 3h → 250km?", options: ["4h","5h","6h","4.5h"], ans: 1 },
            { q: "5 red, 3 blue prob red?", options: ["3/8","5/8","1/2","3/5"], ans: 1 }
        ]
    }
};

let current = 0;
let score = 0;
let quiz = [];
let selectedOption = null;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const welcomeEl = document.getElementById("welcome");


const originalQuizHTML = quizScreen.innerHTML;


function startGame() {
    const name = document.getElementById("username").value;
    if (!name) return alert("Enter your name!");

    const category = document.getElementById("category").value;
    const level = document.getElementById("level").value;

    quiz = quizData[category][level];
    current = 0;
    score = 0;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    welcomeEl.textContent = `Welcome, ${name}!`;

    loadQuestion();
}

function loadQuestion() {
    selectedOption = null;
    nextBtn.disabled = true;

    const q = quiz[current];
    questionEl.textContent = q.q;

    optionBtns.forEach((btn, i) => {
        btn.textContent = q.options[i];
        btn.classList.remove("selected");
        btn.disabled = false;
    });
}

function selectOption(i) {
    selectedOption = i;
    optionBtns.forEach((btn, idx) =>
        btn.classList.toggle("selected", idx === i)
    );
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedOption === quiz[current].ans) score++;
    current++;

    if (current < quiz.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    quizScreen.innerHTML = `
        <div class="end-screen">
            <h2 style="font-size:50px;color:#ffeb3b;">Game Over</h2>
            <p style="font-size:26px;">Final Score<br><strong>${score} / ${quiz.length}</strong></p>
            <button class="start-btn play-again">Play Again</button>
        </div>
    `;

    document.querySelector(".play-again").addEventListener("click", restartGame);
}

function restartGame() {
    quizScreen.innerHTML = originalQuizHTML;
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    document.getElementById("username").value = "";
}
