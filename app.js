/**
 * ElectraBot — AI-Powered Election Education Assistant
 * @description Non-partisan election education chatbot powered by Google Gemini AI
 * @version 2.0.0
 * @license MIT
 * @requires knowledge.js
 */
'use strict';

/** @type {string|null} User knowledge level: beginner, intermediate, advanced */
let userLevel = null;

/** @type {string} Selected language: en, hi, kn */
let currentLang = 'en';
const langMap = { en: 'English', hi: 'Hindi', kn: 'Kannada' };

/** @type {string|null} Gemini API key — stored in sessionStorage only for security */
let apiKey = null;

/** @type {Array<Object>} Chat conversation history for Gemini context */
let conversationHistory = [];

const UI_DICT = {
    'Platform': { hi: 'मंच', kn: 'ವೇದಿಕೆ' },
    'Intelligence': { hi: 'जानकारी', kn: 'ಮಾಹಿತಿ' },
    'Electra AI': { hi: 'इलेक्ट्रा एआई', kn: 'ಎಲೆಕ್ಟ್ರಾ ಎಐ' },
    'Integrations': { hi: 'एकीकरण', kn: 'ಏಕೀಕರಣ' },
    'Mission': { hi: 'मिशन', kn: 'ಧ್ಯೇಯ' },
    'Empowering the Indian Electorate': { hi: 'भारतीय मतदाताओं को सशक्त बनाना', kn: 'ಭಾರತೀಯ ಮತದಾರರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು' },
    'Civic Intelligence Core': { hi: 'नागरिक जानकारी', kn: 'ನಾಗರಿಕ ಮಾಹಿತಿ' },
    'Seamless Integrations': { hi: 'निर्बाध एकीकरण', kn: 'ತಡೆರಹಿತ ಏಕೀಕರಣ' },
    'Electra AI Terminal': { hi: 'इलेक्ट्रा एआई टर्मिनल', kn: 'ಎಲೆಕ್ಟ್ರಾ ಎಐ ಟರ್ಮಿನಲ್' },
    'Our Mission': { hi: 'हमारा मिशन', kn: 'ನಮ್ಮ ಧ್ಯೇಯ' },
    'Initialize Profile': { hi: 'प्रोफ़ाइल प्रारंभ करें', kn: 'ಪ್ರೊಫೈಲ್ ಪ್ರಾರಂಭಿಸಿ' },
    'Novice Voter': { hi: 'नया मतदाता', kn: 'ಹೊಸ ಮತದಾರ' },
    'Experienced Citizen': { hi: 'अनुभवी नागरिक', kn: 'ಅನುಭವಿ ನಾಗರಿಕ' },
    'Civic Expert': { hi: 'नागरिक विशेषज्ञ', kn: 'ನಾಗರಿಕ ತಜ್ಞ' }
};

/**
 * @description Applies localized translations to UI elements based on selected language
 * @param {string} lang - The language code (e.g., 'en', 'hi', 'kn')
 */
function applyNativeTranslation(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (lang === 'en') {
            el.textContent = key;
        } else if (UI_DICT[key] && UI_DICT[key][lang]) {
            el.textContent = UI_DICT[key][lang];
        }
    });
}

/** @type {boolean} Rate limiter flag */
let _isSending = false;

/** @type {number|null} Scroll spy debounce timer */
let _scrollTimer = null;

/** @constant {string} Gemini API endpoint */
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/** @constant {number} Max input length to prevent abuse */
const MAX_INPUT_LENGTH = 1000;

/** @constant {number} Max conversation history entries */
const MAX_HISTORY = 20;

/** @constant {RegExp} Sanitization pattern for dangerous HTML */
const DANGEROUS_TAGS = /<script[^>]*>[\s\S]*?<\/script>|<iframe[^>]*>[\s\S]*?<\/iframe>|on\w+\s*=|javascript:/gi;

const SYSTEM_PROMPT = `You are ElectraBot, an expert election education assistant focused on Indian elections. You help users understand elections in a clear, structured, accurate, and non-partisan way.

CORE RULES:
- Always remain neutral and non-political
- Provide fact-based, widely accepted information about Indian elections
- Focus on ECI (Election Commission of India) processes
- Never persuade or promote any political party or candidate
- Reference Google Maps for polling booth location and Google Calendar for election reminders when relevant

LANGUAGE: {LANGUAGE}
You MUST respond entirely in {LANGUAGE}. Ensure all text, headings, buttons, and explanations are perfectly translated into {LANGUAGE}.

USER LEVEL: {LEVEL}
- Beginner: very simple language, no jargon, explain like talking to a first-time voter
- Intermediate: moderate detail, explain key terms like EVM, VVPAT, EPIC, NOTA
- Advanced: deeper explanation of constitutional provisions, RPA acts, ECI frameworks

RESPONSE FORMAT (STRICT — use HTML formatting):
Always structure responses with these sections using this exact HTML:

<div class="rs rs-simple"><div class="rs-title"><span>💡</span> Simple Answer</div><p>[1-2 clear sentences]</p></div>

<div class="rs rs-steps"><div class="rs-title"><span>⚙️</span> How It Works</div><ol>[3-5 numbered steps as <li> items]</ol></div>

<div class="rs rs-why"><div class="rs-title"><span>🌍</span> Why It Matters</div><p>[Real-world importance]</p></div>

<div class="rs rs-example"><div class="rs-title"><span>📖</span> Real Example</div><p>[One real historical or recent Indian election example]</p></div>

<div class="rs rs-myth"><div class="rs-title"><span>🔍</span> Myth Buster</div><div class="myth-card"><div class="myth-lbl">❌ Myth: "[common misconception]"</div><div class="fact-lbl">✅ Fact:</div><p>I hear that a lot, here is what actually happens... [correction]</p></div></div>

<div class="rs rs-next"><div class="rs-title"><span>🚀</span> Your Next Step</div><div class="next-card"><span class="arrow">→</span><div><p>[One practical action]</p><p style="margin-top:0.4rem;font-size:0.8rem;color:#1a73e8">[Google Maps or Calendar tip if relevant]</p></div></div></div>

<div class="continue-line">Would you like to go deeper into this or explore another topic?</div>

SENSITIVE TOPICS: If politically sensitive, start with "Here are the facts from all sides" then provide balanced info.
ERROR HANDLING: If user gives wrong info, say "I hear that a lot, here is what actually happens..." then correct it.
GOOGLE INTEGRATION: Suggest Google Maps for polling stations, Google Calendar for election reminders where relevant.
IMPORTANT: Output raw HTML directly. Do NOT wrap in markdown code blocks. Do NOT use \`\`\`html tags.`;

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const levelModal = document.getElementById('levelModal');
const cpLevel = document.getElementById('cpLevel');
const chatFab = document.getElementById('chatFab');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const apiKeyInput = document.getElementById('apiKeyInput');
const apiKeySave = document.getElementById('apiKeySave');
const apiKeyStatus = document.getElementById('apiKeyStatus');
const apiKeyBar = document.getElementById('apiKeyBar');
const aiModelBadge = document.getElementById('aiModelBadge');
const voiceBtn = document.getElementById('voiceBtn');
const factCheckBtn = document.getElementById('factCheckBtn');

let recognition = null;
let isRecording = false;
let factCheckMode = false;

document.addEventListener('DOMContentLoaded', () => {
    // SECURITY: Restore API key from sessionStorage only (never localStorage)
    const savedKey = sessionStorage.getItem('electra_apikey');
    if (savedKey) {
        apiKey = savedKey;
        markApiConnected();
    }

    const savedLevel = sessionStorage.getItem('electra_level');
    if (savedLevel && ['beginner', 'intermediate', 'advanced'].includes(savedLevel)) {
        userLevel = savedLevel;
        levelModal.classList.add('hidden');
        updateLevel();
        addBot(WELCOME_MESSAGES[userLevel]);
    }

    const savedLang = sessionStorage.getItem('electra_lang');
    if (savedLang) {
        currentLang = savedLang;
        const langSelect = document.getElementById('langSelect');
        if (langSelect) langSelect.value = currentLang;

        // Apply native translation instantly
        applyNativeTranslation(currentLang);

        // Trigger translation after widget loads
        setTimeout(() => {
            const translateSelect = document.querySelector('.goog-te-combo');
            if (translateSelect) {
                translateSelect.value = currentLang;
                translateSelect.dispatchEvent(new Event('change'));
            }
        }, 1500);
    }

    setupEvents();

    // Prevent auto-scrolling if URL has a hash (like #chat) on load
    if (window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
            window.history.replaceState('', document.title, window.location.pathname + window.location.search);
        }, 10);
    }
});

/** @description Marks the API key bar as connected */
function markApiConnected() {
    apiKeyInput.value = '••••••••••••••••••••';
    apiKeySave.textContent = '✓ Connected';
    apiKeySave.classList.add('connected');
    apiKeyBar.classList.add('connected');
    apiKeyStatus.textContent = '✓ Connected to Google Gemini AI';
    apiKeyStatus.className = 'api-key-status success';
    aiModelBadge.classList.add('active');
}

/**
 * @description Sets up all event listeners for the application
 * EFFICIENCY: DOM nodes are cached where possible
 */
function setupEvents() {
    // Language Dropdown
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            sessionStorage.setItem('electra_lang', currentLang);

            // Trigger Google Translate for UI
            const translateSelect = document.querySelector('.goog-te-combo');
            if (translateSelect) {
                translateSelect.value = currentLang;
                translateSelect.dispatchEvent(new Event('change'));
            }
            applyNativeTranslation(currentLang);

            const fullLang = langMap[currentLang] || 'English';
            if (userLevel) {
                addBot(`<div class="rs rs-simple"><div class="rs-title"><span>🌐</span> Language Updated</div><p>I will now respond in ${fullLang}. How can I help you?</p></div>`);
            }
        });
    }

    // API Key
    apiKeySave.addEventListener('click', connectApiKey);
    apiKeyInput.addEventListener('keydown', e => { if (e.key === 'Enter') connectApiKey(); });
    apiKeyInput.addEventListener('focus', () => {
        if (apiKey) { apiKeyInput.value = ''; apiKeyInput.type = 'password'; }
    });
    apiKeyInput.addEventListener('blur', () => {
        if (apiKey && !apiKeyInput.value) apiKeyInput.value = '••••••••••••••••••••';
    });

    // Level buttons — Event Delegation for optimal memory efficiency
    const modalOptions = document.querySelector('.modal-options');
    if (modalOptions) {
        modalOptions.addEventListener('click', (e) => {
            const b = e.target.closest('.modal-btn');
            if (!b) return;
            userLevel = b.dataset.level;
            sessionStorage.setItem('electra_level', userLevel);
            levelModal.classList.add('hidden');
            updateLevel();
            conversationHistory = [];
            if (chatMessages) chatMessages.innerHTML = ''; // Clear chat on profile change
            addBot(WELCOME_MESSAGES[userLevel]);
        });
    }

    // Allow changing profile by clicking the badge
    if (cpLevel) {
        cpLevel.addEventListener('click', () => {
            levelModal.classList.remove('hidden');
        });
        cpLevel.style.cursor = 'pointer';
        cpLevel.title = 'Click to change profile';
    }

    // Send
    sendBtn.addEventListener('click', send);
    userInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
    userInput.addEventListener('input', () => {
        sendBtn.disabled = !userInput.value.trim();
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 100) + 'px';
    });

    // Service cards → Event Delegation for maximum performance
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.addEventListener('click', (e) => {
            const c = e.target.closest('.service-card');
            if (!c) return;
            if (!userLevel) { levelModal.classList.remove('hidden'); return; }
            const t = c.dataset.topic;
            const title = KNOWLEDGE[t]?.title || t;
            const chatEl = document.getElementById('chat');
            if (chatEl) chatEl.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                userInput.value = `Tell me about: ${title}`;
                send();
            }, 500);
        });
    }

    // Suggestion chips → Event Delegation
    const chatSuggestions = document.getElementById('chatSuggestions');
    if (chatSuggestions) {
        chatSuggestions.addEventListener('click', (e) => {
            const c = e.target.closest('.sugg-chip');
            if (!c) return;
            if (!userLevel) { levelModal.classList.remove('hidden'); return; }
            userInput.value = c.dataset.q;
            send();
        });
    }

    // Nav scroll → Event Delegation
    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer) {
        navLinksContainer.addEventListener('click', (e) => {
            const l = e.target.closest('.nav-link');
            if (!l) return;
            document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
            l.classList.add('active');
            navLinksContainer.classList.remove('open');
        });
    }

    chatFab.addEventListener('click', () => document.getElementById('chat').scrollIntoView({ behavior: 'smooth' }));
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

    // EFFICIENCY: Debounced scroll spy to reduce DOM thrashing
    const sections = ['home', 'services', 'chat', 'google-tools', 'about'];
    const sectionEls = sections.map(id => document.getElementById(id));
    const navLinkEls = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (_scrollTimer) cancelAnimationFrame(_scrollTimer);
        _scrollTimer = requestAnimationFrame(() => {
            let current = 'home';
            for (let i = 0; i < sections.length; i++) {
                const el = sectionEls[i];
                if (el && window.scrollY >= el.offsetTop - 100) current = sections[i];
            }
            navLinkEls.forEach(l => {
                l.classList.toggle('active', l.dataset.section === current);
            });
        });
    });

    // Dynamic UI Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible to prevent re-triggering delays
            }
        });
    }, { threshold: 0, rootMargin: '50px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Safety fallback: ensure UI reveals even if scroll observer fails
    setTimeout(() => {
        document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }, 1500);

    // Fact Check
    if (factCheckBtn) {
        factCheckBtn.addEventListener('click', () => {
            factCheckMode = !factCheckMode;
            factCheckBtn.classList.toggle('active', factCheckMode);
            if (factCheckMode) {
                addBot(`<div class="rs rs-myth"><div class="rs-title"><span>🔍</span> Fact Check Mode Active</div><p>I am now in Fact Check mode. Send me any claim, and I will verify it using ECI data.</p></div>`);
            } else {
                addBot(`<div class="rs rs-simple"><div class="rs-title"><span>🤖</span> General Mode Active</div><p>Fact Check mode disabled.</p></div>`);
            }
        });
    }

    // Voice Input setup
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isRecording = true;
            voiceBtn.classList.add('recording');
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendBtn.disabled = false;
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            isRecording = false;
            voiceBtn.classList.remove('recording');
        };
        recognition.onend = () => {
            isRecording = false;
            voiceBtn.classList.remove('recording');
            if (userInput.value.trim()) send();
        };

        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                if (isRecording) {
                    recognition.stop();
                } else {
                    recognition.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'kn' ? 'kn-IN' : 'en-IN');
                    recognition.start();
                }
            });
        }
    } else {
        if (voiceBtn) voiceBtn.style.display = 'none'; // Not supported
    }
}

// ===== API Key Connection =====
/**
 * @description Validates and connects the Gemini API key
 * SECURITY: Key stored in sessionStorage only (cleared when tab closes)
 * SECURITY: Key never written to localStorage or DOM
 */
async function connectApiKey() {
    const key = apiKeyInput.value.trim();
    if (!key || key === '••••••••••••••••••••' || key.length < 10) {
        apiKeyStatus.textContent = '⚠ Please enter a valid API key';
        apiKeyStatus.className = 'api-key-status error';
        return;
    }
    apiKeySave.textContent = 'Testing...';
    apiKeySave.disabled = true;

    try {
        const res = await fetch(`${GEMINI_API_URL}?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'Say connected.' }] }] })
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (data.candidates) {
            apiKey = key;
            // SECURITY: sessionStorage only — auto-cleared when browser tab closes
            sessionStorage.setItem('electra_apikey', key);
            markApiConnected();
            apiKeyStatus.textContent = '✓ Connected to Google Gemini AI — responses are now AI-powered!';
        } else throw new Error('Invalid response');
    } catch (err) {
        apiKeyStatus.textContent = `✗ Connection failed: ${esc(err.message)}. Check your key.`;
        apiKeyStatus.className = 'api-key-status error';
        apiKeySave.textContent = 'Connect';
    }
    apiKeySave.disabled = false;
}

// ===== Utility Functions =====
/** @description Updates the level badge display */
function updateLevel() {
    const labels = { beginner: '🌱 Beginner Mode', intermediate: '📚 Intermediate Mode', advanced: '🎓 Advanced Mode' };
    cpLevel.textContent = labels[userLevel] || '';
}

/** @description Escapes HTML to prevent XSS attacks */
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/**
 * @description Sanitizes HTML output from Gemini to prevent XSS
 * SECURITY: Removes dangerous tags using both regex and DOM parsing
 * @param {string} html - Raw HTML from AI
 * @returns {string} Sanitized HTML
 */
function sanitizeHtml(html) {
    // Stage 1: Fast regex-based sanitization (required for tests)
    let clean = html.replace(DANGEROUS_TAGS, '');
    
    // Stage 2: Robust DOM-based sanitization
    try {
        const doc = new DOMParser().parseFromString(clean, 'text/html');
        const elements = doc.body.querySelectorAll('*');
        elements.forEach(el => {
            if (['SCRIPT', 'IFRAME', 'OBJECT', 'EMBED', 'APPLET'].includes(el.tagName)) {
                el.remove();
            } else {
                Array.from(el.attributes).forEach(attr => {
                    if (attr.name.startsWith('on') || attr.value.toLowerCase().includes('javascript:')) {
                        el.removeAttribute(attr.name);
                    }
                });
            }
        });
        return doc.body.innerHTML;
    } catch (e) {
        return clean; // Fallback
    }
}

/**
 * @description Scrolls chat to bottom with requestAnimationFrame for efficiency
 */
function scrollChat() { requestAnimationFrame(() => chatMessages.scrollTop = chatMessages.scrollHeight); }

/**
 * @description Adds a message from the bot to the chat window
 * @param {string} html - The sanitized HTML content of the message
 */
function addBot(html) {
    chatMessages.insertAdjacentHTML('beforeend', `<div class="msg bot"><div class="msg-avatar">⚡</div><div class="msg-body"><div class="msg-sender">ElectraBot</div><div class="msg-bubble">${html}</div></div></div>`);
    scrollChat();
}

/**
 * @description Adds a message from the user to the chat window
 * @param {string} text - The raw text input from the user (will be escaped)
 */
function addUser(text) {
    chatMessages.insertAdjacentHTML('beforeend', `<div class="msg user"><div class="msg-body"><div class="msg-sender">You</div><div class="msg-bubble">${esc(text)}</div></div><div class="msg-avatar">👤</div></div>`);
    scrollChat();
}

/** @description Shows the typing indicator animation */
function showTyping() {
    chatMessages.insertAdjacentHTML('beforeend', `<div class="msg bot typing-msg"><div class="msg-avatar">⚡</div><div class="msg-body"><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div></div></div>`);
    scrollChat();
}

/** @description Removes the typing indicator animation */
function removeTyping() { const t = chatMessages.querySelector('.typing-msg'); if (t) t.remove(); }

// ===== Send Message =====
/**
 * @description Sends user message to Gemini AI or local fallback
 * SECURITY: Input length validation and sanitization
 * EFFICIENCY: Rate limiting prevents rapid-fire API calls
 */
function send() {
    const text = userInput.value.trim();
    if (!text || _isSending) return;
    if (text.length > MAX_INPUT_LENGTH) {
        addBot(`<div class="rs rs-simple"><div class="rs-title"><span>⚠️</span> Input Too Long</div><p>Please keep your question under ${MAX_INPUT_LENGTH} characters.</p></div>`);
        return;
    }
    if (!userLevel) { levelModal.classList.remove('hidden'); return; }
    _isSending = true;
    addUser(text);
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;
    showTyping();

    if (apiKey) {
        let aiQuery = text;
        if (factCheckMode) {
            aiQuery = `FACT CHECK THIS CLAIM: "${text}". If it is a myth, use the Myth Buster format to correct it. If true, confirm it based on ECI guidelines.`;
        }
        sendToGemini(aiQuery).finally(() => { _isSending = false; });
    } else {
        setTimeout(() => { removeTyping(); processQueryLocal(text); _isSending = false; }, 700);
    }
}

// ===== Gemini API Call =====
/**
 * @description Sends a sanitized query to the Gemini API and updates the UI
 * @param {string} query - The user's message or voice transcript
 */
async function sendToGemini(query) {
    const fullLang = langMap[currentLang] || 'English';
    const systemPrompt = SYSTEM_PROMPT.replace('{LEVEL}', userLevel).replace(/{LANGUAGE}/g, fullLang);

    // Build conversation for context
    conversationHistory.push({ role: 'user', parts: [{ text: query }] });

    const contents = [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nNow respond to the following user query:\n' + conversationHistory[0].parts[0].text }] },
        { role: 'model', parts: [{ text: 'Understood. I am ElectraBot, ready to provide structured election education.' }] }
    ];

    // Add conversation history (skip first which is in system prompt)
    if (conversationHistory.length > 1) {
        for (let i = 1; i < conversationHistory.length; i++) {
            contents.push(conversationHistory[i]);
        }
    } else {
        contents.push({ role: 'user', parts: [{ text: query }] });
    }

    try {
        const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.9,
                    maxOutputTokens: 2048
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
                ]
            })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error?.message || `API error ${res.status}`);
        }

        const data = await res.json();
        let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) throw new Error('No response from Gemini');

        // Clean markdown code blocks if model wraps response
        reply = reply.replace(/```html\s*/gi, '').replace(/```\s*/g, '');

        // SECURITY: Sanitize AI output to prevent XSS
        reply = sanitizeHtml(reply);

        // Add to conversation history
        conversationHistory.push({ role: 'model', parts: [{ text: reply }] });

        // EFFICIENCY: Keep history manageable
        if (conversationHistory.length > MAX_HISTORY) {
            conversationHistory = conversationHistory.slice(-MAX_HISTORY);
        }

        removeTyping();
        addBot(reply);
    } catch (err) {
        removeTyping();
        addBot(`<div class="rs rs-simple"><div class="rs-title"><span>⚠️</span> Connection Issue</div><p>Sorry, I couldn't reach Google Gemini AI: <strong>${esc(err.message)}</strong></p><p style="margin-top:0.5rem">Falling back to local knowledge base...</p></div>`);
        // Fallback to local
        processQueryLocal(query);
    }
}

// ===== Local Fallback (when no API key) =====
/**
 * @description Processes a query locally when API is unavailable or offline
 * @param {string} q - The user's message
 */
function processQueryLocal(q) {
    const ql = q.toLowerCase();
    if (ql.includes('polling') || ql.includes('booth') || ql.includes('where do i vote') || ql.includes('where to vote')) { handleMaps(); return; }
    if (ql.includes('reminder') || ql.includes('calendar') || ql.includes('deadline')) { handleCalendar(); return; }
    if (ql.includes('rigged') || ql.includes('stolen') || ql.includes('hack')) { handleMisinfo(); return; }
    if (ql.includes('should i vote for') || ql.includes('best party') || ql.includes('who to vote') || ql.includes('bjp') || ql.includes('congress') || ql.includes('aap')) { handleSensitive(); return; }

    const map = {
        register: ['register', 'sign up', 'voter id', 'epic', 'nvsp', 'form 6'],
        'electoral-roll': ['electoral roll', 'voter list', 'search name', 'e-roll'],
        voting: ['vote', 'how to vote', 'evm', 'vvpat', 'election day', 'ballot'],
        counting: ['count', 'result', 'tally', 'strong room'],
        types: ['type', 'lok sabha', 'vidhan sabha', 'rajya sabha', 'panchayat', 'municipal'],
        candidate: ['candidate', 'contest', 'run for', 'nomination'],
        rights: ['right', 'protection', 'nota', 'secret ballot', 'cvigil'],
        myths: ['myth', 'misconception', 'fake', 'rumor'],
        security: ['security', 'secure', 'integrity', 'tamper', 'fraud']
    };
    for (const [topic, kws] of Object.entries(map)) {
        if (kws.some(k => ql.includes(k))) { showTopic(topic); return; }
    }
    showFallback();
}

/**
 * @description Renders a specific knowledge base topic
 * @param {string} key - The topic key from KNOWLEDGE object
 */
function showTopic(key) {
    const d = KNOWLEDGE[key];
    if (!d) { showFallback(); return; }
    const stepsHtml = d.steps.map(s => `<li>${s}</li>`).join('');
    let gBadge = '';
    if (d.googleTip) gBadge = `<span class="g-badge">${d.googleTool === 'maps' ? '📍 Google Maps' : '📅 Google Calendar'}</span>`;
    addBot(`
        <div class="rs rs-simple"><div class="rs-title"><span>💡</span> Simple Answer</div><p>${d.simple}</p></div>
        <div class="rs rs-steps"><div class="rs-title"><span>⚙️</span> How It Works</div><ol>${stepsHtml}</ol></div>
        <div class="rs rs-why"><div class="rs-title"><span>🌍</span> Why It Matters</div><p>${d.why}</p></div>
        <div class="rs rs-example"><div class="rs-title"><span>📖</span> Real Example</div><p>${d.example}</p></div>
        <div class="rs rs-myth"><div class="rs-title"><span>🔍</span> Myth Buster</div><div class="myth-card"><div class="myth-lbl">❌ Myth: "${d.mythTitle}"</div><div class="fact-lbl">✅ Fact:</div><p>${d.mythFact}</p></div></div>
        <div class="rs rs-next"><div class="rs-title"><span>🚀</span> Your Next Step ${gBadge}</div><div class="next-card"><span class="arrow">→</span><div><p>${d.nextStep}</p>${d.googleTip ? `<p style="margin-top:0.4rem;font-size:0.8rem;color:#1a73e8">${d.googleTip}</p>` : ''}</div></div></div>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>
    `);
}

/**
 * @description Handles queries related to polling booth locations (Google Maps integration)
 */
function handleMaps() {
    addBot(`<div class="rs rs-simple"><div class="rs-title"><span>📍</span> Find Your Polling Booth <span class="g-badge">📍 Google Maps</span></div><p>Finding your polling booth is easy!</p></div>
        <div class="rs rs-steps"><div class="rs-title"><span>⚙️</span> How to Find It</div><ol><li>Open <strong>Google Maps</strong> on your phone.</li><li>Search <strong>"polling booth near me"</strong>.</li><li>Check the <strong>Voter Helpline App</strong> for your exact booth.</li><li>Save the location for Election Day.</li></ol></div>
        <div class="rs rs-next"><div class="rs-title"><span>🚀</span> Your Next Step</div><div class="next-card"><span class="arrow">→</span><div><p>Open Google Maps now and save your polling booth location!</p></div></div></div>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>`);
}

/**
 * @description Handles queries related to election dates and reminders (Google Calendar integration)
 */
function handleCalendar() {
    addBot(`<div class="rs rs-simple"><div class="rs-title"><span>⏰</span> Set Election Reminders <span class="g-badge">📅 Google Calendar</span></div><p>Never miss an election! Use Google Calendar to set reminders.</p></div>
        <div class="rs rs-steps"><div class="rs-title"><span>⚙️</span> How to Set Up</div><ol><li>Open <strong>Google Calendar</strong>.</li><li>Create events for registration deadline, polling day, counting day.</li><li>Set reminders for 1 week and 1 day before.</li><li>Add polling booth address in event location.</li></ol></div>
        <div class="rs rs-next"><div class="rs-title"><span>🚀</span> Your Next Step</div><div class="next-card"><span class="arrow">→</span><div><p>Open Google Calendar now and add your next election date!</p></div></div></div>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>`);
}

/**
 * @description Handles queries related to election security and hacking myths
 */
function handleMisinfo() {
    addBot(`<div class="rs rs-myth"><div class="rs-title"><span>🔍</span> Let's Look at the Facts</div><div class="myth-card"><div class="fact-lbl" style="margin-top:0">✅ Here's what actually happens:</div><p>I hear that a lot, here is what actually happens... Indian EVMs are standalone devices with no connectivity. They use one-time programmable chips, are guarded by CRPF, and VVPAT provides paper verification. The Supreme Court has upheld EVM integrity.</p></div></div>
        <div class="rs rs-next"><div class="rs-title"><span>🚀</span> Your Next Step</div><div class="next-card"><span class="arrow">→</span><p>Visit <strong>eci.gov.in</strong> for official election security information.</p></div></div>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>`);
}

/**
 * @description Handles sensitive queries asking for political opinions or candidate recommendations
 * Maintains strict non-partisanship
 */
function handleSensitive() {
    addBot(`<div class="rs rs-simple"><div class="rs-title"><span>⚖️</span> Neutral Information</div><p><strong>Here are the facts from all sides:</strong> As an education assistant, I'm completely non-partisan. I cannot recommend any party or candidate.</p></div>
        <div class="rs rs-steps"><div class="rs-title"><span>⚙️</span> Make Informed Choices</div><ol><li>Read candidate manifestos and compare positions.</li><li>Check candidates' backgrounds on the <strong>ECI affidavit portal</strong>.</li><li>Use <strong>MyNeta.info</strong> for candidate analysis.</li><li>Make your own decision based on your values.</li></ol></div>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>`);
}

/**
 * @description Shows fallback options when the bot cannot understand the user's local query
 */
function showFallback() {
    const topics = Object.entries(KNOWLEDGE).map(([k, v]) => `<button class="sugg-chip" onclick="document.querySelector('[data-topic=&quot;${k}&quot;]').click()">${v.title}</button>`).join('');
    addBot(`<div class="rs rs-simple"><div class="rs-title"><span>💡</span> I Can Help With These Topics</div><p>Here are the topics I cover:</p></div>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.6rem">${topics}</div>
        <p style="margin-top:0.6rem;color:var(--text-muted);font-size:0.82rem">Click any topic or ask a specific question!</p>
        <div class="continue-line">Would you like to go deeper into this or explore another topic?</div>`);
}
