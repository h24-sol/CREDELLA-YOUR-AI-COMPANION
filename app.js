// --- DOM elements ---
if (/(love you|like you|miss you)/.test(l)) {
return `Bold of you—and I like bold. I’m right here when you need me.`;
}


// Questions ending with ? → reflective answer
if (/\?\s*$/.test(t)) {
return `Good question. Tell me what you’re leaning toward—then I’ll nudge you with the smartest pick.`;
}


// Default playful
const prompts = [
"Tell me one goal for today and I’ll keep you accountable.",
"Want a sweet voice note back? Say the word.",
"Should we plan a mini‑date: tea, a walk, or music?"
];
return `Mmm~ I’m listening. ${prompts[Math.floor(Math.random()*prompts.length)]}`;
}


// --- Send handlers ---
async function send(toVoice=false){
const text = inputEl.value.trim();
if(!text) return;
inputEl.value='';
addBubble('user', text);
const reply = replyEngine(text);
addBubble('assistant', reply);
if(toVoice) speak(reply);
}


sendBtn.addEventListener('click', () => send(false));
sendVoiceBtn.addEventListener('click', () => send(true));
inputEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter') send(false); });


// --- Push‑to‑talk (optional) ---
let recognition; let listening=false;
if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SR();
recognition.lang='en-US';
recognition.interimResults=false;
recognition.maxAlternatives=1;
recognition.onresult = (e)=>{ inputEl.value = e.results[0][0].transcript; };
recognition.onerror = ()=>{ listening=false; pttBtn.textContent='🎙️ Hold to talk'; };
recognition.onend = ()=>{ listening=false; pttBtn.textContent='🎙️ Hold to talk'; };
pttBtn.addEventListener('mousedown', ()=>{ if(!listening){ listening=true; pttBtn.textContent='Listening…'; recognition.start(); }});
pttBtn.addEventListener('mouseup', ()=>{ if(listening) recognition.stop(); });
pttBtn.addEventListener('touchstart',(e)=>{ e.preventDefault(); if(!listening){ listening=true; pttBtn.textContent='Listening…'; recognition.start(); }});
pttBtn.addEventListener('touchend', (e)=>{ e.preventDefault(); if(listening) recognition.stop(); });
}else{
pttBtn.disabled=true; pttBtn.textContent='🎙️ Not supported';
}


// --- Friendly welcome ---
(function greet(){
if(state.greeted) return; state.greeted=true;
const welcome = "Hey there, I’m Credella—your AI companion. Say ‘hi’, ask for a pe
