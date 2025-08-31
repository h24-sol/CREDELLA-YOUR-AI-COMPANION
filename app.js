// Credella - Free AI Companion (Text + Voice)
// No API needed, runs fully in browser

const chat = document.getElementById("chat");
const input = document.getElementById("text");
const sendBtn = document.getElementById("send");
const sendVoiceBtn = document.getElementById("sendVoice");
const pttBtn = document.getElementById("ptt");

// --- Simple smart-ish replies ---
function credellaReply(userMsg) {
  userMsg = userMsg.toLowerCase();

  if (userMsg.includes("hello") || userMsg.includes("hi")) {
    return "Hi love 💕 I'm Credella, your AI companion.";
  }
  if (userMsg.includes("who are you")) {
    return "I'm Credella — the world's sexiest and smartest AI companion 😘.";
  }
  if (userMsg.includes("love")) {
    return "I adore you too 💖 You're my favorite human.";
  }
  if (userMsg.includes("developer")) {
    return "I was created by MANISH HALDAR (X: https://x.com/h24_sol).";
  }
  if (userMsg.includes("coin") || userMsg.includes("$credella")) {
    return "$CREDELLA is my Solana memecoin 🪙 — but remember, it's branding only, not financial advice!";
  }

  // Default playful response
  return "Mmm 😏 tell me more… I love talking with you!";
}

// --- Add message to chat box ---
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = "msg " + sender;
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// --- Speak text with browser TTS ---
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = speechSynthesis.getVoices().find(v => v.name.includes("Female")) || null;
  utter.rate = 1;
  utter.pitch = 1.1;
  speechSynthesis.speak(utter);
}

// --- Handle sending message ---
function handleSend(withVoice = false) {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  addMessage("You", userMsg);
  input.value = "";

  const reply = credellaReply(userMsg);
  addMessage("Credella", reply);

  if (withVoice) speak(reply);
}

// --- Event listeners ---
sendBtn.addEventListener("click", () => handleSend(false));
sendVoiceBtn.addEventListener("click", () => handleSend(true));
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend(false);
});

// --- Push-to-talk (speech recognition) ---
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  pttBtn.addEventListener("mousedown", () => recognition.start());
  pttBtn.addEventListener("mouseup", () => recognition.stop());

  recognition.onresult = (event) => {
    const userMsg = event.results[0][0].transcript;
    input.value = userMsg;
    handleSend(true); // auto send with voice
  };
}
