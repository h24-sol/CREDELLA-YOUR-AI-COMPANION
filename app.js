const chat = document.getElementById("chat");
const input = document.getElementById("text");
const sendBtn = document.getElementById("send");
const sendVoiceBtn = document.getElementById("sendVoice");
const pttBtn = document.getElementById("ptt");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function credellaReply(userText, withVoice = false) {
  let reply = "";

  if (userText.toLowerCase().includes("hello")) {
    reply = "Hi love 💖 I’m Credella, your sexy smart companion.";
  } else if (userText.toLowerCase().includes("who made you")) {
    reply = "I was created by MANISH HALDAR ✨ (X: h24_sol).";
  } else if (userText.toLowerCase().includes("love")) {
    reply = "Mmm 😘 I love being with you.";
  } else {
    reply = "I know everything babe 😉 Ask me anything.";
  }

  addMessage(reply, "ai");

  if (withVoice) {
    const utter = new SpeechSynthesisUtterance(reply);
    utter.voice = speechSynthesis.getVoices().find(v => v.lang.includes("en"));
    speechSynthesis.speak(utter);
  }
}

// Text send
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  credellaReply(text, false);
});

// Send + voice
sendVoiceBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  credellaReply(text, true);
});

// Mic hold-to-talk
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    addMessage(text, "user");
    credellaReply(text, true);
  };
}

pttBtn.addEventListener("mousedown", () => {
  if (recognition) recognition.start();
});
pttBtn.addEventListener("mouseup", () => {
  if (recognition) recognition.stop();
});
