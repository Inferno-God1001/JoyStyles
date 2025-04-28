// bot.js - JoylandBot integration script

class JoylandBot { constructor(dialogueUrl) { this.dialogues = []; this.loaded = false; this.loadDialogue(dialogueUrl); }

async loadDialogue(url) { try { const res = await fetch(url); if (!res.ok) throw new Error(Failed to fetch: ${res.status}); const text = await res.text(); this.parseDialogue(text); this.loaded = true; console.log("Dialogue loaded, entries:", this.dialogues.length); } catch (error) { console.error("Error loading dialogue:", error); } }

parseDialogue(text) { const lines = text.split(/\r?\n/); let current = null;

for (let line of lines) {
  line = line.trim();
  if (line.startsWith('user:<START>')) {
    current = { user: '', bot: '' };
  } else if (line.startsWith('char:<START>')) {
    // switch to bot
    current.phase = 'bot';
  } else if (line === '<END>') {
    if (current && current.user && current.bot) {
      this.dialogues.push(current);
    }
    current = null;
  } else if (current) {
    if (!current.phase) {
      // in user phase
      current.user += (current.user ? '\n' : '') + line;
    } else {
      // in bot phase
      current.bot += (current.bot ? '\n' : '') + line;
    }
  }
}

}

// Levenshtein distance for fuzzy matching\ n  levenshtein(a, b) { const dp = Array.from({ length: a.length + 1 }, () => []); for (let i = 0; i <= a.length; i++) dp[i][0] = i; for (let j = 0; j <= b.length; j++) dp[0][j] = j; for (let i = 1; i <= a.length; i++) { for (let j = 1; j <= b.length; j++) { const cost = a[i - 1] === b[j - 1] ? 0 : 1; dp[i][j] = Math.min( dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost ); } } return dp[a.length][b.length]; }

findBestMatch(input) { input = input.toLowerCase().trim(); let best = { score: Infinity, bot: "Desculpe, não entendi..." }; for (let entry of this.dialogues) { const userText = entry.user.toLowerCase().trim(); if (userText === input) { // exact match return entry.bot; } const dist = this.levenshtein(input, userText); const norm = dist / Math.max(input.length, userText.length); if (norm < best.score) { best = { score: norm, bot: entry.bot }; } } // threshold, e.g., 40% difference return best.score < 0.4 ? best.bot : "Desculpe, não entendi..."; }

async respond(message) { if (!this.loaded) { return "Carregando, por favor aguarde..."; } return this.findBestMatch(message); } }

// Initialization and UI hookup (async () => { const bot = new JoylandBot( 'https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/dialogue.txt' );

const chatEl = document.getElementById('chat'); const inputEl = document.getElementById('userInput'); const sendBtn = document.getElementById('sendButton');

function appendMessage(author, text) { const div = document.createElement('div'); div.classList.add(author === 'user' ? 'msg-user' : 'msg-bot'); div.innerText = text; chatEl.appendChild(div); chatEl.scrollTop = chatEl.scrollHeight; }

sendBtn.addEventListener('click', async () => { const message = inputEl.value.trim(); if (!message) return; appendMessage('user', message); inputEl.value = ''; const reply = await bot.respond(message); appendMessage('bot', reply); }); })();

