const KNOWLEDGE = {
  register: {
    title: "Voter Registration in India",
    simple: "To vote in India, you must be registered in the Electoral Roll. You can apply for a Voter ID (EPIC card) through the NVSP portal, Voter Helpline App, or at your nearest BLO office.",
    steps: [
      "Check eligibility — you must be an Indian citizen and at least 18 years old on the qualifying date (January 1 of the year).",
      "Visit voters.eci.gov.in or download the Voter Helpline App and fill Form 6 for new registration.",
      "Upload documents — passport-size photo, age proof, and address proof.",
      "Your BLO (Booth Level Officer) may visit for verification.",
      "Once approved, your EPIC (Voter ID card) will be issued and your name added to the Electoral Roll."
    ],
    why: "Without registration, you cannot vote. Your Voter ID is your gateway to participating in the world's largest democracy. Over 950 million Indians are registered voters.",
    example: "In the 2024 Lok Sabha elections, the ECI registered over 18 million new young voters (ages 18-19) through special drives and the NVSP portal, achieving record youth participation.",
    mythTitle: "You need to re-register before every election",
    mythFact: "I hear that a lot, here is what actually happens... Once registered, you stay on the Electoral Roll unless you move to a different constituency, in which case you need to transfer your registration using Form 6A.",
    nextStep: "Visit voters.eci.gov.in right now to check if your name is on the Electoral Roll or start a new registration.",
    googleTool: "maps",
    googleTip: "You can use Google Maps to search 'BLO office near me' or 'voter registration center near me' to find your nearest registration point."
  },
  "electoral-roll": {
    title: "Electoral Roll Search",
    simple: "The Electoral Roll is the official list of all registered voters. You can search your name in it through the ECI website, NVSP portal, or the Voter Helpline App to confirm you're eligible to vote.",
    steps: [
      "Visit voters.eci.gov.in or download the Voter Helpline App.",
      "Click 'Search Your Name in Electoral Roll'.",
      "Enter your details — name, father's name, age, state, and constituency.",
      "Alternatively, search using your EPIC number directly.",
      "Verify your details and note your polling booth number and serial number for Election Day."
    ],
    why: "If your name is not on the Electoral Roll, you cannot vote even if you have a Voter ID card. Always verify before elections to avoid disappointment.",
    example: "Before the 2024 elections, the ECI conducted a Special Summary Revision (SSR) where millions of citizens verified and corrected their details, resulting in the most accurate Electoral Roll in Indian history.",
    mythTitle: "Having a Voter ID card is enough to vote",
    mythFact: "I hear that a lot, here is what actually happens... You need your name to be on the Electoral Roll of your constituency. A Voter ID card alone doesn't guarantee your name is on the list — always verify online.",
    nextStep: "Search your name right now at voters.eci.gov.in to confirm you're on the Electoral Roll.",
    googleTool: null,
    googleTip: null
  },
  voting: {
    title: "Voting Process with EVM & VVPAT",
    simple: "On Election Day, you visit your assigned polling booth, verify your identity, press the button next to your chosen candidate on the EVM (Electronic Voting Machine), and verify your vote on the VVPAT slip.",
    steps: [
      "Go to your assigned polling booth (find it via the Voter Helpline App or Google Maps).",
      "Stand in the queue — separate queues for men, women, and senior citizens/disabled voters.",
      "Show your Voter ID (EPIC) or any of the 12 approved photo IDs to the polling officer.",
      "Get your left index finger marked with indelible ink, then proceed to the EVM booth.",
      "Press the button next to your chosen candidate on the EVM, check the VVPAT paper slip (visible for 7 seconds), and you're done!"
    ],
    why: "India uses EVMs since 2004 (fully) making voting fast, accurate, and tamper-proof. The VVPAT system added in 2019 provides a paper verification trail for complete transparency.",
    example: "In the 2019 general elections, over 600 million voters cast their ballots across 10 lakh+ polling stations in the world's largest democratic exercise, all using EVMs with VVPAT verification.",
    mythTitle: "EVMs can be hacked or tampered with",
    mythFact: "I hear that a lot, here is what actually happens... EVMs are standalone devices with no internet, Wi-Fi, or Bluetooth connectivity. They use one-time programmable chips, are stored in high-security strong rooms, and VVPAT provides a physical paper trail that can be audited.",
    nextStep: "Find your polling booth now so you know exactly where to go on Election Day.",
    googleTool: "maps",
    googleTip: "You can find your nearest polling booth using Google Maps — search 'polling booth near me' or check the Voter Helpline App for your exact booth location and address."
  },
  counting: {
    title: "Vote Counting in India",
    simple: "After polling ends, EVMs are sealed and stored in strong rooms under multi-layer security. On counting day, EVM results are displayed round by round under the supervision of the Returning Officer, with candidates' agents observing every step.",
    steps: [
      "After polling, EVMs are sealed in the presence of candidates' agents and stored in strong rooms with 24/7 CCTV and armed security.",
      "On counting day, EVMs are brought to the counting center and verified for intact seals.",
      "The Control Unit displays the total votes for each candidate round by round.",
      "VVPAT paper slips from 5 randomly selected booths per constituency are physically counted and matched with EVM results.",
      "The Returning Officer declares the result after all rounds are counted and any discrepancies resolved."
    ],
    why: "India's counting process has multiple layers of verification. The VVPAT matching ensures EVM accuracy, and the entire process is conducted transparently with representatives from all parties.",
    example: "In the 2024 Lok Sabha elections, VVPAT matching of 5 booths per constituency (over 2,700 booths nationally) showed 100% match with EVM results, confirming the integrity of the system.",
    mythTitle: "Counting machines can be manipulated during storage",
    mythFact: "I hear that a lot, here is what actually happens... Strong rooms are guarded by CRPF/CISF with 24/7 CCTV. Candidates' agents can post their own personnel outside. Multiple seals by different parties ensure any tampering would be immediately detected.",
    nextStep: "After you vote, follow results on results.eci.gov.in on counting day — results are updated in real-time round by round.",
    googleTool: "calendar",
    googleTip: "You can set a reminder in Google Calendar for the counting day date so you can follow live results on the ECI website."
  },
  types: {
    title: "Types of Elections in India",
    simple: "India holds elections at three levels: Lok Sabha (national), Vidhan Sabha (state), and Local Body elections (panchayat/municipal). Each has different terms, constituencies, and jurisdictions.",
    steps: [
      "Lok Sabha Elections — 543 seats, held every 5 years, elects Members of Parliament (MPs) who form the national government.",
      "Vidhan Sabha (State Assembly) — each state has its own assembly; elections held every 5 years to elect MLAs.",
      "Rajya Sabha — indirectly elected by state MLAs; 1/3 of members retire every 2 years.",
      "Panchayat/Municipal Elections — local body elections conducted by State Election Commissions for villages, towns, and cities.",
      "By-elections — held to fill vacancies caused by death, resignation, or disqualification of a sitting member."
    ],
    why: "Different elections affect different aspects of your life. Lok Sabha decides national policy, Vidhan Sabha governs your state, and local body elections impact your daily services like water, roads, and sanitation.",
    example: "In 2024, India held simultaneous Lok Sabha and state assembly elections in some states, demonstrating the massive scale — over 960 million eligible voters across different election types.",
    mythTitle: "Only Lok Sabha elections matter",
    mythFact: "I hear that a lot, here is what actually happens... Local and state elections often have more direct impact on your daily life. Your MLA and local corporator handle issues like roads, water supply, education, and healthcare in your area.",
    nextStep: "Check which elections are coming up in your state and set reminders for all of them — not just the big national ones.",
    googleTool: "calendar",
    googleTip: "You can set a reminder in Google Calendar for upcoming state and local election dates so you never miss a chance to vote."
  },
  candidate: {
    title: "Becoming a Candidate in India",
    simple: "Any eligible Indian citizen can contest elections by filing a nomination with the Returning Officer, paying a security deposit, and meeting age and other requirements set by the ECI.",
    steps: [
      "Check eligibility — must be an Indian citizen, at least 25 years old for Lok Sabha/Vidhan Sabha (30 for Rajya Sabha), and a registered voter.",
      "Obtain and fill the nomination form from the Returning Officer's office.",
      "Pay the security deposit — ₹25,000 for general category, ₹12,500 for SC/ST candidates (Lok Sabha).",
      "Get your nomination proposed by a registered voter of the constituency.",
      "File nomination before the deadline, await scrutiny, and if accepted, campaign until the 'silence period' (48 hours before polling)."
    ],
    why: "Democracy thrives when citizens actively participate — not just as voters but as candidates. India's system is designed to be accessible to ordinary citizens, not just the wealthy or well-connected.",
    example: "In the 2024 elections, over 8,000 candidates filed nominations for 543 Lok Sabha seats, including many independent candidates and first-time contestants from diverse backgrounds.",
    mythTitle: "Only rich people or party members can contest elections",
    mythFact: "I hear that a lot, here is what actually happens... Any eligible citizen can contest as an independent candidate. The security deposit is refundable if you get more than 1/6th of total votes. Many successful politicians started with grassroots campaigns.",
    nextStep: "If you're interested in public service, research the requirements for your local municipal or panchayat elections — they're a great starting point.",
    googleTool: null,
    googleTip: null
  },
  rights: {
    title: "Voter Rights in India",
    simple: "Every eligible Indian citizen has constitutionally protected voting rights. The ECI ensures free, fair elections and protects voters from intimidation, coercion, and discrimination.",
    steps: [
      "Right to register and vote — no one can deny your right if you meet eligibility criteria (Article 326).",
      "Right to a secret ballot — your vote is completely private; no one can see who you voted for.",
      "Right to assistance — differently-abled voters can bring a companion and use accessible voting facilities.",
      "Right to NOTA — you can choose 'None of the Above' if you don't wish to vote for any candidate.",
      "Right to complain — report violations to the ECI, use cVIGIL app to report Model Code of Conduct violations with photo/video evidence."
    ],
    why: "Knowing your rights prevents voter suppression and intimidation. The ECI has strict mechanisms to protect every voter, and being aware of them empowers you to report any violations.",
    example: "The Supreme Court introduced NOTA in 2013 (PUCL vs Union of India), giving voters the right to reject all candidates — a landmark step in strengthening voter autonomy.",
    mythTitle: "Your employer can prevent you from voting",
    mythFact: "I hear that a lot, here is what actually happens... Election Day is a paid holiday. Section 135B of the Representation of the People Act ensures every employee gets paid time off to vote. Employers who obstruct this can face legal penalties.",
    nextStep: "Download the cVIGIL app and save the ECI helpline number (1950) in your phone before Election Day to report any violations.",
    googleTool: null,
    googleTip: null
  },
  myths: {
    title: "Election Myths & Facts",
    simple: "Many misconceptions about Indian elections circulate on social media. Here are the facts based on ECI guidelines and verifiable information to help you separate truth from fiction.",
    steps: [
      "Myth: 'EVMs can be hacked' → Fact: EVMs are standalone, one-time programmable devices with no wireless connectivity.",
      "Myth: 'My single vote doesn't matter' → Fact: Several Indian elections have been won by margins of just 1-5 votes.",
      "Myth: 'NOTA votes can cancel an election' → Fact: Even if NOTA gets the most votes, the candidate with the highest votes wins.",
      "Myth: 'You must vote for the party, not the candidate' → Fact: You vote for a specific candidate in your constituency.",
      "Myth: 'Voter ID is the only valid ID' → Fact: ECI accepts 12 different photo IDs including Aadhaar, passport, driving license, PAN card, etc."
    ],
    why: "Misinformation undermines trust in democracy. When people believe myths about EVMs or voting, they may choose not to participate, weakening the democratic process.",
    example: "In a 2017 UP panchayat election, a candidate won by just ONE vote, proving that every single vote can determine the outcome of an election.",
    mythTitle: "Elections in India are not truly free and fair",
    mythFact: "I hear that a lot, here is what actually happens... India's ECI is a constitutional body with extensive safeguards — Model Code of Conduct, EVM+VVPAT, CCTV at booths, cVIGIL app, Election Observers, and CRPF deployment. International observers consistently rate Indian elections as credible.",
    nextStep: "When you see election misinformation on social media, verify it at eci.gov.in or through the Voter Helpline App before sharing.",
    googleTool: null,
    googleTip: null
  },
  security: {
    title: "Election Security in India",
    simple: "Indian elections are secured through multiple layers: tamper-proof EVMs, VVPAT paper trail, strong room storage, central paramilitary forces, CCTV surveillance, and strict Model Code of Conduct enforcement.",
    steps: [
      "EVMs use one-time programmable (OTP) microchips that cannot be reprogrammed — manufactured by BEL and ECIL under strict security.",
      "VVPAT machines print a paper slip for each vote, visible for 7 seconds, providing a verifiable paper trail.",
      "After polling, EVMs are sealed with unique serial numbers and stored in strong rooms with 24/7 CRPF guard and CCTV.",
      "Central Armed Police Forces (CAPF) are deployed in sensitive areas to prevent booth capturing and intimidation.",
      "ECI's cVIGIL app allows citizens to report Model Code of Conduct violations in real-time with geo-tagged evidence."
    ],
    why: "India's election security framework has evolved over decades to become one of the most robust in the world. Understanding these safeguards builds justified confidence in election outcomes.",
    example: "The ECI conducted 'EVM Challenge' events where political parties were invited to demonstrate any tampering — no party could alter even a single vote, proving EVM integrity under controlled conditions.",
    mythTitle: "EVMs can be manipulated using Bluetooth or wireless signals",
    mythFact: "I hear that a lot, here is what actually happens... EVMs have NO wireless communication capability — no Wi-Fi, Bluetooth, or internet. They are simple electronic devices that record button presses. The Supreme Court has upheld their reliability in multiple judgments.",
    nextStep: "Visit the ECI website at eci.gov.in to learn more about their security protocols, or download the cVIGIL app to help monitor election integrity.",
    googleTool: null,
    googleTip: null
  }
};

const WELCOME_MESSAGES = {
  beginner: "Namaste! 🌱 I'm ElectraBot, your friendly guide to Indian elections. Since you're just starting out, I'll explain everything in simple language — no complex legal terms! Pick a topic from the cards above or ask me anything about voting in India! 🇮🇳",
  intermediate: "Welcome! 📚 I'm ElectraBot, your election education assistant. Since you have some experience with voting, I'll cover the processes in more detail and explain key terms like EPIC, EVM, VVPAT, and Electoral Roll. What would you like to explore?",
  advanced: "Welcome! 🎓 I'm ElectraBot. As someone with advanced knowledge, I'll provide detailed analysis of India's electoral systems, ECI frameworks, constitutional provisions, and institutional safeguards. What topic shall we dive into?"
};
