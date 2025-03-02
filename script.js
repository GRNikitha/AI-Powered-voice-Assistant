const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");
const mic = document.getElementById("mic");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

recognition.onstart = () => {
    output.textContent = "Listening...";
    mic.classList.add("listening");
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `You said: "${transcript}"`;

    respondToCommand(transcript);
};

recognition.onend = () => {
    mic.classList.remove("listening");
};

startBtn.addEventListener("click", () => {
    recognition.start();
});

function respondToCommand(command) {
    let response = "";

    if (command.includes("hello")) {
        response = "Hello! How can I help you?";
    } else if (command.includes("time")) {
        response = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (command.includes("date")) {
        response = `Today's date is ${new Date().toLocaleDateString()}`;
    } else {
        response = "Sorry, I didn't understand that.";
    }

    speak(response);
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}