/* =========================================================================
   DATABASE.JS - Base de données centrale de Nihongo no Michi
   ========================================================================= */

// 1. BASE DE DONNÉES DES KANJIS (Classée par niveau)
const DB_KANJI = {
  N5: [
    {j:'一', on:'イチ', kun:'ひと', f:'Un'}, {j:'二', on:'ニ', kun:'ふた', f:'Deux'}, {j:'三', on:'サン', kun:'み', f:'Trois'},
    {j:'日', on:'ニチ', kun:'ひ', f:'Jour, Soleil'}, {j:'月', on:'ゲツ', kun:'つき', f:'Lune, Mois'}, {j:'火', on:'カ', kun:'ひ', f:'Feu'},
    {j:'水', on:'スイ', kun:'みず', f:'Eau'}, {j:'木', on:'モク', kun:'き', f:'Bois'}, {j:'金', on:'キン', kun:'かね', f:'Or'},
    {j:'人', on:'ジン', kun:'ひと', f:'Personne'}, {j:'食', on:'ショク', kun:'た.べる', f:'Manger'}, {j:'飲', on:'イン', kun:'の.む', f:'Boire'}
    // Vous pourrez coller ici vos 100+ Kanjis N5
  ],
  N4: [
    {j:'会', on:'カイ', kun:'あ.う', f:'Se rencontrer'}, {j:'同', on:'ドウ', kun:'おな.じ', f:'Même'},
    {j:'思', on:'シ', kun:'おも.う', f:'Penser'}, {j:'言', on:'ゲン', kun:'い.う', f:'Dire'}
    // Vous pourrez coller ici vos 160+ Kanjis N4
  ],
  N3: [
    {j:'感', on:'カン', kun:'-', f:'Sentiment, Sensation'}, {j:'情', on:'ジョウ', kun:'なさ.け', f:'Émotion'},
    {j:'覚', on:'カク', kun:'おぼ.える', f:'Mémoriser, Se réveiller'}, {j:'忘', on:'ボウ', kun:'わす.れる', f:'Oublier'}
    // ...
  ],
  N2: [
    {j:'識', on:'シキ', kun:'し.る', f:'Discernement'}, {j:'観', on:'カン', kun:'み.る', f:'Observer'}
    // ...
  ],
  N1: [
    {j:'響', on:'キョウ', kun:'ひび.く', f:'Résonner, Écho'}, {j:'驚', on:'キョウ', kun:'おどろ.く', f:'Surprise'}
    // ...
  ]
};

// 2. BASE DE DONNÉES DU VOCABULAIRE CATÉGORISÉ (Pour le Générateur Procédural)
// C'est ce qui permettra de générer "Sujet + Lieu + Verbe" à l'infini !
const DB_VOCAB = {
  N5: {
    subjects: [
      { jp: "私", romaji: "watashi", fr: "Je / Moi" },
      { jp: "先生", romaji: "sensei", fr: "Le professeur" },
      { jp: "学生", romaji: "gakusei", fr: "L'étudiant" },
      { jp: "友達", romaji: "tomodachi", fr: "L'ami" },
      { jp: "猫", romaji: "neko", fr: "Le chat" }
    ],
    places: [
      { jp: "学校", romaji: "gakkō", fr: "l'école" },
      { jp: "東京", romaji: "tōkyō", fr: "Tokyo" },
      { jp: "庭", romaji: "niwa", fr: "le jardin" },
      { jp: "日本", romaji: "nihon", fr: "le Japon" }
    ],
    objects: [
      { jp: "りんご", romaji: "ringo", fr: "une pomme" },
      { jp: "水", romaji: "mizu", fr: "de l'eau" },
      { jp: "本", romaji: "hon", fr: "un livre" },
      { jp: "ペン", romaji: "pen", fr: "un stylo" }
    ],
    verbs_motion: [
      { jp: "行きます", romaji: "ikimasu", fr: "vais" },
      { jp: "来ます", romaji: "kimasu", fr: "viens" },
      { jp: "帰ります", romaji: "kaerimasu", fr: "rentre" }
    ],
    verbs_action: [
      { jp: "食べます", romaji: "tabemasu", fr: "mange" },
      { jp: "飲みます", romaji: "nomimasu", fr: "bois" },
      { jp: "読みます", romaji: "yomimasu", fr: "lis" },
      { jp: "書きます", romaji: "kakimasu", fr: "écris" }
    ]
  },
  N4: {
    // Structure similaire à remplir avec le vocabulaire N4
    subjects: [], places: [], objects: [], verbs_motion: [], verbs_action: []
  }
};

// 3. BASE DE DONNÉES DE LA DICTÉE (Phrases idiomatiques fixes)
const DB_DICTATION = {
  N5: [
    { jp: "おはようございます", fr: "Bonjour (matin)" },
    { jp: "ありがとうございます", fr: "Merci beaucoup" },
    { jp: "お元気ですか", fr: "Comment allez-vous ?" },
    { jp: "はじめまして", fr: "Enchanté" }
  ],
  N4: [
    { jp: "手伝ってくれますか", fr: "Pouvez-vous m'aider ?" },
    { jp: "雨が降りそうです", fr: "On dirait qu'il va pleuvoir" }
  ]
};

// Exporte les variables pour s'assurer qu'elles sont lisibles globalement
window.DB_KANJI = DB_KANJI;
window.DB_VOCAB = DB_VOCAB;
window.DB_DICTATION = DB_DICTATION;
