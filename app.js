/* ─── MOTEUR DE STATISTIQUES, XP & SAUVEGARDE ─── */
let userStats = JSON.parse(localStorage.getItem('nihongoStats')) || {
  lastLogin: new Date().toDateString(),
  streak: 1,
  answersTotal: 0,
  answersCorrect: 0,
  wordsMastered: 0,
  xp: 0,              // 👈 NOUVEAU
  xpN5: 0             // 👈 NOUVEAU (Pour verrouiller le N4, objectif : 300 XP)
};

// Configuration des titres de Samouraï selon le niveau d'XP total
function getSamouraiRank(xp) {
  if (xp >= 1500) return { title: "Shogun 🏯", level: 5 };
  if (xp >= 900) return { title: "Taishō (Général) ⚔️", level: 4 };
  if (xp >= 500) return { title: "Samouraï d'Élite 🥷", level: 3 };
  if (xp >= 150) return { title: "Bushi (Guerrier) 🥋", level: 2 };
  return { title: "Disciple (Ronin) 🌸", level: 1 };
}

function saveStats() {
  localStorage.setItem('nihongoStats', JSON.stringify(userStats));
}

function updateStat(isCorrect, isMastered = false, levelTarget = 'N5') {
  userStats.answersTotal++;
if (isCorrect) AudioEngine.correct();
  else AudioEngine.wrong();
  
  // Calcul des gains d'XP
  let xpGained = isCorrect ? 10 : 2;
  userStats.xp += xpGained;
  
  // Si l'exercice était de niveau N5, on incrémente le compteur requis pour le N4
  if (levelTarget === 'N5') {
    userStats.xpN5 += xpGained;
  }
  
  if(isCorrect) userStats.answersCorrect++;
  if(isMastered) userStats.wordsMastered++;
  
  saveStats();
}

function toggleSamourai() {
  document.body.classList.toggle('samourai-mode');
  const isSamourai = document.body.classList.contains('samourai-mode');
  localStorage.setItem('samouraiMode', isSamourai);
  loadContent('parametres');
}

function toggleFurigana() {
  document.body.classList.toggle('hide-furigana');
  localStorage.setItem('hideFurigana', document.body.classList.contains('hide-furigana'));
  loadContent('parametres');
}

function setVoiceSpeed(speed) {
  localStorage.setItem('voiceSpeed', speed);
  loadContent('parametres');
}

function resetProgress() {
  if(confirm("⚠️ ATTENTION : Voulez-vous vraiment effacer toute votre progression (XP, jours consécutifs, etc.) ? Cette action est définitive.")) {
    localStorage.removeItem('nihongoStats');
    location.reload(); // Recharge la page à zéro
  }
}
  
/* ─── UI & AUDIO ───────────────────────────────────────────── */
const AudioEngine = {
  ctx: null,
  init() {
    if(!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    // 👈 LE FIX EST LÀ : On force le réveil du contexte audio bloqué par le navigateur
    if(this.ctx.state === 'suspended') this.ctx.resume(); 
  },
  playTone(freq, type, duration) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime); // Volume doux
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },
  correct() { this.playTone(800, 'sine', 0.3); }, // Ding clair
  wrong() { this.playTone(200, 'sawtooth', 0.3); }, // Tud sourd
  fanfare() { // Petite mélodie de victoire
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Accords majeurs
      let time = this.ctx.currentTime;
      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.2);
        time += 0.12;
      });
    } catch(e) {}
  }
};
  
  function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const toggleBtn = document.getElementById('sidebar-toggle');
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('expanded');
  if (sidebar.classList.contains('collapsed')) {
    toggleBtn.innerText = '▶';
    document.querySelectorAll('.submenu').forEach(menu => menu.style.display = 'none');
    document.querySelectorAll('.chevron').forEach(icon => icon.style.transform = 'rotate(-90deg)');
  } else { toggleBtn.innerText = '◀'; }
}

function toggleMenu(menuId) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('collapsed')) toggleSidebar();
  const menu = document.getElementById(menuId);
  const chevron = document.getElementById('chevron-' + menuId);
  if (menu.style.display === 'none') { menu.style.display = 'block'; chevron.style.transform = 'rotate(0deg)';
  } else { menu.style.display = 'none'; chevron.style.transform = 'rotate(-90deg)'; }
}

function speak(text, lang = 'ja-JP') {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); 
    u.lang = lang; 
    // Récupère la vitesse sauvegardée (par défaut 1.0)
    u.rate = parseFloat(localStorage.getItem('voiceSpeed')) || 1.0;
    window.speechSynthesis.speak(u);
  }
}

function createPetal() {
  const container = document.getElementById('petals');
  if(!container) return;
  const p = document.createElement('div'); p.classList.add('petal');
  p.style.left = Math.random() * 100 + 'vw'; p.style.animationDuration = (Math.random() * 5 + 4) + 's';
  const size = (Math.random() * 10 + 8) + 'px'; p.style.width = size; p.style.height = size;
  container.appendChild(p); setTimeout(() => { p.remove(); }, 9000);
}
setInterval(createPetal, 2000); // 1 pétale par seconde (plus zen)

/* ─── RENDERING DE TABLEAUX ET MODALES ───────────────────────── */
function generateKanaGrid(dataArray) {
  let html = `<div class="kana-grid">`;
  dataArray.forEach(c => {
    if(c.e) html += `<div class="kana-cell empty"></div>`;
    else html += `<div class="kana-cell" onclick="speak('${c.j}')"><span class="kana-jp">${c.j}</span><span class="kana-rom">${c.r}</span></div>`;
  }); return html + `</div>`;
}

function generateYoonGrid(dataArray) {
  let html = `<div class="yoon-grid">`;
  dataArray.forEach(c => { html += `<div class="kana-cell" onclick="speak('${c.j}')"><span class="kana-jp">${c.j}</span><span class="kana-rom">${c.r}</span></div>`; });
  return html + `</div>`;
}
  function generateKanjiGrid(dataArray) {
  let html = `<div class="kanji-grid">`;
  if(!dataArray) return `<p>Données non chargées.</p>`;
  dataArray.forEach(k => {
    // 👈 NOUVEAU : Au clic, on ouvre la modale au lieu de juste lire le son
    html += `<div class="kanji-tile" onclick="openKanjiModal('${k.j}')">
               <span class="kt-char">${k.j}</span>
               <div class="kt-readings">
                 <span class="kt-on">${k.on}</span>
                 <span class="kt-kun">${k.kun}</span>
               </div>
               <span class="kt-fr">${k.f}</span>
             </div>`;
  }); 
  return html + `</div>`;
}

function openKanjiModal(kanjiChar) {
  // 1. Chercher le kanji dans toutes les listes de la DB
  let foundKanji = null;
  for (let level in window.DB_KANJI) {
    foundKanji = window.DB_KANJI[level].find(k => k.j === kanjiChar);
    if (foundKanji) break;
  }
  if(!foundKanji) return;

  // 2. Jouer le son de base
  speak(kanjiChar);

  const modalBox = document.getElementById('kanji-modal-box');
  
  // 3. Construire la liste de vocabulaire
  let wordsHtml = '';
  if(foundKanji.words && foundKanji.words.length > 0) {
    foundKanji.words.forEach(w => {
      const safeWord = w.jp.replace(/'/g, "\\'");
      wordsHtml += `
        <div class="modal-word-item" onclick="speak('${safeWord}')">
          <div class="mw-jp"><span class="mw-kana">${w.kana}</span>${w.jp}</div>
          <div class="mw-fr">${w.fr}</div>
        </div>`;
    });
  } else {
    wordsHtml = '<p style="font-size:14px; color:#888; text-align:center;">Aucun vocabulaire associé.</p>';
  }

  // 4. Injecter les données et l'histoire
  modalBox.innerHTML = `
    <div class="modal-header">
      <button class="modal-close" onclick="closeKanjiModal(event, true)">✕</button>
      <span class="modal-k-char">${foundKanji.j}</span>
      <span class="modal-k-meaning">${foundKanji.f}</span>
    </div>
    <div class="modal-body">
      <div class="modal-readings modal-section">
        <div class="modal-read-badge"><span>ON (Chinois)</span><strong>${foundKanji.on || '-'}</strong></div>
        <div class="modal-read-badge"><span>KUN (Japonais)</span><strong>${foundKanji.kun || '-'}</strong></div>
      </div>
      
      <div class="modal-section">
        <h5><span style="font-size:18px;">🔑</span> Radical & Étymologie</h5>
        <div style="font-size: 14px; font-weight: bold; color: var(--aka); margin-bottom: 8px;">Clé : ${foundKanji.rad || 'Inconnue'}</div>
        <div class="modal-story">${foundKanji.story || 'Aucune histoire disponible pour ce kanji.'}</div>
      </div>
      
      <div class="modal-section">
        <h5><span style="font-size:18px;">📚</span> Vocabulaire Dérivé (Jukugo)</h5>
        <div class="modal-words">
          ${wordsHtml}
        </div>
      </div>
    </div>
  `;

  // 5. Afficher la modale avec animation
  document.getElementById('kanji-modal-overlay').classList.add('active');
}

function closeKanjiModal(e, force = false) {
  // Ferme la modale si on clique sur la croix ou à l'extérieur de la boîte
  if (force || e.target.id === 'kanji-modal-overlay') {
    document.getElementById('kanji-modal-overlay').classList.remove('active');
  }
}

/* ─── MOTEUR DE GESTION DES ONGLETS ────────────────────────── */
function loadContent(id) {
  const contentDiv = document.getElementById('content');
  contentDiv.style.animation = 'none';
  void contentDiv.offsetWidth; // Déclenche un reflow
  contentDiv.style.animation = 'fadeInContent 0.3s ease-in-out';
  const titleHeader = document.getElementById('page-title');
  if(window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
  
  document.querySelectorAll('.sub-item, .nav-item').forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.sub-item, .nav-item')).find(btn => btn.getAttribute('onclick')?.includes(`'${id}'`));
  if(activeBtn) activeBtn.classList.add('active');

  // --- NIVEAU JLPT N5 ---
if(id === 'cours-01') {
  titleHeader.innerText = "Cours 01 : Hiragana Complet 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🌸 L'Alphabet Phonétique Natif</h3>
      <p>Les <strong>hiragana (ひらがな)</strong> sont la base absolue du japonais. Ils vous permettent de lire sans rōmaji et d'accéder aux <em>furigana</em> (petits caractères au-dessus des kanji). Chaque caractère = 1 consonne + 1 voyelle, sauf <strong>ん (n)</strong>.</p>
      
      <div class="info-box">
        <strong>💡 Conseil d'apprentissage :</strong> Apprenez d'abord le <strong>Gojūon</strong> (50 sons de base). Une fois maîtrisé, les Dakuten et Yōon deviennent faciles !
      </div>
      
      <h3>📝 Sons modifiés et combinés</h3>
      <ul>
        <li><strong>Sons voicés (Dakuten) :</strong> L'ajout de <em>dakuten</em> (゛) transforme les sons sourds en sons voisés. Ex: か (ka) → が (ga)</li>
        <li><strong>Sons semi-voicés (Handakuten) :</strong> L'ajout de <em>handakuten</em> (゜) crée des sons semi-voicés. Ex: は (ha) → ぱ (pa)</li>
        <li><strong>Yōon (Sons combinés) :</strong> Les petites syllabes <em>ya, yu, yo</em> fusionnent avec le son précédent. Ex: きゃ (kya), しゅ (shu), ちょ (cho)</li>
      </ul>
      
      <div class="alert-box">
        <strong>⚠️ Cas particuliers importants :</strong>
        <ul>
          <li>Le <strong>petit tsu (っ)</strong> double la consonne suivante. Ex: がっこう (gakkō - école)</li>
          <li>La particule <strong>は</strong> se prononce "wa" (pas "ha")</li>
          <li>La particule <strong>を</strong> se prononce "o" (pas "wo")</li>
          <li>Le <strong>ん</strong> (n) est une consonne nasale unique</li>
        </ul>
      </div>
      
      <h3>📚 Exemples de mots courants avec Hiragana</h3>
      <table class="course-table">
        <tr><th>Hiragana</th><th>Romaji</th><th>Français</th><th>Utilisation</th></tr>
        <tr><td>あさ</td><td>asa</td><td>Matin</td><td>朝ご飯 (petit-déj du matin)</td></tr>
        <tr><td>ひる</td><td>hiru</td><td>Midi</td><td>昼ご飯 (déjeuner)</td></tr>
        <tr><td>よる</td><td>yoru</td><td>Nuit</td><td>夜ご飯 (dîner)</td></tr>
        <tr><td>あい</td><td>ai</td><td>Amour</td><td>愛 (kanji) + hiragana</td></tr>
        <tr><td>あした</td><td>ashita</td><td>Demain</td><td>明日 (kanji) + hiragana</td></tr>
        <tr><td>きょう</td><td>kyō</td><td>Aujourd'hui</td><td>今日 (kanji) + hiragana</td></tr>
      </table>
    </div>
    
    <div class="kana-section">
      <h4>🔤 Gojūon - Les 50 Sons de Base (Cliquez pour écouter)</h4>
      <p style="font-size: 0.9em; color: #666;">Cliquez sur chaque caractère pour entendre sa prononciation.</p>
      ${generateKanaGrid(HIRAGANA_BASE)}
    </div>
    
    <div class="kana-section">
      <h4>🌊 Dakuten & Handakuten - Sons Voicés</h4>
      <p style="font-size: 0.9em; color: #666;">Les dakuten (゛) et handakuten (゜) modifient les sons de base.</p>
      ${generateKanaGrid(HIRAGANA_DAKUTEN)}
    </div>
    
    <div class="kana-section">
      <h4>✨ Yōon - Sons Combinés</h3>
      <p style="font-size: 0.9em; color: #666;">Les petites syllabes créent de nouveaux sons.</p>
      ${generateYoonGrid(HIRAGANA_YOON)}
    </div>
    
    <div class="card">
      <h3>🎯 Exercice Pratique</h3>
      <p>Essayez de lire ces mots en hiragana :</p>
      <ul>
        <li>にほんご (nihongo) = Langue japonaise</li>
        <li>がくせい (gakusei) = Étudiant</li>
        <li>せんせい (sensei) = Professeur</li>
        <li>ともだち (tomodachi) = Ami</li>
        <li>りょうり (ryōri) = Cuisine</li>
      </ul>
    </div>
  `;
}

// ─── COURS 02 : KATAKANA ENRICHI ─── 
else if(id === 'cours-02') {
  titleHeader.innerText = "Cours 02 : Katakana Complet 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🌍 Les mots étrangers (Gairaigo)</h3>
      <p>Le <strong>katakana (カタカナ)</strong> est utilisé principalement pour écrire les mots empruntés aux langues étrangères (surtout l'anglais), les onomatopées, et les noms scientifiques. C'est le "costume formel" du japonais écrit.</p>
      
      <div class="info-box">
        <strong>💡 Astuce :</strong> Le katakana ressemble au hiragana, mais avec des traits plus anguleux et géométriques. Si vous maîtrisez les hiragana, le katakana sera facile !
      </div>
      
      <h3>📚 Exemples de mots étrangers courants</h3>
      <table class="course-table">
        <tr><th>Katakana</th><th>Romaji</th><th>Origine</th><th>Français</th></tr>
        <tr><td>コンピューター</td><td>konpyūtā</td><td>Computer</td><td>Ordinateur</td></tr>
        <tr><td>インターネット</td><td>intānetto</td><td>Internet</td><td>Internet</td></tr>
        <tr><td>テレビ</td><td>terebi</td><td>Television</td><td>Télévision</td></tr>
        <tr><td>ラジオ</td><td>rajio</td><td>Radio</td><td>Radio</td></tr>
        <tr><td>ビール</td><td>bīru</td><td>Beer</td><td>Bière</td></tr>
        <tr><td>コーヒー</td><td>kōhī</td><td>Coffee</td><td>Café</td></tr>
        <tr><td>ピザ</td><td>piza</td><td>Pizza</td><td>Pizza</td></tr>
        <tr><td>ハンバーガー</td><td>hanbāgā</td><td>Hamburger</td><td>Hamburger</td></tr>
      </table>
      
      <h3>⚠️ Pièges et Astuces</h3>
      <ul>
        <li><strong>Tiret d'allongement (ー) :</strong> Il allonge la voyelle précédente. Ex: コーヒー (kō-hī = café)</li>
        <li><strong>Différences visuelles critiques :</strong>
          <ul>
            <li>ツ (tsu) s'écrit de haut en bas, tandis que シ (shi) s'écrit de gauche à droite</li>
            <li>ン (n) ressemble à ソ (so), mais ン est plus court</li>
            <li>ル (ru) ressemble à レ (re), mais ル est plus long</li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div class="kana-section">
      <h4>🔤 Gojūon - Les 50 Sons de Base</h4>
      ${generateKanaGrid(KATAKANA_BASE)}
    </div>
    
    <div class="kana-section">
      <h4>🌊 Dakuten & Handakuten - Sons Voicés</h4>
      ${generateKanaGrid(KATAKANA_DAKUTEN)}
    </div>
    
    <div class="kana-section">
      <h4>✨ Yōon - Sons Combinés</h4>
      ${generateYoonGrid(KATAKANA_YOON)}
    </div>
    
    <div class="card">
      <h3>🎯 Exercice Pratique</h3>
      <p>Essayez de deviner ces mots en katakana :</p>
      <ul>
        <li>アメリカ (amerika) = ?</li>
        <li>イギリス (igirisu) = ?</li>
        <li>フランス (furansu) = ?</li>
        <li>ドイツ (doitsu) = ?</li>
        <li>スペイン (supein) = ?</li>
      </ul>
      <p style="margin-top: 1em;"><em>Réponses : États-Unis, Royaume-Uni, France, Allemagne, Espagne</em></p>
    </div>
  `;
}

// ─── COURS 03 : STRUCTURE SOV ENRICHIE ─── 
else if(id === 'cours-03') {
  titleHeader.innerText = "Cours 03 : Structure SOV & La Copule 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🎯 Le Verbe à la fin (Règle d'or)</h3>
      <p>En japonais, la structure est <strong>Sujet - Objet - Verbe (SOV)</strong>. Le verbe est TOUJOURS placé à la toute fin de la phrase. C'est la différence majeure avec le français (SVO).</p>
      
      <div class="comparison-box">
        <strong>Comparaison :</strong><br/>
        Français (SVO) : Je mange une pomme<br/>
        Japonais (SOV) : 私は りんご を 食べます (Moi pomme manger)
      </div>
      
      <h3>🔤 La Copule です (Le verbe "Être")</h3>
      <p>Pour dire "A est B", on utilise la structure "A wa B desu". <strong>です (desu)</strong> se place à la fin et se conjugue pour exprimer le temps et la négation :</p>
      
      <table class="course-table">
        <tr><th>Temps</th><th>Forme polie</th><th>Exemple (C'est un chat)</th><th>Prononciation</th></tr>
        <tr><td>Présent affirmatif</td><td><strong>〜です</strong></td><td>猫です</td><td>neko desu</td></tr>
        <tr><td>Présent négatif</td><td><strong>〜じゃありません</strong></td><td>猫じゃありません</td><td>neko ja arimasen</td></tr>
        <tr><td>Passé affirmatif</td><td><strong>〜でした</strong></td><td>猫でした</td><td>neko deshita</td></tr>
        <tr><td>Passé négatif</td><td><strong>〜じゃありませんでした</strong></td><td>猫じゃありませんでした</td><td>neko ja arimasen deshita</td></tr>
      </table>
      
      <h3>📝 Exemples pratiques</h3>
      <ul>
        <li><strong>私は学生です。</strong> (Watashi wa gakusei desu.) = Je suis étudiant.</li>
        <li><strong>これはペンです。</strong> (Kore wa pen desu.) = Ceci est un stylo.</li>
        <li><strong>彼は医者じゃありません。</strong> (Kare wa isha ja arimasen.) = Il n'est pas médecin.</li>
        <li><strong>昨日は月曜日でした。</strong> (Kinou wa getsuyōbi deshita.) = Hier c'était lundi.</li>
      </ul>
    </div>
  `;
}

// ─── COURS 04 : PARTICULES ENRICHIES ─── 
else if(id === 'cours-04') {
  titleHeader.innerText = "Cours 04 : Les Particules Complètes (N5) 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔑 Le rôle des particules</h3>
      <p>Les particules sont de petits mots invariables placés <strong>après</strong> un nom ou pronom. Elles définissent le rôle grammatical du mot précédent et sont ESSENTIELLES pour comprendre le japonais.</p>
      
      <table class="course-table">
        <tr><th>Particule</th><th>Rôle principal</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td><strong>は (wa)</strong></td><td>Thème (Ce dont on parle)</td><td>私<strong>は</strong>学生です</td><td>Je suis étudiant</td></tr>
        <tr><td><strong>が (ga)</strong></td><td>Sujet nouveau / Emphase</td><td>猫<strong>が</strong>います</td><td>Il y a un chat</td></tr>
        <tr><td><strong>を (o)</strong></td><td>Complément d'Objet Direct</td><td>すし<strong>を</strong>食べます</td><td>Je mange des sushis</td></tr>
        <tr><td><strong>に (ni)</strong></td><td>Destination, Moment précis, Lieu d'existence</td><td>東京<strong>に</strong>行きます</td><td>Je vais à Tokyo</td></tr>
        <tr><td><strong>で (de)</strong></td><td>Lieu d'action, Moyen, Instrument</td><td>電車<strong>で</strong>行きます</td><td>J'y vais en train</td></tr>
        <tr><td><strong>と (to)</strong></td><td>"Et" (liste exhaustive), "Avec" (une personne)</td><td>友達<strong>と</strong>行きます</td><td>J'y vais avec un ami</td></tr>
        <tr><td><strong>も (mo)</strong></td><td>"Aussi"</td><td>私<strong>も</strong>学生です</td><td>Moi aussi je suis étudiant</td></tr>
        <tr><td><strong>から (kara)</strong></td><td>"Depuis" (Temps ou Espace)</td><td>9時<strong>から</strong>5時まで</td><td>De 9h à 5h</td></tr>
        <tr><td><strong>まで (made)</strong></td><td>"Jusqu'à" (Temps ou Espace)</td><td>9時から5時<strong>まで</strong></td><td>Jusqu'à 5h</td></tr>
        <tr><td><strong>へ (e)</strong></td><td>Direction (Trajet)</td><td>日本<strong>へ</strong>行きます</td><td>Je pars vers le Japon</td></tr>
      </table>
      
      <h3>💡 Astuces de mémorisation</h3>
      <ul>
        <li><strong>は vs が :</strong> Utilisez は pour le thème général, が pour le sujet spécifique ou nouveau</li>
        <li><strong>に vs へ :</strong> に = destination précise, へ = direction générale du trajet</li>
        <li><strong>で :</strong> Pensez "dans/avec" (lieu ou moyen)</li>
        <li><strong>を :</strong> Marque toujours l'objet direct du verbe</li>
      </ul>
    </div>
  `;
}

// ─── COURS 05 : VERBES ENRICHIS ─── 
else if(id === 'cours-05') {
  titleHeader.innerText = "Cours 05 : Verbes, Désirs et Invitations 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔤 La politesse universelle (Forme MASU)</h3>
      <p>La forme <strong>ます (masu)</strong> est la forme standard polie. Elle ne change JAMAIS selon la personne (je, tu, il, elle, nous, vous, ils).</p>
      
      <table class="course-table">
        <tr><th>Temps</th><th>Terminaison</th><th>Exemple (Manger)</th><th>Prononciation</th></tr>
        <tr><td>Présent affirmatif</td><td><strong>〜ます</strong></td><td>食べます</td><td>tabemasu</td></tr>
        <tr><td>Présent négatif</td><td><strong>〜ません</strong></td><td>食べません</td><td>tabemasen</td></tr>
        <tr><td>Passé affirmatif</td><td><strong>〜ました</strong></td><td>食べました</td><td>tabemashita</td></tr>
        <tr><td>Passé négatif</td><td><strong>〜ませんでした</strong></td><td>食べませんでした</td><td>tabemasen deshita</td></tr>
      </table>
      
      <h3>📚 Verbes courants N5</h3>
      <table class="course-table">
        <tr><th>Verbe (Dictionnaire)</th><th>Forme MASU</th><th>Français</th></tr>
        <tr><td>食べる (taberu)</td><td>食べます (tabemasu)</td><td>Manger</td></tr>
        <tr><td>飲む (nomu)</td><td>飲みます (nomimasu)</td><td>Boire</td></tr>
        <tr><td>行く (iku)</td><td>行きます (ikimasu)</td><td>Aller</td></tr>
        <tr><td>来る (kuru)</td><td>来ます (kimasu)</td><td>Venir</td></tr>
        <tr><td>する (suru)</td><td>します (shimasu)</td><td>Faire</td></tr>
        <tr><td>見る (miru)</td><td>見ます (mimasu)</td><td>Regarder</td></tr>
        <tr><td>聞く (kiku)</td><td>聞きます (kikimasu)</td><td>Écouter</td></tr>
        <tr><td>話す (hanasu)</td><td>話します (hanashimasu)</td><td>Parler</td></tr>
        <tr><td>読む (yomu)</td><td>読みます (yomimasu)</td><td>Lire</td></tr>
        <tr><td>書く (kaku)</td><td>書きます (kakimasu)</td><td>Écrire</td></tr>
      </table>
      
      <h3>🎯 Désirs et Invitations</h3>
      <ul>
        <li><strong>〜たいです</strong> (〜tai desu) = Je veux 〜 (Désir personnel)</li>
        <li><strong>〜ましょう</strong> (〜mashou) = Faisons 〜 (Invitation / Suggestion)</li>
        <li><strong>〜ください</strong> (〜kudasai) = S'il vous plaît, 〜 (Demande polie)</li>
      </ul>
      
      <h3>📝 Exemples pratiques</h3>
      <ul>
        <li><strong>私は日本に行きたいです。</strong> = Je veux aller au Japon.</li>
        <li><strong>一緒に映画を見ましょう。</strong> = Regardons un film ensemble.</li>
        <li><strong>コーヒーをください。</strong> = Un café, s'il vous plaît.</li>
      </ul>
    </div>
  `;
}

// ─── COURS 06 : KANJI N5 ENRICHI ─── 
else if(id === 'cours-06') {
  titleHeader.innerText = "Cours 06 : Kanji N5 (Fondamentaux) 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🗾 Introduction aux Kanji</h3>
      <p>Les <strong>kanji (漢字)</strong> sont des caractères d'origine chinoise. Chaque kanji représente une idée ou un concept. Contrairement aux hiragana et katakana (phonétiques), les kanji sont <strong>idéographiques</strong>.</p>
      
      <div class="info-box">
        <strong>📊 Statistiques :</strong><br/>
        • N5 : ~100 kanji<br/>
        • N4 : ~200 kanji<br/>
        • N3 : ~600 kanji<br/>
        • N2 : ~1000 kanji<br/>
        • N1 : ~2000+ kanji
      </div>
      
      <h3>🔑 Les Radicaux (Bushu)</h3>
      <p>Chaque kanji est composé de radicaux (éléments graphiques). Apprendre les radicaux courants vous aide à mémoriser les kanji plus rapidement.</p>
      
      <table class="course-table">
        <tr><th>Radical</th><th>Signification</th><th>Exemples</th></tr>
        <tr><td>木 (arbre)</td><td>Arbre, Bois</td><td>林 (forêt), 森 (dense forêt)</td></tr>
        <tr><td>水 (eau)</td><td>Eau, Liquide</td><td>河 (rivière), 海 (mer)</td></tr>
        <tr><td>火 (feu)</td><td>Feu, Chaleur</td><td>炎 (flamme), 熱 (chaleur)</td></tr>
        <tr><td>土 (terre)</td><td>Terre, Sol</td><td>地 (terre), 塚 (monticule)</td></tr>
        <tr><td>人 (personne)</td><td>Personne, Humain</td><td>人 (personne), 大人 (adulte)</td></tr>
      </table>
      
      <h3>📚 Kanji N5 essentiels</h3>
      <table class="course-table">
        <tr><th>Kanji</th><th>Lecture</th><th>Signification</th><th>Exemple</th></tr>
        <tr><td>一</td><td>ichi</td><td>Un</td><td>一日 (ichi nichi - un jour)</td></tr>
        <tr><td>二</td><td>ni</td><td>Deux</td><td>二月 (ni gatsu - février)</td></tr>
        <tr><td>三</td><td>san</td><td>Trois</td><td>三月 (san gatsu - mars)</td></tr>
        <tr><td>日</td><td>nichi / hi</td><td>Jour, Soleil</td><td>日本 (Japon)</td></tr>
        <tr><td>月</td><td>gatsu / tsuki</td><td>Mois, Lune</td><td>月曜日 (lundi)</td></tr>
        <tr><td>火</td><td>ka / hi</td><td>Feu</td><td>火曜日 (mardi)</td></tr>
        <tr><td>水</td><td>sui / mizu</td><td>Eau</td><td>水曜日 (mercredi)</td></tr>
        <tr><td>木</td><td>moku / ki</td><td>Arbre</td><td>木曜日 (jeudi)</td></tr>
        <tr><td>金</td><td>kin / kane</td><td>Or, Argent</td><td>金曜日 (vendredi)</td></tr>
        <tr><td>土</td><td>do / tsuchi</td><td>Terre</td><td>土曜日 (samedi)</td></tr>
      </table>
      
      <h3>💡 Stratégie d'apprentissage des Kanji</h3>
      <ul>
        <li><strong>Étape 1 :</strong> Apprenez le radical (bushu)</li>
        <li><strong>Étape 2 :</strong> Comprenez la signification du kanji</li>
        <li><strong>Étape 3 :</strong> Mémorisez les lectures (on'yomi et kun'yomi)</li>
        <li><strong>Étape 4 :</strong> Pratiquez avec des mots composés (jukugo)</li>
        <li><strong>Étape 5 :</strong> Écrivez régulièrement pour fixer la mémoire motrice</li>
      </ul>
    </div>
  `;
}

  // --- NIVEAU JLPT N4 ---
  if(id === 'cours-07') {
  titleHeader.innerText = "Cours 07 : Kanji N4 (Intermédiaire) 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🗾 Progression vers le N4</h3>
      <p>Le niveau N4 introduit environ <strong>200 kanji supplémentaires</strong>. Vous apprendrez des kanji plus complexes avec plusieurs lectures (on'yomi et kun'yomi) et des mots composés (jukugo) plus élaborés.</p>
      
      <div class="info-box">
        <strong>🎯 Objectif N4 :</strong> Maîtriser ~300 kanji au total (N5 + N4)
      </div>
      
      <h3>📚 Kanji N4 essentiels (Sélection)</h3>
      <table class="course-table">
        <tr><th>Kanji</th><th>On'yomi</th><th>Kun'yomi</th><th>Signification</th><th>Exemple</th></tr>
        <tr><td>学</td><td>gaku</td><td>mana-bu</td><td>Étudier, École</td><td>学生 (gakusei - étudiant)</td></tr>
        <tr><td>生</td><td>sei / sho</td><td>i-kiru</td><td>Vie, Naissance</td><td>学生 (étudiant)</td></tr>
        <tr><td>先</td><td>sen</td><td>saki</td><td>Avant, Devant</td><td>先生 (sensei - professeur)</td></tr>
        <tr><td>生</td><td>sei</td><td>nama</td><td>Cru, Vivant</td><td>生卵 (nama tamago - œuf cru)</td></tr>
        <tr><td>年</td><td>nen</td><td>toshi</td><td>Année</td><td>今年 (kotoshi - cette année)</td></tr>
        <tr><td>時</td><td>ji</td><td>toki</td><td>Heure, Temps</td><td>時間 (jikan - temps)</td></tr>
        <tr><td>間</td><td>kan</td><td>aida / ma</td><td>Intervalle, Entre</td><td>時間 (jikan - temps)</td></tr>
        <tr><td>家</td><td>ka</td><td>ie / ya</td><td>Maison</td><td>家族 (kazoku - famille)</td></tr>
        <tr><td>族</td><td>zoku</td><td>-</td><td>Tribu, Famille</td><td>家族 (kazoku - famille)</td></tr>
        <tr><td>国</td><td>koku</td><td>kuni</td><td>Pays, Nation</td><td>日本国 (Nihon koku - Japon)</td></tr>
      </table>
      
      <h3>🔑 Stratégies avancées de mémorisation</h3>
      <ul>
        <li><strong>Groupement par radical :</strong> Apprenez les kanji partageant le même radical ensemble</li>
        <li><strong>Étymologie :</strong> Comprenez l'histoire du kanji (combinaison de radicaux)</li>
        <li><strong>Jukugo (Mots composés) :</strong> Mémorisez les kanji dans le contexte de mots réels</li>
        <li><strong>Écriture régulière :</strong> Écrivez chaque kanji 10-20 fois pour fixer la mémoire motrice</li>
        <li><strong>Flashcards SRS :</strong> Utilisez la répétition espacée pour la rétention long terme</li>
      </ul>
      
      <h3>📝 Exercice : Kanji composés (Jukugo)</h3>
      <table class="course-table">
        <tr><th>Kanji 1</th><th>Kanji 2</th><th>Mot composé</th><th>Prononciation</th><th>Français</th></tr>
        <tr><td>日 (jour)</td><td>本 (origine)</td><td>日本</td><td>Nihon</td><td>Japon</td></tr>
        <tr><td>学 (étude)</td><td>生 (vie)</td><td>学生</td><td>gakusei</td><td>Étudiant</td></tr>
        <tr><td>先 (avant)</td><td>生 (vie)</td><td>先生</td><td>sensei</td><td>Professeur</td></tr>
        <tr><td>家 (maison)</td><td>族 (tribu)</td><td>家族</td><td>kazoku</td><td>Famille</td></tr>
        <tr><td>時 (heure)</td><td>間 (intervalle)</td><td>時間</td><td>jikan</td><td>Temps</td></tr>
      </table>
    </div>
  `;
}

// ─── COURS 08 : POTENTIEL & VOLITIF ─── 
else if(id === 'cours-08') {
  titleHeader.innerText = "Cours 08 : Potentiel & Volitif 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>💪 Le Potentiel (Capacité)</h3>
      <p>La forme potentielle exprime la <strong>capacité ou la possibilité de faire quelque chose</strong>. En français, cela se traduit par "pouvoir" ou "être capable de".</p>
      
      <div class="info-box">
        <strong>Formule :</strong> Verbe au potentiel = Verbe à la forme neutre + ことができます
      </div>
      
      <table class="course-table">
        <tr><th>Verbe (Dictionnaire)</th><th>Potentiel</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td>食べる (manger)</td><td>食べられます</td><td>私は日本語が食べられます</td><td>Je peux manger du japonais</td></tr>
        <tr><td>飲む (boire)</td><td>飲めます</td><td>ビールが飲めます</td><td>Je peux boire de la bière</td></tr>
        <tr><td>読む (lire)</td><td>読めます</td><td>日本語が読めます</td><td>Je peux lire le japonais</td></tr>
        <tr><td>書く (écrire)</td><td>書けます</td><td>漢字が書けます</td><td>Je peux écrire les kanji</td></tr>
        <tr><td>話す (parler)</td><td>話せます</td><td>日本語が話せます</td><td>Je peux parler le japonais</td></tr>
      </table>
      
      <h3>🎯 Le Volitif (Intention)</h3>
      <p>La forme volitive exprime l'<strong>intention, la volonté ou la suggestion</strong> de faire quelque chose.</p>
      
      <div class="info-box">
        <strong>Formule :</strong> Verbe au volitif = Verbe à la forme MASU + ましょう
      </div>
      
      <table class="course-table">
        <tr><th>Verbe (MASU)</th><th>Volitif</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td>食べます</td><td>食べましょう</td><td>一緒に食べましょう</td><td>Mangeons ensemble</td></tr>
        <tr><td>飲みます</td><td>飲みましょう</td><td>コーヒーを飲みましょう</td><td>Buvons un café</td></tr>
        <tr><td>行きます</td><td>行きましょう</td><td>映画に行きましょう</td><td>Allons au cinéma</td></tr>
        <tr><td>見ます</td><td>見ましょう</td><td>一緒に見ましょう</td><td>Regardons ensemble</td></tr>
      </table>
      
      <h3>📝 Exemples pratiques</h3>
      <ul>
        <li><strong>私は泳ぐことができます。</strong> = Je peux nager.</li>
        <li><strong>彼は日本語が話せます。</strong> = Il peut parler le japonais.</li>
        <li><strong>一緒に勉強しましょう。</strong> = Étudions ensemble.</li>
        <li><strong>明日、映画を見ましょう。</strong> = Regardons un film demain.</li>
      </ul>
    </div>
  `;
}

// ─── COURS 09 : LES 4 CONDITIONNELS ─── 
else if(id === 'cours-09') {
  titleHeader.innerText = "Cours 09 : Les 4 Conditionnels 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔀 Les 4 Formes Conditionnelles</h3>
      <p>Le japonais dispose de <strong>4 formes conditionnelles</strong> distinctes, chacune avec une nuance différente. Choisir la bonne forme est crucial pour une communication naturelle.</p>
      
      <table class="course-table">
        <tr><th>Forme</th><th>Structure</th><th>Nuance</th><th>Exemple</th></tr>
        <tr><td><strong>〜と (to)</strong></td><td>Condition + と + Conséquence</td><td>Condition automatique, résultat naturel</td><td>雨が降ると、学校に行きません</td></tr>
        <tr><td><strong>〜ば (ba)</strong></td><td>Condition + ば + Conséquence</td><td>Condition hypothétique, plus formel</td><td>雨が降れば、学校に行きません</td></tr>
        <tr><td><strong>〜たら (tara)</strong></td><td>Condition + たら + Conséquence</td><td>Condition chronologique, plus naturel à l'oral</td><td>雨が降ったら、学校に行きません</td></tr>
        <tr><td><strong>〜なら (nara)</strong></td><td>Condition + なら + Conséquence</td><td>Condition basée sur une supposition</td><td>雨が降るなら、学校に行きません</td></tr>
      </table>
      
      <h3>📝 Différences détaillées</h3>
      
      <strong>1. 〜と (to) - Condition automatique</strong>
      <ul>
        <li>Résultat <strong>automatique et inévitable</strong></li>
        <li>Souvent utilisé pour des faits généraux ou naturels</li>
        <li>Exemple : 火をつけると、燃えます (Si on met le feu, ça brûle)</li>
      </ul>
      
      <strong>2. 〜ば (ba) - Condition hypothétique (Formel)</strong>
      <ul>
        <li>Condition <strong>hypothétique</strong>, plus formel</li>
        <li>Utilisé dans les textes écrits, les explications logiques</li>
        <li>Exemple : 勉強すれば、合格します (Si tu étudies, tu réussiras)</li>
      </ul>
      
      <strong>3. 〜たら (tara) - Condition chronologique (Naturel)</strong>
      <ul>
        <li>Condition <strong>temporelle</strong>, plus naturel à l'oral</li>
        <li>Souvent utilisé pour les plans ou les intentions futures</li>
        <li>Exemple : 仕事が終わったら、遊びましょう (Quand le travail sera fini, on jouera)</li>
      </ul>
      
      <strong>4. 〜なら (nara) - Condition basée sur une supposition</strong>
      <ul>
        <li>Condition basée sur <strong>une supposition ou une hypothèse</strong></li>
        <li>Souvent utilisé pour donner des conseils</li>
        <li>Exemple : 疲れているなら、休みなさい (Si tu es fatigué, repose-toi)</li>
      </ul>
      
      <h3>🎯 Tableau comparatif</h3>
      <table class="course-table">
        <tr><th>Forme</th><th>Registre</th><th>Fréquence</th><th>Contexte</th></tr>
        <tr><td>〜と</td><td>Neutre</td><td>Moyenne</td><td>Faits généraux, résultats naturels</td></tr>
        <tr><td>〜ば</td><td>Formel</td><td>Moyenne</td><td>Textes, explications logiques</td></tr>
        <tr><td>〜たら</td><td>Naturel</td><td>Très fréquent</td><td>Conversation, plans futurs</td></tr>
        <tr><td>〜なら</td><td>Neutre</td><td>Moyenne</td><td>Conseils, suppositions</td></tr>
      </table>
    </div>
  `;
}

// ─── COURS 10 : SUPPOSITIONS & APPARENCES ─── 
else if(id === 'cours-10') {
  titleHeader.innerText = "Cours 10 : Suppositions & Apparences 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔮 Exprimer les Suppositions et Apparences</h3>
      <p>Le japonais dispose de plusieurs formes pour exprimer ce qui <strong>semble être</strong> ou ce qu'on <strong>suppose</strong>. Chaque forme a une nuance différente.</p>
      
      <table class="course-table">
        <tr><th>Forme</th><th>Nuance</th><th>Certitude</th><th>Exemple</th></tr>
        <tr><td><strong>〜そう (sō)</strong></td><td>Apparence visuelle immédiate</td><td>Très élevée</td><td>このケーキは美味しそうです</td></tr>
        <tr><td><strong>〜みたい (mitai)</strong></td><td>Ressemblance, Similitude</td><td>Moyenne</td><td>彼は学生みたいです</td></tr>
        <tr><td><strong>〜らしい (rashii)</strong></td><td>Rumeur, Ouï-dire</td><td>Basse</td><td>明日は雨らしいです</td></tr>
        <tr><td><strong>〜ようだ (yōda)</strong></td><td>Impression générale</td><td>Moyenne-Basse</td><td>彼は疲れているようです</td></tr>
      </table>
      
      <h3>📝 Différences détaillées</h3>
      
      <strong>1. 〜そう (sō) - Apparence visuelle</strong>
      <ul>
        <li>Basé sur ce qu'on <strong>voit directement</strong></li>
        <li>Très haute certitude (on peut presque le goûter/sentir)</li>
        <li>Exemple : このケーキは美味しそうです (Ce gâteau a l'air délicieux)</li>
        <li>Formation : Adjectif sans い + そう</li>
      </ul>
      
      <strong>2. 〜みたい (mitai) - Ressemblance</strong>
      <ul>
        <li>Exprime une <strong>ressemblance ou une similitude</strong></li>
        <li>Certitude moyenne (c'est mon impression)</li>
        <li>Exemple : 彼は学生みたいです (Il a l'air d'être un étudiant)</li>
        <li>Formation : Nom/Verbe + みたい</li>
      </ul>
      
      <strong>3. 〜らしい (rashii) - Rumeur, Ouï-dire</strong>
      <ul>
        <li>Basé sur ce qu'on a <strong>entendu dire</strong> ou lu</li>
        <li>Basse certitude (c'est ce qu'on dit)</li>
        <li>Exemple : 明日は雨らしいです (Il paraît qu'il pleuvra demain)</li>
        <li>Formation : Verbe/Adjectif + らしい</li>
      </ul>
      
      <strong>4. 〜ようだ (yōda) - Impression générale</strong>
      <ul>
        <li>Exprime une <strong>impression générale ou une déduction</strong></li>
        <li>Certitude moyenne-basse</li>
        <li>Exemple : 彼は疲れているようです (Il semble être fatigué)</li>
        <li>Formation : Verbe/Adjectif + ようだ</li>
      </ul>
      
      <h3>🎯 Tableau de comparaison</h3>
      <table class="course-table">
        <tr><th>Forme</th><th>Source</th><th>Certitude</th><th>Contexte</th></tr>
        <tr><td>〜そう</td><td>Observation directe</td><td>⭐⭐⭐⭐⭐</td><td>Sensations, apparences visuelles</td></tr>
        <tr><td>〜みたい</td><td>Impression personnelle</td><td>⭐⭐⭐</td><td>Ressemblances, comparaisons</td></tr>
        <tr><td>〜らしい</td><td>Ouï-dire, Rumeur</td><td>⭐⭐</td><td>Informations indirectes</td></tr>
        <tr><td>〜ようだ</td><td>Déduction logique</td><td>⭐⭐⭐</td><td>Impressions générales</td></tr>
      </table>
    </div>
  `;
}

// ─── COURS 10.1 : DONNER, RECEVOIR ET LES FAVEURS ─── 
else if(id === 'cours-10-1') {
  titleHeader.innerText = "Cours 10.1 : Donner, Recevoir & Les Faveurs 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🎁 Les verbes de transfert (Donner / Recevoir)</h3>
      <p>En japonais, la perspective est <strong>très importante</strong> quand on parle de donner ou recevoir. Le choix du verbe dépend du point de vue du locuteur.</p>
      
      <table class="course-table">
        <tr><th>Verbe</th><th>Perspective</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td><strong>あげる (ageru)</strong></td><td>Je donne (à quelqu'un d'autre)</td><td>友達にプレゼントをあげます</td><td>Je donne un cadeau à mon ami</td></tr>
        <tr><td><strong>くれる (kureru)</strong></td><td>On me donne (quelqu'un me donne)</td><td>友達がプレゼントをくれます</td><td>Mon ami me donne un cadeau</td></tr>
        <tr><td><strong>もらう (morau)</strong></td><td>Je reçois (de quelqu'un)</td><td>友達からプレゼントをもらいます</td><td>Je reçois un cadeau de mon ami</td></tr>
      </table>
      
      <h3>📝 Règles importantes</h3>
      <ul>
        <li><strong>あげる :</strong> Utilisé quand JE donne à quelqu'un d'autre (pas à moi-même)</li>
        <li><strong>くれる :</strong> Utilisé quand quelqu'un DONNE À MOI (perspective du receveur)</li>
        <li><strong>もらう :</strong> Utilisé quand JE reçois de quelqu'un (marqué par から)</li>
      </ul>
      
      <h3>💪 Faveurs : Verbe TE + あげる / くれる / もらう</h3>
      <p>Pour exprimer faire une faveur à quelqu'un, on utilise la forme TE du verbe + あげる/くれる/もらう.</p>
      
      <table class="course-table">
        <tr><th>Structure</th><th>Signification</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td>Verbe TE + あげます</td><td>Je fais une faveur à quelqu'un</td><td>友達を手伝ってあげます</td><td>J'aide mon ami</td></tr>
        <tr><td>Verbe TE + くれます</td><td>Quelqu'un me fait une faveur</td><td>友達が手伝ってくれます</td><td>Mon ami m'aide</td></tr>
        <tr><td>Verbe TE + もらいます</td><td>Je reçois une faveur de quelqu'un</td><td>友達に手伝ってもらいます</td><td>Je me fais aider par mon ami</td></tr>
      </table>
      
      <h3>🎯 Exemples pratiques</h3>
      <ul>
        <li><strong>私は妹に本をあげました。</strong> = J'ai donné un livre à ma petite sœur.</li>
        <li><strong>母が私にセーターをくれました。</strong> = Ma mère m'a donné un pull.</li>
        <li><strong>先生から宿題をもらいました。</strong> = J'ai reçu les devoirs du professeur.</li>
        <li><strong>友達が私の荷物を持ってくれました。</strong> = Mon ami a porté mes bagages pour moi.</li>
        <li><strong>先生に漢字を教えてもらいました。</strong> = Je me suis fait enseigner les kanji par le professeur.</li>
      </ul>
      
      <h3>⚠️ Piège courant</h3>
      <p><strong>Attention :</strong> En japonais, on ne dit pas "Je me donne un cadeau" (c'est illogique). On utilise toujours あげる pour donner à quelqu'un d'autre, et くれる/もらう pour recevoir.</p>
    </div>
  `;
}    
  // ─── COURS 11 : KANJI N3 ENRICHI ─── 
if(id === 'cours-11') {
  titleHeader.innerText = "Cours 11 : Kanji N3 (Avancé) 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🗾 Progression vers le N3</h3>
      <p>Le niveau N3 introduit environ <strong>300 kanji supplémentaires</strong>, pour un total de ~600 kanji. À ce stade, vous rencontrerez des kanji avec <strong>plusieurs lectures</strong> et des <strong>mots composés complexes</strong>.</p>
      
      <div class="info-box">
        <strong>🎯 Objectif N3 :</strong> Maîtriser ~600 kanji au total (N5 + N4 + N3)
      </div>
      
      <h3>📚 Kanji N3 essentiels (Sélection)</h3>
      <table class="course-table">
        <tr><th>Kanji</th><th>On'yomi</th><th>Kun'yomi</th><th>Signification</th><th>Exemple</th></tr>
        <tr><td>会</td><td>kai</td><td>a-u</td><td>Rencontre, Réunion</td><td>会議 (kaigi - réunion)</td></tr>
        <tr><td>議</td><td>gi</td><td>-</td><td>Débat, Discussion</td><td>会議 (kaigi - réunion)</td></tr>
        <tr><td>社</td><td>sha</td><td>-</td><td>Société, Entreprise</td><td>会社 (kaisha - entreprise)</td></tr>
        <tr><td>員</td><td>in</td><td>-</td><td>Membre, Personnel</td><td>社員 (shain - employé)</td></tr>
        <tr><td>事</td><td>ji</td><td>koto</td><td>Affaire, Chose</td><td>事務 (jimu - affaires)</td></tr>
        <tr><td>務</td><td>mu</td><td>-</td><td>Devoir, Tâche</td><td>事務 (jimu - affaires)</td></tr>
        <tr><td>体</td><td>tai</td><td>karada</td><td>Corps, Substance</td><td>体育 (taiiku - éducation physique)</td></tr>
        <tr><td>育</td><td>iku</td><td>soda-teru</td><td>Élever, Cultiver</td><td>体育 (taiiku - éducation physique)</td></tr>
        <tr><td>成</td><td>sei</td><td>na-ru</td><td>Devenir, Accomplir</td><td>成功 (seikou - succès)</td></tr>
        <tr><td>功</td><td>kou</td><td>-</td><td>Succès, Mérite</td><td>成功 (seikou - succès)</td></tr>
      </table>
      
      <h3>🔑 Homophones et Pièges N3</h3>
      <p>À ce niveau, vous rencontrerez des kanji qui se prononcent de la même façon mais ont des significations différentes (同音異義字 - dōon ijigi).</p>
      
      <table class="course-table">
        <tr><th>Kanji 1</th><th>Kanji 2</th><th>Prononciation</th><th>Signification 1</th><th>Signification 2</th></tr>
        <tr><td>生</td><td>性</td><td>sei</td><td>Vie, Naissance</td><td>Nature, Sexe</td></tr>
        <tr><td>橋</td><td>箸</td><td>hashi</td><td>Pont</td><td>Baguettes</td></tr>
        <tr><td>木</td><td>目</td><td>me</td><td>Arbre</td><td>Œil</td></tr>
        <tr><td>雨</td><td>飴</td><td>ame</td><td>Pluie</td><td>Bonbon</td></tr>
      </table>
      
      <h3>💡 Stratégies avancées</h3>
      <ul>
        <li><strong>Contexte :</strong> Utilisez le contexte pour déterminer la bonne lecture</li>
        <li><strong>Jukugo complexes :</strong> Mémorisez les mots composés plutôt que les kanji isolés</li>
        <li><strong>Lecture alternative :</strong> Apprenez les deux lectures (on'yomi et kun'yomi) en même temps</li>
        <li><strong>Écriture intensive :</strong> Écrivez chaque kanji 20-30 fois pour maîtriser les traits</li>
      </ul>
    </div>
  `;
}

// ─── COURS 12 : PASSIF, CAUSATIF & CAUSATIF-PASSIF ─── 
else if(id === 'cours-12') {
  titleHeader.innerText = "Cours 12 : Passif, Causatif & Causatif-Passif 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔄 Les 3 Formes Avancées</h3>
      <p>Le N3 introduit trois formes verbales complexes qui changent la perspective de l'action. Ces formes sont essentielles pour comprendre les textes formels et littéraires.</p>
      
      <div class="info-box">
        <strong>Rappel :</strong> Ces formes se construisent à partir de la racine du verbe et suivent des règles spécifiques selon le groupe du verbe.
      </div>
      
      <h3>📝 1. La Forme Passive (Passif)</h3>
      <p>La forme passive inverse le sujet et l'objet. Le sujet devient celui qui <strong>subit l'action</strong>.</p>
      
      <table class="course-table">
        <tr><th>Verbe (Actif)</th><th>Passif</th><th>Exemple Actif</th><th>Exemple Passif</th></tr>
        <tr><td>食べる (manger)</td><td>食べられる</td><td>猫が魚を食べます</td><td>魚が猫に食べられます</td></tr>
        <tr><td>読む (lire)</td><td>読まれる</td><td>私が本を読みます</td><td>本が私に読まれます</td></tr>
        <tr><td>書く (écrire)</td><td>書かれる</td><td>彼が手紙を書きます</td><td>手紙が彼に書かれます</td></tr>
      </table>
      
      <strong>Traduction :</strong>
      <ul>
        <li><strong>Actif :</strong> Le chat mange le poisson</li>
        <li><strong>Passif :</strong> Le poisson est mangé par le chat</li>
      </ul>
      
      <h3>💪 2. La Forme Causative (Causatif)</h3>
      <p>La forme causative exprime que quelqu'un <strong>force ou permet à quelqu'un d'autre de faire quelque chose</strong>.</p>
      
      <table class="course-table">
        <tr><th>Verbe (Neutre)</th><th>Causatif</th><th>Exemple Neutre</th><th>Exemple Causatif</th></tr>
        <tr><td>食べる (manger)</td><td>食べさせる</td><td>子供が食べます</td><td>親が子供に食べさせます</td></tr>
        <tr><td>勉強する (étudier)</td><td>勉強させる</td><td>学生が勉強します</td><td>先生が学生に勉強させます</td></tr>
        <tr><td>行く (aller)</td><td>行かせる</td><td>彼が行きます</td><td>親が彼に行かせます</td></tr>
      </table>
      
      <strong>Traduction :</strong>
      <ul>
        <li><strong>Neutre :</strong> L'enfant mange</li>
        <li><strong>Causatif :</strong> Le parent fait manger l'enfant</li>
      </ul>
      
      <h3>⚠️ 3. La Forme Causatif-Passif (Causatif-Passif)</h3>
      <p>Combine le causatif et le passif. Exprime être <strong>forcé de faire quelque chose contre sa volonté</strong>.</p>
      
      <table class="course-table">
        <tr><th>Verbe (Neutre)</th><th>Causatif-Passif</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td>食べる</td><td>食べさせられる</td><td>子供が野菜を食べさせられます</td><td>L'enfant est forcé de manger des légumes</td></tr>
        <tr><td>勉強する</td><td>勉強させられる</td><td>学生が宿題をさせられます</td><td>L'étudiant est forcé de faire les devoirs</td></tr>
        <tr><td>働く (travailler)</td><td>働かされる</td><td>彼は長時間働かされました</td><td>Il a été forcé de travailler longtemps</td></tr>
      </table>
      
      <h3>🎯 Tableau récapitulatif</h3>
      <table class="course-table">
        <tr><th>Forme</th><th>Perspective</th><th>Nuance</th><th>Exemple</th></tr>
        <tr><td>Actif</td><td>Sujet agit</td><td>Action normale</td><td>私が本を読みます</td></tr>
        <tr><td>Passif</td><td>Sujet subit</td><td>Action subie</td><td>本が私に読まれます</td></tr>
        <tr><td>Causatif</td><td>Quelqu'un force</td><td>Obligation imposée</td><td>親が子供に勉強させます</td></tr>
        <tr><td>Causatif-Passif</td><td>Sujet forcé</td><td>Contrariété, Plainte</td><td>子供が勉強させられます</td></tr>
      </table>
    </div>
  `;
}

// ─── COURS 13 : LE KEIGO (LANGAGE HONORIFIQUE) ─── 
else if(id === 'cours-13') {
  titleHeader.innerText = "Cours 13 : Le Keigo (Langage Honorifique) 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🏢 L'importance du Keigo</h3>
      <p>Le <strong>keigo (敬語)</strong> est le langage honorifique japonais. Il est <strong>essentiel</strong> dans les contextes professionnels, formels et sociaux. Il existe 3 catégories principales.</p>
      
      <div class="info-box">
        <strong>⚠️ Important :</strong> Utiliser le mauvais registre de keigo peut être considéré comme impoli ou manquer de respect.
      </div>
      
      <h3>📝 Les 3 Catégories du Keigo</h3>
      
      <table class="course-table">
        <tr><th>Type</th><th>Cible</th><th>Objectif</th><th>Exemple</th></tr>
        <tr><td><strong>Sonkeigo (尊敬語)</strong></td><td>Personne de haut rang</td><td>Respecter, Honorer</td><td>先生がおっしゃいました</td></tr>
        <tr><td><strong>Kenjōgo (謙譲語)</strong></td><td>Soi-même, Son groupe</td><td>Se montrer humble</td><td>私が申し上げます</td></tr>
        <tr><td><strong>Teineigo (丁寧語)</strong></td><td>Toute personne</td><td>Être poli</td><td>〜ます、〜です</td></tr>
      </table>
      
      <h3>🏆 1. Sonkeigo (Langage de Respect)</h3>
      <p>Utilisé pour parler <strong>de</strong> quelqu'un de haut rang (patron, professeur, client).</p>
      
      <table class="course-table">
        <tr><th>Verbe Normal</th><th>Sonkeigo</th><th>Exemple</th></tr>
        <tr><td>いる (être)</td><td>いらっしゃる</td><td>先生がいらっしゃいます</td></tr>
        <tr><td>言う (dire)</td><td>おっしゃる</td><td>社長がおっしゃいました</td></tr>
        <tr><td>食べる (manger)</td><td>召し上がる</td><td>お客さんが召し上がっています</td></tr>
        <tr><td>飲む (boire)</td><td>召し上がる</td><td>社長が召し上がっています</td></tr>
        <tr><td>する (faire)</td><td>なさる</td><td>先生がなさいました</td></tr>
      </table>
      
      <h3>🙏 2. Kenjōgo (Langage Humble)</h3>
      <p>Utilisé pour parler <strong>de soi-même ou de son groupe</strong> de manière humble.</p>
      
      <table class="course-table">
        <tr><th>Verbe Normal</th><th>Kenjōgo</th><th>Exemple</th></tr>
        <tr><td>いる (être)</td><td>おる</td><td>私がおります</td></tr>
        <tr><td>言う (dire)</td><td>申す / 申し上げる</td><td>私が申し上げます</td></tr>
        <tr><td>食べる (manger)</td><td>いただく</td><td>私がいただきます</td></tr>
        <tr><td>飲む (boire)</td><td>いただく</td><td>コーヒーをいただきます</td></tr>
        <tr><td>する (faire)</td><td>させていただく</td><td>私がさせていただきます</td></tr>
      </table>
      
      <h3>💬 3. Teineigo (Langage Poli)</h3>
      <p>Le langage poli standard utilisé dans la plupart des contextes formels.</p>
      
      <ul>
        <li><strong>Terminaison ます / です :</strong> Forme de base du teineigo</li>
        <li><strong>お / ご + nom :</strong> Préfixes honorifiques (お水, ご質問)</li>
        <li><strong>〜いただく :</strong> "Recevoir" (forme humble)</li>
        <li><strong>〜させていただく :</strong> "Être autorisé à" (très humble)</li>
      </ul>
      
      <h3>🎯 Exemples pratiques</h3>
      <ul>
        <li><strong>Normal :</strong> 社長は何を言いましたか？</li>
        <li><strong>Sonkeigo :</strong> 社長はおっしゃいましたか？ (Qu'a dit le patron ?)</li>
        <li><strong>Kenjōgo :</strong> 私が申し上げます。 (Je vais vous le dire)</li>
        <li><strong>Teineigo :</strong> お忙しいところ、ありがとうございます。 (Merci de votre temps malgré votre emploi du temps chargé)</li>
      </ul>
    </div>
  `;
}

// ─── COURS 13.1 : TEMPS & LIMITES ─── 
else if(id === 'cours-13-1') {
  titleHeader.innerText = "Cours 13.1 : Grammaire du Temps & Limites 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>⏰ Exprimer le Temps et les Limites</h3>
      <p>Le japonais dispose de plusieurs formes pour exprimer des <strong>périodes de temps</strong> et des <strong>limites</strong>. Chaque forme a une nuance différente.</p>
      
      <table class="course-table">
        <tr><th>Forme</th><th>Signification</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td><strong>〜うちに</strong></td><td>Pendant que c'est encore le cas</td><td>若いうちに勉強しましょう</td><td>Étudions pendant qu'on est jeune</td></tr>
        <tr><td><strong>〜間に</strong></td><td>Pendant (intervalle de temps)</td><td>休みの間に旅行します</td><td>Je voyage pendant les vacances</td></tr>
        <tr><td><strong>〜たびに</strong></td><td>Chaque fois que</td><td>会うたびに話します</td><td>On parle chaque fois qu'on se rencontre</td></tr>
        <tr><td><strong>〜ばかりか</strong></td><td>Non seulement... mais aussi</td><td>勉強ばかりか、運動もします</td><td>Non seulement j'étudie, mais je fais aussi du sport</td></tr>
      </table>
      
      <h3>📝 Différences détaillées</h3>
      
      <strong>1. 〜うちに - Pendant que c'est encore le cas</strong>
      <ul>
        <li>Exprime une action qui doit se faire <strong>avant que la situation change</strong></li>
        <li>Sens d'urgence ou d'opportunité limitée</li>
        <li>Exemple : 親が元気なうちに旅行したい (Je veux voyager pendant que mes parents sont en bonne santé)</li>
      </ul>
      
      <strong>2. 〜間に - Pendant (intervalle)</strong>
      <ul>
        <li>Exprime une action qui se fait <strong>pendant une période</strong></li>
        <li>Pas de sens d'urgence particulier</li>
        <li>Exemple : 映画の間に友達が来ました (Mon ami est venu pendant le film)</li>
      </ul>
      
      <strong>3. 〜たびに - Chaque fois que</strong>
      <ul>
        <li>Exprime une action <strong>répétée régulièrement</strong></li>
        <li>Souvent utilisé avec des habitudes</li>
        <li>Exemple : 日本に行くたびに、寿司を食べます (Chaque fois que je vais au Japon, je mange des sushis)</li>
      </ul>
      
      <h3>🎯 Tableau comparatif</h3>
      <table class="course-table">
        <tr><th>Forme</th><th>Contexte</th><th>Fréquence</th><th>Nuance</th></tr>
        <tr><td>〜うちに</td><td>Avant que la situation change</td><td>Moyenne</td><td>Urgence, Opportunité</td></tr>
        <tr><td>〜間に</td><td>Pendant une période</td><td>Très fréquent</td><td>Neutre</td></tr>
        <tr><td>〜たびに</td><td>Action répétée</td><td>Moyenne</td><td>Habitude, Régularité</td></tr>
      </table>
    </div>
  `;
}

// ─── COURS 13.2 : DÉCISIONS & ÉTAT ─── 
else if(id === 'cours-13-2') {
  titleHeader.innerText = "Cours 13.2 : Décisions & État 🎓";
  contentDiv.innerHTML = `
    <div class="card">
      <h3>🔮 Exprimer Décisions et États</h3>
      <p>Le japonais dispose de plusieurs formes pour exprimer des <strong>décisions, des changements d'état et des états permanents</strong>.</p>
      
      <table class="course-table">
        <tr><th>Forme</th><th>Signification</th><th>Exemple</th><th>Traduction</th></tr>
        <tr><td><strong>〜ことになる</strong></td><td>Il a été décidé que / C'est devenu le cas</td><td>明日の会議は中止になりました</td><td>La réunion de demain a été annulée</td></tr>
        <tr><td><strong>〜ことにする</strong></td><td>Décider de / Faire en sorte que</td><td>毎日運動することにしました</td><td>J'ai décidé de faire du sport chaque jour</td></tr>
        <tr><td><strong>〜ようになる</strong></td><td>Devenir capable / Arriver à</td><td>日本語が話せるようになりました</td><td>Je suis devenu capable de parler le japonais</td></tr>
        <tr><td><strong>〜ようにする</strong></td><td>Faire en sorte que / Essayer de</td><td>毎日早く寝るようにしています</td><td>J'essaie de me coucher tôt chaque jour</td></tr>
      </table>
      
      <h3>📝 Différences détaillées</h3>
      
      <strong>1. 〜ことになる - Il a été décidé que</strong>
      <ul>
        <li>Exprime une <strong>décision prise par une autorité ou par les circonstances</strong>, pas par soi-même</li>
        <li>Souvent utilisé pour des annonces officielles</li>
        <li>Exemple : 会社を辞めることになりました (Il a été décidé que je quitterais l'entreprise)</li>
      </ul>
      
      <strong>2. 〜ことにする - Décider de</strong>
      <ul>
        <li>Exprime une <strong>décision personnelle</strong></li>
        <li>Souvent utilisé pour des résolutions ou des plans</li>
        <li>Exemple : 毎日ジムに行くことにしました (J'ai décidé d'aller à la gym chaque jour)</li>
      </ul>
      
      <strong>3. 〜ようになる - Devenir capable</strong>
      <ul>
        <li>Exprime un <strong>changement d'état ou l'acquisition d'une capacité</strong></li>
        <li>Souvent utilisé pour des progrès ou des accomplissements</li>
        <li>Exemple : 子供が歩けるようになりました (L'enfant est devenu capable de marcher)</li>
      </ul>
      
      <strong>4. 〜ようにする - Faire en sorte que / Essayer de</strong>
      <ul>
        <li>Exprime un <strong>effort ou une tentative</strong> pour atteindre un objectif</li>
        <li>Souvent utilisé pour des habitudes ou des efforts</li>
        <li>Exemple : 健康になるようにしています (J'essaie de devenir en bonne santé)</li>
      </ul>
      
      <h3>🎯 Tableau récapitulatif</h3>
      <table class="course-table">
        <tr><th>Forme</th><th>Perspective</th><th>Contexte</th><th>Exemple</th></tr>
        <tr><td>〜ことになる</td><td>Décision externe</td><td>Annonces officielles</td><td>明日は休みになります</td></tr>
        <tr><td>〜ことにする</td><td>Décision personnelle</td><td>Résolutions, Plans</td><td>毎日走ることにします</td></tr>
        <tr><td>〜ようになる</td><td>Changement d'état</td><td>Progrès, Accomplissements</td><td>泳げるようになりました</td></tr>
        <tr><td>〜ようにする</td><td>Effort personnel</td><td>Habitudes, Efforts</td><td>早く寝るようにしています</td></tr>
      </table>
      
      <h3>📝 Exemples pratiques</h3>
      <ul>
        <li><strong>会議は3時に行うことになりました。</strong> = La réunion a été fixée à 15h.</li>
        <li><strong>毎週水曜日に勉強することにしました。</strong> = J'ai décidé d'étudier chaque mercredi.</li>
        <li><strong>漢字が読めるようになりました。</strong> = Je suis devenu capable de lire les kanji.</li>
        <li><strong>毎日30分走るようにしています。</strong> = J'essaie de courir 30 minutes chaque jour.</li>
      </ul>
    </div>
  `;
}

  // --- NIVEAU JLPT N2 ---
  else if(id === 'cours-14') {
    titleHeader.innerText = "Cours 14 : Kanjis du niveau N2";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Comprendre la presse et les médias</h3>
        <p>Le niveau JLPT N2 exige la connaissance d'environ 1000 Kanjis au total. C'est le palier indispensable pour travailler dans une entreprise japonaise ou lire des articles de société de manière fluide.</p>
        <p>Les Kanjis de cette sélection abordent des concepts intellectuels, la gestion, la justice et l'économie.</p>
      </div>
      <div class="kana-section"><h4>La sélection JLPT N2 (100 Kanjis clés)</h4>${generateKanjiGrid(window.DB_KANJI ? window.DB_KANJI.N2 : null)}</div>`;
  }
  else if(id === 'cours-15') {
    titleHeader.innerText = "Cours 15 : Grammaire N2 (Rigidité et Nuances)";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>1. Le japonais formel (堅い表現 - Katai hyōgen)</h3>
        <p>Le N2 introduit de nombreuses tournures rigides utilisées dans les documents officiels, les e-mails professionnels ou lors des discours protocolaires.</p>
        <table class="course-table">
          <tr><th>Expression N2</th><th>Sens exact</th><th>Exemple d'utilisation</th></tr>
          <tr>
            <td><strong>〜に<ruby>際<rt>さい</rt></ruby>して (ni saishite)</strong></td>
            <td><strong>À l'occasion de... / Au moment de...</strong> (Style écrit très formel).</td>
            <td>お<ruby>申込<rt>もうしこみ</rt></ruby>に<strong>際して</strong>は、<ruby>写真<rt>しゃしん</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。<br><em>(À l'occasion de votre inscription, une photo est requise.)</em></td>
          </tr>
          <tr>
            <td><strong>〜にわたって (ni watatte)</strong></td>
            <td><strong>Sur l'ensemble de... / Tout au long de...</strong> (Étendue de temps ou d'espace).</td>
            <td><ruby>会議<rt>かいぎ</rt></ruby>は3<ruby>日間<rt>にちかん</rt></ruby><strong>にわたって</strong><ruby>行<rt>おこな</rt></ruby>われた。<br><em>(La réunion s'est déroulée sur une durée de trois jours.)</em></td>
          </tr>
          <tr>
            <td><strong>〜つつある (tsutsu aru)</strong></td>
            <td><strong>Être en cours de...</strong> (Un processus de changement continu).</td>
            <td><ruby>日本<rt>にほん</rt></ruby>の<ruby>景気<rt>けいき</rt></ruby>は<ruby>回復<rt>かいふく</rt></ruby>し<strong>つつある</strong>。<br><em>(L'économie japonaise est en train de se redresser.)</em></td>
          </tr>
        </table>

        <h3>2. L'impossibilité ou l'obligation nuancée</h3>
        <p>En clientèle ou dans le cadre professionnel, refuser catégoriquement avec <em>~dekinai</em> est impoli. Le N2 apporte de la subtilité.</p>
        <table class="course-table">
          <tr><th>Expression N2</th><th>Nuance et Contexte</th><th>Exemple d'utilisation</th></tr>
          <tr>
            <td><strong>〜かねる (kaneru)</strong></td>
            <td><strong>Ne pas pouvoir se résoudre à...</strong> (La morale, le protocole ou la position l'interdit). Refus poli idéal.</td>
            <td>そのご<ruby>意見<rt>いけん</rt></ruby>には<ruby>賛成<rt>さんせい</rt></ruby><strong>しかねます</strong>。<br><em>(Je ne peux me résoudre à approuver cette opinion.)</em></td>
          </tr>
          <tr>
            <td><strong>〜ざるを得ない (zaru o enai)</strong></td>
            <td><strong>Être obligé de... / N'avoir d'autre choix que...</strong> (Malgré soi, dicté par la situation).</td>
            <td><ruby>台風<rt>たいふう</rt></ruby>のため、<ruby>予定<rt>よてい</rt></ruby>を<ruby>変更<rt>へんこう</rt></ruby><strong>せざるを得ない</strong>。<br><em>(À cause du typhon, nous sommes obligés de modifier le programme.)</em></td>
          </tr>
        </table>
      </div>`;
  }

  // --- NIVEAU JLPT N1 ---
  else if(id === 'cours-16') {
    titleHeader.innerText = "Cours 16 : Kanjis du niveau N1";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>L'ultime étape : Littérature et Spécialisation</h3>
        <p>Le niveau JLPT N1 couvre l'intégralité des ~2136 Kanjis d'usage courant (常用漢字 - Jōyō Kanji). Ce sont les idéogrammes que l'on retrouve dans la haute littérature, les textes de loi, les éditoriaux politiques et les publications académiques.</p>
        <p>Ils expriment souvent des concepts philosophiques abstraits ou des mouvements d'une extrême précision.</p>
      </div>
      <div class="kana-section"><h4>Sélection d'élite (Kanji N1)</h4>${generateKanjiGrid(window.DB_KANJI ? window.DB_KANJI.N1 : null)}</div>`;
  }
  else if(id === 'cours-17') {
    titleHeader.innerText = "Cours 17 : Grammaire Experte N1";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>1. Les tournures de la littérature japonaise</h3>
        <p>La grammaire N1 est si poussée que même de nombreux Japonais natifs hésitent sur certaines nuances s'ils ne lisent pas régulièrement. Elle est archaïque, emphatique et hautement dramatique.</p>
        
        <h3>2. Succession immédiate et théâtrale</h3>
        <p>Le N1 adore insister sur des actions qui se bousculent dans le temps de manière fulgurante.</p>
        <table class="course-table">
          <tr><th>Expression N1</th><th>Nuance et Contexte</th><th>Exemple d'utilisation</th></tr>
          <tr>
            <td><strong>〜や<ruby>否<rt>いな</rt></ruby>や (ya ina ya)</strong></td>
            <td><strong>À peine... que / Dès que...</strong> (Une succession immédiate et surprenante). S'attache au verbe neutre.</td>
            <td><ruby>彼<rt>かれ</rt></ruby>は私の<ruby>顔<rt>かお</rt></ruby>を<ruby>見<rt>み</rt></ruby>る<strong>や否や</strong>、<ruby>逃<rt>に</rt></ruby>げ出した。<br><em>(Dès qu'il a vu mon visage, il s'est enfui.)</em></td>
          </tr>
          <tr>
            <td><strong>〜が<ruby>早<rt>はや</rt></ruby>いか (ga hayai ka)</strong></td>
            <td><strong>À peine eut-il fait ceci... que cela arriva.</strong> (Action presque simultanée).</td>
            <td>ベルが<ruby>鳴<rt>な</rt></ruby>る<strong>が早いか</strong>、<ruby>生徒<rt>せいと</rt></ruby>たちは<ruby>教室<rt>きょうしつ</rt></ruby>を<ruby>飛<rt>と</rt></ruby>び出した。<br><em>(À peine la cloche a-t-elle sonné que les élèves ont bondi hors de la classe.)</em></td>
          </tr>
        </table>

        <h3>3. L'emphase et la cause absolue</h3>
        <p>Pour mettre en lumière le caractère exceptionnel, paradoxal ou extrême d'une situation.</p>
        <table class="course-table">
          <tr><th>Expression N1</th><th>Nuance et Contexte</th><th>Exemple d'utilisation</th></tr>
          <tr>
            <td><strong>〜だに (dani)</strong></td>
            <td><strong>Rien que de... / Même seulement...</strong> (S'utilise avec imaginer, penser, entendre).</td>
            <td>そんなことが<ruby>起<rt>お</rt></ruby>きるなんて、<ruby>想像<rt>そうぞう</rt></ruby>する<strong>だに</strong>おそろしい。<br><em>(Rien que d'imaginer qu'une telle chose puisse arriver, c'est terrifiant.)</em></td>
          </tr>
          <tr>
            <td><strong>〜ばこそ (ba koso)</strong></td>
            <td><strong>C'est précisément parce que...</strong> (Met en valeur la cause unique et paradoxale). Forme conditionnelle + こそ.</td>
            <td><ruby>愛<rt>あい</rt></ruby>していれば<strong>こそ</strong>、<ruby>厳<rt>きび</rt></ruby>しく<ruby>叱<rt>しか</rt></ruby>るのです。<br><em>(C'est précisément parce que je l'aime que je le gronde sévèrement.)</em></td>
          </tr>
        </table>
      </div>`;
  }

  // --- ZONE D'ENTRAÎNEMENT & MENUS ASSOCIÉS ---
  else if(id === 'exercices') {
    titleHeader.innerText = "Zone d'Entraînement";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Choisissez votre exercice</h3>
        <p>Sélectionnez un mode d'entraînement pour tester vos connaissances et gagner de l'XP.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('detective-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🕵️</span>
            <span class="vocab-jp" style="font-size: 18px;">Le Détective</span>
            <span class="vocab-fr">L'épreuve des Radicaux</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('forgeron-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🔨</span>
            <span class="vocab-jp" style="font-size: 18px;">Le Forgeron</span>
            <span class="vocab-fr">Créateur de Mots Composés</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('piege-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🪤</span>
            <span class="vocab-jp" style="font-size: 18px;">Le Piège</span>
            <span class="vocab-fr">Test de Lecture (ON/KUN)</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('flashcards-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🎴</span>
            <span class="vocab-jp" style="font-size: 18px;">Flashcards SRS</span>
            <span class="vocab-fr">Algorithme de répétition espacée</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('fillblank-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">📝</span>
            <span class="vocab-jp" style="font-size: 18px;">Texte à trous</span>
            <span class="vocab-fr">Testez vos Particules & Grammaire</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('sov-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🏗️</span>
            <span class="vocab-jp" style="font-size: 18px;">Constructeur SOV</span>
            <span class="vocab-fr">Maîtrisez l'ordre des mots</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('dictation-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🎧</span>
            <span class="vocab-jp" style="font-size: 18px;">Dictée Aveugle</span>
            <span class="vocab-fr">Entraînez votre oreille</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('survival-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">⚡</span>
            <span class="vocab-jp" style="font-size: 18px;">Mode Survie</span>
            <span class="vocab-fr">Chrono-Challenge de vitesse</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('matchup-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🧩</span>
            <span class="vocab-jp" style="font-size: 18px;">Jeu des Paires</span>
            <span class="vocab-fr">Associez visuellement Kanjis et Sens</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('keyboard-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">✍️</span>
            <span class="vocab-jp" style="font-size: 18px;">Saisie Manuelle</span>
            <span class="vocab-fr">Tapez vos réponses au clavier</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('counters-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🏪</span>
            <span class="vocab-jp" style="font-size: 18px;">Le Marchand</span>
            <span class="vocab-fr">Maîtrisez les compteurs</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('reverse-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🔄</span>
            <span class="vocab-jp" style="font-size: 18px;">Leçon Inversée</span>
            <span class="vocab-fr">Du Français vers le Japonais</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('voice-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🎙️</span>
            <span class="vocab-jp" style="font-size: 18px;">Studio Vocal</span>
            <span class="vocab-fr">Parlez en Japonais</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('canvas-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">🖌️</span>
            <span class="vocab-jp" style="font-size: 18px;">Calligraphie</span>
            <span class="vocab-fr">Tracez les Kanjis</span>
          </div>
          <div class="vocab-card" style="padding: 24px; border-color: var(--aka); background: var(--sakura-pale);" onclick="loadContent('reading-menu')">
            <span class="vocab-jp" style="font-size: 32px; margin-bottom:10px;">📖</span>
            <span class="vocab-jp" style="font-size: 18px;">Bibliothèque</span>
            <span class="vocab-fr">Textes interactifs</span>
          </div>
        </div>
      </div>`;
  }
  else if(id === 'dictation-menu') {
    titleHeader.innerText = "Dictée Aveugle";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Compréhension Orale</h3>
        <p>L'application prononcera une phrase à voix haute. Tendez l'oreille et sélectionnez la bonne traduction.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startDictation('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Écoute Débutant</span></div>
          <div class="vocab-card" onclick="startDictation('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Écoute Élémentaire</span></div>
          <div class="vocab-card" onclick="startDictation('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Écoute Intermédiaire</span></div>
          <div class="vocab-card" onclick="startDictation('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Écoute Avancée</span></div>
          <div class="vocab-card" onclick="startDictation('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Écoute Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'dictation-run') {
    titleHeader.innerText = "Écoutez attentivement";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="dict-area" style="padding: 30px 20px;"></div>`;
  }
  else if(id === 'sov-menu') {
    titleHeader.innerText = "Constructeur de Phrases";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Pensez à la Japonaise (Sujet-Objet-Verbe)</h3>
        <p>Le verbe se place toujours à la fin. Reconstituez la traduction en tapant sur les blocs dans le bon ordre.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startSov('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Phrases de base</span></div>
          <div class="vocab-card" onclick="startSov('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Phrases élémentaires</span></div>
          <div class="vocab-card" onclick="startSov('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Phrases intermédiaires</span></div>
          <div class="vocab-card" onclick="startSov('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Phrases avancées</span></div>
          <div class="vocab-card" onclick="startSov('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Phrases d'élite</span></div>
        </div>
      </div>`;
  }
  else if(id === 'sov-run') {
    titleHeader.innerText = "Construisez la phrase";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="sov-area" style="padding: 30px 20px;"></div>`;
  }
  else if(id === 'flashcards-menu') {
    titleHeader.innerText = "Configuration du Paquet";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Que voulez-vous réviser aujourd'hui ?</h3>
        <p>L'algorithme SRS va vous interroger. Si vous échouez, la carte reviendra rapidement. Si vous réussissez, elle sortira de la session.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startFlashcards('kana')"><span class="vocab-jp">あ / ア</span><span class="vocab-fr">Tous les Kanas</span></div>
          <div class="vocab-card" onclick="startFlashcards('kanji5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Kanjis Débutant</span></div>
          <div class="vocab-card" onclick="startFlashcards('kanji4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Kanjis Élémentaire</span></div>
          <div class="vocab-card" onclick="startFlashcards('kanji3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Kanjis Intermédiaire</span></div>
          <div class="vocab-card" onclick="startFlashcards('kanji2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Kanjis Avancé</span></div>
          <div class="vocab-card" onclick="startFlashcards('kanji1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Kanjis Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'flashcards-run') {
    titleHeader.innerText = "Entraînement SRS en cours...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" style="background: var(--sakura-pale); padding: 30px 20px;">
        <div id="flashcard-area" style="display:flex; flex-direction:column; align-items:center; width:100%;">
          <div class="fc-container" onclick="flipFlashcard()">
            <div class="fc-card" id="fc-card-element">
              <div class="fc-face fc-front"><span class="fc-front-text" id="fc-front-text"></span></div>
              <div class="fc-face fc-back"><span class="fc-back-jp" id="fc-back-jp"></span><span class="fc-back-fr" id="fc-back-fr"></span></div>
            </div>
          </div>
          <div class="flip-hint" id="flip-hint">Cliquez sur la carte pour la retourner</div>
          <div class="srs-controls" id="srs-controls">
            <button class="srs-btn fail" onclick="answerCard(0)">À revoir<br><span style="font-size:11px; font-weight:normal;">(Raté)</span></button>
            <button class="srs-btn hard" onclick="answerCard(1)">Difficile<br><span style="font-size:11px; font-weight:normal;">(Hésitation)</span></button>
            <button class="srs-btn easy" onclick="answerCard(2)">Facile<br><span style="font-size:11px; font-weight:normal;">(Mémorisé)</span></button>
          </div>
        </div>
      </div>`;
  }  
  else if(id === 'fillblank-menu') {
    titleHeader.innerText = "Choix du niveau (Grammaire)";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Testez vos réflexes grammaticaux</h3>
        <p>Lisez la phrase, comprenez le contexte grâce à la traduction, et choisissez la particule ou la structure manquante.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startQuiz('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Particules de base</span></div>
          <div class="vocab-card" onclick="startQuiz('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Grammaire intermédiaire</span></div>
          <div class="vocab-card" onclick="startQuiz('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Structures Intermédiaires</span></div>
          <div class="vocab-card" onclick="startQuiz('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Grammaire Avancée</span></div>
          <div class="vocab-card" onclick="startQuiz('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Structures Expertes</span></div>
        </div>
      </div>`;
  }
  else if(id === 'fillblank-run') {
    titleHeader.innerText = "Complétez la phrase";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="quiz-area" style="padding: 40px 20px;"></div>`;
  }
  else if(id === 'survival-menu') {
    titleHeader.innerText = "Mode Survie : Choix du Rang";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Avez-vous les réflexes d'un Samouraï ?</h3>
        <p>Le temps file ! Répondez correctement pour regagner de précieuses secondes, mais attention, chaque erreur videra votre jauge de vie.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startSurvivalMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Vitesse Débutant</span></div>
          <div class="vocab-card" onclick="startSurvivalMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Vitesse Élémentaire</span></div>
          <div class="vocab-card" onclick="startSurvivalMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Vitesse Intermédiaire</span></div>
          <div class="vocab-card" onclick="startSurvivalMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Vitesse Avancée</span></div>
          <div class="vocab-card" onclick="startSurvivalMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Vitesse Maître</span></div>
        </div>
      </div>`;
  }
  else if(id === 'survival-run') {
    titleHeader.innerText = "CHALLENGE SURVIE EN COURS...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="survival-area" style="padding: 40px 20px; background: var(--sakura-pale);"></div>`;
  }
  else if(id === 'matchup-menu') {
    titleHeader.innerText = "Jeu des Paires : Configuration";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Nettoyez la grille de Kanjis</h3>
        <p>Sélectionnez une carte en Japonais puis associez-la à sa bonne signification en Français pour faire disparaître le duo.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startMatchupMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Grille Débutant</span></div>
          <div class="vocab-card" onclick="startMatchupMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Grille Élémentaire</span></div>
          <div class="vocab-card" onclick="startMatchupMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Grille Intermédiaire</span></div>
          <div class="vocab-card" onclick="startMatchupMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Grille Avancée</span></div>
          <div class="vocab-card" onclick="startMatchupMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Grille Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'matchup-run') {
    titleHeader.innerText = "ASSOCIATION DES PAIRES...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" style="background: var(--sakura-pale); padding: 30px 20px;">
        <p style="text-align: center; margin-bottom: 20px; font-weight: bold; color: var(--aka);">Associez les Kanjis à leurs définitions françaises :</p>
        <div class="kana-grid" id="matchup-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 500px; margin: 0 auto; gap: 15px;"></div>
      </div>`;
  }
  else if(id === 'keyboard-menu') {
    titleHeader.innerText = "Saisie Manuelle : Configuration";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>L'épreuve de production écrite</h3>
        <p>Ici, pas de devinettes possibles ! Lisez la phrase à trous et utilisez le clavier virtuel pour taper vous-même la bonne particule.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startKeyboardMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Particules de base</span></div>
          <div class="vocab-card" onclick="startKeyboardMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Grammaire intermédiaire</span></div>
          <div class="vocab-card" onclick="startKeyboardMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Grammaire avancée</span></div>
        </div>
      </div>`;
  }
  else if(id === 'keyboard-run') {
    titleHeader.innerText = "SAISIE AU CLAVIER...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="keyboard-area" style="padding: 40px 20px;"></div>`;
  }
  else if(id === 'reverse-menu') {
    titleHeader.innerText = "Leçon Inversée : Configuration";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Production Active</h3>
        <p>L'application vous donne un mot ou un sens en français. Retrouvez le Kanji ou le vocabulaire japonais correspondant pour forcer votre cerveau à produire de la langue.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startReverseMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Base (Inversé)</span></div>
          <div class="vocab-card" onclick="startReverseMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Élémentaire (Inversé)</span></div>
          <div class="vocab-card" onclick="startReverseMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Intermédiaire (Inversé)</span></div>
          <div class="vocab-card" onclick="startReverseMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Avancé (Inversé)</span></div>
          <div class="vocab-card" onclick="startReverseMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Expert (Inversé)</span></div>
        </div>
      </div>`;
  }
  else if(id === 'reverse-run') {
    titleHeader.innerText = "TRADUCTION INVERSÉE...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="reverse-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'detective-menu') {
    titleHeader.innerText = "Le Détective : Choix du Niveau";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>L'art de l'observation</h3>
        <p>Un Kanji inconnu apparaît. Observez sa structure et identifiez sa <strong>Clé principale (Radical)</strong>. Lisez bien les histoires en fin de question pour comprendre l'étymologie !</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startDetectiveMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Radicaux Débutant</span></div>
          <div class="vocab-card" onclick="startDetectiveMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Radicaux Élémentaire</span></div>
          <div class="vocab-card" onclick="startDetectiveMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Radicaux Intermédiaire</span></div>
          <div class="vocab-card" onclick="startDetectiveMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Radicaux Avancé</span></div>
          <div class="vocab-card" onclick="startDetectiveMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Radicaux Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'detective-run') {
    titleHeader.innerText = "ANALYSE DU KANJI...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="detective-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'forgeron-menu') {
    titleHeader.innerText = "Le Forgeron : Choix du Niveau";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Forgez votre Vocabulaire (Jukugo)</h3>
        <p>Les Kanjis s'assemblent pour créer de nouveaux sens. Lisez le mot en français, et cliquez sur les "minerais" (les Kanjis) dans le bon ordre pour forger la traduction japonaise !</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startForgeronMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Mots Débutant</span></div>
          <div class="vocab-card" onclick="startForgeronMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Mots Élémentaire</span></div>
          <div class="vocab-card" onclick="startForgeronMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Mots Intermédiaire</span></div>
          <div class="vocab-card" onclick="startForgeronMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Mots Avancé</span></div>
          <div class="vocab-card" onclick="startForgeronMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Mots Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'forgeron-run') {
    titleHeader.innerText = "LA FORGE EST ALLUMÉE...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="forgeron-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'piege-menu') {
    titleHeader.innerText = "Le Piège : Choix du Niveau";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Esquivez les pièges de prononciation</h3>
        <p>Un mot japonais apparaît. Vous devez trouver sa bonne prononciation en Hiragana. Attention : les mauvaises réponses contiennent souvent l'autre lecture (ON ou KUN) du Kanji pour vous induire en erreur !</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startPiegeMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Lectures Débutant</span></div>
          <div class="vocab-card" onclick="startPiegeMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Lectures Élémentaire</span></div>
          <div class="vocab-card" onclick="startPiegeMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Lectures Intermédiaire</span></div>
          <div class="vocab-card" onclick="startPiegeMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Lectures Avancé</span></div>
          <div class="vocab-card" onclick="startPiegeMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Lectures Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'piege-run') {
    titleHeader.innerText = "DÉTECTION DE LA LECTURE...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="piege-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'counters-menu') {
    titleHeader.innerText = "Le Marchand : Choix de la difficulté";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Bienvenue dans votre boutique !</h3>
        <p>Un client vous demande un article précis. À vous de choisir le bon "compteur" (classificateur) pour le servir correctement. Attention, une feuille ne se compte pas comme un stylo !</p>
        <button class="btn-primary" style="width:100%; font-size:18px; padding:15px;" onclick="startCountersMode()">Ouvrir la boutique ➔</button>
      </div>`;
  }
  else if(id === 'counters-run') {
    titleHeader.innerText = "CLIENT AU COMPTOIR...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="counters-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'voice-menu') {
    titleHeader.innerText = "Studio Vocal : Choix du Niveau";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Entraînez votre prononciation !</h3>
        <p>L'application affichera une phrase en français. Appuyez sur le micro et prononcez la traduction en japonais. Votre navigateur évaluera votre accent et votre exactitude (Nécessite Chrome ou Edge).</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startVoiceMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Oral Débutant</span></div>
          <div class="vocab-card" onclick="startVoiceMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Oral Élémentaire</span></div>
          <div class="vocab-card" onclick="startVoiceMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Oral Intermédiaire</span></div>
          <div class="vocab-card" onclick="startVoiceMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Oral Avancé</span></div>
          <div class="vocab-card" onclick="startVoiceMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Oral Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'voice-run') {
    titleHeader.innerText = "MICROPHONE OUVERT...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="if(window.recognition) window.recognition.stop(); loadContent('exercices')">Retour</button>
      <div class="card" id="voice-area" style="padding: 40px 20px;"></div>`;
  }
    else if(id === 'canvas-menu') {
    titleHeader.innerText = "Calligraphie : Choix du Niveau";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>L'art du pinceau numérique</h3>
        <p>L'application vous donnera un mot en français. Vous devrez tracer le Kanji correspondant sur le papier quadrillé. Cliquez ensuite sur "Vérifier" pour révéler le tracé parfait en filigrane et évaluer votre mémoire.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="vocab-card" onclick="startCanvasMode('N5')"><span class="vocab-jp">N5</span><span class="vocab-fr">Tracer Débutant</span></div>
          <div class="vocab-card" onclick="startCanvasMode('N4')"><span class="vocab-jp">N4</span><span class="vocab-fr">Tracer Élémentaire</span></div>
          <div class="vocab-card" onclick="startCanvasMode('N3')"><span class="vocab-jp">N3</span><span class="vocab-fr">Tracer Intermédiaire</span></div>
          <div class="vocab-card" onclick="startCanvasMode('N2')"><span class="vocab-jp">N2</span><span class="vocab-fr">Tracer Avancé</span></div>
          <div class="vocab-card" onclick="startCanvasMode('N1')"><span class="vocab-jp">N1</span><span class="vocab-fr">Tracer Expert</span></div>
        </div>
      </div>`;
  }
  else if(id === 'canvas-run') {
    titleHeader.innerText = "ATELIER D'ÉCRITURE...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('exercices')">Retour</button>
      <div class="card" id="canvas-area" style="padding: 40px 20px;"></div>`;
  }
  else if(id === 'examens') {
    titleHeader.innerText = "Simulateurs d'Examens JLPT";
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Évaluez votre niveau en conditions réelles</h3>
        <p>Ces examens blancs génèrent des questions aléatoires basées sur la base de données du niveau choisi. Un chronomètre défile, aucune triche n'est possible. Il faut 60% de bonnes réponses pour obtenir le diplôme !</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr; gap: 15px;">
          <div class="vocab-card" style="padding: 20px; border-color: var(--aka); text-align: left;" onclick="startExam('N5')">
            <span class="vocab-jp" style="font-size: 24px; display:inline-block; width: 60px;">N5</span>
            <span class="vocab-fr" style="display:inline-block;">Test Débutant (20 questions / 15 min)</span>
          </div>
          <div class="vocab-card" style="padding: 20px; border-color: var(--aka); text-align: left;" onclick="startExam('N4')">
            <span class="vocab-jp" style="font-size: 24px; display:inline-block; width: 60px;">N4</span>
            <span class="vocab-fr" style="display:inline-block;">Test Élémentaire (25 questions / 20 min)</span>
          </div>
          <div class="vocab-card" style="padding: 20px; border-color: var(--aka); text-align: left;" onclick="startExam('N3')">
            <span class="vocab-jp" style="font-size: 24px; display:inline-block; width: 60px;">N3</span>
            <span class="vocab-fr" style="display:inline-block;">Test Intermédiaire (30 questions / 25 min)</span>
          </div>
          <div class="vocab-card" style="padding: 20px; border-color: var(--aka); text-align: left;" onclick="startExam('N2')">
            <span class="vocab-jp" style="font-size: 24px; display:inline-block; width: 60px;">N2</span>
            <span class="vocab-fr" style="display:inline-block;">Test Avancé (35 questions / 30 min)</span>
          </div>
          <div class="vocab-card" style="padding: 20px; border-color: var(--aka); text-align: left;" onclick="startExam('N1')">
            <span class="vocab-jp" style="font-size: 24px; display:inline-block; width: 60px;">N1</span>
            <span class="vocab-fr" style="display:inline-block;">Test Expert (40 questions / 40 min)</span>
          </div>
        </div>
      </div>`;
  }
  else if(id === 'exam-run') {
    titleHeader.innerText = "ÉPREUVE EN COURS...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('examens')">Retour</button>
      <div class="card" id="exam-area" style="padding: 40px 20px; background: var(--kinari);"></div>`;
  }
else if(id === 'progression') {
    titleHeader.innerText = "Tableau de Progression & Feuille de Route";
    const acc = userStats.answersTotal > 0 ? Math.round((userStats.answersCorrect / userStats.answersTotal) * 100) : 0;
    
    // Calcul du rang et de l'XP nécessaire pour le rang suivant
    const rankInfo = getSamouraiRank(userStats.xp);
    let nextRankXp = 150;
    let nextRankName = "Bushi 🥋";
    
    if (rankInfo.level === 2) { nextRankXp = 500; nextRankName = "Samouraï d'Élite 🥷"; }
    else if (rankInfo.level === 3) { nextRankXp = 900; nextRankName = "Taishō (Général) ⚔️"; }
    else if (rankInfo.level === 4) { nextRankXp = 1500; nextRankName = "Shogun 🏯"; }
    else if (rankInfo.level === 5) { nextRankXp = userStats.xp; nextRankName = "Maître Absolu ⛩️"; }

    // Calcul du pourcentage de la jauge vers le prochain rang
    const xpPercent = Math.min(100, Math.round((userStats.xp / nextRankXp) * 100));
    
    contentDiv.innerHTML = `
      <div class="card" style="border-left: 5px solid var(--aka);">
        <h3 style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
          <span>Voie du Guerrier : <strong>${rankInfo.title}</strong></span>
          <span style="font-size:14px; background:var(--sakura-pale); color:var(--aka); padding:4px 10px; border-radius:20px;">${userStats.xp} XP</span>
        </h3>
        
        <!-- Jauge d'évolution du titre de Samouraï -->
        <div style="margin: 20px 0 10px;">
          <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:5px;">
            <span>✨ Progression vers le rang de <strong>${nextRankName}</strong></span>
            <strong>${userStats.xp} / ${nextRankXp} XP</strong>
          </div>
          <div style="width:100%; height:12px; background:rgba(0,0,0,0.1); border-radius:6px; overflow:hidden;">
            <div style="width:${xpPercent}%; height:100%; background:linear-gradient(90deg, var(--sakura) 0%, var(--aka) 100%); transition: width 0.5s ease;"></div>
          </div>
        </div>

        <div class="vocab-grid" style="grid-template-columns: repeat(3, 1fr); margin-top:25px;">
          <div class="vocab-card">
            <span class="vocab-jp" style="color: #e8b84b; font-size: 28px;">${userStats.streak}</span>
            <span class="vocab-fr">Jours consécutifs</span>
          </div>
          <div class="vocab-card">
            <span class="vocab-jp" style="color: #1d9e75; font-size: 28px;">${acc}%</span>
            <span class="vocab-fr">Précision Globale</span>
          </div>
          <div class="vocab-card">
            <span class="vocab-jp" style="color: var(--aka); font-size: 28px;">${userStats.wordsMastered}</span>
            <span class="vocab-fr">Cartes maîtrisées</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Chronologie d'Étude Conseillée</h3>
        <p>Suivez cette feuille de route académique. <strong>Ne passez pas à l'étape suivante tant que la précédente n'est pas maîtrisée à 80%.</strong></p>
        <div class="timeline">
          <div class="timeline-step">
            <div class="timeline-badge">1</div>
            <div class="timeline-content">
              <h4>Étape 1 : Les Fondations Absolues (Débutant)</h4>
              <span class="timeline-duration">⏳ Durée : 1 à 2 semaines</span>
              <ul>
                <li><strong>Théorie :</strong> Étudier Cours 1 (Hiragana) et Cours 2 (Katakana).</li>
                <li><strong>Pratique :</strong> Utiliser les <em>Flashcards SRS</em> tous les jours.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge">2</div>
            <div class="timeline-content">
              <h4>Étape 2 : Le Moteur de la Langue (JLPT N5)</h4>
              <span class="timeline-duration">⏳ Durée : 1 à 2 mois</span>
              <ul>
                <li><strong>Théorie :</strong> Assimiler Cours 3 (SOV), Cours 4 (Particules) et Cours 5.</li>
                <li><strong>Pratique :</strong> Alterner <em>Texte à trous</em> et <em>Constructeur SOV</em>. Valider l'Examen Blanc N5.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge">3</div>
            <div class="timeline-content">
              <h4>Étape 3 : L'Élémentaire (JLPT N4)</h4>
              <span class="timeline-duration">⏳ Durée : 2 à 3 mois</span>
              <ul>
                <li><strong>Théorie :</strong> Cours 8 (Potentiel/Volitif), 9 (Conditionnels) et 10 (Donner/Recevoir).</li>
                <li><strong>Pratique :</strong> Mode <em>Saisie Manuelle</em> et <em>Dictée Aveugle N4</em>.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge">4</div>
            <div class="timeline-content">
              <h4>Étape 4 : Le Seuil de Fluidité (JLPT N3)</h4>
              <span class="timeline-duration">⏳ Durée : 3 à 6 mois</span>
              <ul>
                <li><strong>Théorie :</strong> Cours 12 (Passif/Causatif) et 13 (Le Keigo en entreprise).</li>
                <li><strong>Pratique :</strong> <em>Leçon Inversée N3</em> et <em>Jeu des Paires</em> pour le vocabulaire.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge">5</div>
            <div class="timeline-content">
              <h4>Étape 5 : Le Niveau Affaires (JLPT N2)</h4>
              <span class="timeline-duration">⏳ Durée : 6 à 9 mois</span>
              <ul>
                <li><strong>Théorie :</strong> Cours 14 (Kanji N2) et 15 (Grammaire rigide et formelle).</li>
                <li><strong>Pratique :</strong> <em>Flashcards N2</em> quotidiennes et <em>Mode Survie</em> pour les réflexes.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-step">
            <div class="timeline-badge">6</div>
            <div class="timeline-content">
              <h4>Étape 6 : La Maîtrise Littéraire (JLPT N1)</h4>
              <span class="timeline-duration">⏳ Durée : 9 à 12 mois minimum</span>
              <ul>
                <li><strong>Théorie :</strong> Cours 16 (Kanji N1) et 17 (Tournures expertes et archaïques).</li>
                <li><strong>Pratique :</strong> Entraînement complet sur tous les modules en difficulté Maître.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
  }

  else if(id === 'verbs-dict') {
    titleHeader.innerText = "Dictionnaire des Verbes";

    // 🧠 L'algorithme d'analyse grammaticale
    function getVerbGroup(jp, kana) {
      // Liste des exceptions du Groupe 1 qui se terminent par "shimasu" ou "imasu"
      const g1Shimasu = ['話します', '探します', '直します', '出します', '隠します', '崩します', '返します', '貸します', '引っ越します'];
      const g2Imasu = ['見ます', '起きます', '借ります', '降ります', '足ります', '着ます', '居ます', '似ます', '落ちます'];

      if (jp === '来ます') return 'Groupe 3 (Irrégulier)';
      if (g1Shimasu.includes(jp)) return 'Groupe 1 (Godan)';
      if (jp.endsWith('します')) return 'Groupe 3 (Irrégulier)';
      // Si la syllabe avant 'masu' contient le son "e" (ex: tabEmasu, akEmasu)
      if (kana.match(/([えけせてねへめれげぜでべぺ])ます$/)) return 'Groupe 2 (Ichidan)';
      if (g2Imasu.includes(jp)) return 'Groupe 2 (Ichidan)';
      
      return 'Groupe 1 (Godan)'; // Tout le reste est par défaut du Groupe 1
    }

    let dictHtml = `
      <div class="card">
        <h3>La Bibliothèque des Actions</h3>
        <p>Voici l'intégralité des verbes de votre base de données. L'application analyse automatiquement leur forme phonétique pour déterminer leur groupe grammatical. Cliquez sur un verbe pour écouter sa prononciation.</p>
      </div>`;

    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

    levels.forEach(lvl => {
      if(window.DB_VOCAB && window.DB_VOCAB[lvl]) {
        let verbs = [];
        if(window.DB_VOCAB[lvl].verbs_motion) verbs = verbs.concat(window.DB_VOCAB[lvl].verbs_motion);
        if(window.DB_VOCAB[lvl].verbs_action) verbs = verbs.concat(window.DB_VOCAB[lvl].verbs_action);

        if(verbs.length > 0) {
          dictHtml += `<div class="card"><h4 style="color:var(--aka); margin-bottom:10px;">Niveau ${lvl}</h4>`;
          dictHtml += `<table class="course-table" style="width:100%; text-align:left;">
                        <tr><th>Kanji</th><th>Furigana</th><th>Français</th><th>Groupe</th></tr>`;

          // Tri alphabétique par groupe (G1 -> G2 -> G3)
          verbs.sort((a, b) => getVerbGroup(a.jp, a.kana).localeCompare(getVerbGroup(b.jp, b.kana)));

          verbs.forEach(v => {
            const group = getVerbGroup(v.jp, v.kana);
            dictHtml += `
              <tr onclick="speak('${v.jp.replace(/'/g, "\\'")}')" style="cursor:pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(188,0,45,0.05)'" onmouseout="this.style.background=''">
                <td style="font-family:var(--font-jp); font-size:20px; font-weight:bold;">${v.jp}</td>
                <td style="color:#666;">${v.kana}</td>
                <td>${v.fr}</td>
                <td><span style="font-size:12px; background:var(--sakura-pale); color:var(--aka); padding:4px 8px; border-radius:12px; white-space:nowrap; font-weight:bold;">${group}</span></td>
              </tr>`;
          });
          dictHtml += `</table></div>`;
        }
      }
    });

    contentDiv.innerHTML = dictHtml;
  }
  else if(id === 'parametres') {
    titleHeader.innerText = "Paramètres de l'Application";
    const isSamourai = document.body.classList.contains('samourai-mode');
    const isFuriganaHidden = document.body.classList.contains('hide-furigana');
    const currentSpeed = parseFloat(localStorage.getItem('voiceSpeed')) || 1.0;

    contentDiv.innerHTML = `
      <div class="card">
        <h3>Préférences d'affichage</h3>
        <ul style="list-style: none; margin-left: 0;">
          <li style="padding: 15px 0; border-bottom: 1px solid rgba(188,0,45,.1); display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="toggleSamourai()">
            <span><strong>Mode Samouraï (Sombre)</strong><br><span style="font-size: 13px; color: #666;">Protège vos yeux lors des révisions nocturnes.</span></span>
            <span style="color: ${isSamourai ? 'var(--aka)' : '#999'}; font-weight: bold;">[ ${isSamourai ? 'ON' : 'OFF'} ]</span>
          </li>
          <li style="padding: 15px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="toggleFurigana()">
            <span><strong>Masquer les Furiganas</strong><br><span style="font-size: 13px; color: #666;">Désactive la prononciation au-dessus des Kanjis (Lecture experte).</span></span>
            <span style="color: ${isFuriganaHidden ? 'var(--aka)' : '#999'}; font-weight: bold;">[ ${isFuriganaHidden ? 'ON' : 'OFF'} ]</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>Options Audio</h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Ajustez la vitesse de prononciation pour les dictées et le vocabulaire.</p>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button class="quiz-opt-btn ${currentSpeed === 0.7 ? 'correct-ans' : ''}" style="flex:1; font-size:14px;" onclick="setVoiceSpeed(0.7)">Lent</button>
          <button class="quiz-opt-btn ${currentSpeed === 1.0 ? 'correct-ans' : ''}" style="flex:1; font-size:14px;" onclick="setVoiceSpeed(1.0)">Normal</button>
          <button class="quiz-opt-btn ${currentSpeed === 1.3 ? 'correct-ans' : ''}" style="flex:1; font-size:14px;" onclick="setVoiceSpeed(1.3)">Rapide</button>
        </div>
        <button class="btn-primary" style="width:100%; background:var(--sumi);" onclick="speak('日本語の道へようこそ', 'ja-JP')">Tester la voix</button>
      </div>

      <div class="card" style="border-color: #e74c3c;">
        <h3 style="color: #e74c3c;">Zone de Danger</h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Réinitialisez votre XP et votre jauge de jours consécutifs. Utile pour repartir de zéro.</p>
        <button class="btn-primary" style="background: #e74c3c; width: 100%;" onclick="resetProgress()">Effacer ma progression</button>
        <h3 style="margin-top:20px;">Sauvegarde des données</h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Exportez vos XP pour ne pas les perdre, ou importez un fichier de sauvegarde.</p>
        <div style="display:flex; gap:10px;">
          <button class="btn-primary" style="flex:1; background:#1abc9c;" onclick="exportData()">⬇️ Exporter</button>
          <label class="btn-primary" style="flex:1; background:#3498db; text-align:center; cursor:pointer;">
            ⬆️ Importer <input type="file" style="display:none;" onchange="importData(event)" accept=".json">
          </label>
        </div>
      </div>`;
  }
  else if(id === 'reading-menu') {
    titleHeader.innerText = "Bibliothèque : Textes par niveau";
    let listHtml = '';
    if (window.DB_READING) {
      window.DB_READING.forEach(r => {
        listHtml += `<div class="vocab-card" style="text-align:left; padding:20px;" onclick="startReadingMode('${r.id}')">
          <span class="vocab-jp" style="font-size:16px;">${r.lvl}</span>
          <strong style="font-size:20px; display:block; margin-top:5px;">${r.title}</strong>
        </div>`;
      });
    }
    contentDiv.innerHTML = `
      <div class="card">
        <h3>Lecture Intensive</h3>
        <p>Lisez des textes en japonais. Si vous bloquez sur un mot souligné, cliquez dessus pour afficher le dictionnaire instantané.</p>
        <div class="vocab-grid" style="grid-template-columns: 1fr;">${listHtml}</div>
      </div>`;
  }
  else if(id === 'reading-run') {
    titleHeader.innerText = "LECTURE EN COURS...";
    contentDiv.innerHTML = `
      <button class="btn-return" onclick="loadContent('reading-menu')">Retour</button>
      <div class="card" id="reading-area" style="padding: 20px;"></div>`;
  }
}

/* ─── MOTEUR SRS (FLASHCARDS) ─── */
let activeDeck = [];
let currentCard = null;

function startFlashcards(deckType) {
  let sourceData = [];
  
  if(deckType === 'kana') {
    // 👈 On utilise window. pour récupérer les données depuis database.js
    sourceData = [
      ...window.HIRAGANA_BASE, 
      ...window.HIRAGANA_DAKUTEN, 
      ...window.HIRAGANA_YOON,
      ...window.KATAKANA_BASE, 
      ...window.KATAKANA_DAKUTEN, 
      ...window.KATAKANA_YOON
    ].filter(k => !k.e);
  }
  else if(typeof window.DB_KANJI !== 'undefined') {
    if(deckType === 'kanji5') sourceData = window.DB_KANJI.N5;
    else if(deckType === 'kanji4') sourceData = window.DB_KANJI.N4;
    else if(deckType === 'kanji3') sourceData = window.DB_KANJI.N3;
    else if(deckType === 'kanji2') sourceData = window.DB_KANJI.N2;
    else if(deckType === 'kanji1') sourceData = window.DB_KANJI.N1;
  }
  
  activeDeck = sourceData.map(item => ({
    jp: item.j,
    reading: item.on ? `ON: ${item.on}<br>KUN: ${item.kun}` : item.r,
    meaning: item.f || 'Syllabe',
    rep: 0
  }));
  
  for (let i = activeDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [activeDeck[i], activeDeck[j]] = [activeDeck[j], activeDeck[i]];
  }
  loadContent('flashcards-run');
  nextFlashcard();
}

function nextFlashcard() {
  const area = document.getElementById('flashcard-area');
  if(activeDeck.length === 0) {
    area.innerHTML = `
      <div style="text-align:center; padding: 40px;">
        <span style="font-size: 60px;">🎉</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Session Terminée !</h3>
        <p>Excellent travail.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }
  
  currentCard = activeDeck.shift();
  const cardElement = document.getElementById('fc-card-element');
  
  // 1. Désactiver l'animation de rotation
  cardElement.style.transition = 'none';
  
  // 2. Remettre la carte de face immédiatement
  cardElement.classList.remove('is-flipped');
  
  // 3. Forcer le navigateur à appliquer le changement visuel tout de suite (Reflow)
  void cardElement.offsetWidth;
  
  // 4. Réactiver l'animation pour quand l'utilisateur cliquera
  cardElement.style.transition = '';

  // 5. Injecter le nouveau texte
  document.getElementById('fc-front-text').innerText = currentCard.jp;
  document.getElementById('fc-back-jp').innerHTML = currentCard.reading;
  document.getElementById('fc-back-fr').innerText = currentCard.meaning;
  
  document.getElementById('srs-controls').style.display = 'none';
  document.getElementById('flip-hint').style.display = 'block';
}

function flipFlashcard() {
  const card = document.getElementById('fc-card-element');
  if(card.classList.contains('is-flipped')) return;
  card.classList.add('is-flipped');
  document.getElementById('flip-hint').style.display = 'none';
  document.getElementById('srs-controls').style.display = 'flex';
  speak(currentCard.jp);
}

function answerCard(quality) {
  if(quality === 0) {
    currentCard.rep = 0;
    const insertIndex = Math.min(activeDeck.length, 3);
    activeDeck.splice(insertIndex, 0, currentCard);
    updateStat(false); 
  } 
  else if(quality === 1) {
    currentCard.rep++;
    activeDeck.push(currentCard);
    updateStat(true, false); 
  }
  else {
    currentCard.rep++;
    updateStat(true, true); 
  }
  nextFlashcard();
}

/* ─── MOTEUR QUIZ (TEXTE À TROUS) BILINGUE & PROCÉDURAL ─── */
let activeQuiz = [];
let currentQuizIndex = 0;

function generateProceduralQuiz(level, count = 10) {
  if(!window.DB_VOCAB) return [];
  const vocab = window.DB_VOCAB[level];
  if (!vocab || !vocab.subjects) return [];
  
  let generated = [];
  const allParticles = ["は", "が", "を", "に", "で", "へ", "と", "も"];
  
  for(let i = 0; i < count; i++) {
    let s = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
    let p = vocab.places[Math.floor(Math.random() * vocab.places.length)];
    let v = vocab.verbs_motion[Math.floor(Math.random() * vocab.verbs_motion.length)];
    let hideTopic = Math.random() > 0.5;
    let sentence, answer, expl;
    
    if(hideTopic) {
      sentence = `<ruby>${s.jp}<rt>${s.kana}</rt></ruby> ___ <ruby>${p.jp}<rt>${p.kana}</rt></ruby>に<ruby>${v.jp}<rt>${v.kana}</rt></ruby>。`;
      answer = "は";
      expl = "La particule『は』(wa) marque le thème principal de la phrase.";
    } else {
      sentence = `<ruby>${s.jp}<rt>${s.kana}</rt></ruby>は<ruby>${p.jp}<rt>${p.kana}</rt></ruby> ___ <ruby>${v.jp}<rt>${v.kana}</rt></ruby>。`;
      answer = "に";
      expl = "La particule『に』(ni) indique la destination d'un déplacement.";
    }
    
    let opts = [answer];
    while(opts.length < 4) {
      let randP = allParticles[Math.floor(Math.random() * allParticles.length)];
      if(!opts.includes(randP)) opts.push(randP);
    }
    opts.sort(() => Math.random() - 0.5);
    
    generated.push({
      lvl: level, q: sentence, ans: answer, 
      opts: opts, fr: `${s.fr} ${v.fr} ${p.fr}.`, expl: expl
    });
  }
  return generated;
}

function startQuiz(level) {
  // 👈 On connecte le jeu à la nouvelle base de données DB_GRAMMAR !
  const grammarData = (window.DB_GRAMMAR || []).filter(q => q.lvl === level);
  
  // On garde le générateur procédural pour avoir des dizaines de questions infinies sur les particules
  const proceduralData = generateProceduralQuiz(level, 10); 
  
  // On mélange la vraie grammaire (DB_GRAMMAR) avec les phrases générées aléatoirement
  activeQuiz = [...grammarData, ...proceduralData].sort(() => Math.random() - 0.5);
  
  if(activeQuiz.length === 0) { 
    alert("Données non disponibles pour ce niveau !"); 
    return; 
  }
  currentQuizIndex = 0;
  loadContent('fillblank-run');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if(currentQuizIndex >= activeQuiz.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 40px;">
        <span style="font-size: 60px;">🏆</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Entraînement Terminé !</h3>
        <p>Vos réflexes sur les particules sont excellents.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour</button>
      </div>`;
    return;
  }
  const q = activeQuiz[currentQuizIndex];
  const displaySentence = q.q.replace("___", `<span class="quiz-blank" id="quiz-blank-spot">?</span>`);
  let optionsHtml = '';
  q.opts.forEach(opt => {
    optionsHtml += `<button class="quiz-opt-btn" onclick="checkQuizAnswer('${opt}', this)">${opt}</button>`;
  });
  document.getElementById('quiz-area').innerHTML = `
    <div class="quiz-sentence">${displaySentence}</div>
    <div class="quiz-translation">"${q.fr}"</div>
    <div class="quiz-options" id="quiz-options-container">${optionsHtml}</div>
    <div id="quiz-feedback" class="quiz-feedback"></div>
    <button class="btn-primary quiz-next-btn" id="quiz-next-btn" onclick="nextQuizQuestion()">Question Suivante ➔</button>`;
}

function checkQuizAnswer(selected, btnElement) {
  const q = activeQuiz[currentQuizIndex];
  const correct = q.ans;
  const explanation = q.expl;
  const allBtns = document.getElementById('quiz-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(btn => btn.disabled = true);
  const feedbackDiv = document.getElementById('quiz-feedback');
  const blankSpot = document.getElementById('quiz-blank-spot');
  
  if(selected === correct) {
    btnElement.classList.add('correct-ans');
    blankSpot.innerText = correct;
    blankSpot.style.color = '#1abc9c';
    blankSpot.style.borderColor = '#1abc9c';
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Bonne réponse !</strong><br>${explanation}`;
    updateStat(true); 
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(btn => { if(btn.innerText === correct) btn.classList.add('correct-ans'); });
    blankSpot.innerText = correct;
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Erreur. La bonne réponse était 「${correct}」.</strong><br>${explanation}`;
    updateStat(false); 
  }
  document.getElementById('quiz-next-btn').style.display = 'block';
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

/* ─── MOTEUR CONSTRUCTEUR SOV (PROCÉDURAL) ─── */
let activeSovQuiz = [];
let currentSovIndex = 0;
let bankWords = [];
let placedWords = [];
let sovCorrectAnswers = 0;
let sovTotalAnswers = 0;

// ─── CONJUGAISONS DE VERBES ─── 
const verbConjugations = {
  'ます': { form: 'masu', meaning: 'Forme polie présent', tense: 'present' },
  'ました': { form: 'mashita', meaning: 'Forme polie passé', tense: 'past' },
  'ません': { form: 'masen', meaning: 'Forme polie négatif', tense: 'present' },
  'ませんでした': { form: 'masen deshita', meaning: 'Forme polie négatif passé', tense: 'past' },
  'ている': { form: 'te iru', meaning: 'Action en cours', tense: 'present' },
  'ていた': { form: 'te ita', meaning: 'Action passée en cours', tense: 'past' }
};

function generateProceduralSOV(level, count = 5) {
  if(!window.DB_VOCAB) return [];
  const vocab = window.DB_VOCAB[level];
  if (!vocab || !vocab.subjects || vocab.subjects.length === 0) return [];
  
  let generated = [];
  for(let i = 0; i < count; i++) {
    let s = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
    let p1 = vocab.places ? vocab.places[Math.floor(Math.random() * vocab.places.length)] : null;
    let vm = vocab.verbs_motion ? vocab.verbs_motion[Math.floor(Math.random() * vocab.verbs_motion.length)] : null;
    let obj = vocab.objects ? vocab.objects[Math.floor(Math.random() * vocab.objects.length)] : null;
    let va = vocab.verbs_action ? vocab.verbs_action[Math.floor(Math.random() * vocab.verbs_action.length)] : null;
    let adj = vocab.adjectives ? vocab.adjectives[Math.floor(Math.random() * vocab.adjectives.length)] : null;
    
    let patterns = [];

    // ─── PATTERN 1 : Déplacement simple (Je vais à Tokyo) ─── 
    if (p1 && vm) {
      patterns.push({
        jpOrder: [s.jp, "は", p1.jp, "に", vm.jp + "ます"],
        fr: s.fr + " va à " + p1.fr + ".",
        explanation: "Sujet (は) + Destination (に) + Verbe de mouvement (ます)"
      });
    }

    // ─── PATTERN 2 : Déplacement avec origine (Je viens de Tokyo) ─── 
    if (p1 && vm) {
      patterns.push({
        jpOrder: [s.jp, "は", p1.jp, "から", vm.jp + "ました"],
        fr: s.fr + " venait de " + p1.fr + ".",
        explanation: "Sujet (は) + Origine (から) + Verbe de mouvement (ました - passé)"
      });
    }

    // ─── PATTERN 3 : Action avec objet direct (Je mange une pomme) ─── 
    if (obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", obj.jp, "を", va.jp + "ます"],
        fr: s.fr + " mange " + obj.fr + ".",
        explanation: "Sujet (は) + Objet direct (を) + Verbe d'action (ます)"
      });
    }

    // ─── PATTERN 4 : Action avec objet au passé (J'ai mangé une pomme) ─── 
    if (obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", obj.jp, "を", va.jp + "ました"],
        fr: s.fr + " a mangé " + obj.fr + ".",
        explanation: "Sujet (は) + Objet direct (を) + Verbe d'action (ました - passé)"
      });
    }

    // ─── PATTERN 5 : Action avec objet négatif (Je ne mange pas de pomme) ─── 
    if (obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", obj.jp, "を", va.jp + "ません"],
        fr: s.fr + " ne mange pas " + obj.fr + ".",
        explanation: "Sujet (は) + Objet direct (を) + Verbe d'action (ません - négatif)"
      });
    }

    // ─── PATTERN 6 : Action complexe (Je lis un livre à l'école) ─── 
    if (p1 && obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", p1.jp, "で", obj.jp, "を", va.jp + "ます"],
        fr: s.fr + " lit " + obj.fr + " à " + p1.fr + ".",
        explanation: "Sujet (は) + Lieu d'action (で) + Objet direct (を) + Verbe (ます)"
      });
    }

    // ─── PATTERN 7 : Action complexe au passé ─── 
    if (p1 && obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", p1.jp, "で", obj.jp, "を", va.jp + "ました"],
        fr: s.fr + " a lu " + obj.fr + " à " + p1.fr + ".",
        explanation: "Sujet (は) + Lieu d'action (で) + Objet direct (を) + Verbe (ました - passé)"
      });
    }

    // ─── PATTERN 8 : Avec adjectif descriptif (C'est un beau livre) ─── 
    if (obj && adj) {
      patterns.push({
        jpOrder: [obj.jp, "は", adj.jp, "です"],
        fr: obj.fr + " est " + adj.fr + ".",
        explanation: "Sujet (は) + Adjectif + です (copule)"
      });
    }

    // ─── PATTERN 9 : Avec adjectif au passé (C'était beau) ─── 
    if (obj && adj) {
      patterns.push({
        jpOrder: [obj.jp, "は", adj.jp, "でした"],
        fr: obj.fr + " était " + adj.fr + ".",
        explanation: "Sujet (は) + Adjectif + でした (copule passée)"
      });
    }

    // ─── PATTERN 10 : Avec deux objets (Je donne un livre à mon ami) ─── 
    if (obj && s) {
      let recipient = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
      if (recipient && recipient.jp !== s.jp) {
        patterns.push({
          jpOrder: [s.jp, "は", recipient.jp, "に", obj.jp, "を", "あげます"],
          fr: s.fr + " donne " + obj.fr + " à " + recipient.fr + ".",
          explanation: "Sujet (は) + Destinataire (に) + Objet direct (を) + Verbe (あげます)"
        });
      }
    }

    // ─── PATTERN 11 : Action en cours (Je suis en train de manger) ─── 
    if (obj && va) {
      patterns.push({
        jpOrder: [s.jp, "は", obj.jp, "を", va.jp + "ています"],
        fr: s.fr + " est en train de manger " + obj.fr + ".",
        explanation: "Sujet (は) + Objet direct (を) + Verbe (ている - action en cours)"
      });
    }

    // ─── PATTERN 12 : Avec particule も (aussi) ─── 
    if (obj && va && s) {
      let other = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
      if (other && other.jp !== s.jp) {
        patterns.push({
          jpOrder: [s.jp, "も", obj.jp, "を", va.jp + "ます"],
          fr: s.fr + " aussi mange " + obj.fr + ".",
          explanation: "Sujet (も - aussi) + Objet direct (を) + Verbe (ます)"
        });
      }
    }

    // ─── PATTERN 13 : Avec particule が (sujet nouveau) ─── 
    if (obj && va) {
      patterns.push({
        jpOrder: [obj.jp, "が", s.jp, "を", va.jp + "ます"],
        fr: obj.fr + " que " + s.fr + " mange.",
        explanation: "Objet (が - sujet nouveau) + Sujet (を) + Verbe (ます)"
      });
    }

    // ─── PATTERN 14 : Avec particule と (avec) ─── 
    if (p1 && vm && s) {
      let companion = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
      if (companion && companion.jp !== s.jp) {
        patterns.push({
          jpOrder: [s.jp, "は", companion.jp, "と", p1.jp, "に", vm.jp + "ます"],
          fr: s.fr + " va à " + p1.fr + " avec " + companion.fr + ".",
          explanation: "Sujet (は) + Compagnon (と - avec) + Destination (に) + Verbe (ます)"
        });
      }
    }

    // ─── PATTERN 15 : Avec particule から/まで (de...à) ─── 
    if (p1 && vm) {
      let p2 = vocab.places ? vocab.places[Math.floor(Math.random() * vocab.places.length)] : null;
      if (p2 && p2.jp !== p1.jp) {
        patterns.push({
          jpOrder: [s.jp, "は", p1.jp, "から", p2.jp, "まで", vm.jp + "ます"],
          fr: s.fr + " va de " + p1.fr + " à " + p2.fr + ".",
          explanation: "Sujet (は) + Origine (から) + Destination (まで) + Verbe (ます)"
        });
      }
    }

    // Sélection aléatoire d'un pattern valide
    let validPatterns = patterns.filter(p => p.jpOrder && p.jpOrder.length > 0);
    if (validPatterns.length > 0) {
      let chosenPattern = validPatterns[Math.floor(Math.random() * validPatterns.length)];
      generated.push({ 
        lvl: level, 
        fr: chosenPattern.fr, 
        order: chosenPattern.jpOrder,
        explanation: chosenPattern.explanation
      });
    }
  }
  return generated;
}

function startSov(level) {
  activeSovQuiz = generateProceduralSOV(level, 5);
  if (activeSovQuiz.length === 0) {
    alert("Base de données indisponible !");
    return;
  }
  currentSovIndex = 0;
  sovCorrectAnswers = 0;
  sovTotalAnswers = 0;
  loadContent('sov-run');
  renderSovQuestion();
}

function renderSovQuestion() {
  if (currentSovIndex >= activeSovQuiz.length) {
    const percentage = Math.round((sovCorrectAnswers / sovTotalAnswers) * 100);
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 40px;">
        <span style="font-size: 60px;">🏯</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Entraînement SOV Terminé !</h3>
        <p style="font-size: 18px; margin: 15px 0;"><strong>${sovCorrectAnswers}/${sovTotalAnswers}</strong> réponses correctes</p>
        <div style="background: var(--sakura-pale); padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 0; font-size: 16px;">Réussite : <strong style="color: var(--aka); font-size: 20px;">${percentage}%</strong></p>
        </div>
        <p style="color: #666; margin-top: 15px;">Vos réflexes de construction de phrases s'améliorent ! Continuez vos entraînements.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }
  
  const q = activeSovQuiz[currentSovIndex];
  placedWords = [];
  bankWords = [...q.order].map((word, idx) => ({ id: idx, text: word }));
  bankWords.sort(() => Math.random() - 0.5);
  updateSovUI();
}

function updateSovUI() {
  const q = activeSovQuiz[currentSovIndex];
  
  const v = window.DB_VOCAB[q.lvl];
  const allVocab = [
    ...(v.subjects || []), ...(v.places || []), ...(v.verbs_motion || []),
    ...(v.objects || []), ...(v.verbs_action || []), ...(v.adjectives || [])
  ];
  
  let sentenceHtml = placedWords.length === 0 ? `<div class="sov-placeholder">Tapez sur les mots pour construire la phrase...</div>` : '';
  placedWords.forEach((wordObj, i) => {
    const original = allVocab.find(x => x.jp === wordObj.text);
    const wordDisplay = original ? `<ruby>${wordObj.text}<rt>${original.kana}</rt></ruby>` : wordObj.text;
    sentenceHtml += `<div class="sov-word" onclick="moveWordToBank(${i})">${wordDisplay}</div>`;
  });

  let bankHtml = '';
  bankWords.forEach((wordObj, i) => {
    const original = allVocab.find(x => x.jp === wordObj.text);
    const wordDisplay = original ? `<ruby>${wordObj.text}<rt>${original.kana}</rt></ruby>` : wordObj.text;
    bankHtml += `<div class="sov-word" onclick="moveWordToSentence(${i})">${wordDisplay}</div>`;
  });

  const progressText = `Question ${currentSovIndex + 1}/${activeSovQuiz.length}`;
  
  document.getElementById('sov-area').innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div class="sov-header">Traduisez : "${q.fr}"</div>
      <div style="font-size: 12px; color: #999;">${progressText}</div>
    </div>
    <div class="sov-sentence-area" id="sov-sentence">${sentenceHtml}</div>
    <div class="sov-bank-area" id="sov-bank">${bankHtml}</div>
    <div id="quiz-feedback" class="quiz-feedback"></div>
    <div style="background: var(--sakura-pale); padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 13px; color: #555;">
      <strong>💡 Rappel :</strong> ${q.explanation}
    </div>
    <div class="sov-controls">
      <button class="btn-primary" id="sov-check-btn" onclick="checkSovAnswer()" ${placedWords.length === 0 ? 'disabled style="opacity:0.5"' : ''}>Vérifier</button>
      <button class="btn-primary" id="sov-next-btn" onclick="nextSovQuestion()" style="display:none; background:var(--sumi);">Continuer ➔</button>
    </div>
  `;
}

function moveWordToSentence(bankIndex) {
  const word = bankWords.splice(bankIndex, 1)[0];
  placedWords.push(word);
  speak(word.text);
  updateSovUI();
}

function moveWordToBank(sentenceIndex) {
  const word = placedWords.splice(sentenceIndex, 1)[0];
  bankWords.push(word);
  updateSovUI();
}

function checkSovAnswer() {
  const q = activeSovQuiz[currentSovIndex];
  const userOrder = placedWords.map(w => w.text).join("");
  const correctOrder = q.order.join("");
  const feedbackDiv = document.getElementById('quiz-feedback');
  document.getElementById('sov-check-btn').style.display = 'none';
  document.getElementById('sov-next-btn').style.display = 'block';
  document.querySelectorAll('.sov-word').forEach(w => w.onclick = null);

  sovTotalAnswers++;

  if (userOrder === correctOrder) {
    sovCorrectAnswers++;
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `
      <strong>✅ Parfait !</strong><br>
      <span style="font-size: 13px; margin-top: 8px; display: block;">
        La structure SOV est correcte : <strong>${q.order.join(" ")}</strong><br>
        <em>${q.explanation}</em>
      </span>
    `;
    updateStat(true); 
  } else {
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `
      <strong>❌ Incorrect.</strong><br>
      <span style="font-size: 13px; margin-top: 8px; display: block;">
        L'ordre correct était : <strong>${q.order.join(" ")}</strong><br>
        <em>${q.explanation}</em>
      </span>
    `;
    updateStat(false); 
  }
}

function nextSovQuestion() {
  currentSovIndex++;
  renderSovQuestion();
}

/* ─── MOTEUR DICTÉE AVEUGLE BILINGUE ─── */
let activeDict = [];
let currentDictIndex = 0;

function generateProceduralDictation(level, count = 10) {
  if(!window.DB_VOCAB) return [];
  const vocab = window.DB_VOCAB[level];
  if (!vocab || !vocab.subjects || vocab.subjects.length === 0) return [];
  
  let generated = [];
  for(let i = 0; i < count; i++) {
     let s = vocab.subjects[Math.floor(Math.random() * vocab.subjects.length)];
     let p = vocab.places[Math.floor(Math.random() * vocab.places.length)];
     let v = vocab.verbs_motion[Math.floor(Math.random() * vocab.verbs_motion.length)];
     
     let pattern = Math.floor(Math.random() * 2);
     let jp, fr;

     if (pattern === 0) {
       jp = `${s.jp}は${p.jp}に${v.jp}`;
       fr = `[${s.fr}] ${v.fr} [${p.fr}]`;
     } else {
       jp = `${s.jp}は${p.jp}から${v.jp}`;
       fr = `[${s.fr}] ${v.fr} depuis [${p.fr}]`;
     }
     
     let wrongS = vocab.subjects.find(x => x.jp !== s.jp) || vocab.subjects[0];
     let wrongP = vocab.places.find(x => x.jp !== p.jp) || vocab.places[0];
     let wrongV = vocab.verbs_motion.find(x => x.jp !== v.jp) || vocab.verbs_motion[0];
     
     generated.push({ 
       jp: jp, fr: fr, 
       wrong_jp: [`${wrongS.jp}は${p.jp}に${v.jp}`, `${s.jp}は${wrongP.jp}から${v.jp}`, `${s.jp}は${wrongV.jp}`], 
       wrong_fr: [`[${wrongS.fr}] ${v.fr} [${p.fr}]`, `[${s.fr}] ${v.fr} [${wrongP.fr}]`, `[${s.fr}] ${wrongV.fr} [${p.fr}]`] 
     });
  }
  return generated;
}

function startDictation(level) {
  // Sécurité : lit window.DB_DICTATION s'il existe, sinon prend un tableau vide
  const fixedData = (window.DB_DICTATION && window.DB_DICTATION[level]) ? window.DB_DICTATION[level] : [];
  const proceduralData = generateProceduralDictation(level, 10);
  
  activeDict = [...fixedData, ...proceduralData].sort(() => Math.random() - 0.5);
  
  if(activeDict.length === 0) { 
    alert("Données non disponibles pour ce niveau !"); 
    return; 
  }
  currentDictIndex = 0;
  loadContent('dictation-run');
  renderDictation();
}

function renderDictation() {
  if(currentDictIndex >= activeDict.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 40px;">
        <span style="font-size: 60px;">🎧</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Dictée Terminée !</h3>
        <p>Excellent travail d'écoute !</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour</button>
      </div>`;
    return;
  }
  const q = activeDict[currentDictIndex];
  const isReverse = Math.random() > 0.5;
  const audioText = isReverse ? q.fr : q.jp;
  const audioLang = isReverse ? 'fr-FR' : 'ja-JP';
  const correctText = isReverse ? q.jp : q.fr;
  const wrongAnswers = isReverse ? q.wrong_jp : q.wrong_fr;
  
  let options = [correctText, ...wrongAnswers].sort(() => Math.random() - 0.5);
  let optionsHtml = '';
  options.forEach(opt => {
    const safeOpt = opt.replace(/'/g, "\\'");
    const safeCorrect = correctText.replace(/'/g, "\\'");
    const safeAudioText = audioText.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" onclick="checkDictAnswer('${safeOpt}', this, '${safeCorrect}', '${safeAudioText}')">${opt}</button>`;
  });

  const subtitle = isReverse ? 'Français ➔ Japonais' : 'Japonais ➔ Français';
  document.getElementById('dict-area').innerHTML = `
    <div class="dict-audio-box" onclick="speak('${audioText.replace(/'/g, "\\'")}', '${audioLang}')"><span class="dict-icon">🔊</span></div>
    <div class="dict-hint">Écoutez la phrase et choisissez la bonne traduction.<br><strong>(${subtitle})</strong></div>
    <div id="dict-reveal" class="dict-jp-reveal"></div>
    <div class="quiz-options" id="dict-options-container">${optionsHtml}</div>
    <button class="btn-primary quiz-next-btn" id="dict-next-btn" onclick="nextDictQuestion()">Continuer ➔</button>`;
  
  setTimeout(() => speak(audioText, audioLang), 500);
}

function checkDictAnswer(selected, btnElement, correct, audioText) {
  const allBtns = document.getElementById('dict-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(btn => btn.disabled = true);
  const revealDiv = document.getElementById('dict-reveal');
  revealDiv.innerText = audioText;
  revealDiv.style.display = 'block';

  if(selected === correct) {
    btnElement.classList.add('correct-ans');
    updateStat(true); 
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(btn => { if(btn.innerText === correct) btn.classList.add('correct-ans'); });
    updateStat(false);
  }
  document.getElementById('dict-next-btn').style.display = 'block';
}

function nextDictQuestion() {
  currentDictIndex++;
  renderDictation();
}
  
/* ─── MOTEUR DE JEU : MODE SURVIE (CHRONO-CHALLENGE) ─── */
let survivalTimer = null;
let survivalTimeLeft = 60;
let survivalScore = 0;
let survivalCurrentQ = null;
let survivalLevel = 'N5';

function startSurvivalMode(level) {
  survivalLevel = level;
  survivalScore = 0;
  survivalTimeLeft = 60;
  
  loadContent('survival-run');
  nextSurvivalQuestion();

  // Lancement du compte à rebours
  clearInterval(survivalTimer);
  survivalTimer = setInterval(() => {
    survivalTimeLeft--;
    
    const clockEl = document.getElementById('survival-clock');
    if (clockEl) {
      clockEl.innerText = `⏱️ ${survivalTimeLeft}s`;
      if (survivalTimeLeft <= 10) {
        clockEl.style.background = '#fdedec';
        clockEl.style.color = '#e74c3c';
      } else {
        clockEl.style.background = 'var(--aka-pale)';
        clockEl.style.color = 'var(--aka)';
      }
    }

    if (survivalTimeLeft <= 0) {
      endSurvivalGame();
    }
  }, 1000);
}

function nextSurvivalQuestion() {
  if (!window.DB_KANJI || !window.DB_VOCAB) return;

  // On pioche aléatoirement soit un Kanji (50% de chance) soit un mot de vocabulaire (50% de chance)
  const isKanji = Math.random() > 0.5;
  let questionText = "";
  let correctAnswer = "";
  let options = [];

  if (isKanji && DB_KANJI[survivalLevel]) {
    const pool = DB_KANJI[survivalLevel];
    const item = pool[Math.floor(Math.random() * pool.length)];
    questionText = `Que signifie le kanji 「 ${item.j} 」 ?`;
    correctAnswer = item.f;
    options = [item.f, "Un concept erroné", "Une mauvaise action", "Un faux sens"];
  } else if (DB_VOCAB[survivalLevel]) {
    const vocab = DB_VOCAB[survivalLevel];
    const pool = [...vocab.subjects, ...vocab.places];
    const item = pool[Math.floor(Math.random() * pool.length)];
    questionText = `Quelle est la traduction de 「 <ruby>${item.jp}<rt>${item.kana}</rt></ruby> 」 ?`;
    correctAnswer = item.fr;
    options = [item.fr, "Médecin de garde", "Gare centrale", "Rizière verte", "Professeur principal"];
  }

  // Nettoyage des options génériques pour éviter les doublons avec la bonne réponse
  options = [...new Set(options)].slice(0, 4);
  if (!options.includes(correctAnswer)) options[3] = correctAnswer;
  
  // Mélange des boutons
  options.sort(() => Math.random() - 0.5);

  survivalCurrentQ = { q: questionText, ans: correctAnswer };

  const area = document.getElementById('survival-area');
  if (!area) return;

  let optionsHtml = "";
  options.forEach(opt => {
    const safeOpt = opt.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" style="width:100%; margin-bottom:10px; font-size:18px;" onclick="submitSurvivalAnswer('${safeOpt}', this)">${opt}</button>`;
  });

  area.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid rgba(0,0,0,0.05); padding-bottom:10px; margin-bottom:20px;">
      <span style="font-weight:bold; color:var(--aka); font-size:18px;">🔥 Série : ${survivalScore}</span>
      <span id="survival-clock" style="font-weight:bold; background:var(--aka-pale); color:var(--aka); padding:6px 16px; border-radius:20px; font-size:18px;">⏱️ 60s</span>
    </div>
    <div style="font-size:24px; text-align:center; margin-bottom:25px; line-height:1.6; font-family:var(--font-jp);">${questionText}</div>
    <div id="survival-options-container" style="max-width:500px; margin:0 auto;">${optionsHtml}</div>
  `;
}

function submitSurvivalAnswer(selected, btnElement) {
  if (selected === survivalCurrentQ.ans) {
    survivalScore++;
    survivalTimeLeft += 3; // +3 secondes !
    btnElement.style.background = "#e8f8f5";
    btnElement.style.borderColor = "#1abc9c";
    btnElement.style.color = "#16a085";
    updateStat(true, false, survivalLevel);
    setTimeout(nextSurvivalQuestion, 150);
  } else {
    survivalTimeLeft -= 5; // -5 secondes !
    btnElement.style.background = "#fdedec";
    btnElement.style.borderColor = "#e74c3c";
    btnElement.style.color = "#c0392b";
    updateStat(false, false, survivalLevel);
    
    // Feedback flash visuel sur le chrono
    const clockEl = document.getElementById('survival-clock');
    if (clockEl) {
      clockEl.style.background = '#e74c3c';
      clockEl.style.color = '#fff';
    }
    setTimeout(nextSurvivalQuestion, 200);
  }
}

function endSurvivalGame() {
  clearInterval(survivalTimer);
  
  // Calcul des bonus d'XP basés sur la performance de la série
  const bonusXp = survivalScore * 5;
  userStats.xp += bonusXp;
  saveStats();

  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
      <span style="font-size: 70px;">💀</span>
      <h2 style="color: var(--aka); margin: 20px 0;">Temps Écoulé !</h2>
      <div style="font-size:22px; margin-bottom:10px; color:var(--sumi);">Vous avez survécu à une série de :</div>
      <div style="font-size:54px; font-weight:900; color:var(--sumi); margin-bottom:10px;">${survivalScore} <span style="font-size:24px; color:#777;">réponses</span></div>
      <div style="font-size:18px; font-weight:bold; color:#1abc9c; margin-bottom:30px;">🎁 Gain Bonus : +${bonusXp} XP de combat !</div>
      <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
    </div>
  `;
}
  
/* ─── MOTEUR DE JEU : LE JEU DES PAIRES (MATCH-UP) ─── */
let matchupSelectedCard = null;
let matchupPairsCount = 0;
let matchupLevel = 'N5';

function startMatchupMode(level) {
  matchupLevel = level;
  matchupSelectedCard = null;
  
  if (!window.DB_KANJI || !window.DB_KANJI[level]) {
    alert("Données non disponibles pour ce niveau !");
    return;
  }

  // On pioche 4 Kanjis uniques au hasard pour faire 8 cartes au total (4 paires)
  let pool = [...window.DB_KANJI[level]].sort(() => Math.random() - 0.5).slice(0, 4);
  matchupPairsCount = pool.length;

  let cards = [];
  pool.forEach(item => {
    // Carte Kanji
    cards.push({ id: `jp-${item.j}`, type: 'jp', value: item.j, matchId: item.f });
    // Carte Français
    cards.push({ id: `fr-${item.j}`, type: 'fr', value: item.f, matchId: item.j });
  });

  // Mélange complet de la grille
  cards.sort(() => Math.random() - 0.5);

  loadContent('matchup-run');
  
  const gridEl = document.getElementById('matchup-grid');
  if (!gridEl) return;

  let gridHtml = "";
  cards.forEach(card => {
    gridHtml += `
      <div class="kana-cell" id="${card.id}" style="padding: 20px 10px; min-height: 80px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; user-select: none;" onclick="selectMatchupCard('${card.id}', '${card.type}', '${card.value}', '${card.matchId}')">
        <span style="${card.type === 'jp' ? "font-family: var(--font-jp); font-size: 26px;" : "font-size: 13px; color: var(--aka);"}" id="text-${card.id}">${card.value}</span>
      </div>`;
  });
  gridEl.innerHTML = gridHtml;
}

function selectMatchupCard(id, type, value, matchId) {
  const cardEl = document.getElementById(id);
  if (!cardEl || cardEl.style.visibility === 'hidden' || cardEl.classList.contains('correct-ans')) return;

  // Si on clique sur la carte déjà sélectionnée, on désélectionne
  if (matchupSelectedCard && matchupSelectedCard.id === id) {
    cardEl.style.background = "";
    cardEl.style.borderColor = "";
    matchupSelectedCard = null;
    return;
  }

  // Allumage visuel de la carte cliquée
  cardEl.style.background = "var(--sakura-pale)";
  cardEl.style.borderColor = "var(--aka)";

  // Si c'est la première carte cliquée de la paire
  if (!matchupSelectedCard) {
    matchupSelectedCard = { id, type, value, matchId };
    return;
  }

  // Si c'est la deuxième carte cliquée, on vérifie si ça matche
  // On s'assure qu'on ne clique pas sur le même type (ex: deux Kanjis d'affilée)
  if (matchupSelectedCard.type !== type && matchupSelectedCard.matchId === value) {
    // C'EST UN MATCH !
    const firstCardEl = document.getElementById(matchupSelectedCard.id);
    
    // Animation de validation verte
    cardEl.style.background = "#e8f8f5"; cardEl.style.borderColor = "#1abc9c";
    firstCardEl.style.background = "#e8f8f5"; firstCardEl.style.borderColor = "#1abc9c";
    
    matchupPairsCount--;
    matchupSelectedCard = null;
    updateStat(true, false, matchupLevel);

    // On fait disparaître les paires en douceur
    setTimeout(() => {
      cardEl.style.visibility = "hidden";
      firstCardEl.style.visibility = "hidden";
      
      // Si plus de cartes à l'écran, victoire !
      if (matchupPairsCount === 0) {
        endMatchupGame();
      }
    }, 400);

  } else {
    // ERREUR ! Pas de correspondance
    const firstCardEl = document.getElementById(matchupSelectedCard.id);
    cardEl.style.background = "#fdedec"; cardEl.style.borderColor = "#e74c3c";
    firstCardEl.style.background = "#fdedec"; firstCardEl.style.borderColor = "#e74c3c";

    updateStat(false, false, matchupLevel);
    matchupSelectedCard = null;

    // Réinitialisation visuelle après un court flash rouge
    setTimeout(() => {
      cardEl.style.background = ""; cardEl.style.borderColor = "";
      firstCardEl.style.background = ""; firstCardEl.style.borderColor = "";
    }, 400);
  }
}

function endMatchupGame() {
  userStats.xp += 30; // +30 XP fixés pour avoir vidé la grille
  saveStats();

  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
      <span style="font-size: 70px;">🧩</span>
      <h2 style="color: #1abc9c; margin: 20px 0;">Grille Nettoyée !</h2>
      <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Félicitations, toutes les associations de Kanjis sont correctes.</p>
      <div style="font-size:18px; font-weight:bold; color:#1abc9c; margin-bottom:30px;">🎁 Gain Récompense : +30 XP d'association !</div>
      <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
    </div>
  `;
}
  
/* ─── MOTEUR DE JEU : CLAVIER HIRAGANA (SAISIE MANUELLE) ─── */
let kbQuestions = [];
let kbCurrentIndex = 0;
let kbUserInput = "";

function startKeyboardMode(level) {
  // On mixe la Grammaire Experte (DB_GRAMMAR) avec les Particules de base (Générateur Procédural)
  const grammarData = (window.DB_GRAMMAR || []).filter(q => q.lvl === level);
  const proceduralData = generateProceduralQuiz(level, 5); 
  
  // On mélange le tout et on garde 5 questions pour la session
  kbQuestions = [...grammarData, ...proceduralData].sort(() => Math.random() - 0.5).slice(0, 5);
  
  if(kbQuestions.length === 0) { alert("Données non disponibles !"); return; }
  kbCurrentIndex = 0;
  loadContent('keyboard-run');
  renderKeyboardQuestion();
}

function renderKeyboardQuestion() {
  if(kbCurrentIndex >= kbQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 40px; background: var(--sakura-pale);">
        <span style="font-size: 60px;">✍️</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Saisie Terminée !</h3>
        <p>Vous ne pouvez plus tricher par élimination, bravo !</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour</button>
      </div>`;
    return;
  }
  kbUserInput = "";
  updateKeyboardUI();
}

function updateKeyboardUI() {
  const q = kbQuestions[kbCurrentIndex];
  // On remplace le trou par ce que l'utilisateur tape en direct
  const displaySentence = q.q.replace("___", `<span class="quiz-blank" style="color:var(--aka); border-bottom:3px solid var(--aka); min-width:50px; display:inline-block; text-align:center;">${kbUserInput}</span>`);
  
  // 👈 NOUVEAU : Le clavier s'adapte magiquement à la réponse attendue !
  let uniqueAnsChars = Array.from(new Set(q.ans)); // Toutes les lettres uniques de la réponse
  let keys = [...uniqueAnsChars];
  
  // On ajoute 6 touches "pièges" aléatoires pour corser le jeu
  const distractors = ["は", "が", "を", "に", "で", "て", "た", "な", "ば", "と", "も", "し", "る", "れ", "ん", "い", "う", "え", "お", "き", "く"];
  while(keys.length < uniqueAnsChars.length + 6) {
    let randChar = distractors[Math.floor(Math.random() * distractors.length)];
    if(!keys.includes(randChar)) keys.push(randChar);
  }
  
  // On mélange les touches du clavier de façon aléatoire
  keys.sort(() => Math.random() - 0.5);

  // Construction de l'interface du clavier
  let kbHtml = '<div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:20px; max-width: 400px; margin-left: auto; margin-right: auto;">';
  keys.forEach(k => {
    kbHtml += `<button class="quiz-opt-btn" style="min-width:50px; padding:10px;" onclick="typeKeyboard('${k}')">${k}</button>`;
  });
  // Bouton Effacer
  kbHtml += `<button class="quiz-opt-btn" style="min-width:50px; padding:10px; background:#fdedec; color:#e74c3c; border-color:#e74c3c;" onclick="deleteKeyboard()">⌫</button>`;
  kbHtml += '</div>';

  document.getElementById('keyboard-area').innerHTML = `
    <div style="text-align:center; margin-bottom:15px; font-weight:bold; color:var(--sumi2);">Tapez la réponse au clavier :</div>
    <div class="quiz-sentence">${displaySentence}</div>
    <div class="quiz-translation">"${q.fr}"</div>
    ${kbHtml}
    <div id="kb-feedback" class="quiz-feedback"></div>
    <div style="display:flex; justify-content:center; gap:10px; margin-top:20px;">
      <button class="btn-primary" id="kb-check-btn" onclick="checkKeyboardAnswer()">Valider</button>
      <button class="btn-primary" id="kb-next-btn" style="display:none; background:var(--sumi);" onclick="nextKeyboardQuestion()">Suivant ➔</button>
    </div>
  `;
}

function typeKeyboard(kana) {
  kbUserInput += kana;
  updateKeyboardUI();
}

function deleteKeyboard() {
  kbUserInput = kbUserInput.slice(0, -1);
  updateKeyboardUI();
}

function checkKeyboardAnswer() {
  const q = kbQuestions[kbCurrentIndex];
  const feedbackDiv = document.getElementById('kb-feedback');
  document.getElementById('kb-check-btn').style.display = 'none';
  document.getElementById('kb-next-btn').style.display = 'block';

  // Désactiver les touches du clavier
  const buttons = document.getElementById('keyboard-area').querySelectorAll('.quiz-opt-btn');
  buttons.forEach(b => b.disabled = true);

  if(kbUserInput === q.ans) {
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Parfait !</strong><br>${q.expl}`;
    updateStat(true);
  } else {
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Incorrect.</strong><br>Il fallait taper : <strong>${q.ans}</strong><br>${q.expl}`;
    updateStat(false);
  }
}

function nextKeyboardQuestion() {
  kbCurrentIndex++;
  renderKeyboardQuestion();
}

/* ─── MOTEUR DE JEU : LEÇON INVERSÉE (FRANÇAIS ➔ JAPONAIS) ─── */
let revQuestions = [];
let revCurrentIndex = 0;

function startReverseMode(level) {
  revQuestions = [];
  
  // Génération de questions Kanjis
  if (typeof DB_KANJI !== 'undefined' && DB_KANJI[level]) {
    const kanjis = [...DB_KANJI[level]].sort(() => Math.random() - 0.5).slice(0, 5);
    kanjis.forEach(k => {
      let options = [k.j];
      while (options.length < 4) {
        let rand = DB_KANJI[level][Math.floor(Math.random() * DB_KANJI[level].length)].j;
        if (!options.includes(rand)) options.push(rand);
      }
      options.sort(() => Math.random() - 0.5);
      revQuestions.push({ q: k.f, ans: k.j, opts: options, type: 'Kanji' });
    });
  }

  // Génération de questions Vocabulaire
  if (typeof DB_VOCAB !== 'undefined' && DB_VOCAB[level] && DB_VOCAB[level].subjects) {
    const vocab = DB_VOCAB[level];
    const pool = [...vocab.subjects, ...vocab.places];
    const words = pool.sort(() => Math.random() - 0.5).slice(0, 5);
    words.forEach(w => {
      let correctHtml = `<ruby>${w.jp}<rt>${w.kana}</rt></ruby>`;
      let options = [correctHtml];
      while (options.length < 4) {
        let randW = pool[Math.floor(Math.random() * pool.length)];
        let randHtml = `<ruby>${randW.jp}<rt>${randW.kana}</rt></ruby>`;
        if (!options.includes(randHtml)) options.push(randHtml);
      }
      options.sort(() => Math.random() - 0.5);
      revQuestions.push({ q: w.fr, ans: correctHtml, opts: options, type: 'Vocabulaire' });
    });
  }

  revQuestions.sort(() => Math.random() - 0.5);

  if (revQuestions.length === 0) { alert("Données indisponibles !"); return; }
  
  revCurrentIndex = 0;
  loadContent('reverse-run');
  renderReverseQuestion();
}

function renderReverseQuestion() {
  if (revCurrentIndex >= revQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 40px; background: var(--sakura-pale);">
        <span style="font-size: 60px;">🔄</span>
        <h3 style="color: var(--aka); margin: 20px 0;">Leçon Terminée !</h3>
        <p>Passer du français au japonais est un excellent exercice mental, bravo !</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="loadContent('exercices')">Retour</button>
      </div>`;
    return;
  }

  const q = revQuestions[revCurrentIndex];
  let optionsHtml = '';
  q.opts.forEach(opt => {
    // Échappement des guillemets pour éviter les conflits HTML
    const safeOpt = opt.replace(/'/g, "\\'");
    const safeAns = q.ans.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" style="width:100%; margin-bottom:10px; font-size:22px; padding: 15px;" onclick="checkReverseAnswer('${safeOpt}', this, '${safeAns}')">${opt}</button>`;
  });

  document.getElementById('reverse-area').innerHTML = `
    <div style="text-align:center; margin-bottom:15px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Trouvez la traduction (${q.type})</div>
    <div style="font-size:26px; text-align:center; margin-bottom:30px; color:var(--sumi); font-weight:bold;">"${q.q}"</div>
    <div id="reverse-options-container" style="max-width:400px; margin:0 auto;">${optionsHtml}</div>
    <div id="rev-feedback" class="quiz-feedback"></div>
    <button class="btn-primary quiz-next-btn" id="rev-next-btn" style="display:none; margin: 20px auto 0;" onclick="nextReverseQuestion()">Suivant ➔</button>
  `;
}

function checkReverseAnswer(selected, btnElement, correct) {
  const allBtns = document.getElementById('reverse-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const feedbackDiv = document.getElementById('rev-feedback');

  if (selected === correct) {
    btnElement.classList.add('correct-ans');
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Bonne réponse !</strong>`;
    updateStat(true);
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(b => { if(b.innerHTML.includes(correct)) b.classList.add('correct-ans'); });
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Incorrect.</strong>`;
    updateStat(false);
  }
  document.getElementById('rev-next-btn').style.display = 'block';
}

function nextReverseQuestion() {
  revCurrentIndex++;
  renderReverseQuestion();
}  

/* ─── MOTEUR D'EXAMENS JLPT UNIVERSEL ─── */
let examTimer = null;
let examTimeLeft = 0;
let examQuestions = [];
let examCurrentIndex = 0;
let examScore = 0;
let examLevel = 'N5';

function startExam(level) {
  examLevel = level;
  examScore = 0;
  examCurrentIndex = 0;

  // Configuration dynamique (Temps en secondes et Nombre de questions)
  const configs = {
    'N5': { time: 15 * 60, limit: 20 },
    'N4': { time: 20 * 60, limit: 25 },
    'N3': { time: 25 * 60, limit: 30 },
    'N2': { time: 30 * 60, limit: 35 },
    'N1': { time: 40 * 60, limit: 40 }
  };
  
  if(!configs[level]) return;
  examTimeLeft = configs[level].time;
  let totalQ = configs[level].limit;
  examQuestions = [];

  // 1. Piocher la moitié des questions dans les KANJIS
  if (typeof DB_KANJI !== 'undefined' && DB_KANJI[level]) {
    let pool = [...DB_KANJI[level]].sort(() => Math.random() - 0.5).slice(0, Math.floor(totalQ / 2));
    pool.forEach(k => {
      let opts = [k.f];
      while(opts.length < 4) {
        let rand = DB_KANJI[level][Math.floor(Math.random() * DB_KANJI[level].length)].f;
        if(!opts.includes(rand)) opts.push(rand);
      }
      opts.sort(() => Math.random() - 0.5);
      examQuestions.push({ q: `Sens du Kanji : 「 ${k.j} 」`, opts: opts, ans: k.f });
    });
  }

  // 2. Piocher l'autre moitié dans le VOCABULAIRE
  if (typeof DB_VOCAB !== 'undefined' && DB_VOCAB[level]) {
    let pool = [];
    if(DB_VOCAB[level].subjects) pool = pool.concat(DB_VOCAB[level].subjects);
    if(DB_VOCAB[level].places) pool = pool.concat(DB_VOCAB[level].places);
    
    let vocabs = pool.sort(() => Math.random() - 0.5).slice(0, Math.ceil(totalQ / 2));
    vocabs.forEach(v => {
      let opts = [v.fr];
      while(opts.length < 4) {
        let rand = pool[Math.floor(Math.random() * pool.length)].fr;
        if(!opts.includes(rand)) opts.push(rand);
      }
      opts.sort(() => Math.random() - 0.5);
      examQuestions.push({ q: `Traduction : 「 <ruby>${v.jp}<rt>${v.kana}</rt></ruby> 」`, opts: opts, ans: v.fr });
    });
  }

  examQuestions.sort(() => Math.random() - 0.5); // Mélange final
  loadContent('exam-run');
  
  // Gestion du chronomètre
  clearInterval(examTimer);
  examTimer = setInterval(() => {
    examTimeLeft--;
    const clockEl = document.getElementById('exam-clock');
    if (clockEl) {
      let m = Math.floor(examTimeLeft / 60).toString().padStart(2, '0');
      let s = (examTimeLeft % 60).toString().padStart(2, '0');
      clockEl.innerText = `⏱️ ${m}:${s}`;
      if (examTimeLeft <= 60) { // Dernière minute en rouge
        clockEl.style.color = '#fff';
        clockEl.style.background = '#e74c3c';
      }
    }
    if (examTimeLeft <= 0) finishExam(true);
  }, 1000);

  renderExamQuestion();
}

function renderExamQuestion() {
  if (examCurrentIndex >= examQuestions.length) {
    finishExam(false);
    return;
  }
  const q = examQuestions[examCurrentIndex];
  let optionsHtml = '';
  q.opts.forEach(opt => {
    const safeOpt = opt.replace(/'/g, "\\'");
    const safeAns = q.ans.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" style="width:100%; margin-bottom:10px; font-size:18px;" onclick="checkExamAnswer('${safeOpt}', this, '${safeAns}')">${opt}</button>`;
  });

  let m = Math.floor(examTimeLeft / 60).toString().padStart(2, '0');
  let s = (examTimeLeft % 60).toString().padStart(2, '0');

  document.getElementById('exam-area').innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom: 2px solid var(--sakura-pale); padding-bottom: 10px;">
      <span style="font-weight:bold; color:var(--sumi); font-size:18px;">Question ${examCurrentIndex + 1} / ${examQuestions.length}</span>
      <span id="exam-clock" style="font-weight:bold; background:var(--sakura-pale); color:var(--aka); padding:6px 16px; border-radius:20px; font-size:18px;">⏱️ ${m}:${s}</span>
    </div>
    <div style="font-size:24px; text-align:center; margin-bottom:30px; font-weight:bold; color:var(--sumi); line-height: 1.4;">${q.q}</div>
    <div style="max-width:500px; margin:0 auto;">${optionsHtml}</div>
    <button class="btn-primary" id="exam-next-btn" style="display:none; margin: 20px auto 0;" onclick="nextExamQuestion()">Suivant ➔</button>
  `;
}

function checkExamAnswer(selected, btnElement, correct) {
  const allBtns = document.getElementById('exam-area').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  
  if (selected === correct) {
    btnElement.classList.add('correct-ans');
    examScore++;
    AudioEngine.correct(); // 👈 Le petit "Ding" de bonne réponse est ici !
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(b => { if(b.innerHTML === correct) b.classList.add('correct-ans'); });
    AudioEngine.wrong(); // 👈 Le "Tud" d'erreur est ici !
  }
  document.getElementById('exam-next-btn').style.display = 'block';
}

function nextExamQuestion() {
  examCurrentIndex++;
  renderExamQuestion();
}

function finishExam(timeout = false) {
  clearInterval(examTimer);
  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  const percentage = Math.round((examScore / examQuestions.length) * 100);
  const passed = percentage >= 60; // Seuil de validation officiel
  
  // 👈 DÉCLENCHEMENT DE LA FANFARE OU DU BUZZER DE FIN !
  if (passed) {
    AudioEngine.fanfare(); 
    userStats.xp += (examQuestions.length * 10);
    saveStats();
  } else {
    AudioEngine.wrong();
  }

  contentDiv.innerHTML = `
    <div class="card" style="text-align:center; padding: 40px; background: var(--sakura-pale);">
      <span style="font-size: 70px;">${timeout ? '⏰' : (passed ? '🎓' : '❌')}</span>
      <h2 style="color: var(--aka); margin: 20px 0;">${timeout ? 'Temps Écoulé !' : 'Examen Terminé !'}</h2>
      <div style="font-size:22px; margin-bottom:10px;">Score : <strong>${examScore} / ${examQuestions.length}</strong> (${percentage}%)</div>
      <div style="font-size:18px; font-weight:bold; color: ${passed ? '#1abc9c' : '#e74c3c'}; margin-bottom:30px;">
        ${passed ? 'Félicitations, vous avez validé ce niveau ! (+ XP)' : 'Échec. Révisez vos leçons et réessayez !'}
      </div>
      <button class="btn-primary" onclick="loadContent('examens')">Retour aux Examens</button>
    </div>
  `;
}
/* ─── MOTEUR DE JEU : LE DÉTECTIVE (RADICAUX) ─── */
let detQuestions = [];
let detCurrentIndex = 0;

function startDetectiveMode(level) {
  if (!window.DB_KANJI || !window.DB_KANJI[level]) {
    alert("Données non disponibles pour ce niveau !");
    return;
  }

  // On récupère tous les kanjis du niveau qui ont un radical
  let pool = [...window.DB_KANJI[level]].filter(k => k.rad);
  if (pool.length === 0) return;

  // On sélectionne 10 Kanjis aléatoires pour la partie
  pool.sort(() => Math.random() - 0.5);
  let selectedKanjis = pool.slice(0, 10);

  detQuestions = selectedKanjis.map(k => {
    let correctRad = k.rad;
    let options = [correctRad];

    // On cherche 3 faux radicaux aléatoires et uniques
    let wrongPool = [...new Set(pool.filter(x => x.rad !== correctRad).map(x => x.rad))];
    wrongPool.sort(() => Math.random() - 0.5);
    options.push(...wrongPool.slice(0, 3));

    // Mélange final des 4 boutons
    options.sort(() => Math.random() - 0.5);

    return { kanji: k.j, meaning: k.f, correct: correctRad, opts: options, story: k.story };
  });

  detCurrentIndex = 0;
  loadContent('detective-run');
  renderDetectiveQuestion();
}

function renderDetectiveQuestion() {
  if (detCurrentIndex >= detQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🕵️</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Enquête Terminée !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">L'architecture des Kanjis n'a plus de secrets pour vous.</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }

  const q = detQuestions[detCurrentIndex];
  let optionsHtml = '';
  
  q.opts.forEach(opt => {
    const safeOpt = opt.replace(/'/g, "\\'");
    const safeAns = q.correct.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" style="width:100%; margin-bottom:10px; font-size:18px; padding:14px;" onclick="checkDetectiveAnswer('${safeOpt}', this, '${safeAns}')">${opt}</button>`;
  });

  document.getElementById('detective-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Question ${detCurrentIndex + 1} / 10</div>
    <div style="font-size: 80px; font-family: var(--font-jp); text-align: center; color: var(--sumi); line-height: 1.2;">${q.kanji}</div>
    <div style="text-align:center; color:#666; font-size:18px; margin-bottom:30px; font-style:italic;">"${q.meaning}"</div>
    <p style="text-align:center; font-weight:bold; margin-bottom:20px;">Quel est le radical (la clé) de ce Kanji ?</p>
    <div id="det-options-container" style="max-width:400px; margin:0 auto;">${optionsHtml}</div>
    <div id="det-feedback" class="quiz-feedback"></div>
    <button class="btn-primary quiz-next-btn" id="det-next-btn" style="display:none; margin: 20px auto 0;" onclick="nextDetectiveQuestion()">Suivant ➔</button>
  `;
}

function checkDetectiveAnswer(selected, btnElement, correct) {
  const allBtns = document.getElementById('det-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const feedbackDiv = document.getElementById('det-feedback');
  const q = detQuestions[detCurrentIndex];

  // Le petit bijou d'apprentissage : L'histoire s'affiche toujours !
  const storyHtml = `<div style="margin-top:10px; padding-top:10px; border-top:1px dashed rgba(0,0,0,0.1); font-size:14px; color:#444;"><strong>💡 Le saviez-vous ?</strong><br>${q.story}</div>`;

  if (selected === correct) {
    btnElement.classList.add('correct-ans');
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Excellente déduction !</strong>${storyHtml}`;
    updateStat(true);
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(b => { if(b.innerHTML === correct) b.classList.add('correct-ans'); });
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Incorrect.</strong> Le radical était 「${correct}」.${storyHtml}`;
    updateStat(false);
  }
  document.getElementById('det-next-btn').style.display = 'block';
}

function nextDetectiveQuestion() {
  detCurrentIndex++;
  renderDetectiveQuestion();
}

/* ─── MOTEUR DE JEU : LE FORGERON (JUKUGO) ─── */
let forgeQuestions = [];
let forgeCurrentIndex = 0;
let forgeUserAnswer = [];

function startForgeronMode(level) {
  if (!window.DB_KANJI || !window.DB_KANJI[level]) return alert("Données indisponibles !");
  
  // 1. On aspire tous les mots composés du niveau
  let allWords = [];
  let allKanjis = window.DB_KANJI[level].map(k => k.j);
  
  window.DB_KANJI[level].forEach(k => {
    if(k.words) {
      k.words.forEach(w => {
        // On ne garde que les mots de 2 caractères ou plus
        if(w.jp.length > 1 && [...w.jp].some(char => allKanjis.includes(char))) {
          allWords.push(w);
        }
      });
    }
  });

  // Déduplication
  allWords = allWords.filter((v,i,a)=>a.findIndex(t=>(t.jp === v.jp))===i);
  if(allWords.length === 0) return alert("Pas assez de mots composés dans la base !");
  
  // 2. On choisit 5 mots aléatoires
  allWords.sort(() => Math.random() - 0.5);
  forgeQuestions = allWords.slice(0, 5).map(w => {
    let chars = [...w.jp];
    let distractors = [];
    // On ajoute 3 pièges aléatoires du même niveau
    while(distractors.length < 3) {
      let randK = allKanjis[Math.floor(Math.random() * allKanjis.length)];
      if(!chars.includes(randK) && !distractors.includes(randK)) distractors.push(randK);
    }
    return { jp: w.jp, fr: w.fr, kana: w.kana, opts: [...chars, ...distractors].sort(() => Math.random() - 0.5) };
  });

  forgeCurrentIndex = 0;
  loadContent('forgeron-run');
  renderForgeronQuestion();
}

function renderForgeronQuestion() {
  if (forgeCurrentIndex >= forgeQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🔨</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Armurerie Remplie !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Vous maîtrisez la construction des mots japonais.</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }
  forgeUserAnswer = [];
  updateForgeronUI();
}

function updateForgeronUI() {
  const q = forgeQuestions[forgeCurrentIndex];
  
  // Zone d'assemblage (L'Enclume)
  let enclumeHtml = forgeUserAnswer.length === 0 ? `<div class="sov-placeholder">Cliquez sur les minerais pour forger le mot...</div>` : '';
  forgeUserAnswer.forEach((char, i) => {
    enclumeHtml += `<div class="sov-word" style="font-size:32px; background:var(--sakura-pale); border-color:var(--aka);" onclick="removeForgeChar(${i})">${char}</div>`;
  });

  // Zone des options (Les Minerais)
  let mineraisHtml = '';
  q.opts.forEach((char, i) => {
    let isUsed = forgeUserAnswer.includes(char) ? 'visibility:hidden;' : '';
    mineraisHtml += `<div class="sov-word" style="font-size:32px; ${isUsed}" onclick="addForgeChar('${char}')">${char}</div>`;
  });

  document.getElementById('forgeron-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Mot ${forgeCurrentIndex + 1} / 5</div>
    <div style="font-size:22px; text-align:center; margin-bottom:20px; color:var(--sumi); font-weight:bold;">"${q.fr}"</div>
    
    <div class="sov-sentence-area" style="min-height:100px; justify-content:center; background: rgba(0,0,0,0.03); border-bottom-color: var(--sumi);">${enclumeHtml}</div>
    <div class="sov-bank-area">${mineraisHtml}</div>
    
    <div id="forge-feedback" class="quiz-feedback"></div>
    <div class="sov-controls">
      <button class="btn-primary" id="forge-check-btn" onclick="checkForgeronAnswer()" ${forgeUserAnswer.length === 0 ? 'disabled style="opacity:0.5"' : ''}>Frapper l'enclume</button>
      <button class="btn-primary" id="forge-next-btn" style="display:none; background:var(--sumi);" onclick="nextForgeronQuestion()">Mot Suivant ➔</button>
    </div>
  `;
}

function addForgeChar(char) {
  forgeUserAnswer.push(char);
  speak(char);
  updateForgeronUI();
}

function removeForgeChar(index) {
  forgeUserAnswer.splice(index, 1);
  updateForgeronUI();
}

function checkForgeronAnswer() {
  const q = forgeQuestions[forgeCurrentIndex];
  const userWord = forgeUserAnswer.join('');
  const feedbackDiv = document.getElementById('forge-feedback');
  
  document.getElementById('forge-check-btn').style.display = 'none';
  document.getElementById('forge-next-btn').style.display = 'block';

  if (userWord === q.jp) {
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Magnifique lame !</strong><br>Prononciation : <strong>${q.kana}</strong>`;
    updateStat(true);
  } else {
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Lame brisée.</strong><br>Il fallait forger : <strong>${q.jp}</strong> (${q.kana})`;
    updateStat(false);
  }
}

function nextForgeronQuestion() {
  forgeCurrentIndex++;
  renderForgeronQuestion();
}

/* ─── MOTEUR DE JEU : LE PIÈGE (TEST ON/KUN) ─── */
let piegeQuestions = [];
let piegeCurrentIndex = 0;

function startPiegeMode(level) {
  if (!window.DB_KANJI || !window.DB_KANJI[level]) return alert("Données indisponibles !");
  
  let allWords = [];
  // On extrait tous les mots et on garde une référence à leur Kanji parent pour créer des pièges
  window.DB_KANJI[level].forEach(k => {
    if(k.words) {
      k.words.forEach(w => {
        allWords.push({ ...w, parentKanji: k });
      });
    }
  });

  if(allWords.length === 0) return alert("Aucun vocabulaire pour ce niveau.");
  
  // On sélectionne 10 mots au hasard
  allWords.sort(() => Math.random() - 0.5);
  let selectedWords = allWords.slice(0, 10);

  piegeQuestions = selectedWords.map(w => {
    let correctKana = w.kana;
    let options = [correctKana];
    
    // PIÈGE 1 : On ajoute les autres lectures (mots) du MÊME Kanji
    w.parentKanji.words.forEach(otherW => {
      if (otherW.kana !== correctKana && !options.includes(otherW.kana)) {
        options.push(otherW.kana);
      }
    });

    // On remplit le reste avec des lectures aléatoires d'autres mots
    while(options.length < 4) {
      let randKana = allWords[Math.floor(Math.random() * allWords.length)].kana;
      if(!options.includes(randKana)) options.push(randKana);
    }
    
    // On garde exactement 4 options et on les mélange
    options = options.slice(0, 4).sort(() => Math.random() - 0.5);
    
    return { word: w.jp, meaning: w.fr, correct: correctKana, opts: options };
  });

  piegeCurrentIndex = 0;
  loadContent('piege-run');
  renderPiegeQuestion();
}

function renderPiegeQuestion() {
  if (piegeCurrentIndex >= piegeQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🪤</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Champ de mines traversé !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Vous savez désormais différencier les lectures ON et KUN selon le contexte.</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }

  const q = piegeQuestions[piegeCurrentIndex];
  let optionsHtml = '';
  
  q.opts.forEach(opt => {
    const safeOpt = opt.replace(/'/g, "\\'");
    const safeAns = q.correct.replace(/'/g, "\\'");
    optionsHtml += `<button class="quiz-opt-btn" style="width:100%; margin-bottom:10px; font-size:22px; padding:15px; font-weight:normal;" onclick="checkPiegeAnswer('${safeOpt}', this, '${safeAns}')">${opt}</button>`;
  });

  document.getElementById('piege-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Mot ${piegeCurrentIndex + 1} / 10</div>
    <div style="font-size: 50px; font-family: var(--font-jp); font-weight:bold; text-align: center; color: var(--sumi); margin-bottom: 5px;">${q.word}</div>
    <div style="text-align:center; color:#666; font-size:18px; margin-bottom:30px; font-style:italic;">"${q.meaning}"</div>
    <div id="piege-options-container" style="max-width:400px; margin:0 auto;">${optionsHtml}</div>
    <div id="piege-feedback" class="quiz-feedback"></div>
    <button class="btn-primary quiz-next-btn" id="piege-next-btn" style="display:none; margin: 20px auto 0;" onclick="nextPiegeQuestion()">Suivant ➔</button>
  `;
}

function checkPiegeAnswer(selected, btnElement, correct) {
  const allBtns = document.getElementById('piege-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const feedbackDiv = document.getElementById('piege-feedback');

  if (selected === correct) {
    btnElement.classList.add('correct-ans');
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Bonne lecture !</strong>`;
    updateStat(true);
    // On fait parler la voix japonaise pour ancrer la prononciation !
    speak(correct);
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(b => { if(b.innerHTML === correct) b.classList.add('correct-ans'); });
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Piégé !</strong> La bonne prononciation était <strong>${correct}</strong>.`;
    updateStat(false);
  }
  document.getElementById('piege-next-btn').style.display = 'block';
}

function nextPiegeQuestion() {
  piegeCurrentIndex++;
  renderPiegeQuestion();
}

/* ─── MOTEUR DE JEU : LE MARCHAND (COMPTEURS) ─── */
let countQuestions = [];
let countCurrentIndex = 0;

function startCountersMode() {
  if (!window.DB_COUNTERS) return alert("Base de compteurs indisponible !");
  
  countQuestions = [];
  let allCounters = window.DB_COUNTERS;
  
  // On génère 10 requêtes clients aléatoires
  for (let i = 0; i < 10; i++) {
    // 1. Tirer une catégorie au hasard (ex: Objets plats)
    let correctCategory = allCounters[Math.floor(Math.random() * allCounters.length)];
    // 2. Tirer un objet de cette catégorie au hasard (ex: Papier)
    let itemAsked = correctCategory.items[Math.floor(Math.random() * correctCategory.items.length)];
    
    // 3. Générer les options de compteurs (1 vrai, 3 faux)
    let options = [correctCategory.counter];
    while(options.length < 4) {
      let randC = allCounters[Math.floor(Math.random() * allCounters.length)].counter;
      if(!options.includes(randC)) options.push(randC);
    }
    options.sort(() => Math.random() - 0.5); // Mélange
    
    countQuestions.push({ 
      item: itemAsked, 
      ans: correctCategory.counter, 
      opts: options, 
      kana: correctCategory.kana, 
      expl: correctCategory.fr 
    });
  }
  
  countCurrentIndex = 0;
  loadContent('counters-run');
  renderCountersQuestion();
}

function renderCountersQuestion() {
  if (countCurrentIndex >= countQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🏪</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Boutique Fermée !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Vous avez servi tous les clients avec brio. Les compteurs n'ont plus de secret pour vous !</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }

  const q = countQuestions[countCurrentIndex];
  let optionsHtml = '';
  
  q.opts.forEach(opt => {
    optionsHtml += `<button class="quiz-opt-btn" style="width:48%; font-size:32px; padding:15px;" onclick="checkCountersAnswer('${opt}', this, '${q.ans}')">${opt}</button>`;
  });

  document.getElementById('counters-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Client ${countCurrentIndex + 1} / 10</div>
    <div style="text-align:center; color:var(--sumi2); font-size:16px; margin-bottom:10px;">Le client veut acheter :</div>
    <div style="font-size: 38px; font-family: var(--font-jp); font-weight:bold; text-align: center; color: var(--sumi); margin-bottom: 30px;">${q.item}</div>
    <p style="text-align:center; font-weight:bold; margin-bottom:15px; color:#666;">Quel compteur utiliseriez-vous ?</p>
    <div id="counters-options-container" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:400px; margin:0 auto;">${optionsHtml}</div>
    <div id="counters-feedback" class="quiz-feedback"></div>
    <button class="btn-primary quiz-next-btn" id="counters-next-btn" style="display:none; margin: 20px auto 0;" onclick="nextCountersQuestion()">Client Suivant ➔</button>
  `;
}

function checkCountersAnswer(selected, btnElement, correct) {
  const allBtns = document.getElementById('counters-options-container').querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const feedbackDiv = document.getElementById('counters-feedback');
  const q = countQuestions[countCurrentIndex];

  if (selected === correct) {
    btnElement.classList.add('correct-ans');
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Parfait !</strong><br>On utilise bien <strong>${correct} (${q.kana})</strong> pour : ${q.expl}.`;
    updateStat(true);
    speak(correct);
  } else {
    btnElement.classList.add('wrong-ans');
    allBtns.forEach(b => { if(b.innerHTML === correct) b.classList.add('correct-ans'); });
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Erreur.</strong><br>Il fallait utiliser <strong>${correct} (${q.kana})</strong> car cet objet fait partie de la catégorie : ${q.expl}.`;
    updateStat(false);
  }
  document.getElementById('counters-next-btn').style.display = 'block';
}

function nextCountersQuestion() {
  countCurrentIndex++;
  renderCountersQuestion();
}

/* ─── MOTEUR DE JEU : STUDIO VOCAL (RECONNAISSANCE VOCALE) ─── */
let voiceQuestions = [];
let voiceCurrentIndex = 0;
window.recognition = null;

function startVoiceMode(level) {
  // Vérification de la compatibilité du navigateur
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!window.SpeechRecognition) {
    alert("Désolé, votre navigateur ne supporte pas la reconnaissance vocale. Veuillez utiliser Google Chrome ou Microsoft Edge.");
    return;
  }

  if (!window.DB_DICTATION || !window.DB_DICTATION[level]) {
    alert("Données non disponibles pour ce niveau !");
    return;
  }

  // On pioche 5 phrases de dictée (qui contiennent les phrases JP et FR)
  let pool = [...window.DB_DICTATION[level]].sort(() => Math.random() - 0.5);
  voiceQuestions = pool.slice(0, 5);
  
  if(voiceQuestions.length === 0) return;
  
  voiceCurrentIndex = 0;
  loadContent('voice-run');
  renderVoiceQuestion();
}

function renderVoiceQuestion() {
  if (voiceCurrentIndex >= voiceQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🎙️</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Enregistrement Terminé !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Votre accent japonais et votre spontanéité s'améliorent à vue d'œil.</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }

  const q = voiceQuestions[voiceCurrentIndex];

  document.getElementById('voice-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Phrase ${voiceCurrentIndex + 1} / 5</div>
    <div style="text-align:center; color:var(--sumi2); font-size:16px; margin-bottom:10px;">Traduisez cette phrase à l'oral :</div>
    <div style="font-size: 24px; font-weight:bold; text-align: center; color: var(--sumi); margin-bottom: 30px;">"${q.fr}"</div>
    
    <div class="mic-btn" id="mic-btn" onclick="startRecording()">🎤</div>
    <div style="text-align:center; color:#888; font-size:13px; margin-bottom:20px;" id="mic-hint">Cliquez sur le micro pour parler en japonais</div>
    
    <div id="voice-result" class="voice-result">...</div>
    <div id="voice-feedback" class="quiz-feedback"></div>
    
    <div style="display:flex; justify-content:center; gap:10px;">
        <button class="btn-primary" id="voice-skip-btn" style="background:#888;" onclick="skipVoiceQuestion()">Je ne sais pas</button>
        <button class="btn-primary" id="voice-next-btn" style="display:none; background:var(--sumi);" onclick="nextVoiceQuestion()">Suivant ➔</button>
    </div>
  `;
}

function startRecording() {
  const micBtn = document.getElementById('mic-btn');
  const resultDiv = document.getElementById('voice-result');
  const hintDiv = document.getElementById('mic-hint');
  const q = voiceQuestions[voiceCurrentIndex];

  if (micBtn.classList.contains('recording')) return; // Évite les doubles clics

  // Configuration de l'API Vocale
  window.recognition = new window.SpeechRecognition();
  window.recognition.lang = 'ja-JP'; // On force la reconnaissance en Japonais !
  window.recognition.interimResults = false;
  window.recognition.maxAlternatives = 1;

  window.recognition.onstart = function() {
    micBtn.classList.add('recording');
    hintDiv.innerHTML = "<strong style='color:var(--aka)'>L'application vous écoute... Parlez !</strong>";
    resultDiv.innerText = "...";
  };

  window.recognition.onresult = function(event) {
    // On récupère ce que l'IA a compris, et on enlève les espaces
    const transcript = event.results[0][0].transcript.replace(/\s/g, ''); 
    checkVoiceAnswer(transcript, q.jp);
  };

  window.recognition.onerror = function(event) {
    micBtn.classList.remove('recording');
    hintDiv.innerText = "Erreur du micro. Cliquez pour réessayer.";
    if(event.error === 'not-allowed') {
        alert("Vous devez autoriser l'accès au microphone dans votre navigateur en haut à gauche de la barre d'adresse !");
    }
  };

  window.recognition.onend = function() {
    micBtn.classList.remove('recording');
    hintDiv.innerText = "Enregistrement terminé.";
  };

  window.recognition.start(); // Allume le micro
}

function checkVoiceAnswer(transcript, expected) {
  const resultDiv = document.getElementById('voice-result');
  const feedbackDiv = document.getElementById('voice-feedback');
  
  document.getElementById('voice-skip-btn').style.display = 'none';
  document.getElementById('voice-next-btn').style.display = 'block';

  // Nettoyage basique (on enlève la ponctuation japonaise courante pour faire la comparaison)
  const cleanTranscript = transcript.replace(/[。、！？\s]/g, '');
  const cleanExpected = expected.replace(/[。、！？\s]/g, '');

  // L'API peut parfois transcrire en Kanjis, parfois en Kanas. On fait une comparaison large.
  if (cleanTranscript.includes(cleanExpected) || cleanExpected.includes(cleanTranscript)) {
    resultDiv.innerHTML = `<span class="voice-match">« ${transcript} »</span>`;
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Prononciation Parfaite !</strong><br>L'application a parfaitement compris : ${expected}`;
    updateStat(true);
  } else {
    resultDiv.innerHTML = `<span class="voice-fail">« ${transcript} »</span>`;
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ Mauvaise traduction ou accent imprécis.</strong><br>La phrase attendue était : <strong>${expected}</strong><br><button onclick="speak('${expected.replace(/'/g, "\\'")}')" style="margin-top:15px; padding:8px 12px; border-radius:5px; border:none; cursor:pointer; background:white; color:var(--aka); font-weight:bold;">Écouter le modèle</button>`;
    updateStat(false);
  }
}

function skipVoiceQuestion() {
  if(window.recognition) window.recognition.stop();
  const q = voiceQuestions[voiceCurrentIndex];
  const resultDiv = document.getElementById('voice-result');
  const feedbackDiv = document.getElementById('voice-feedback');
  
  document.getElementById('voice-skip-btn').style.display = 'none';
  document.getElementById('voice-next-btn').style.display = 'block';
  
  resultDiv.innerHTML = `-`;
  feedbackDiv.className = 'quiz-feedback wrong';
  feedbackDiv.innerHTML = `<strong>Passé.</strong><br>La phrase attendue était : <strong>${q.jp}</strong>`;
  updateStat(false);
}

function nextVoiceQuestion() {
  voiceCurrentIndex++;
  renderVoiceQuestion();
}


/* ─── MOTEUR DE JEU : STUDIO DE CALLIGRAPHIE (CANVAS) ─── */
let canvasQuestions = [];
let canvasCurrentIndex = 0;
let ctx = null;
let isDrawing = false;

function startCanvasMode(level) {
  if (!window.DB_KANJI || !window.DB_KANJI[level]) {
    alert("Données non disponibles pour ce niveau !");
    return;
  }

  // On pioche 5 Kanjis aléatoires du niveau choisi
  let pool = [...window.DB_KANJI[level]].sort(() => Math.random() - 0.5);
  canvasQuestions = pool.slice(0, 5);
  
  if(canvasQuestions.length === 0) return;
  
  canvasCurrentIndex = 0;
  loadContent('canvas-run');
  renderCanvasQuestion();
}

function renderCanvasQuestion() {
  if (canvasCurrentIndex >= canvasQuestions.length) {
    document.getElementById('content').innerHTML = `
      <div class="card" style="text-align:center; padding: 50px 20px; background: var(--sakura-pale);">
        <span style="font-size: 70px;">🖌️</span>
        <h2 style="color: var(--aka); margin: 20px 0;">Encre Séchée !</h2>
        <p style="font-size: 18px; color: var(--sumi); margin-bottom: 20px;">Votre mémoire musculaire se développe parfaitement.</p>
        <button class="btn-primary" onclick="loadContent('exercices')">Retour aux exercices</button>
      </div>`;
    return;
  }

  const q = canvasQuestions[canvasCurrentIndex];

  document.getElementById('canvas-area').innerHTML = `
    <div style="text-align:center; margin-bottom:10px; font-weight:bold; color:var(--aka); font-size:14px; text-transform:uppercase; letter-spacing:1px;">Kanji ${canvasCurrentIndex + 1} / 5</div>
    <div style="text-align:center; color:var(--sumi2); font-size:16px; margin-bottom:10px;">Dessinez le Kanji pour :</div>
    <div style="font-size: 28px; font-weight:bold; text-align: center; color: var(--sumi); margin-bottom: 20px;">"${q.f}"</div>
    
    <div class="canvas-container">
      <div id="ghost-kanji" class="ghost-kanji">${q.j}</div>
      <canvas id="kanji-canvas" width="250" height="250"></canvas>
    </div>
    
    <div id="canvas-feedback" class="quiz-feedback" style="text-align:center;"></div>
    
    <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:20px;" id="canvas-controls">
        <button class="btn-primary" style="background:#888;" onclick="clearCanvas()">Effacer</button>
        <button class="btn-primary" onclick="revealKanji()">Vérifier (Révéler)</button>
    </div>
    
    <div style="display:none; justify-content:center; gap:10px; margin-top:20px;" id="canvas-eval-controls">
        <button class="srs-btn fail" onclick="evalCanvas(false)">J'ai raté</button>
        <button class="srs-btn easy" onclick="evalCanvas(true)">C'est parfait !</button>
    </div>
  `;

  initCanvas();
}

function initCanvas() {
  const canvas = document.getElementById('kanji-canvas');
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // S'adapte au mode sombre ou clair
  ctx.strokeStyle = document.body.classList.contains('samourai-mode') ? '#e0e0e0' : '#1a0a0a';

  // Événements Souris
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mouseout', endPosition);
  canvas.addEventListener('mousemove', draw);

  // Événements Tactiles (Smartphones)
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e.touches[0]); }, { passive: false });
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); }, { passive: false });
}

function getCanvasCoordinates(e) {
  const canvas = document.getElementById('kanji-canvas');
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startPosition(e) {
  isDrawing = true;
  draw(e);
}

function endPosition() {
  isDrawing = false;
  ctx.beginPath(); // Réinitialise le chemin pour ne pas lier les traits
}

function draw(e) {
  if (!isDrawing) return;
  const coords = getCanvasCoordinates(e);
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
}

function clearCanvas() {
  const canvas = document.getElementById('kanji-canvas');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('ghost-kanji').classList.remove('visible');
}

function revealKanji() {
  // Affiche le kanji parfait en filigrane
  document.getElementById('ghost-kanji').classList.add('visible');
  
  // Bascule les boutons vers l'auto-évaluation
  document.getElementById('canvas-controls').style.display = 'none';
  document.getElementById('canvas-eval-controls').style.display = 'flex';
  
  // Lecture audio
  speak(canvasQuestions[canvasCurrentIndex].j);
}

function evalCanvas(success) {
  const q = canvasQuestions[canvasCurrentIndex];
  const feedbackDiv = document.getElementById('canvas-feedback');
  document.getElementById('canvas-eval-controls').style.display = 'none';

  if (success) {
    feedbackDiv.className = 'quiz-feedback correct';
    feedbackDiv.innerHTML = `<strong>✅ Validé !</strong> Prononciation : ${q.on || q.kun}`;
    updateStat(true);
  } else {
    feedbackDiv.className = 'quiz-feedback wrong';
    feedbackDiv.innerHTML = `<strong>❌ À revoir.</strong> Prononciation : ${q.on || q.kun}`;
    updateStat(false);
  }
  
  // Bouton pour passer à la suite
  feedbackDiv.innerHTML += `<br><button class="btn-primary" style="margin-top:15px; background:var(--sumi);" onclick="nextCanvasQuestion()">Suivant ➔</button>`;
}

function nextCanvasQuestion() {
  canvasCurrentIndex++;
  renderCanvasQuestion();
}

/* ─── IMPORT / EXPORT DE SAUVEGARDE ─── */
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userStats));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "nihongo_michi_save.json");
  dlAnchorElem.click();
}

function importData(event) {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if(imported && imported.xp !== undefined) {
        userStats = imported;
        saveStats();
        alert("Sauvegarde chargée avec succès !");
        location.reload();
      } else { alert("Fichier de sauvegarde invalide."); }
    } catch(err) { alert("Erreur lors de la lecture du fichier."); }
  };
  reader.readAsText(file);
}

/* ─── MOTEUR DE JEU : LECTURE INTERACTIVE ─── */
function startReadingMode(textId) {
  if (!window.DB_READING) return;
  const readingObj = window.DB_READING.find(r => r.id === textId);
  if (!readingObj) return;

  loadContent('reading-run');

  // L'algorithme transforme [Kanji|Kana|Fr] en boutons cliquables
  const parsedText = readingObj.text.replace(/\[(.*?)\|(.*?)\|(.*?)\]/g, (match, kanji, kana, fr) => {
    return `<span class="read-word" onclick="showDictTooltip('${kanji}', '${kana}', '${fr.replace(/'/g, "\\'")}')">${kanji}</span>`;
  });

  document.getElementById('reading-area').innerHTML = `
    <h3 style="text-align:center; color:var(--aka); margin-bottom:20px;">${readingObj.title}</h3>
    <div class="reading-text">${parsedText}</div>
    <div id="dict-tooltip" class="dict-tooltip">
      <em>Cliquez sur un mot souligné pour voir sa traduction.</em>
    </div>
    <div style="text-align:center; margin-top:20px;">
      <button class="btn-primary" onclick="loadContent('reading-menu')">Terminer la lecture</button>
    </div>
  `;
}

function showDictTooltip(kanji, kana, fr) {
  const tooltip = document.getElementById('dict-tooltip');
  tooltip.innerHTML = `<span style="color:#1abc9c; font-size:24px; font-family:var(--font-jp);">${kanji}</span> <br> <span style="font-size:16px; color:#ccc;">${kana}</span> <br> <strong>${fr}</strong>`;
  tooltip.classList.add('visible');
  speak(kanji);
  // Récompense cachée : cliquer sur un mot donne 1 XP de curiosité !
  userStats.xp += 1;
  saveStats();
}
/* ─── INITIALIZATION ───────────────────────────────────────── */
(function(){
  // Générateur de Kanjis flottants (Mode Zen)
  const KANJIS = '日本語学桜愛美山川花月火水木金心道力気時間';
  const bg = document.getElementById('bg-kanji');
  if(bg){
    // On passe de 150 caractères statiques à seulement 25 caractères mouvants
    for(let i = 0; i < 25; i++){ 
      const s = document.createElement('span');
      s.textContent = KANJIS[i % KANJIS.length];
      
      // Tailles variables mais moins agressives (40px à 140px)
      s.style.fontSize = (Math.random() * 100 + 40) + 'px'; 
      s.style.left = (Math.random() * 100) + 'vw';
      
      // Vitesse de flottaison aléatoire entre 30 et 80 secondes (très lent)
      s.style.animationDuration = (Math.random() * 50 + 30) + 's'; 
      
      // Désynchronisation pour qu'ils ne partent pas tous en même temps
      s.style.animationDelay = '-' + (Math.random() * 50) + 's'; 
      
      bg.appendChild(s);
    }
  }

  // Appliquer les préférences sauvegardées
  if(localStorage.getItem('samouraiMode') === 'true') {
    document.body.classList.add('samourai-mode');
  }
  if(localStorage.getItem('hideFurigana') === 'true') {
    document.body.classList.add('hide-furigana');
  }
  
  // Gestion de la série (Streak)
  const today = new Date().toDateString();
  if (userStats.lastLogin !== today) {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (userStats.lastLogin === yesterday.toDateString()) {
      userStats.streak++;
    } else {
      userStats.streak = 1;
    }
    userStats.lastLogin = today;
    saveStats();
  }
  
  // Charge la première page avec un léger délai pour la fluidité
  setTimeout(() => loadContent('cours-01'), 100);

  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .catch(error => {
          console.log("Échec SW :", error);
        });
    });
  }
  // --- MOTEUR DE RECHERCHE UNIVERSEL ---
  const searchInput = document.getElementById('global-search');
  const searchResults = document.getElementById('search-results');

  // Fermer les résultats si on clique ailleurs sur l'écran
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Si la recherche est vide, on cache tout
    if(query.length < 1) { 
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
      return;
    }

    let results = [];

    // 1. Fouiller dans la base de données des KANJIS
    if(window.DB_KANJI) {
      for(let level in window.DB_KANJI) {
        window.DB_KANJI[level].forEach(k => {
          // On vérifie le caractère, le français, et les prononciations
          const match = k.j === query || 
                        k.f.toLowerCase().includes(query) || 
                        (k.on && k.on.toLowerCase().includes(query)) || 
                        (k.kun && k.kun.toLowerCase().includes(query));
          if(match) {
            results.push({
              type: 'kanji', char: k.j, title: k.j, desc: k.f, level: level
            });
          }
        });
      }
    }

    // 2. Fouiller dans la base de données du VOCABULAIRE
    if(window.DB_VOCAB) {
      for(let level in window.DB_VOCAB) {
        ['subjects', 'places', 'verbs_motion'].forEach(category => {
          if(window.DB_VOCAB[level][category]) {
            window.DB_VOCAB[level][category].forEach(v => {
              // On vérifie le caractère, le kana, le romaji et le français
              const match = v.jp.includes(query) || 
                            v.kana.includes(query) || 
                            v.fr.toLowerCase().includes(query) || 
                            (v.romaji && v.romaji.toLowerCase().includes(query));
              if(match) {
                results.push({
                  type: 'vocab', char: v.jp, title: `${v.jp} (${v.kana})`, desc: v.fr, level: level
                });
              }
            });
          }
        });
      }
    }

   // 3. Affichage des résultats (limité aux 15 premiers pour ne pas faire lagger)
    if(results.length > 0) {
      searchResults.innerHTML = results.slice(0, 15).map(r => `
        <div class="search-result-item" onclick="${r.type === 'kanji' ? `openKanjiModal('${r.char}')` : `speak('${r.char.replace(/'/g, "\\'")}')`}">
          <div class="sr-icon">${r.char}</div>
          <div class="sr-content">
            <div class="sr-title">
              <span>${r.title}</span>
              <span class="sr-badge">${r.level}</span>
            </div>
            <div class="sr-desc">${r.desc}</div>
          </div>
        </div>
      `).join('');
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = '<div style="padding:15px; text-align:center; color:#888;">Aucun résultat trouvé.</div>';
      searchResults.classList.add('active');
    }
  }); // 👈 FERMETURE DE L'ÉCOUTEUR DE RECHERCHE (Celle qui te manquait !)
})(); // 👈 FERMETURE DE LA FONCTION D'INITIALISATION
