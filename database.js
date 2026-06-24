/* =========================================================================
   DATABASE.JS - Base de données centrale de Nihongo no Michi
   ========================================================================= */

// 1. BASE DE DONNÉES DES KANJIS (Intégrale)
const DB_KANJI = {
N5: [
    // --- LES NOMBRES ET L'ARGENT ---
    { j: '一', on: 'イチ, イツ', kun: 'ひと(つ)', f: 'Un', rad: '一 (Un)', story: 'Représente le chiffre un par un seul trait horizontal.', words: [{ jp: '一つ', kana: 'ひとつ', fr: 'Un (objet)' }, { jp: '一日', kana: 'ついたち', fr: 'Le 1er du mois' }] },
    { j: '二', on: 'ニ', kun: 'ふた(つ)', f: 'Deux', rad: '二 (Deux)', story: 'Deux traits horizontaux empilés.', words: [{ jp: '二つ', kana: 'ふたつ', fr: 'Deux (objets)' }, { jp: '二月', kana: 'にがつ', fr: 'Février' }] },
    { j: '三', on: 'サン', kun: 'みっ(つ)', f: 'Trois', rad: '一 (Un)', story: 'Trois traits horizontaux empilés.', words: [{ jp: '三つ', kana: 'みっつ', fr: 'Trois (objets)' }, { jp: '三人', kana: 'さんにん', fr: 'Trois personnes' }] },
    { j: '四', on: 'シ', kun: 'よん, よっ(つ)', f: 'Quatre', rad: '囗 (Enclos)', story: 'Le souffle (les traits intérieurs) est enfermé entre les dents : prononcer "shi" (la mort) portait malheur.', words: [{ jp: '四つ', kana: 'よっつ', fr: 'Quatre (objets)' }, { jp: '四月', kana: 'しがつ', fr: 'Avril' }] },
    { j: '五', on: 'ゴ', kun: 'いつ(つ)', f: 'Cinq', rad: '二 (Deux)', story: 'Les cinq doigts de la main qui se croisent pour compter.', words: [{ jp: '五つ', kana: 'いつつ', fr: 'Cinq (objets)' }, { jp: '五円', kana: 'ごえん', fr: '5 yens' }] },
    { j: '六', on: 'ロク', kun: 'むっ(つ)', f: 'Six', rad: '八 (Huit)', story: 'Un homme avec un grand chapeau qui écarte les jambes (ressemble au chiffre 6).', words: [{ jp: '六つ', kana: 'むっつ', fr: 'Six (objets)' }, { jp: '六百', kana: 'ろっぴゃく', fr: 'Six cents' }] },
    { j: '七', on: 'シチ', kun: 'なな(つ)', f: 'Sept', rad: '一 (Un)', story: 'Le trait vertical coupe le trait horizontal : à l\'origine, on comptait en faisant des entailles.', words: [{ jp: '七つ', kana: 'ななつ', fr: 'Sept (objets)' }, { jp: '七時', kana: 'しちじ', fr: 'Sept heures' }] },
    { j: '八', on: 'ハチ', kun: 'やっ(つ)', f: 'Huit', rad: '八 (Huit)', story: 'Deux lignes qui se séparent, symbole de division ou de multiplicité.', words: [{ jp: '八つ', kana: 'やっつ', fr: 'Huit (objets)' }, { jp: '八百', kana: 'はっぴゃく', fr: 'Huit cents' }] },
    { j: '九', on: 'キュウ, ク', kun: 'ここの(つ)', f: 'Neuf', rad: '乙 (Crochet)', story: 'La main d\'un homme qui fait un mouvement croisé.', words: [{ jp: '九つ', kana: 'ここのつ', fr: 'Neuf (objets)' }, { jp: '九月', kana: 'くがつ', fr: 'Septembre' }] },
    { j: '十', on: 'ジュウ', kun: 'とお', f: 'Dix', rad: '十 (Dix)', story: 'Une croix qui rassemble tous les points cardinaux (la complétude).', words: [{ jp: '十', kana: 'とお', fr: 'Dix (objets)' }, { jp: '十分', kana: 'じゅっぷん', fr: 'Dix minutes / Suffisant' }] },
    { j: '百', on: 'ヒャク', kun: '', f: 'Cent', rad: '白 (Blanc)', story: 'Le chiffre Un (一) placé au-dessus du blanc (白) : le sommet de la numération de base.', words: [{ jp: '三百', kana: 'さんびゃく', fr: 'Trois cents' }, { jp: '百円', kana: 'ひゃくえん', fr: '100 yens' }] },
    { j: '千', on: 'セン', kun: 'ち', f: 'Mille', rad: '十 (Dix)', story: 'Une goutte ajoutée sur la croix du dix (十) pour multiplier sa valeur.', words: [{ jp: '三千', kana: 'さんぜん', fr: 'Trois mille' }, { jp: '千葉', kana: 'ちば', fr: 'Chiba (ville)' }] },
    { j: '万', on: 'マン, バン', kun: '', f: 'Dix mille', rad: '一 (Un)', story: 'À l\'origine, c\'était le dessin d\'un scorpion, dont les œufs sont innombrables (myriade).', words: [{ jp: '一万', kana: 'いちまん', fr: 'Dix mille' }, { jp: '万年筆', kana: 'まんねんひつ', fr: 'Stylo-plume' }] },
    { j: '円', on: 'エン', kun: 'まる(い)', f: 'Yen / Cercle', rad: '冂 (Boîte)', story: 'Représente l\'argent qui tourne dans la société, enfermé dans une caisse.', words: [{ jp: '百円', kana: 'ひゃくえん', fr: 'Cent yens' }, { jp: '円い', kana: 'まるい', fr: 'Rond / Circulaire' }] },

    // --- LE TEMPS ET LA NATURE ---
    { j: '日', on: 'ニチ, ジツ', kun: 'ひ, -び, か', f: 'Soleil / Jour', rad: '日 (Soleil)', story: 'Représente le dessin d\'un soleil avec une tache (ou énergie) au centre.', words: [{ jp: '日', kana: 'ひ', fr: 'Le soleil / Le jour' }, { jp: '日本', kana: 'にほん', fr: 'Le Japon' }, { jp: '日曜日', kana: 'にちようび', fr: 'Dimanche' }] },
    { j: '月', on: 'ゲツ, ガツ', kun: 'つき', f: 'Lune / Mois', rad: '月 (Lune)', story: 'Le dessin du croissant de lune à moitié caché par les nuages.', words: [{ jp: '月', kana: 'つき', fr: 'La lune' }, { jp: '一月', kana: 'いちがつ', fr: 'Janvier' }, { jp: '月曜日', kana: 'げつようび', fr: 'Lundi' }] },
    { j: '火', on: 'カ', kun: 'ひ, -び, ほ', f: 'Feu', rad: '火 (Feu)', story: 'Des flammes qui s\'élèvent d\'un feu de camp.', words: [{ jp: '火', kana: 'ひ', fr: 'Le feu' }, { jp: '花火', kana: 'はなび', fr: 'Feu d\'artifice' }, { jp: '火曜日', kana: 'かようび', fr: 'Mardi' }] },
    { j: '水', on: 'スイ', kun: 'みず', f: 'Eau', rad: '水 (Eau)', story: 'Représente le courant d\'une rivière au centre, avec des remous de chaque côté.', words: [{ jp: '水', kana: 'みず', fr: 'L\'eau' }, { jp: '水曜日', kana: 'すいようび', fr: 'Mercredi' }] },
    { j: '木', on: 'モク, ボク', kun: 'き, こ', f: 'Arbre / Bois', rad: '木 (Arbre)', story: 'Le tronc central avec ses branches en haut et ses racines ancrées en bas.', words: [{ jp: '木', kana: 'き', fr: 'L\'arbre' }, { jp: '木曜日', kana: 'もくようび', fr: 'Jeudi' }] },
    { j: '金', on: 'キン, コン', kun: 'かね, かな', f: 'Or / Argent (monnaie)', rad: '金 (Or)', story: 'Des pépites d\'or enfouies sous la terre (土) et couvertes par un toit.', words: [{ jp: 'お金', kana: 'おかね', fr: 'L\'argent (monnaie)' }, { jp: '金曜日', kana: 'きんようび', fr: 'Vendredi' }] },
    { j: '土', on: 'ド, ト', kun: 'つち', f: 'Terre / Sol', rad: '土 (Terre)', story: 'Une pousse qui sort de la terre (le trait inférieur est le sol).', words: [{ jp: '土', kana: 'つち', fr: 'La terre' }, { jp: '土曜日', kana: 'どようび', fr: 'Samedi' }] },
    { j: '年', on: 'ネン', kun: 'とし', f: 'Année', rad: '干 (Bouclier)', story: 'Un homme qui porte les récoltes sur son dos : la récolte marque la fin d\'une année.', words: [{ jp: '今年', kana: 'ことし', fr: 'Cette année' }, { jp: '去年', kana: 'きょねん', fr: 'L\'année dernière' }] },
    { j: '時', on: 'ジ', kun: 'とき', f: 'Temps / Heure', rad: '日 (Soleil)', story: 'Le soleil (日) avance vers le temple (寺) au fil du temps.', words: [{ jp: '時間', kana: 'じかん', fr: 'Le temps (durée)' }, { jp: '時計', kana: 'とけい', fr: 'Montre / Horloge' }] },
    { j: '分', on: 'ブン, フン', kun: 'わ(かる)', f: 'Minute / Comprendre / Diviser', rad: '刀 (Sabre)', story: 'Un couteau (刀) qui coupe quelque chose en deux (八) parts égales.', words: [{ jp: '分かる', kana: 'わかる', fr: 'Comprendre' }, { jp: '半分', kana: 'はんぶん', fr: 'La moitié' }] },
    { j: '半', on: 'ハン', kun: 'なか(ば)', f: 'Moitié', rad: '十 (Dix)', story: 'Un fil coupé au milieu, divisant la chose en deux.', words: [{ jp: '半分', kana: 'はんぶん', fr: 'La moitié' }, { jp: '四時半', kana: 'よじはん', fr: 'Quatre heures et demie' }] },
    { j: '今', on: 'コン, キン', kun: 'いま', f: 'Maintenant', rad: '人 (Humain)', story: 'Rassembler (toit) les événements au moment présent.', words: [{ jp: '今日', kana: 'きょう', fr: 'Aujourd\'hui' }, { jp: '今月', kana: 'こんげつ', fr: 'Ce mois-ci' }] },
    { j: '毎', on: 'マイ', kun: '', f: 'Chaque', rad: '毋 (Mère)', story: 'La mère (毋) qui ajoute une épingle à ses cheveux à chaque nouvelle journée.', words: [{ jp: '毎日', kana: 'まいにち', fr: 'Chaque jour' }, { jp: '毎月', kana: 'まいげつ', fr: 'Chaque mois' }] },
    { j: '曜', on: 'ヨウ', kun: '', f: 'Jour de la semaine', rad: '日 (Soleil)', story: 'Le soleil (日) et un oiseau s\'envolant (les plumes à droite) rythment les jours.', words: [{ jp: '日曜日', kana: 'にちようび', fr: 'Dimanche' }] },
    { j: '午', on: 'ゴ', kun: '', f: 'Midi', rad: '十 (Dix)', story: 'Le pilon dans le mortier, ou le soleil exactement au milieu de la journée (la croix).', words: [{ jp: '午前', kana: 'ごぜん', fr: 'Matin (AM)' }, { jp: '午後', kana: 'ごご', fr: 'Après-midi (PM)' }] },
    { j: '間', on: 'カン, ケン', kun: 'あいだ, ま', f: 'Intervalle / Entre', rad: '門 (Porte)', story: 'Le soleil (日) qui brille à travers l\'espace entre les deux battants d\'une porte (門).', words: [{ jp: '間', kana: 'あいだ', fr: 'Entre / Pendant' }, { jp: '時間', kana: 'じかん', fr: 'Le temps' }] },
    { j: '山', on: 'サン', kun: 'やま', f: 'Montagne', rad: '山 (Montagne)', story: 'Les trois pics d\'une chaîne de montagnes.', words: [{ jp: '山', kana: 'やま', fr: 'Montagne' }, { jp: '富士山', kana: 'ふじさん', fr: 'Mont Fuji' }] },
    { j: '川', on: 'セン', kun: 'かわ', f: 'Rivière', rad: '川 (Rivière)', story: 'L\'eau qui s\'écoule en trois courants sinueux.', words: [{ jp: '川', kana: 'かわ', fr: 'Rivière' }, { jp: '山川さん', kana: 'やまかわさん', fr: 'M. Yamakawa' }] },
    { j: '天', on: 'テン', kun: 'あまつ', f: 'Ciel / Paradis', rad: '大 (Grand)', story: 'Ce qui est au-dessus (le grand trait) de l\'homme grand (大).', words: [{ jp: '天気', kana: 'てんき', fr: 'Météo / Temps' }, { jp: '天国', kana: 'てんごく', fr: 'Le Paradis' }] },
    { j: '気', on: 'キ, ケ', kun: 'いき', f: 'Énergie / Esprit / Air', rad: '气 (Vapeur)', story: 'La vapeur (气) qui s\'élève du riz (米) chaud dégage de l\'énergie.', words: [{ jp: '元気', kana: 'げんき', fr: 'En forme / En bonne santé' }, { jp: '気持ち', kana: 'きもち', fr: 'Sentiment / Humeur' }] },
    { j: '空', on: 'クウ', kun: 'そら, あ(く)', f: 'Ciel / Vide', rad: '穴 (Trou)', story: 'Un trou (穴) immense où l\'on travaille à l\'infini : l\'espace vide du ciel.', words: [{ jp: '空', kana: 'そら', fr: 'Le ciel' }, { jp: '空気', kana: 'くうき', fr: 'L\'air' }] },
    { j: '雨', on: 'ウ', kun: 'あめ, あま', f: 'Pluie', rad: '雨 (Pluie)', story: 'Des gouttes d\'eau tombant d\'un nuage sombre dans le ciel (le cadre supérieur).', words: [{ jp: '雨', kana: 'あめ', fr: 'La pluie' }, { jp: '大雨', kana: 'おおあめ', fr: 'Forte pluie' }] },
    { j: '電', on: 'デン', kun: '', f: 'Électricité', rad: '雨 (Pluie)', story: 'Un éclair (le trait en zigzag en bas) s\'abattant pendant la pluie (雨).', words: [{ jp: '電車', kana: 'でんしゃ', fr: 'Le train' }, { jp: '電話', kana: 'でんわ', fr: 'Le téléphone' }] },

    // --- LE CORPS ET LA FAMILLE ---
    { j: '人', on: 'ジン, ニン', kun: 'ひと', f: 'Personne / Humain', rad: '人 (Humain)', story: 'Une personne vue de profil, debout sur ses deux jambes.', words: [{ jp: '人', kana: 'ひと', fr: 'Une personne' }, { jp: '外国人', kana: 'がいこくじん', fr: 'Étranger (nationalité)' }] },
    { j: '男', on: 'ダン, ナン', kun: 'おとこ', f: 'Homme', rad: '田 (Rizière)', story: 'Celui qui utilise sa force (力) dans la rizière (田) pour travailler.', words: [{ jp: '男の人', kana: 'おとこのひと', fr: 'Un homme' }, { jp: '男の子', kana: 'おとこのこ', fr: 'Un garçon' }] },
    { j: '女', on: 'ジョ, ニョ', kun: 'おんな, め', f: 'Femme', rad: '女 (Femme)', story: 'Une femme agenouillée, les mains croisées avec grâce.', words: [{ jp: '女の人', kana: 'おんなのひと', fr: 'Une femme' }, { jp: '女の子', kana: 'おんなのこ', fr: 'Une fille' }] },
    { j: '子', on: 'シ, ス', kun: 'こ', f: 'Enfant', rad: '子 (Enfant)', story: 'Un bébé emmailloté dont on ne voit que la tête, les bras écartés et le corps.', words: [{ jp: '子供', kana: 'こども', fr: 'Enfant' }, { jp: '女子', kana: 'じょし', fr: 'Fille / Femme (formel)' }] },
    { j: '父', on: 'フ', kun: 'ちち', f: 'Père', rad: '父 (Père)', story: 'Deux haches (les traits croisés) tenues par le père de famille pour travailler et protéger.', words: [{ jp: '父', kana: 'ちち', fr: 'Mon père' }, { jp: 'お父さん', kana: 'おとうさん', fr: 'Père (de qqn)' }] },
    { j: '母', on: 'ボ', kun: 'はは', f: 'Mère', rad: '毋 (Mère)', story: 'La forme d\'une femme (女) avec deux points représentant les seins pour nourrir l\'enfant.', words: [{ jp: '母', kana: 'はは', fr: 'Ma mère' }, { jp: 'お母さん', kana: 'おかあさん', fr: 'Mère (de qqn)' }] },
    { j: '目', on: 'モク, ボク', kun: 'め', f: 'Œil', rad: '目 (Œil)', story: 'Le dessin d\'un œil avec ses paupières (tourné à la verticale pour prendre moins de place).', words: [{ jp: '目', kana: 'め', fr: 'L\'œil' }, { jp: '目的', kana: 'もくてき', fr: 'L\'objectif / Le but' }] },
    { j: '口', on: 'コウ, ク', kun: 'くち', f: 'Bouche', rad: '口 (Bouche)', story: 'Une bouche grande ouverte.', words: [{ jp: '口', kana: 'くち', fr: 'La bouche' }, { jp: '入口', kana: 'いりぐち', fr: 'L\'entrée' }] },
    { j: '耳', on: 'ジ', kun: 'みみ', f: 'Oreille', rad: '耳 (Oreille)', story: 'Le contour d\'une oreille humaine avec ses replis internes.', words: [{ jp: '耳', kana: 'みみ', fr: 'L\'oreille' }] },
    { j: '手', on: 'シュ', kun: 'て, た', f: 'Main', rad: '手 (Main)', story: 'Le poignet avec les cinq doigts écartés.', words: [{ jp: '手', kana: 'て', fr: 'La main' }, { jp: '上手', kana: 'じょうず', fr: 'Doué / Habile' }] },
    { j: '足', on: 'ソク', kun: 'あし, た(りる)', f: 'Pied / Jambe / Suffire', rad: '足 (Pied)', story: 'Un bassin (en haut) relié à la jambe et au pied (en bas) s\'arrêtant au sol.', words: [{ jp: '足', kana: 'あし', fr: 'Le pied / La jambe' }, { jp: '足りる', kana: 'たりる', fr: 'Être suffisant' }] },

    // --- L'ESPACE ET LES DIRECTIONS ---
    { j: '上', on: 'ジョウ', kun: 'うえ, あ(がる)', f: 'Haut / Dessus', rad: '一 (Un)', story: 'Un point ou un objet placé au-dessus (上) de la ligne d\'horizon (一).', words: [{ jp: '上', kana: 'うえ', fr: 'Dessus / En haut' }, { jp: '上がる', kana: 'あがる', fr: 'Monter' }] },
    { j: '下', on: 'カ, ゲ', kun: 'した, さ(がる)', f: 'Bas / Dessous', rad: '一 (Un)', story: 'Un point placé en-dessous de la ligne d\'horizon.', words: [{ jp: '下', kana: 'した', fr: 'Dessous / En bas' }, { jp: '下がる', kana: 'さがる', fr: 'Descendre' }] },
    { j: '左', on: 'サ', kun: 'ひだり', f: 'Gauche', rad: '工 (Travail)', story: 'La main gauche qui tient l\'outil de travail (工).', words: [{ jp: '左', kana: 'ひだり', fr: 'Gauche' }, { jp: '左手', kana: 'ひだりて', fr: 'Main gauche' }] },
    { j: '右', on: 'ユウ, ウ', kun: 'みぎ', f: 'Droite', rad: '口 (Bouche)', story: 'La main droite qui amène la nourriture à la bouche (口).', words: [{ jp: '右', kana: 'みぎ', fr: 'Droite' }, { jp: '右手', kana: 'みぎて', fr: 'Main droite' }] },
    { j: '中', on: 'チュウ', kun: 'なか', f: 'Milieu / Intérieur', rad: '丨 (Vertical)', story: 'Une flèche (丨) qui traverse le centre exact d\'une cible (口).', words: [{ jp: '中', kana: 'なか', fr: 'À l\'intérieur / Milieu' }, { jp: '中国', kana: 'ちゅうごく', fr: 'La Chine' }] },
    { j: '前', on: 'ゼン', kun: 'まえ', f: 'Avant / Devant', rad: '刀 (Sabre)', story: 'Se tenir debout devant le boucher qui coupe (刀) la viande.', words: [{ jp: '前', kana: 'まえ', fr: 'Devant / Avant' }, { jp: '名前', kana: 'なまえ', fr: 'Le nom' }] },
    { j: '後', on: 'ゴ, コウ', kun: 'うし(ろ), あと', f: 'Après / Derrière', rad: '彳 (Pas)', story: 'Quelqu\'un qui marche (彳) en traînant le fil de ses actions derrière (夂) lui.', words: [{ jp: '後ろ', kana: 'うしろ', fr: 'Derrière' }, { jp: '午後', kana: 'ごご', fr: 'L\'après-midi (PM)' }] },
    { j: '外', on: 'ガイ, ゲ', kun: 'そと, はず(す)', f: 'Dehors / Extérieur', rad: '夕 (Soir)', story: 'La divination (卜) se faisait le soir (夕) à l\'extérieur du temple.', words: [{ jp: '外', kana: 'そと', fr: 'Dehors' }, { jp: '外国', kana: 'がいこく', fr: 'Pays étranger' }] },
    { j: '北', on: 'ホク', kun: 'きた', f: 'Nord', rad: '匕 (Cuillère)', story: 'Deux personnes assises dos à dos pour se protéger du vent froid du nord.', words: [{ jp: '北', kana: 'きた', fr: 'Nord' }, { jp: '北海道', kana: 'ほっかいどう', fr: 'Hokkaido' }] },
    { j: '南', on: 'ナン', kun: 'みなみ', f: 'Sud', rad: '十 (Dix)', story: 'La végétation luxuriante poussant sous le soleil chaleureux du sud.', words: [{ jp: '南', kana: 'みなみ', fr: 'Sud' }, { jp: '南口', kana: 'みなみぐち', fr: 'Entrée sud' }] },
    { j: '東', on: 'トウ', kun: 'ひがし', f: 'Est', rad: '木 (Arbre)', story: 'Le soleil (日) qui se lève derrière un arbre (木) indique l\'Est.', words: [{ jp: '東', kana: 'ひがし', fr: 'Est' }, { jp: '東京', kana: 'とうきょう', fr: 'Tokyo' }] },
    { j: '西', on: 'セイ, サイ', kun: 'にし', f: 'Ouest', rad: '襾 (Ouest)', story: 'Un oiseau retournant se poser dans son nid au coucher du soleil, à l\'Ouest.', words: [{ jp: '西', kana: 'にし', fr: 'Ouest' }, { jp: '西洋', kana: 'せいよう', fr: 'L\'Occident' }] },

    // --- LES ADJECTIFS ---
    { j: '大', on: 'ダイ, タイ', kun: 'おお(きい)', f: 'Grand', rad: '大 (Grand)', story: 'Un homme avec les bras grands écartés pour montrer sa taille.', words: [{ jp: '大きい', kana: 'おおきい', fr: 'Grand' }, { jp: '大学', kana: 'だいがく', fr: 'Université' }] },
    { j: '小', on: 'ショウ', kun: 'ちい(さい), こ', f: 'Petit', rad: '小 (Petit)', story: 'Quelque chose de divisé (八) et réduit à un point central (亅).', words: [{ jp: '小さい', kana: 'ちいさい', fr: 'Petit' }, { jp: '小学校', kana: 'しょうがっこう', fr: 'École primaire' }] },
    { j: '高', on: 'コウ', kun: 'たか(い)', f: 'Haut / Cher', rad: '高 (Haut)', story: 'Un grand pavillon ou une tour avec un toit élevé.', words: [{ jp: '高い', kana: 'たかい', fr: 'Haut / Cher' }, { jp: '高校', kana: 'こうこう', fr: 'Lycée' }] },
    { j: '安', on: 'アン', kun: 'やす(い)', f: 'Bon marché / Sécurisé', rad: '宀 (Toit)', story: 'Une femme (女) en sécurité sous un toit (宀) : la tranquillité d\'esprit.', words: [{ jp: '安い', kana: 'やすい', fr: 'Bon marché (Pas cher)' }, { jp: '安全', kana: 'あんぜん', fr: 'Sécurité' }] },
    { j: '新', on: 'シン', kun: 'あたら(しい)', f: 'Nouveau', rad: '斤 (Hache)', story: 'Couper un arbre debout (木) avec une hache (斤) pour avoir du bois nouveau.', words: [{ jp: '新しい', kana: 'あたらしい', fr: 'Nouveau' }, { jp: '新聞', kana: 'しんぶん', fr: 'Journal' }] },
    { j: '古', on: 'コ', kun: 'ふる(い)', f: 'Vieux', rad: '口 (Bouche)', story: 'Une histoire répétée par la bouche (口) de dix (十) générations.', words: [{ jp: '古い', kana: 'ふるい', fr: 'Vieux / Ancien' }, { jp: '中古', kana: 'ちゅうこ', fr: 'D\'occasion' }] },
    { j: '白', on: 'ハク, ビャク', kun: 'しろ(い)', f: 'Blanc', rad: '白 (Blanc)', story: 'Le soleil (日) d\'où jaillit un rayon (le petit trait), éblouissant et blanc.', words: [{ jp: '白い', kana: 'しろい', fr: 'Blanc' }, { jp: '面白い', kana: 'おもしろい', fr: 'Intéressant / Amusant' }] },
    { j: '長', on: 'チョウ', kun: 'なが(い)', f: 'Long / Chef', rad: '長 (Long)', story: 'Les longs cheveux flottants d\'un ancien ou du chef du village.', words: [{ jp: '長い', kana: 'ながい', fr: 'Long' }, { jp: '社長', kana: 'しゃちょう', fr: 'PDG' }] },

    // --- LES ACTIONS (VERBES) ---
    { j: '行', on: 'コウ, ギョウ', kun: 'い(く), ゆ(く)', f: 'Aller', rad: '行 (Aller)', story: 'Le croisement des chemins, représentant le déplacement.', words: [{ jp: '行く', kana: 'いく', fr: 'Aller' }, { jp: '銀行', kana: 'ぎんこう', fr: 'La banque' }] },
    { j: '来', on: 'ライ', kun: 'く(る), き, こ', f: 'Venir', rad: '木 (Arbre)', story: 'Le blé (forme ancienne) qui pousse et "vient" nous nourrir.', words: [{ jp: '来る', kana: 'くる', fr: 'Venir' }, { jp: '来年', kana: 'らいねん', fr: 'L\'année prochaine' }] },
    { j: '帰', on: 'キ', kun: 'かえ(る)', f: 'Rentrer chez soi', rad: '止 (Arrêter)', story: 'S\'arrêter (止) de travailler et balayer (ヨ) pour rentrer.', words: [{ jp: '帰る', kana: 'かえる', fr: 'Rentrer à la maison' }, { jp: '帰国', kana: 'きこく', fr: 'Retourner dans son pays' }] },
    { j: '見', on: 'ケン', kun: 'み(る), み(える)', f: 'Voir', rad: '見 (Voir)', story: 'Un grand œil (目) monté sur des jambes humaines (儿).', words: [{ jp: '見る', kana: 'みる', fr: 'Regarder' }, { jp: '花見', kana: 'はなみ', fr: 'Contemplation des fleurs' }] },
    { j: '聞', on: 'ブン, モン', kun: 'き(く), き(こえる)', f: 'Écouter / Demander', rad: '耳 (Oreille)', story: 'Une oreille (耳) collée à la porte (門) pour espionner.', words: [{ jp: '聞く', kana: 'きく', fr: 'Écouter / Demander' }, { jp: '新聞', kana: 'しんぶん', fr: 'Le journal (les nouvelles)' }] },
    { j: '読', on: 'ドク, トク', kun: 'よ(む)', f: 'Lire', rad: '言 (Parole)', story: 'Utiliser la parole (言) pour vendre (売) une histoire, la lire à voix haute.', words: [{ jp: '読む', kana: 'よむ', fr: 'Lire' }, { jp: '読書', kana: 'どくしょ', fr: 'La lecture' }] },
    { j: '書', on: 'ショ', kun: 'か(く)', f: 'Écrire', rad: '曰 (Dire)', story: 'Une main tenant un pinceau (au-dessus) qui trace les paroles du soleil (日).', words: [{ jp: '書く', kana: 'かく', fr: 'Écrire' }, { jp: '辞書', kana: 'じしょ', fr: 'Dictionnaire' }] },
    { j: '話', on: 'ワ', kun: 'はな(す), はなし', f: 'Parler', rad: '言 (Parole)', story: 'Les paroles (言) qui sortent de la langue (舌).', words: [{ jp: '話す', kana: 'はなす', fr: 'Parler' }, { jp: '電話', kana: 'でんわ', fr: 'Téléphone' }] },
    { j: '教', on: 'キョウ', kun: 'おし(える), おそ(わる)', f: 'Enseigner', rad: '攴 (Frapper)', story: 'Frapper (攵) gentiment un enfant (子) âgé (孝) pour lui enseigner.', words: [{ jp: '教える', kana: 'おしえる', fr: 'Enseigner' }, { jp: '教室', kana: 'きょうしつ', fr: 'Salle de classe' }] },
    { j: '食', on: 'ショク', kun: 'た(べる)', f: 'Manger', rad: '食 (Manger)', story: 'Un rassemblement de personnes (人) sous un toit autour d\'un bol de nourriture.', words: [{ jp: '食べる', kana: 'たべる', fr: 'Manger' }, { jp: '食事', kana: 'しょくじ', fr: 'Repas' }] },
    { j: '飲', on: 'イン', kun: 'の(む)', f: 'Boire', rad: '食 (Nourriture)', story: 'Quelqu\'un qui ouvre la bouche (欠) pour absorber de la nourriture ou de l\'eau (食).', words: [{ jp: '飲む', kana: 'のむ', fr: 'Boire' }, { jp: '飲み物', kana: 'のみもの', fr: 'Boisson' }] },
    { j: '休', on: 'キュウ', kun: 'やす(む)', f: 'Se reposer', rad: '亻 (Humain)', story: 'Un humain (亻) adossé à un arbre (木) pour faire une pause.', words: [{ jp: '休む', kana: 'やすむ', fr: 'Se reposer' }, { jp: '休み', kana: 'やすみ', fr: 'Vacances' }] },
    { j: '立', on: 'リツ', kun: 'た(つ)', f: 'Se lever / Être debout', rad: '立 (Debout)', story: 'Un homme debout, les bras et les jambes écartés sur le sol (一).', words: [{ jp: '立つ', kana: 'たつ', fr: 'Se lever' }, { jp: '国立', kana: 'こくりつ', fr: 'National' }] },
    { j: '入', on: 'ニュウ', kun: 'はい(る), い(れる)', f: 'Entrer', rad: '入 (Entrer)', story: 'Une forme en pointe qui pénètre ou s\'enfonce de l\'extérieur vers l\'intérieur.', words: [{ jp: '入る', kana: 'はいる', fr: 'Entrer' }, { jp: '入口', kana: 'いりぐち', fr: 'Entrée' }] },
    { j: '出', on: 'シュツ', kun: 'で(る), だ(す)', f: 'Sortir', rad: '凵 (Récipient)', story: 'Une plante ou un pied qui sort d\'un trou pour aller vers le haut.', words: [{ jp: '出る', kana: 'でる', fr: 'Sortir' }, { jp: '出口', kana: 'でぐち', fr: 'Sortie' }] },

    // --- CONCEPTS ET ÉDUCATION ---
    { j: '生', on: 'セイ, ショウ', kun: 'い(きる), う(まれる)', f: 'Vie / Naître', rad: '生 (Vie)', story: 'Une petite plante qui pousse en sortant de la terre (土).', words: [{ jp: '生きる', kana: 'いきる', fr: 'Vivre' }, { jp: '学生', kana: 'がくせい', fr: 'Étudiant' }] },
    { j: '先', on: 'セン', kun: 'さき', f: 'Avant / Précédent', rad: '儿 (Jambes)', story: 'Une personne (儿) qui marche en tête, devant les autres sur le chemin de la vie (土).', words: [{ jp: '先生', kana: 'せんせい', fr: 'Professeur' }, { jp: '先月', kana: 'せんげつ', fr: 'Le mois dernier' }] },
    { j: '学', on: 'ガク', kun: 'まな(ぶ)', f: 'Étudier', rad: '子 (Enfant)', story: 'Un enfant (子) sous un toit d\'école (冖) absorbant la connaissance.', words: [{ jp: '学生', kana: 'がくせい', fr: 'Étudiant' }, { jp: '学校', kana: 'がっこう', fr: 'L\'école' }] },
    { j: '校', on: 'コウ', kun: '', f: 'École', rad: '木 (Arbre)', story: 'Un bâtiment construit en bois (木) où le père (父) échange de la connaissance.', words: [{ jp: '学校', kana: 'がっこう', fr: 'L\'école' }, { jp: '高校', kana: 'こうこう', fr: 'Le lycée' }] },
    { j: '本', on: 'ホン', kun: 'もと', f: 'Livre / Origine', rad: '木 (Arbre)', story: 'Un trait (一) souligne la racine de l\'arbre (木) : l\'origine, ou le livre (fait de bois).', words: [{ jp: '本', kana: 'ほん', fr: 'Livre' }, { jp: '日本', kana: 'にほん', fr: 'Japon (Origine du soleil)' }] },
    { j: '名', on: 'メイ, ミョウ', kun: 'な', f: 'Nom', rad: '口 (Bouche)', story: 'Dans la pénombre du soir (夕), on utilise la bouche (口) pour dire son nom.', words: [{ jp: '名前', kana: 'なまえ', fr: 'Le nom' }, { jp: '有名', kana: 'ゆうめい', fr: 'Célèbre' }] },
    { j: '語', on: 'ゴ', kun: 'かた(る)', f: 'Langue / Mot', rad: '言 (Parole)', story: 'Cinq (五) bouches (口) qui utilisent la parole (言) pour former une langue.', words: [{ jp: '日本語', kana: 'にほんご', fr: 'Le japonais' }, { jp: '英語', kana: 'えいご', fr: 'L\'anglais' }] },
    { j: '何', on: 'カ', kun: 'なに, なん', f: 'Quoi / Que', rad: '亻 (Humain)', story: 'Un humain (亻) portant un fardeau (可), se demandant ce que cela peut bien être.', words: [{ jp: '何', kana: 'なに', fr: 'Quoi ?' }, { jp: '何か', kana: 'なにか', fr: 'Quelque chose' }] },
    { j: '国', on: 'コク', kun: 'くに', f: 'Pays', rad: '囗 (Enclos)', story: 'Un roi avec son trésor (玉) protégé à l\'intérieur des frontières (囗) de son pays.', words: [{ jp: '国', kana: 'くに', fr: 'Le pays' }, { jp: '外国', kana: 'がいこく', fr: 'Pays étranger' }] },
    { j: '車', on: 'シャ', kun: 'くるま', f: 'Voiture / Véhicule', rad: '車 (Voiture)', story: 'Une vue de dessus d\'un chariot avec ses deux roues et son essieu central.', words: [{ jp: '車', kana: 'くるま', fr: 'Voiture' }, { jp: '電車', kana: 'でんしゃ', fr: 'Train électrique' }] },
    { j: '友', on: 'ユウ', kun: 'とも', f: 'Ami', rad: '又 (Main droite)', story: 'Deux mains qui se serrent dans une poignée d\'amitié.', words: [{ jp: '友達', kana: 'ともだち', fr: 'Ami' }, { jp: '友人', kana: 'ゆうじん', fr: 'Ami (plus formel)' }] },
    { j: '駅', on: 'エキ', kun: '', f: 'Gare', rad: '馬 (Cheval)', story: 'Autrefois, le relais (尺) où l\'on changeait de chevaux (馬).', words: [{ jp: '駅', kana: 'えき', fr: 'La gare' }, { jp: '駅前', kana: 'えきまえ', fr: 'Devant la gare' }] },
    { j: '道', on: 'ドウ, トウ', kun: 'みち', f: 'Chemin / Voie', rad: '辶 (Marcher)', story: 'La route sur laquelle marche (辶) le chef (首).', words: [{ jp: '道', kana: 'みち', fr: 'Le chemin / La rue' }, { jp: '柔道', kana: 'じゅうどう', fr: 'Le judo' }] },
    { j: '社', on: 'シャ', kun: 'やしろ', f: 'Société / Sanctuaire', rad: '示 (Autel)', story: 'L\'autel (示) où les gens de la terre (土) se rassemblent pour former une société.', words: [{ jp: '会社', kana: 'かいしゃ', fr: 'Entreprise' }, { jp: '社長', kana: 'しゃちょう', fr: 'Le PDG' }] }
  ],
  N4: [
    // --- CEUX DÉJÀ PRÉSENTS (AMÉLIORÉS) ---
    { j: '思', on: 'シ', kun: 'おも(う)', f: 'Penser', rad: '心 (Cœur)', story: 'Le cerveau (champ 田) connecté au cœur (心) forme la pensée émotionnelle.', words: [{ jp: '思う', kana: 'おもう', fr: 'Penser' }, { jp: '思い出す', kana: 'おもいだす', fr: 'Se souvenir' }] },
    { j: '言', on: 'ゲン, ゴン', kun: 'い(う), こと', f: 'Dire / Mot', rad: '言 (Parole)', story: 'Des ondes sonores (traits du haut) sortant d\'une bouche (口).', words: [{ jp: '言う', kana: 'いう', fr: 'Dire' }, { jp: '言葉', kana: 'ことば', fr: 'Mot / Langue' }] },
    { j: '買', on: 'バイ', kun: 'か(う)', f: 'Acheter', rad: '貝 (Coquillage)', story: 'Un filet (罒) pour attraper des coquillages (貝) qui servaient autrefois de monnaie.', words: [{ jp: '買う', kana: 'かう', fr: 'Acheter' }, { jp: '買い物', kana: 'かいもの', fr: 'Les courses (achats)' }] },
    { j: '社', on: 'シャ', kun: 'やしろ', f: 'Société / Sanctuaire', rad: '示 (Autel)', story: 'Les gens se rassemblent autour de l\'autel de la terre (土).', words: [{ jp: '会社', kana: 'かいしゃ', fr: 'Entreprise' }, { jp: '社会', kana: 'しゃかい', fr: 'Société' }] },
    { j: '知', on: 'チ', kun: 'し(る)', f: 'Savoir / Connaître', rad: '矢 (Flèche)', story: 'Une flèche (矢) qui frappe la bouche (口) : la connaissance est directe et précise.', words: [{ jp: '知る', kana: 'しる', fr: 'Savoir' }, { jp: 'お知らせ', kana: 'おしらせ', fr: 'Avis / Annonce' }] },

    // --- LE TEMPS ET LES SAISONS ---
    { j: '春', on: 'シュン', kun: 'はる', f: 'Printemps', rad: '日 (Soleil)', story: 'Trois personnes assises qui se réchauffent sous le soleil (日) printanier.', words: [{ jp: '春', kana: 'はる', fr: 'Le printemps' }, { jp: '春休み', kana: 'はるやすみ', fr: 'Vacances de printemps' }] },
    { j: '夏', on: 'カ', kun: 'なつ', f: 'Été', rad: '夂 (Marcher lentement)', story: 'Une tête (頁) qui transpire en marchant (夂) sous la chaleur étouffante.', words: [{ jp: '夏', kana: 'なつ', fr: 'L\'été' }, { jp: '夏休み', kana: 'なつやすみ', fr: 'Vacances d\'été' }] },
    { j: '秋', on: 'シュウ', kun: 'あき', f: 'Automne', rad: '禾 (Céréale)', story: 'On met le feu (火) aux champs de céréales (禾) après la moisson d\'automne.', words: [{ jp: '秋', kana: 'あき', fr: 'L\'automne' }, { jp: '秋分', kana: 'しゅうぶん', fr: 'Équinoxe d\'automne' }] },
    { j: '冬', on: 'トウ', kun: 'ふゆ', f: 'Hiver', rad: '冫 (Glace)', story: 'Des traces de pas (夂) glissant sur la glace (冫) en hiver.', words: [{ jp: '冬', kana: 'ふゆ', fr: 'L\'hiver' }, { jp: '冬休み', kana: 'ふゆやすみ', fr: 'Vacances d\'hiver' }] },
    { j: '朝', on: 'チョウ', kun: 'あさ', f: 'Matin', rad: '月 (Lune)', story: 'La lune (月) se retire à droite pendant que le soleil se lève dans la brume (十).', words: [{ jp: '朝', kana: 'あさ', fr: 'Le matin' }, { jp: '毎朝', kana: 'まいあさ', fr: 'Tous les matins' }] },
    { j: '昼', on: 'チュウ', kun: 'ひる', f: 'Midi / Journée', rad: '日 (Soleil)', story: 'Le pinceau (en haut) trace la limite où le soleil (日) est au zénith.', words: [{ jp: '昼', kana: 'ひる', fr: 'Le midi / le jour' }, { jp: '昼休み', kana: 'ひるやすみ', fr: 'Pause de midi' }] },
    { j: '夜', on: 'ヤ', kun: 'よる, よ', f: 'Nuit / Soir', rad: '夕 (Soir)', story: 'Une personne (人) sous un toit regarde la nuit (夕) tomber.', words: [{ jp: '夜', kana: 'よる', fr: 'La nuit' }, { jp: '今夜', kana: 'こんや', fr: 'Ce soir' }] },

    // --- LE FOYER ET LA FAMILLE ---
    { j: '家', on: 'カ, ケ', kun: 'いえ, うち', f: 'Maison', rad: '宀 (Toit)', story: 'Un cochon (豕) élevé en sécurité sous un toit (宀) montre qu\'on est chez soi.', words: [{ jp: '家', kana: 'いえ', fr: 'Maison' }, { jp: '家族', kana: 'かぞく', fr: 'Famille' }] },
    { j: '族', on: 'ゾク', kun: '', f: 'Tribu / Famille', rad: '方 (Direction)', story: 'Les gens qui se regroupent sous la même bannière (方).', words: [{ jp: '家族', kana: 'かぞく', fr: 'Famille' }, { jp: '民族', kana: 'みんぞく', fr: 'Peuple / Ethnie' }] },
    { j: '兄', on: 'キョウ', kun: 'あに', f: 'Grand frère', rad: '儿 (Jambes)', story: 'La grande bouche (口) sur des jambes (儿) : c\'est l\'aîné qui donne les ordres.', words: [{ jp: '兄', kana: 'あに', fr: 'Mon grand frère' }, { jp: 'お兄さん', kana: 'おにいさん', fr: 'Grand frère (de qqn)' }] },
    { j: '弟', on: 'テイ, ダイ', kun: 'おとうと', f: 'Petit frère', rad: '弓 (Arc)', story: 'Un arc (弓) entouré d\'une corde : le cadet qui suit les liens de l\'aîné.', words: [{ jp: '弟', kana: 'おとうと', fr: 'Petit frère' }, { jp: '兄弟', kana: 'きょうだい', fr: 'Frères et sœurs' }] },
    { j: '姉', on: 'シ', kun: 'あね', f: 'Grande sœur', rad: '女 (Femme)', story: 'La femme (女) de la ville (市) qui est sophistiquée : la grande sœur.', words: [{ jp: '姉', kana: 'あね', fr: 'Ma grande sœur' }, { jp: 'お姉さん', kana: 'おねえさん', fr: 'Grande sœur (de qqn)' }] },
    { j: '妹', on: 'マイ', kun: 'いもうと', f: 'Petite sœur', rad: '女 (Femme)', story: 'La femme (女) dont la croissance n\'est pas encore (未) achevée.', words: [{ jp: '妹', kana: 'いもうと', fr: 'Petite sœur' }, { jp: '姉妹', kana: 'しまい', fr: 'Sœurs' }] },

    // --- LA VILLE ET LES BÂTIMENTS ---
    { j: '京', on: 'キョウ, ケイ', kun: 'みやこ', f: 'Capitale', rad: '亠 (Toit)', story: 'Une porte de ville colossale avec un toit élevé marquant la capitale.', words: [{ jp: '東京', kana: 'とうきょう', fr: 'Tokyo' }, { jp: '京都', kana: 'きょうと', fr: 'Kyoto' }] },
    { j: '都', on: 'ト, ツ', kun: 'みやこ', f: 'Métropole', rad: '阝 (Ville)', story: 'Celui (者) qui vit dans la grande métropole (阝).', words: [{ jp: '都市', kana: 'とし', fr: 'Grande ville' }, { jp: '都合', kana: 'つごう', fr: 'Circonstances / Emploi du temps' }] },
    { j: '店', on: 'テン', kun: 'みせ', f: 'Magasin', rad: '广 (Vaste toit)', story: 'Un bâtiment (广) où l\'on expose la divination (占) pour la vendre.', words: [{ jp: '店', kana: 'みせ', fr: 'Magasin' }, { jp: '喫茶店', kana: 'きっさてん', fr: 'Café / Salon de thé' }] },
    { j: '病', on: 'ビョウ', kun: 'やまい, や(む)', f: 'Maladie', rad: '疒 (Maladie)', story: 'La tente d\'infirmerie (疒) qui frappe la troisième personne (丙).', words: [{ jp: '病気', kana: 'びょうき', fr: 'Maladie' }, { jp: '病院', kana: 'びょういん', fr: 'Hôpital' }] },
    { j: '院', on: 'イン', kun: '', f: 'Institution', rad: '阝 (Ville/Bâtiment)', story: 'Un grand bâtiment (阝) avec un toit (宀) solide où l\'éducation est achevée (完).', words: [{ jp: '病院', kana: 'びょういん', fr: 'Hôpital' }, { jp: '大学院', kana: 'だいがくいん', fr: 'École doctorale' }] },

    // --- LE CORPS ET L'ESPRIT ---
    { j: '心', on: 'シン', kun: 'こころ', f: 'Cœur / Esprit', rad: '心 (Cœur)', story: 'Le dessin anatomique d\'un cœur avec ses valves.', words: [{ jp: '心', kana: 'こころ', fr: 'Le cœur / L\'esprit' }, { jp: '安心', kana: 'あんしん', fr: 'Soulagement' }] },
    { j: '体', on: 'タイ, テイ', kun: 'からだ', f: 'Corps', rad: '亻 (Humain)', story: 'La racine principale (本) de l\'humain (亻), c\'est son corps.', words: [{ jp: '体', kana: 'からだ', fr: 'Le corps' }, { jp: '体育', kana: 'たいいく', fr: 'Éducation physique' }] },
    { j: '頭', on: 'トウ, ズ', kun: 'あたま', f: 'Tête', rad: '頁 (Tête)', story: 'Le haricot (豆) symbolise la forme ovale de la tête (頁) humaine.', words: [{ jp: '頭', kana: 'あたま', fr: 'La tête' }, { jp: '頭痛', kana: 'ずつう', fr: 'Mal de tête' }] },
    { j: '顔', on: 'ガン', kun: 'かお', f: 'Visage', rad: '頁 (Tête)', story: 'La partie de la tête (頁) couverte de poils/cheveux (彦) : le visage.', words: [{ jp: '顔', kana: 'かお', fr: 'Visage' }, { jp: '笑顔', kana: 'えがお', fr: 'Visage souriant' }] },
    { j: '楽', on: 'ガク, ラク', kun: 'たの(しい)', f: 'Plaisir / Musique', rad: '木 (Arbre)', story: 'Un grand tambour blanc (白) et des cymbales montés sur un arbre (木) pour jouer de la musique.', words: [{ jp: '楽しい', kana: 'たのしい', fr: 'Amusant / Agréable' }, { jp: '音楽', kana: 'おんがく', fr: 'Musique' }] },
    { j: '歌', on: 'カ', kun: 'うた, うた(う)', f: 'Chanson', rad: '欠 (Bâiller / Souffle)', story: 'Ouvrir la bouche (欠) pour accompagner les paroles de son grand-frère (兄).', words: [{ jp: '歌', kana: 'うた', fr: 'Chanson' }, { jp: '歌手', kana: 'かしゅ', fr: 'Chanteur' }] },

    // --- ACTIONS ET MOUVEMENTS ---
    { j: '歩', on: 'ホ, ブ', kun: 'ある(く)', f: 'Marcher', rad: '止 (S\'arrêter)', story: 'S\'arrêter (止) puis faire un pas de plus, un peu (少) à la fois.', words: [{ jp: '歩く', kana: 'あるく', fr: 'Marcher' }, { jp: '散歩', kana: 'さんぽ', fr: 'Promenade' }] },
    { j: '走', on: 'ソウ', kun: 'はし(る)', f: 'Courir', rad: '走 (Courir)', story: 'La terre (土) qui défile sous les pieds (止) quand on court vite.', words: [{ jp: '走る', kana: 'はしる', fr: 'Courir' }] },
    { j: '起', on: 'キ', kun: 'お(きる), お(こす)', f: 'Se lever / Réveiller', rad: '走 (Courir)', story: 'Courir (走) vers soi-même (己) pour retrouver ses esprits et se lever.', words: [{ jp: '起きる', kana: 'おきる', fr: 'Se lever' }, { jp: '早起き', kana: 'はやおき', fr: 'Se lever tôt' }] },
    { j: '乗', on: 'ジョウ', kun: 'の(る), の(せる)', f: 'Monter (véhicule)', rad: '丿 (Trait)', story: 'Des personnes (人) grimées sur le tronc d\'un arbre (木) ou un véhicule.', words: [{ jp: '乗る', kana: 'のる', fr: 'Monter dans un transport' }, { jp: '乗り物', kana: 'のりもの', fr: 'Véhicule' }] },
    { j: '作', on: 'サク, サ', kun: 'つく(る)', f: 'Fabriquer / Créer', rad: '亻 (Humain)', story: 'Un humain (亻) qui utilise un outil pour créer (乍) un objet.', words: [{ jp: '作る', kana: 'つくる', fr: 'Fabriquer' }, { jp: '作文', kana: 'さくぶん', fr: 'Rédaction / Essai' }] },
    { j: '使', on: 'シ', kun: 'つか(う)', f: 'Utiliser', rad: '亻 (Humain)', story: 'Un humain (亻) à qui l\'on donne l\'ordre (吏) d\'utiliser quelque chose.', words: [{ jp: '使う', kana: 'つかう', fr: 'Utiliser' }, { jp: '大使館', kana: 'たいしかん', fr: 'Ambassade' }] },
    { j: '貸', on: 'タイ', kun: 'か(す)', f: 'Prêter', rad: '貝 (Coquillage/Argent)', story: 'Substituer (代) de l\'argent (貝) à quelqu\'un d\'autre, c\'est lui prêter.', words: [{ jp: '貸す', kana: 'かす', fr: 'Prêter' }, { jp: '賃貸', kana: 'ちんたい', fr: 'Location' }] },
    { j: '借', on: 'シャク', kun: 'か(りる)', f: 'Emprunter', rad: '亻 (Humain)', story: 'Un humain (亻) qui va puiser dans son passé (昔) pour emprunter.', words: [{ jp: '借りる', kana: 'かりる', fr: 'Emprunter' }, { jp: '借金', kana: 'しゃっきん', fr: 'Dette / Emprunt' }] },
    { j: '動', on: 'ドウ', kun: 'うご(く)', f: 'Bouger', rad: '力 (Force)', story: 'Soulever quelque chose de lourd (重) nécessite de la force (力) pour le bouger.', words: [{ jp: '動く', kana: 'うごく', fr: 'Bouger (intransitif)' }, { jp: '動物', kana: 'どうぶつ', fr: 'Animal' }] },
    { j: '働', on: 'ドウ', kun: 'はたら(く)', f: 'Travailler', rad: '亻 (Humain)', story: 'Un humain (亻) qui bouge (動) avec force : c\'est le travail physique.', words: [{ jp: '働く', kana: 'はたらく', fr: 'Travailler' }, { jp: '労働', kana: 'ろうどう', fr: 'Le travail (manuel)' }] },

    // --- COULEURS ET FORMES ---
    { j: '黒', on: 'コク', kun: 'くろ, くろ(い)', f: 'Noir', rad: '黒 (Noir)', story: 'Des flammes (灬) sous un champ (里) qui brûle et produit de la suie noire.', words: [{ jp: '黒い', kana: 'くろい', fr: 'Noir' }, { jp: '黒板', kana: 'こくばん', fr: 'Tableau noir' }] },
    { j: '青', on: 'セイ, ショウ', kun: 'あお, あお(い)', f: 'Bleu / Vert', rad: '青 (Bleu)', story: 'La lune (月) brillant sur la vie naissante (生) : la couleur de la nature.', words: [{ jp: '青い', kana: 'あおい', fr: 'Bleu' }, { jp: '青年', kana: 'せいねん', fr: 'Jeune homme' }] },
    { j: '赤', on: 'セキ, シャク', kun: 'あか, あか(い)', f: 'Rouge', rad: '赤 (Rouge)', story: 'Une personne (大) debout au-dessus du feu (火), rougeoyante par la chaleur.', words: [{ jp: '赤い', kana: 'あかい', fr: 'Rouge' }, { jp: '赤ちゃん', kana: 'あかちゃん', fr: 'Bébé' }] },
    { j: '色', on: 'ショク, シキ', kun: 'いろ', f: 'Couleur', rad: '色 (Couleur)', story: 'Deux personnes (ク et 巴) enlacées, ce qui colore le visage de passion.', words: [{ jp: '色', kana: 'いろ', fr: 'Couleur' }, { jp: '景色', kana: 'けしき', fr: 'Paysage' }] },

    // --- ANIMAUX ET NOURRITURE ---
    { j: '魚', on: 'ギョ', kun: 'さかな, うお', f: 'Poisson', rad: '魚 (Poisson)', story: 'La tête (en haut), les écailles/le corps (au milieu 田), et la queue ou l\'eau (灬) en bas.', words: [{ jp: '魚', kana: 'さかな', fr: 'Poisson' }, { jp: '金魚', kana: 'きんぎょ', fr: 'Poisson rouge' }] },
    { j: '鳥', on: 'チョウ', kun: 'とり', f: 'Oiseau', rad: '鳥 (Oiseau)', story: 'Le dessin d\'un oiseau avec son bec (en haut), son œil, ses ailes et ses pattes (灬).', words: [{ jp: '鳥', kana: 'とり', fr: 'Oiseau' }, { jp: '小鳥', kana: 'ことり', fr: 'Petit oiseau' }] },
    { j: '牛', on: 'ギュウ', kun: 'うし', f: 'Vache / Bœuf', rad: '牛 (Vache)', story: 'Une tête de vache avec ses deux cornes.', words: [{ jp: '牛', kana: 'うし', fr: 'Vache' }, { jp: '牛肉', kana: 'ぎゅうにく', fr: 'Viande de bœuf' }] },
    { j: '肉', on: 'ニク', kun: '', f: 'Viande', rad: '肉 (Viande)', story: 'Des nervures et tendons dessinés à l\'intérieur d\'un morceau de chair.', words: [{ jp: '肉', kana: 'にく', fr: 'Viande' }, { jp: '鳥肉', kana: 'とりにく', fr: 'Viande de poulet' }] },
    { j: '茶', on: 'チャ, サ', kun: '', f: 'Thé', rad: '艹 (Herbe)', story: 'Des herbes/feuilles (艹) posées sur un arbre (木) sous un toit (人) pour faire du thé.', words: [{ jp: 'お茶', kana: 'おちゃ', fr: 'Thé' }, { jp: '茶色', kana: 'ちゃいろ', fr: 'Marron (couleur thé)' }] },

    // --- ÉTUDES, COMMUNICATION ET OBJETS ---
    { j: '勉', on: 'ベン', kun: 'つと(める)', f: 'Effort / Étude', rad: '力 (Force)', story: 'Exercer de la force (力) pour échapper ou surmonter (免) une difficulté.', words: [{ jp: '勉強', kana: 'べんきょう', fr: 'Études' }] },
    { j: '漢', on: 'カン', kun: '', f: 'Chine', rad: '氵 (Eau)', story: 'L\'eau (氵) de la rivière Han, représentant la culture chinoise rapportée par les anciens (𦰩).', words: [{ jp: '漢字', kana: 'かんじ', fr: 'Kanji' }] },
    { j: '字', on: 'ジ', kun: 'あざ', f: 'Caractère', rad: '子 (Enfant)', story: 'Un enfant (子) élevé sous un toit (宀) de l\'école pour apprendre les lettres.', words: [{ jp: '文字', kana: 'もじ', fr: 'Lettre / Caractère' }, { jp: '漢字', kana: 'かんじ', fr: 'Kanji' }] },
    { j: '問', on: 'モン', kun: 'と(う), とい', f: 'Question / Demander', rad: '口 (Bouche)', story: 'Une bouche (口) posée devant les portes (門) pour poser une question.', words: [{ jp: '問題', kana: 'もんだい', fr: 'Problème / Question' }, { jp: '質問', kana: 'しつもん', fr: 'Question' }] },
    { j: '質', on: 'シツ, シチ', kun: 'たち, ただ(す)', f: 'Qualité / Contenu', rad: '貝 (Coquillage)', story: 'Prendre deux haches (斤) pour examiner les coquillages (貝) et en vérifier la qualité.', words: [{ jp: '質問', kana: 'しつもん', fr: 'Question' }, { jp: '品質', kana: 'ひんしつ', fr: 'Qualité (d\'un produit)' }] },
    { j: '答', on: 'トウ', kun: 'こた(える), こたえ', f: 'Répondre', rad: '竹 (Bambou)', story: 'Une réponse écrite sur des lattes de bambou (竹) qui s\'assemblent (合).', words: [{ jp: '答える', kana: 'こたえる', fr: 'Répondre' }, { jp: '答え', kana: 'こたえ', fr: 'La réponse' }] },
    { j: '音', on: 'オン, イン', kun: 'おと, ね', f: 'Son', rad: '音 (Son)', story: 'Le soleil (日) qui se tient debout (立), mais ici c\'est l\'idée de vibrations qui se dressent dans l\'air.', words: [{ jp: '音', kana: 'おと', fr: 'Le son' }, { jp: '音楽', kana: 'おんがく', fr: 'Musique' }] },
    { j: '意', on: 'イ', kun: '', f: 'Idée / Sens', rad: '心 (Cœur)', story: 'Le son (音) du cœur (心) : ce que l\'on pense vraiment, son idée.', words: [{ jp: '意味', kana: 'いみ', fr: 'Le sens / La signification' }, { jp: '意見', kana: 'いけん', fr: 'L\'opinion' }] },
    { j: '味', on: 'ミ', kun: 'あじ, あじ(わう)', f: 'Goût', rad: '口 (Bouche)', story: 'La bouche (口) qui n\'a pas encore (未) goûté toutes les saveurs.', words: [{ jp: '味', kana: 'あじ', fr: 'Le goût' }, { jp: '意味', kana: 'いみ', fr: 'Sens / Signification' }] },
    { j: '洋', on: 'ヨウ', kun: '', f: 'Océan / Occident', rad: '氵 (Eau)', story: 'L\'eau (氵) abondante comme un grand troupeau de moutons (羊). L\'Océan.', words: [{ jp: '西洋', kana: 'せいよう', fr: 'L\'Occident' }, { jp: '洋服', kana: 'ようふく', fr: 'Vêtement occidental' }] },
    { j: '服', on: 'フク', kun: '', f: 'Vêtement / Obéir', rad: '月 (Chair)', story: 'Une main (又) pliant (卩) du tissu sur le corps (月) pour s\'habiller.', words: [{ jp: '服', kana: 'ふく', fr: 'Vêtement' }, { jp: '洋服', kana: 'ようふく', fr: 'Vêtements occidentaux' }] },
    { j: '着', on: 'チャク, ジャク', kun: 'き(る), つ(く)', f: 'Porter / Arriver', rad: '羊 (Mouton)', story: 'Un œil (目) qui regarde la laine d\'un mouton (羊) qu\'on va porter comme vêtement.', words: [{ jp: '着る', kana: 'きる', fr: 'Porter (un vêtement)' }, { jp: '着く', kana: 'つく', fr: 'Arriver' }] },
    { j: '物', on: 'ブツ, モツ', kun: 'もの', f: 'Chose', rad: '牛 (Vache)', story: 'Une vache (牛) avec un pavillon/bannière (勿). Les vaches étaient les biens (choses) les plus précieux.', words: [{ jp: '物', kana: 'もの', fr: 'Chose' }, { jp: '買い物', kana: 'かいもの', fr: 'Les achats' }] },
    { j: '用', on: 'ヨウ', kun: 'もち(いる)', f: 'Utilisation / Affaire', rad: '用 (Utilisation)', story: 'Un seau en bois percé d\'une tige pour être utilisé à puiser.', words: [{ jp: '用事', kana: 'ようじ', fr: 'Affaire / Chose à faire' }, { jp: '用意', kana: 'ようい', fr: 'Préparation' }] },
    { j: '紙', on: 'シ', kun: 'かみ', f: 'Papier', rad: '糸 (Fil)', story: 'Des fils (糸) de soie et de la famille (氏) végétale pressés pour faire du papier.', words: [{ jp: '紙', kana: 'かみ', fr: 'Papier' }, { jp: '手紙', kana: 'てがみ', fr: 'Lettre (courrier)' }] },
    { j: '映', on: 'エイ', kun: 'うつ(る), うつ(す)', f: 'Refléter / Projeter', rad: '日 (Soleil)', story: 'Le soleil (日) se reflétant au centre (央) de l\'image.', words: [{ jp: '映画', kana: 'えいが', fr: 'Film' }, { jp: '映る', kana: 'うつる', fr: 'Se refléter' }] },
    { j: '画', on: 'ガ, カク', kun: '', f: 'Image / Trait', rad: '田 (Rizière)', story: 'Un pinceau (聿) qui trace les limites (一) d\'une rizière (田) pour faire un dessin.', words: [{ jp: '映画', kana: 'えいが', fr: 'Film' }, { jp: '計画', kana: 'けいかく', fr: 'Projet / Plan' }] },
    { j: '写', on: 'シャ', kun: 'うつ(す)', f: 'Copier / Photographier', rad: '冖 (Toit)', story: 'Copier et donner (与) les documents sous le toit (冖) de la maison.', words: [{ jp: '写真', kana: 'しゃしん', fr: 'Photographie' }, { jp: '写す', kana: 'うつす', fr: 'Copier' }] },
    { j: '真', on: 'シン', kun: 'ま', f: 'Vrai / Vérité', rad: '目 (Œil)', story: 'L\'œil (目) de l\'outil de divination (匕) cherche la vérité nue.', words: [{ jp: '写真', kana: 'しゃしん', fr: 'Photographie' }, { jp: '真っ白', kana: 'まっしろ', fr: 'Tout blanc' }] },

   // --- LIEUX ET NATURE (SUITE) ---
    { j: '建', on: 'ケン, コン', kun: 'た(てる), た(つ)', f: 'Construire', rad: '廴 (Avancer)', story: 'Avancer (廴) avec un pinceau/instrument (聿) pour tracer les plans et construire.', words: [{ jp: '建てる', kana: 'たてる', fr: 'Construire' }, { jp: '建物', kana: 'たてもの', fr: 'Bâtiment' }] },
    { j: '海', on: 'カイ', kun: 'うみ', f: 'Mer', rad: '氵 (Eau)', story: 'L\'eau (氵) qui est la mère (毎) de toutes les choses : la mer.', words: [{ jp: '海', kana: 'うみ', fr: 'La mer' }, { jp: '海外', kana: 'かいがい', fr: 'Outre-mer / Étranger' }] },
    { j: '森', on: 'シン', kun: 'もり', f: 'Forêt (dense)', rad: '木 (Arbre)', story: 'Trois arbres (木) réunis pour former une forêt très dense.', words: [{ jp: '森', kana: 'もり', fr: 'Forêt' }, { jp: '青森', kana: 'あおもり', fr: 'Aomori (Ville)' }] },
    { j: '林', on: 'リン', kun: 'はやし', f: 'Bois / Bosquet', rad: '木 (Arbre)', story: 'Deux arbres (木) côte à côte formant un petit bois.', words: [{ jp: '林', kana: 'はやし', fr: 'Bois / Forêt clairsemée' }] },
    { j: '地', on: 'チ, ジ', kun: '', f: 'Sol / Terre', rad: '土 (Terre)', story: 'La terre (土) qui s\'étend aussi loin qu\'un serpent/scorpion (也) peut ramper.', words: [{ jp: '地下鉄', kana: 'ちかてつ', fr: 'Métro' }, { jp: '地図', kana: 'ちず', fr: 'Carte (géographique)' }] },
    { j: '切', on: 'セツ, サイ', kun: 'き(る), き(れる)', f: 'Couper', rad: '刀 (Sabre)', story: 'Le nombre sept (七) tranché net par un sabre (刀).', words: [{ jp: '切る', kana: 'きる', fr: 'Couper' }, { jp: '大切', kana: 'たいせつ', fr: 'Important' }] },
    { j: '洗', on: 'セン', kun: 'あら(う)', f: 'Laver', rad: '氵 (Eau)', story: 'L\'eau (氵) qui devance (先) la saleté pour laver.', words: [{ jp: '洗う', kana: 'あらう', fr: 'Laver' }, { jp: 'お手洗い', kana: 'おてあらい', fr: 'Toilettes' }] },
    { j: '急', on: 'キュウ', kun: 'いそ(ぐ)', f: 'Se dépêcher / Urgent', rad: '心 (Cœur)', story: 'Un cœur (心) qui palpite face à une situation (ヨ coincé) : c\'est l\'urgence.', words: [{ jp: '急ぐ', kana: 'いそぐ', fr: 'Se dépêcher' }, { jp: '急行', kana: 'きゅうこう', fr: 'Train express' }] },
    { j: '考', on: 'コウ', kun: 'かんが(える)', f: 'Réfléchir / Penser', rad: '老 (Vieux)', story: 'Un vieillard (老) penché sur sa canne qui réfléchit profondément.', words: [{ jp: '考える', kana: 'かんがえる', fr: 'Réfléchir' }, { jp: '思考', kana: 'しこう', fr: 'Pensée / Réflexion' }] },
     
    // --- CONCEPTS ABSTRAITS ET ADJECTIFS ---
    { j: '多', on: 'タ', kun: 'おお(い)', f: 'Beaucoup', rad: '夕 (Soir)', story: 'Une lune du soir (夕) posée sur une autre (夕) : les soirées s\'accumulent en grand nombre.', words: [{ jp: '多い', kana: 'おおい', fr: 'Beaucoup de / Nombreux' }, { jp: '多分', kana: 'たぶん', fr: 'Peut-être' }] },
    { j: '少', on: 'ショウ', kun: 'すく(ない), すこ(し)', f: 'Peu', rad: '小 (Petit)', story: 'Un trait coupe le petit (小) pour le réduire à encore moins : peu.', words: [{ jp: '少ない', kana: 'すくない', fr: 'Peu de (quantité)' }, { jp: '少し', kana: 'すこし', fr: 'Un peu' }] },
    { j: '広', on: 'コウ', kun: 'ひろ(い)', f: 'Large / Vaste', rad: '广 (Toit)', story: 'Un grand bâtiment (广) qui possède une superficie intérieure privée (ム) très vaste.', words: [{ jp: '広い', kana: 'ひろい', fr: 'Large / Spacieux' }, { jp: '広場', kana: 'ひろば', fr: 'Place publique' }] },
    { j: '明', on: 'メイ, ミョウ', kun: 'あか(るい)', f: 'Lumineux / Clair', rad: '日 (Soleil)', story: 'Le soleil (日) et la lune (月) réunis ensemble chassent les ténèbres.', words: [{ jp: '明るい', kana: 'あかるい', fr: 'Lumineux / Joyeux' }, { jp: '明日', kana: 'あした', fr: 'Demain' }, { jp: '説明', kana: 'せつめい', fr: 'Explication' }] },
    { j: '暗', on: 'アン', kun: 'くら(い)', f: 'Sombre', rad: '日 (Soleil)', story: 'Quand le soleil (日) se cache derrière le son (音) des arbres de la forêt, il fait sombre.', words: [{ jp: '暗い', kana: 'くらい', fr: 'Sombre' }, { jp: '暗証番号', kana: 'あんしょうばんご', fr: 'Code PIN / Mot de passe' }] },
    { j: '強', on: 'キョウ, ゴウ', kun: 'つよ(い)', f: 'Fort', rad: '弓 (Arc)', story: 'Un grand arc (弓) que même un insecte tenace (虫) n\'arrive pas à ronger.', words: [{ jp: '強い', kana: 'つよい', fr: 'Fort' }, { jp: '勉強', kana: 'べんきょう', fr: 'Études' }] },
    { j: '弱', on: 'ジャク', kun: 'よわ(い)', f: 'Faible', rad: '弓 (Arc)', story: 'Deux arcs (弓) ornés de jolies plumes de décoration : ils sont trop fragiles pour tirer.', words: [{ jp: '弱い', kana: 'よわい', fr: 'Faible' }, { jp: '弱点', kana: 'じゃくてん', fr: 'Point faible' }] },
    { j: '重', on: 'ジュウ, チョウ', kun: 'おも(い)', f: 'Lourd', rad: '里 (Village)', story: 'Un paysan qui porte un fardeau sur son dos tout en traversant les champs (里).', words: [{ jp: '重い', kana: 'おもい', fr: 'Lourd' }, { jp: '体重', kana: 'たいじゅう', fr: 'Poids du corps' }] },
    { j: '軽', on: 'ケイ', kun: 'かる(い)', f: 'Léger', rad: '車 (Voiture)', story: 'Un chariot (車) non chargé qui glisse aussi facilement que l\'eau d\'une rivière (巠).', words: [{ jp: '軽い', kana: 'かるい', fr: 'Léger' }, { jp: '軽自動車', kana: 'けいじどうしゃ', fr: 'Petite voiture (Keijidōsha)' }] },
    { j: '早', on: 'ソウ', kun: 'はや(い)', f: 'Tôt / Rapide', rad: '日 (Soleil)', story: 'Le soleil (日) qui apparaît juste au-dessus du casque ou de la tour (十) au petit matin.', words: [{ jp: '早い', kana: 'はやい', fr: 'Tôt / Rapide' }, { jp: '早く', kana: 'はやく', fr: 'Vite / Tôt' }] },
    { j: '悪', on: 'アク, オ', kun: 'わる(い)', f: 'Mauvais', rad: '心 (Cœur)', story: 'Le cœur (心) qui adopte un comportement inférieur ou difforme (亜), générant le mal.', words: [{ jp: '悪い', kana: 'わるい', fr: 'Mauvais' }, { jp: '悪口', kana: 'わるぐち', fr: 'Médisance / Insulte' }] }
  ],
  N3: [
    // --- LES ÉMOTIONS ET LA PENSÉE ---
    { j: '感', on: 'カン', kun: '', f: 'Ressentir / Émotion', rad: '心 (Cœur)', story: 'Une émotion si forte qu\'elle frappe tous les sens et résonne jusqu\'au cœur (心) en bas.', words: [{ jp: '感じる', kana: 'かんじる', fr: 'Ressentir' }, { jp: '感情', kana: 'かんじょう', fr: 'Émotion' }] },
    { j: '想', on: 'ソウ, ソ', kun: 'おも(う)', f: 'Penser / Imaginer', rad: '心 (Cœur)', story: 'Avoir son cœur (心) tourné mutuellement (相) vers quelqu\'un ou une idée.', words: [{ jp: '想像', kana: 'そうぞう', fr: 'Imagination' }, { jp: '予想', kana: 'よそう', fr: 'Prévision / Attente' }] },
    { j: '悲', on: 'ヒ', kun: 'かな(しい)', f: 'Triste', rad: '心 (Cœur)', story: 'Un sentiment d\'injustice ou de négation (非) qui pèse lourdement sur le cœur (心).', words: [{ jp: '悲しい', kana: 'かなしい', fr: 'Triste' }, { jp: '悲劇', kana: 'ひげき', fr: 'Tragédie' }] },
    { j: '怒', on: 'ド', kun: 'いか(る), おこ(る)', f: 'Se fâcher / Colère', rad: '心 (Cœur)', story: 'Le cœur (心) d\'un esclave opprimé (奴), rempli d\'une colère noire.', words: [{ jp: '怒る', kana: 'おこる', fr: 'Se fâcher' }, { jp: '怒り', kana: 'いかり', fr: 'La colère' }] },
    { j: '忘', on: 'ボウ', kun: 'わす(れる)', f: 'Oublier', rad: '心 (Cœur)', story: 'La mort ou la disparition (亡) d\'un souvenir dans le cœur / l\'esprit (心).', words: [{ jp: '忘れる', kana: 'わすれる', fr: 'Oublier' }, { jp: '忘れ物', kana: 'わすれもの', fr: 'Objet perdu / oublié' }] },
    { j: '覚', on: 'カク', kun: 'おぼ(える), さ(める)', f: 'Mémoriser / Se réveiller', rad: '見 (Voir)', story: 'Utiliser ses yeux (見) et étudier (la couronne de 学) pour retenir l\'information.', words: [{ jp: '覚える', kana: 'おぼえる', fr: 'Mémoriser' }, { jp: '目覚まし', kana: 'めざまし', fr: 'Réveil (horloge)' }] },
    { j: '笑', on: 'ショウ', kun: 'わら(う), え(む)', f: 'Rire / Sourire', rad: '竹 (Bambou)', story: 'Se plier (夭) de rire en étant aussi souple qu\'un bambou (竹).', words: [{ jp: '笑う', kana: 'わらう', fr: 'Rire' }, { jp: '笑顔', kana: 'えがお', fr: 'Visage souriant' }] },
    { j: '泣', on: 'キュウ', kun: 'な(く)', f: 'Pleurer', rad: '氵 (Eau)', story: 'L\'eau (氵) des larmes qui coule d\'une personne qui se tient debout (立).', words: [{ jp: '泣く', kana: 'なく', fr: 'Pleurer' }, { jp: '号泣', kana: 'ごうきゅう', fr: 'Pleurer à chaudes larmes' }] },

    // --- SOCIÉTÉ, TRAVAIL ET RELATIONS ---
    { j: '関', on: 'カン', kun: 'せき, かか(わる)', f: 'Lien / Barrière', rad: '門 (Porte)', story: 'Un fil (糸) qui relie deux personnes à travers la grande porte (門).', words: [{ jp: '関係', kana: 'かんけい', fr: 'Relation' }, { jp: '玄関', kana: 'げんかん', fr: 'L\'entrée (d\'une maison)' }] },
    { j: '係', on: 'ケイ', kun: 'かかり', f: 'Lien / En charge de', rad: '亻 (Humain)', story: 'L\'humain (亻) qui est rattaché à un système (系) de travail.', words: [{ jp: '関係', kana: 'かんけい', fr: 'Relation' }, { jp: '係', kana: 'かかり', fr: 'Personne en charge' }] },
    { j: '役', on: 'ヤク, エキ', kun: '', f: 'Rôle / Service', rad: '彳 (Pas)', story: 'Marcher (彳) au pas en tenant une hallebarde (殳) pour accomplir son service civil.', words: [{ jp: '役に立つ', kana: 'やくにたつ', fr: 'Être utile' }, { jp: '市役所', kana: 'しやくしょ', fr: 'Mairie' }] },
    { j: '信', on: 'シン', kun: '', f: 'Croire / Confiance', rad: '亻 (Humain)', story: 'Écouter et croire la parole (言) d\'un humain (亻).', words: [{ jp: '信じる', kana: 'しんじる', fr: 'Croire' }, { jp: '自信', kana: 'じしん', fr: 'Confiance en soi' }] },
    { j: '妻', on: 'サイ', kun: 'つま', f: 'Épouse', rad: '女 (Femme)', story: 'La femme (女) qui tient le balai (⺕) et gère la maison d\'une main de fer.', words: [{ jp: '妻', kana: 'つま', fr: 'Mon épouse' }, { jp: '夫妻', kana: 'ふさい', fr: 'Époux (Monsieur et Madame)' }] },
    { j: '夫', on: 'フ, フウ', kun: 'おっと', f: 'Mari', rad: '大 (Grand)', story: 'L\'homme qui se considère comme le grand (大) numéro un (一) du foyer.', words: [{ jp: '夫', kana: 'おっと', fr: 'Mon mari' }, { jp: '丈夫', kana: 'じょうぶ', fr: 'Solide / Robuste' }] },
    { j: '娘', on: 'ジョ', kun: 'むすめ', f: 'Fille', rad: '女 (Femme)', story: 'Une fille ou une femme (女) fondamentalement bonne (良).', words: [{ jp: '娘', kana: 'むすめ', fr: 'Ma fille' }, { jp: 'お嬢さん', kana: 'おじょうさん', fr: 'Jeune fille (politesse)' }] },
    { j: '息', on: 'ソク', kun: 'いき', f: 'Souffle / Respiration', rad: '心 (Cœur)', story: 'Le souffle qui provient de soi-même (自) et remonte du cœur (心).', words: [{ jp: '息子', kana: 'むすこ', fr: 'Fils' }, { jp: 'ため息', kana: 'ためいき', fr: 'Un soupir' }] },

    // --- ACTIONS ET RÉSULTATS ---
    { j: '決', on: 'ケツ', kun: 'き(める)', f: 'Décider', rad: '氵 (Eau)', story: 'L\'eau (氵) qui creuse la roche (夬) décide toujours de son propre chemin.', words: [{ jp: '決める', kana: 'きめる', fr: 'Décider (quelque chose)' }, { jp: '決して', kana: 'けっして', fr: 'Jamais / En aucun cas' }] },
    { j: '勝', on: 'ショウ', kun: 'か(つ), まさ(る)', f: 'Gagner / Victoire', rad: '力 (Force)', story: 'Utiliser son corps (月) avec force (力) pour remporter le prix.', words: [{ jp: '勝つ', kana: 'かつ', fr: 'Gagner' }, { jp: '優勝', kana: 'ゆうしょう', fr: 'Victoire / Être champion' }] },
    { j: '負', on: 'フ', kun: 'ま(ける), お(う)', f: 'Perdre / Porter', rad: '貝 (Coquillage)', story: 'L\'homme courbé sous le poids de la dette, portant ses coquillages (貝) sur le dos.', words: [{ jp: '負ける', kana: 'まける', fr: 'Perdre' }, { jp: '勝負', kana: 'しょうぶ', fr: 'Match / Affrontement' }] },
    { j: '直', on: 'チョク, ジキ', kun: 'なお(る), ただ(ちに)', f: 'Réparer / Direct', rad: '目 (Œil)', story: 'Dix (十) paires d\'yeux (目) qui inspectent directement dans un angle droit (乚) pour réparer.', words: [{ jp: '直す', kana: 'なおす', fr: 'Réparer / Corriger' }, { jp: '直接', kana: 'ちょくせつ', fr: 'Directement' }] },
    { j: '治', on: 'ジ, チ', kun: 'なお(る), おさ(める)', f: 'Guérir / Gouverner', rad: '氵 (Eau)', story: 'Celui qui contrôle l\'eau (氵) depuis son piédestal (台) peut gouverner et soigner la terre.', words: [{ jp: '政治', kana: 'せいじ', fr: 'La politique' }, { jp: '治る', kana: 'なおる', fr: 'Guérir (maladie)' }] },
    { j: '残', on: 'ザン', kun: 'のこ(る)', f: 'Rester / Laisser', rad: '歹 (Os/Mort)', story: 'Ce qui reste (les os 歹 et les lances 戔) une fois que la violente bataille est terminée.', words: [{ jp: '残念', kana: 'ざんねん', fr: 'Dommage / Regrettable' }, { jp: '残業', kana: 'ざんぎょう', fr: 'Heures supplémentaires' }] },
    { j: '落', on: 'ラク', kun: 'お(ちる)', f: 'Tomber', rad: '艹 (Herbe)', story: 'Les herbes et les feuilles (艹) emportées par l\'eau (氵) tombent de chaque (各) côté.', words: [{ jp: '落ちる', kana: 'おちる', fr: 'Tomber / Échouer' }, { jp: '落ち着く', kana: 'おちつく', fr: 'Se calmer' }] },
    { j: '打', on: 'ダ', kun: 'う(つ)', f: 'Frapper / Taper', rad: '扌 (Main)', story: 'Utiliser la main (扌) pour frapper violemment sur un clou (丁).', words: [{ jp: '打つ', kana: 'うつ', fr: 'Frapper / Taper' }, { jp: '打ち合わせ', kana: 'うちあわせ', fr: 'Réunion préparatoire' }] },
    { j: '折', on: 'セツ', kun: 'お(る), お(れる)', f: 'Plier / Casser', rad: '扌 (Main)', story: 'La main (扌) qui s\'abat comme une hache (斤) pour casser une branche.', words: [{ jp: '折る', kana: 'おる', fr: 'Plier / Briser' }, { jp: '折り紙', kana: 'おりがみ', fr: 'Origami (papier plié)' }] },

    // --- OBJETS, LIEUX ET CONCEPTS SPATIAUX ---
    { j: '石', on: 'セキ', kun: 'いし', f: 'Pierre', rad: '石 (Pierre)', story: 'Une bouche/rocher (口) coincé sous le surplomb d\'une falaise (厂).', words: [{ jp: '石', kana: 'いし', fr: 'La pierre' }, { jp: '化石', kana: 'かせき', fr: 'Fossile' }] },
    { j: '線', on: 'セン', kun: '', f: 'Ligne', rad: '糸 (Fil)', story: 'Un fil (糸) d\'eau continu jaillissant d\'une source blanche (泉), formant une ligne.', words: [{ jp: '線', kana: 'せん', fr: 'Une ligne' }, { jp: '新幹線', kana: 'しんかんせん', fr: 'TGV Japonais (Shinkansen)' }] },
    { j: '面', on: 'メン', kun: 'おも, おもて', f: 'Visage / Surface / Masque', rad: '面 (Visage)', story: 'Un cadre entourant un œil (目), représentant les contours du visage ou un masque.', words: [{ jp: '面白い', kana: 'おもしろい', fr: 'Intéressant / Amusant' }, { jp: '表面', kana: 'ひょうめん', fr: 'La surface' }] },
    { j: '箱', on: 'ソウ', kun: 'はこ', f: 'Boîte', rad: '竹 (Bambou)', story: 'Des lamelles de bambou (竹) tressées mutuellement (相) pour fabriquer un conteneur.', words: [{ jp: '箱', kana: 'はこ', fr: 'La boîte' }, { jp: 'ゴミ箱', kana: 'ごみばこ', fr: 'Poubelle' }] },
    { j: '局', on: 'キョク', kun: '', f: 'Bureau / Département', rad: '尸 (Corps)', story: 'Le cadavre (尸) d\'une bouche (口) assise derrière un guichet, administrant sans émotion.', words: [{ jp: '郵便局', kana: 'ゆうびんきょく', fr: 'Bureau de poste' }, { jp: '薬局', kana: 'やっきょく', fr: 'Pharmacie' }] },

    // --- ADJECTIFS N3 COMPLEXES ---
    { j: '美', on: 'ビ', kun: 'うつく(しい)', f: 'Beauté', rad: '羊 (Mouton)', story: 'Pour les anciens, un mouton (羊) grand (大) et gras était l\'incarnation de la beauté et de l\'abondance.', words: [{ jp: '美しい', kana: 'うつくしい', fr: 'Beau / Magnifique' }, { jp: '美術館', kana: 'びじゅつかん', fr: 'Musée d\'art' }] },
    { j: '苦', on: 'ク', kun: 'くる(しい), にが(い)', f: 'Souffrance / Amer', rad: '艹 (Herbe)', story: 'Les herbes médicinales (艹) très anciennes (古) ont toujours un goût horriblement amer.', words: [{ jp: '苦しい', kana: 'くるしい', fr: 'Douloureux / Difficile' }, { jp: '苦手', kana: 'にがて', fr: 'Point faible / Ne pas être doué' }] },
    { j: '難', on: 'ナン', kun: 'むずか(しい)', f: 'Difficile', rad: '隹 (Oiseau)', story: 'Attraper un petit oiseau (隹) au vol dans des broussailles jaunes (黄), c\'est très difficile.', words: [{ jp: '難しい', kana: 'むずかしい', fr: 'Difficile' }, { jp: '困難', kana: 'こんなん', fr: 'Difficulté / Épreuve' }] },
    { j: '短', on: 'タン', kun: 'みじか(い)', f: 'Court', rad: '矢 (Flèche)', story: 'Une flèche de guerre (矢) qui est aussi petite qu\'un haricot (豆) est bien trop courte.', words: [{ jp: '短い', kana: 'みじかい', fr: 'Court' }, { jp: '短所', kana: 'たんしょ', fr: 'Défaut / Point faible' }] },
    { j: '深', on: 'シン', kun: 'ふか(い)', f: 'Profond', rad: '氵 (Eau)', story: 'L\'eau (氵) dans laquelle on plonge une sonde (罙) très bas pour explorer ses profondeurs.', words: [{ jp: '深い', kana: 'ふかい', fr: 'Profond' }, { jp: '深夜', kana: 'しんや', fr: 'Au milieu de la nuit' }] }
  ],
  N2: [
    // --- ÉCONOMIE, POLITIQUE ET GESTION ---
    { j: '経', on: 'ケイ, キョウ', kun: 'へ(る)', f: 'Passer (temps) / Gérer', rad: '糸 (Fil)', story: 'Un fil (糸) qui relie le passé au futur, tissant l\'histoire ou gérant les affaires.', words: [{ jp: '経済', kana: 'けいざい', fr: 'Économie' }, { jp: '経験', kana: 'けいけん', fr: 'Expérience' }] },
    { j: '済', on: 'サイ, ザイ', kun: 'す(む), す(ます)', f: 'Finir / Sauver', rad: '氵 (Eau)', story: 'L\'eau (氵) qui purifie et nivelle tout (斉), marquant la fin d\'un problème.', words: [{ jp: '経済', kana: 'けいざい', fr: 'Économie' }, { jp: '済む', kana: 'すむ', fr: 'Être fini / S\'en tirer' }] },
    { j: '政', on: 'セイ, ショウ', kun: 'まつりごと', f: 'Politique / Gouvernement', rad: '攴 (Frapper)', story: 'Frapper (攵) les citoyens pour les forcer à marcher droit (正) : l\'autorité politique.', words: [{ jp: '政治', kana: 'せいじ', fr: 'Politique' }, { jp: '政府', kana: 'せいふ', fr: 'Le gouvernement' }] },
    { j: '府', on: 'フ', kun: '', f: 'Gouvernement / Préfecture', rad: '广 (Vaste toit)', story: 'Un grand bâtiment (广) où l\'on donne (付) les lois au peuple.', words: [{ jp: '政府', kana: 'せいふ', fr: 'Le gouvernement' }, { jp: '大阪府', kana: 'おおさかふ', fr: 'Préfecture d\'Osaka' }] },
    { j: '営', on: 'エイ', kun: 'いとな(む)', f: 'Gérer / Exploiter', rad: '口 (Bouche)', story: 'Plusieurs bâtiments avec des toits entourant des bouches (口) pour gérer une entreprise florissante.', words: [{ jp: '営業', kana: 'えいぎょう', fr: 'Vente / Commerce / Exploitation' }, { jp: '経営', kana: 'けいえい', fr: 'Gestion (d\'entreprise)' }] },
    { j: '貿', on: 'ボウ', kun: '', f: 'Commerce / Échange', rad: '貝 (Coquillage/Argent)', story: 'Donner de l\'argent (貝) contre des biens à un étranger avec un drôle de chapeau (卯).', words: [{ jp: '貿易', kana: 'ぼうえき', fr: 'Commerce extérieur' }] },
    { j: '易', on: 'エキ, イ', kun: 'やさ(しい)', f: 'Facile / Échanger', rad: '日 (Soleil)', story: 'Un caméléon dont la couleur change aussi facilement que les rayons du soleil (日).', words: [{ jp: '易しい', kana: 'やさしい', fr: 'Facile' }, { jp: '貿易', kana: 'ぼうえき', fr: 'Commerce international' }] },
    { j: '輸', on: 'ユ', kun: '', f: 'Transporter', rad: '車 (Voiture)', story: 'Un chariot (車) rempli de marchandises pour le rassemblement (兪) et le transport.', words: [{ jp: '輸出', kana: 'ゆしゅつ', fr: 'Exportation' }, { jp: '輸入', kana: 'ゆにゅう', fr: 'Importation' }] },
    { j: '販', on: 'ハン', kun: '', f: 'Vendre / Marchandage', rad: '貝 (Argent)', story: 'Utiliser de l\'argent (貝) en s\'opposant (反) à l\'acheteur pour négocier un prix.', words: [{ jp: '販売', kana: 'はんばい', fr: 'Vente' }, { jp: '自動販売機', kana: 'じどうはんばいき', fr: 'Distributeur automatique' }] },
    { j: '割', on: 'カツ', kun: 'わ(る), わ(れる)', f: 'Diviser / Proportion', rad: '刀 (Sabre)', story: 'Un sabre (刀) qui divise une maison et ses biens (害) en plusieurs parts.', words: [{ jp: '割る', kana: 'わる', fr: 'Casser / Diviser' }, { jp: '割引', kana: 'わりびき', fr: 'Réduction / Remise' }] },
    { j: '額', on: 'ガク', kun: 'ひたい', f: 'Montant / Front', rad: '頁 (Tête)', story: 'Le client (客) utilise sa tête (頁) pour calculer le montant de la facture.', words: [{ jp: '金額', kana: 'きんがく', fr: 'Montant (d\'argent)' }, { jp: '半額', kana: 'はんがく', fr: 'Moitié prix' }] },
    { j: '価', on: 'カ', kun: 'あたい', f: 'Valeur / Prix', rad: '亻 (Humain)', story: 'Un humain (亻) fixant un prix dans l\'Ouest (襾) sur le marché.', words: [{ jp: '価格', kana: 'かかく', fr: 'Prix / Valeur' }, { jp: '物価', kana: 'ぶっか', fr: 'Coût de la vie' }] },

    // --- CARRIÈRE ET TRAVAIL ---
    { j: '職', on: 'ショク', kun: '', f: 'Emploi / Profession', rad: '耳 (Oreille)', story: 'Utiliser son oreille (耳) pour écouter le son (音) des armes (戈) de sa profession.', words: [{ jp: '職業', kana: 'しょくぎょう', fr: 'Profession' }, { jp: '就職', kana: 'しゅうしょく', fr: 'Recherche d\'emploi' }] },
    { j: '務', on: 'ム', kun: 'つと(める)', f: 'Tâche / Devoir', rad: '力 (Force)', story: 'Frapper (攵) avec une lance (矛) en utilisant sa force (力) pour accomplir son devoir.', words: [{ jp: '事務所', kana: 'じむしょ', fr: 'Bureau (lieu)' }, { jp: '義務', kana: 'ぎむ', fr: 'Devoir / Obligation' }] },
    { j: '辞', on: 'ジ', kun: 'や(める)', f: 'Démission / Mot', rad: '辛 (Épicé/Pénible)', story: 'Un discours pénible (辛) où l\'on utilise sa langue (舌) pour donner sa démission.', words: [{ jp: '辞める', kana: 'やめる', fr: 'Démissionner / Arrêter' }, { jp: '辞書', kana: 'じしょ', fr: 'Dictionnaire' }] },
    { j: '退', on: 'タイ', kun: 'しりぞ(く)', f: 'Se retirer / Reculer', rad: '辶 (Marcher)', story: 'Marcher (辶) en regardant le soleil (日) s\'éloigner avec douceur (艮) : se retirer.', words: [{ jp: '退院', kana: 'たいいん', fr: 'Sortie d\'hôpital' }, { jp: '退職', kana: 'たいしょく', fr: 'Retraite / Démission' }] },
    { j: '署', on: 'ショ', kun: '', f: 'Poste / Signature', rad: '网 (Filet)', story: 'Un filet (罒) qui capture les coupables et les amène à celui (者) du poste de police.', words: [{ jp: '警察署', kana: 'けいさつしょ', fr: 'Poste de police' }, { jp: '消防署', kana: 'しょうぼうしょ', fr: 'Caserne de pompiers' }] },
    { j: '専', on: 'セン', kun: 'もっぱ(ら)', f: 'Spécialité / Exclusif', rad: '寸 (Pouce)', story: 'Dix (十) champs (田) cousus ensemble avec un pouce (寸) par un spécialiste exclusif.', words: [{ jp: '専門', kana: 'せんもん', fr: 'Spécialité' }, { jp: '専用', kana: 'せんよう', fr: 'Usage exclusif' }] },
    { j: '攻', on: 'コウ', kun: 'せ(める)', f: 'Attaquer', rad: '攴 (Frapper)', story: 'Frapper (攵) avec un outil (工) pour attaquer ou maîtriser un sujet d\'étude.', words: [{ jp: '専攻', kana: 'せんこう', fr: 'Matière principale (études)' }, { jp: '攻撃', kana: 'こうげき', fr: 'Attaque' }] },
    { j: '績', on: 'セキ', kun: '', f: 'Exploit / Résultat', rad: '糸 (Fil)', story: 'Le fil (糸) de la responsabilité (責) qui mesure les résultats accomplis.', words: [{ jp: '成績', kana: 'せいせき', fr: 'Notes / Résultats scolaires' }, { jp: '実績', kana: 'じっせき', fr: 'Accomplissements' }] },
    { j: '卒', on: 'ソツ', kun: '', f: 'Diplôme / Soldat', rad: '十 (Dix)', story: 'Dix (十) personnes (人) réunies (亠) sous le même diplôme à la fin des études.', words: [{ jp: '卒業', kana: 'そつぎょう', fr: 'Remise de diplôme' }, { jp: '卒業式', kana: 'そつぎょうしき', fr: 'Cérémonie de remise des diplômes' }] },
    { j: '業', on: 'ギョウ, ゴウ', kun: 'わざ', f: 'Travail / Affaire / Karma', rad: '木 (Arbre)', story: 'Un instrument en bois (木) complexe utilisé par un professionnel pour faire son travail.', words: [{ jp: '授業', kana: 'じゅぎょう', fr: 'Cours / Leçon' }, { jp: '産業', kana: 'さんぎょう', fr: 'Industrie' }] },

    // --- JUGEMENT, DOUTE ET RÈGLES ---
    { j: '査', on: 'サ', kun: '', f: 'Enquêter', rad: '木 (Arbre)', story: 'Inspecter les arbres (木) sous l\'étagère (且) pour vérifier leur qualité.', words: [{ jp: '調査', kana: 'ちょうさ', fr: 'Enquête' }, { jp: '検査', kana: 'けんさ', fr: 'Inspection' }] },
    { j: '証', on: 'ショウ', kun: 'あかし', f: 'Preuve', rad: '言 (Parole)', story: 'Une parole (言) correcte (正) qui sert de témoignage ou de preuve absolue.', words: [{ jp: '証明', kana: 'しょうめい', fr: 'Preuve / Certificat' }, { jp: '保証', kana: 'ほしょう', fr: 'Garantie' }] },
    { j: '認', on: 'ニン', kun: 'みと(める)', f: 'Reconnaître / Admettre', rad: '言 (Parole)', story: 'La parole (言) qui supporte (忍) et valide officiellement un fait.', words: [{ jp: '認める', kana: 'みとめる', fr: 'Reconnaître / Avouer' }, { jp: '確認', kana: 'かくにん', fr: 'Confirmation' }] },
    { j: '確', on: 'カク', kun: 'たし(か)', f: 'Certain / Sûr', rad: '石 (Pierre)', story: 'Un oiseau (隹) protégé sous un toit (冖) derrière un rocher (石) : une sécurité certaine.', words: [{ jp: '確か', kana: 'たしか', fr: 'Certain / Sûr' }, { jp: '正確', kana: 'せいかく', fr: 'Précis / Exact' }] },
    { j: '判', on: 'ハン, バン', kun: 'わか(る)', f: 'Juger / Décider', rad: '刀 (Sabre)', story: 'Un sabre (刂) qui tranche une demi-vérité (半) pour rendre un jugement clair.', words: [{ jp: '判断', kana: 'はんだん', fr: 'Jugement' }, { jp: '評判', kana: 'ひょうばん', fr: 'Réputation' }] },
    { j: '断', on: 'ダン', kun: 'た(つ), ことわ(る)', f: 'Refuser / Trancher', rad: '斤 (Hache)', story: 'Utiliser une hache (斤) pour couper les fils d\'une transaction : refuser.', words: [{ jp: '断る', kana: 'ことわる', fr: 'Refuser' }, { jp: '決断', kana: 'けつだん', fr: 'Prise de décision' }] },
    { j: '疑', on: 'ギ', kun: 'うたが(う)', f: 'Douter / Soupçonner', rad: '疋 (Jambe)', story: 'Une personne tenant une flèche (矢) et un poignard (匕), hésitant (疋) à attaquer par doute.', words: [{ jp: '疑う', kana: 'うたがう', fr: 'Douter' }, { jp: '疑問', kana: 'ぎもん', fr: 'Un doute / Une question' }] },
    { j: '規', on: 'キ', kun: '', f: 'Règle / Standard', rad: '見 (Voir)', story: 'L\'œil (見) d\'un mari (夫) strict qui veille au respect des règles.', words: [{ jp: '規則', kana: 'きそく', fr: 'Règle / Règlement' }, { jp: '規模', kana: 'きぼ', fr: 'Échelle / Envergure' }] },
    { j: '則', on: 'ソク', kun: 'のっと(る)', f: 'Règle / Loi', rad: '刀 (Sabre)', story: 'La monnaie (貝) est tranchée (刂) de manière égale selon la règle.', words: [{ jp: '規則', kana: 'きそく', fr: 'Règle' }, { jp: '原則', kana: 'げんそく', fr: 'Principe général' }] },
    { j: '慣', on: 'カン', kun: 'な(れる)', f: 'Habitude', rad: '心 (Cœur)', story: 'Un cœur (忄) qui traverse l\'argent (貫) tous les jours : c\'est l\'habitude.', words: [{ jp: '慣れる', kana: 'なれる', fr: 'S\'habituer à' }, { jp: '習慣', kana: 'しゅうかん', fr: 'Les coutumes / L\'habitude' }] },
    { j: '歴', on: 'レキ', kun: '', f: 'Histoire / Passé', rad: '止 (Arrêter)', story: 'Des pas (止) sous la falaise (厂) marchant à travers la forêt (林) du temps : le passage de l\'histoire.', words: [{ jp: '歴史', kana: 'れきし', fr: 'L\'Histoire' }, { jp: '履歴書', kana: 'りれきしょ', fr: 'Curriculum Vitae (CV)' }] },
    { j: '史', on: 'シ', kun: '', f: 'Histoire / Chronique', rad: '口 (Bouche)', story: 'L\'historien qui tient un pinceau (乂) dans la bouche (口) pour écrire les chroniques.', words: [{ jp: '歴史', kana: 'れきし', fr: 'L\'Histoire' }, { jp: '日本史', kana: 'にほんし', fr: 'L\'histoire du Japon' }] },

    // --- SOCIÉTÉ, RELATIONS ET NATURE HUMAINE ---
    { j: '頼', on: 'ライ', kun: 'たの(む), たよ(る)', f: 'Demander / Faire confiance', rad: '頁 (Tête)', story: 'Lier (束) sa tête (頁) à quelqu\'un d\'autre pour s\'appuyer sur lui.', words: [{ jp: '頼む', kana: 'たのむ', fr: 'Demander (une faveur)' }, { jp: '頼る', kana: 'たよる', fr: 'S\'appuyer sur (confiance)' }] },
    { j: '違', on: 'イ', kun: 'ちが(う)', f: 'Différer / Se tromper', rad: '辶 (Marcher)', story: 'Deux pieds tournant dans des directions opposées (韋) sur la route (辶).', words: [{ jp: '違う', kana: 'ちがう', fr: 'Être différent / Se tromper' }, { jp: '間違い', kana: 'まちがい', fr: 'Une erreur' }] },
    { j: '似', on: 'ジ', kun: 'に(る)', f: 'Ressembler', rad: '亻 (Humain)', story: 'Un humain (亻) qui utilise un outil (以) pour faire un clone parfait.', words: [{ jp: '似る', kana: 'にる', fr: 'Ressembler à' }, { jp: '似合う', kana: 'にあう', fr: 'Aller bien (un vêtement)' }] },
    { j: '普', on: 'フ', kun: 'あまね(く)', f: 'Normal / Universel', rad: '日 (Soleil)', story: 'Le soleil (日) brille de manière égale (並) et universelle sur tout le monde.', words: [{ jp: '普通', kana: 'ふつう', fr: 'Normal / Ordinaire' }, { jp: '普段', kana: 'ふだん', fr: 'D\'habitude' }] },
    { j: '般', on: 'ハン', kun: '', f: 'Général / Sorte', rad: '舟 (Bateau)', story: 'Frapper (殳) le bord d\'un bateau (舟) pour trier les différentes sortes de marchandises.', words: [{ jp: '一般', kana: 'いっぱん', fr: 'Général / Commun' }, { jp: '全般', kana: 'ぜんぱん', fr: 'Dans l\'ensemble' }] },
    { j: '豊', on: 'ホウ', kun: 'ゆた(か)', f: 'Abondant / Riche', rad: '豆 (Haricot)', story: 'Une montagne (曲) de haricots (豆) bien remplis montre l\'abondance des récoltes.', words: [{ jp: '豊か', kana: 'ゆたか', fr: 'Abondant / Riche' }, { jp: '豊富', kana: 'ほうふ', fr: 'Riche (en ressources)' }] },
    { j: '富', on: 'フ, フウ', kun: 'とみ, と(む)', f: 'Richesse / Fortune', rad: '宀 (Toit)', story: 'Un toit (宀) qui abrite un champ (田) et une seule (一) grande bouche (口) à nourrir : on est très riche.', words: [{ jp: '富士山', kana: 'ふじさん', fr: 'Mont Fuji' }, { jp: '豊富', kana: 'ほうふ', fr: 'Abondance' }] },
    { j: '貧', on: 'ヒン, ビン', kun: 'まず(しい)', f: 'Pauvreté', rad: '貝 (Argent)', story: 'Diviser (分) son argent (貝) en parts de plus en plus petites mène à la pauvreté.', words: [{ jp: '貧しい', kana: 'まずしい', fr: 'Pauvre' }, { jp: '貧困', kana: 'ひんこん', fr: 'Misère / Pauvreté' }] },

    // --- ÉMOTIONS EXTRÊMES ET SENSATIONS ---
    { j: '恐', on: 'キョウ', kun: 'おそ(れる), おそ(ろしい)', f: 'Peur / Terrifiant', rad: '心 (Cœur)', story: 'Le travail (工) des esprits volants (凡) terrifie profondément le cœur (心).', words: [{ jp: '恐ろしい', kana: 'おそろしい', fr: 'Terrifiant' }, { jp: '恐竜', kana: 'きょうりゅう', fr: 'Dinosaure' }] },
    { j: '怖', on: 'フ', kun: 'こわ(い)', f: 'Effrayant', rad: '心 (Cœur)', story: 'Le cœur (忄) qui se serre devant une toile (布) qui cache quelque chose d\'effrayant.', words: [{ jp: '怖い', kana: 'こわい', fr: 'Effrayant / Avoir peur' }, { jp: '恐怖', kana: 'きょうふ', fr: 'La peur / La terreur' }] },
    { j: '恥', on: 'チ', kun: 'はじ, は(ずかしい)', f: 'Honte', rad: '心 (Cœur)', story: 'Une oreille (耳) rouge de honte qui brûle jusqu\'au cœur (心) après une erreur.', words: [{ jp: '恥ずかしい', kana: 'はずかしい', fr: 'Gênant / Avoir honte' }, { jp: '恥', kana: 'はじ', fr: 'Le déshonneur' }] },
    { j: '悩', on: 'ノウ', kun: 'なや(む)', f: 'S\'inquiéter / Souffrir', rad: '心 (Cœur)', story: 'Le cerveau (巛) en feu qui retourne le cœur (忄) avec ses inquiétudes.', words: [{ jp: '悩む', kana: 'なやむ', fr: 'Se tourmenter / S\'inquiéter' }, { jp: '悩み', kana: 'なやみ', fr: 'Les soucis' }] },
    { j: '辛', on: 'シン', kun: 'から(い), つら(い)', f: 'Épicé / Pénible', rad: '辛 (Épicé)', story: 'Un outil pour tatouer les criminels, provoquant une douleur épicée et pénible.', words: [{ jp: '辛い', kana: 'からい', fr: 'Épicé / Fort' }, { jp: '辛い', kana: 'つらい', fr: 'Douloureux / Pénible' }] },
    { j: '痛', on: 'ツウ', kun: 'いた(い), いた(む)', f: 'Douleur', rad: '疒 (Maladie)', story: 'La tente d\'infirmerie (疒) où le courage (マ) de l\'homme s\'écoule (用) sous la douleur.', words: [{ jp: '痛い', kana: 'いたい', fr: 'Avoir mal / Douloureux' }, { jp: '頭痛', kana: 'ずつう', fr: 'Mal de tête' }] },
    { j: '眠', on: 'ミン', kun: 'ねむ(る), ねむ(い)', f: 'Dormir / Sommeil', rad: '目 (Œil)', story: 'L\'œil (目) de la population (民) qui se ferme pour dormir.', words: [{ jp: '眠い', kana: 'ねむい', fr: 'Avoir sommeil' }, { jp: '睡眠', kana: 'すいみん', fr: 'Le sommeil' }] },
    { j: '祈', on: 'キ', kun: 'いの(る)', f: 'Prier', rad: '示 (Autel)', story: 'Un homme avec une hache (斤) devant l\'autel (礻) priant avant la bataille.', words: [{ jp: '祈る', kana: 'いのる', fr: 'Prier' }, { jp: '祈り', kana: 'いのり', fr: 'Prière' }] },
    { j: '願', on: 'ガン', kun: 'ねが(う)', f: 'Prier / Souhaiter', rad: '頁 (Tête)', story: 'La tête (頁) tournée vers l\'origine (原) pour formuler un vœu profond.', words: [{ jp: '願う', kana: 'ねがう', fr: 'Souhaiter / Demander' }, { jp: 'お願い', kana: 'おねがい', fr: 'S\'il vous plaît' }] },
    { j: '喜', on: 'キ', kun: 'よろこ(ぶ)', f: 'Se réjouir / Joie', rad: '口 (Bouche)', story: 'Un tambour (士) et une bouche (口) ouverte sur le socle (豆) de la réjouissance.', words: [{ jp: '喜ぶ', kana: 'よろこぶ', fr: 'Se réjouir' }, { jp: '喜び', kana: 'よろこび', fr: 'La joie' }] },
    { j: '驚', on: 'キョウ', kun: 'おどろ(く)', f: 'Surprise / Étonnement', rad: '馬 (Cheval)', story: 'Un cheval (馬) qui se dresse sur ses pattes arrière, surpris par le respect (敬).', words: [{ jp: '驚く', kana: 'おどろく', fr: 'Être surpris / S\'étonner' }, { jp: '驚き', kana: 'おどろき', fr: 'La surprise' }] },

    // --- MÉTÉOROLOGIE ET GÉOGRAPHIE ---
    { j: '涼', on: 'リョウ', kun: 'すず(しい)', f: 'Frais', rad: '氵 (Eau)', story: 'La brise de la capitale (京) refroidissant l\'eau (氵), créant une agréable fraîcheur.', words: [{ jp: '涼しい', kana: 'すずしい', fr: 'Frais (météo agréable)' }] },
    { j: '暖', on: 'ダン', kun: 'あたた(かい)', f: 'Chaleureux / Doux', rad: '日 (Soleil)', story: 'Le soleil (日) d\'une belle journée apporte une chaleur réconfortante (爰).', words: [{ jp: '暖かい', kana: 'あたたかい', fr: 'Chaud / Doux (climat)' }, { jp: '暖房', kana: 'だんぼう', fr: 'Chauffage' }] },
    { j: '湿', on: 'シツ', kun: 'しめ(る)', f: 'Humide', rad: '氵 (Eau)', story: 'Le soleil qui frappe l\'eau (氵) sous les fils, créant de la vapeur et de l\'humidité.', words: [{ jp: '湿度', kana: 'しつど', fr: 'Le taux d\'humidité' }, { jp: '湿気', kana: 'しっけ', fr: 'L\'humidité' }] },
    { j: '凍', on: 'トウ', kun: 'こお(る)', f: 'Geler', rad: '冫 (Glace)', story: 'L\'Est (東) frappé par la glace (冫) de l\'hiver, tout gèle.', words: [{ jp: '凍る', kana: 'こおる', fr: 'Geler / Congeler' }, { jp: '冷凍', kana: 'れいとう', fr: 'Congélation' }] },
    { j: '波', on: 'ハ', kun: 'なみ', f: 'Vague', rad: '氵 (Eau)', story: 'L\'eau (氵) recouvrant la peau (皮), comme une vague sur la plage.', words: [{ jp: '波', kana: 'なみ', fr: 'Une vague' }, { jp: '津波', kana: 'つなみ', fr: 'Tsunami / Raz-de-marée' }] },
    { j: '震', on: 'シン', kun: 'ふる(える)', f: 'Séisme / Trembler', rad: '雨 (Pluie)', story: 'La pluie/l\'orage (雨) qui fait trembler les cultures (辰) jusqu\'au sol.', words: [{ jp: '地震', kana: 'じしん', fr: 'Tremblement de terre' }, { jp: '震える', kana: 'ふるえる', fr: 'Trembler (de peur/froid)' }] },
    { j: '荒', on: 'コウ', kun: 'あら(い), あ(れる)', f: 'Rude / Agité / Sauvage', rad: '艹 (Herbe)', story: 'L\'herbe (艹) qui pousse dans le courant d\'une rivière (流) sauvage et agitée.', words: [{ jp: '荒い', kana: 'あらい', fr: 'Violent / Rude' }, { jp: '荒れる', kana: 'あれる', fr: 'Être agité (mer/peau)' }] },
    { j: '砂', on: 'サ, シャ', kun: 'すな', f: 'Sable', rad: '石 (Pierre)', story: 'Une pierre (石) tellement petite (少) qu\'elle est devenue du sable.', words: [{ jp: '砂', kana: 'すな', fr: 'Sable' }, { jp: '砂糖', kana: 'さとう', fr: 'Sucre' }] },
    { j: '炭', on: 'タン', kun: 'すみ', f: 'Charbon', rad: '火 (Feu)', story: 'La montagne (山) ou la falaise qui donne le feu (火) de la cendre noire.', words: [{ jp: '石炭', kana: 'せきたん', fr: 'Le charbon' }, { jp: '炭素', kana: 'たんそ', fr: 'Le carbone' }] },
    { j: '鉱', on: 'コウ', kun: '', f: 'Minerai / Mine', rad: '金 (Métal)', story: 'Le métal (金) de base trouvé dans les vastes (広) galeries souterraines.', words: [{ jp: '鉱物', kana: 'こうぶつ', fr: 'Minéral' }, { jp: '炭鉱', kana: 'たんこう', fr: 'Mine de charbon' }] },
    { j: '湾', on: 'ワン', kun: '', f: 'Baie / Golfe', rad: '氵 (Eau)', story: 'L\'eau (氵) qui s\'enroule comme un arc (弓) avec les traces de vagues (亦).', words: [{ jp: '台湾', kana: 'たいわん', fr: 'Taïwan' }, { jp: '東京湾', kana: 'とうきょうわん', fr: 'La baie de Tokyo' }] },
    { j: '沖', on: 'チュウ', kun: 'おき', f: 'Au large', rad: '氵 (Eau)', story: 'L\'eau (氵) du milieu (中), c\'est-à-dire loin de la côte, au large.', words: [{ jp: '沖', kana: 'おき', fr: 'Au large' }, { jp: '沖縄', kana: 'おきなわ', fr: 'Okinawa' }] },

    // --- ENSEIGNEMENT ET SPÉCIALITÉS ---
    { j: '講', on: 'コウ', kun: '', f: 'Conférence / Cours', rad: '言 (Parole)', story: 'Construire (冓) des paroles (言) solides pour transmettre le savoir.', words: [{ jp: '講義', kana: 'こうぎ', fr: 'Cours magistral / Conférence' }, { jp: '講師', kana: 'こうし', fr: 'Conférencier / Instructeur' }] },
    { j: '義', on: 'ギ', kun: '', f: 'Justice / Sens / Devoir', rad: '羊 (Mouton)', story: 'Moi (我) sacrifiant un mouton (羊) au nom de la justice et du devoir.', words: [{ jp: '講義', kana: 'こうぎ', fr: 'Cours' }, { jp: '義務', kana: 'ぎむ', fr: 'Obligation' }] },
    { j: '導', on: 'ドウ', kun: 'みちび(く)', f: 'Mener / Guider', rad: '寸 (Pouce)', story: 'Tracer la voie (道) d\'un simple pouce (寸) pour guider les élèves.', words: [{ jp: '導く', kana: 'みちびく', fr: 'Guider / Mener' }, { jp: '指導', kana: 'しどう', fr: 'Gouvernance / Orientation' }] }
  ],
  N1: [
    // --- POLITIQUE, LOI ET GOUVERNEMENT ---
    { j: '憲', on: 'ケン', kun: '', f: 'Constitution', rad: '心 (Cœur)', story: 'Les lois suprêmes du pays (害) qui doivent être gravées sur l\'œil (目) et le cœur (心) de la nation.', words: [{ jp: '憲法', kana: 'けんぽう', fr: 'La constitution' }, { jp: '違憲', kana: 'いけん', fr: 'Inconstitutionnel' }] },
    { j: '律', on: 'リツ, リチ', kun: '', f: 'Loi / Rythme', rad: '彳 (Pas)', story: 'Marcher (彳) en tenant un pinceau (聿) pour tracer les règles qui rythment la société.', words: [{ jp: '法律', kana: 'ほうりつ', fr: 'La loi' }, { jp: '規律', kana: 'きりつ', fr: 'Discipline / Ordre' }] },
    { j: '罰', on: 'バツ, バチ', kun: 'ばっ(する)', f: 'Punition / Châtiment', rad: '罒 (Filet)', story: 'Un filet (罒) qui capture les coupables (言) pour les frapper d\'un coup de sabre (刂).', words: [{ jp: '罰する', kana: 'ばっする', fr: 'Punir' }, { jp: '罰金', kana: 'ばっきん', fr: 'Une amende' }] },
    { j: '盟', on: 'メイ', kun: '', f: 'Alliance / Serment', rad: '皿 (Assiette)', story: 'Le soleil (日) et la lune (月) brillent sur l\'assiette (皿) où le sang du serment est partagé.', words: [{ jp: '同盟', kana: 'どうめい', fr: 'Alliance' }, { jp: '連盟', kana: 'れんめい', fr: 'Fédération' }] },
    { j: '皇', on: 'コウ, オウ', kun: '', f: 'Empereur', rad: '白 (Blanc)', story: 'L\'oiseau blanc (白) qui règne en tant que roi (王) sur le Japon.', words: [{ jp: '天皇', kana: 'てんのう', fr: 'L\'Empereur du Japon' }, { jp: '皇室', kana: 'こうしつ', fr: 'La famille impériale' }] },
    { j: '臣', on: 'シン, ジン', kun: '', f: 'Ministre / Sujet', rad: '臣 (Serviteur)', story: 'Un œil grand ouvert, baissé de force vers le sol en signe de soumission à l\'empereur.', words: [{ jp: '大臣', kana: 'だいじん', fr: 'Un ministre' }, { jp: '総理大臣', kana: 'そうりだいじん', fr: 'Le Premier Ministre' }] },
    { j: '派', on: 'ハ', kun: '', f: 'Faction / Secte', rad: '氵 (Eau)', story: 'Un cours d\'eau (氵) qui se sépare en plusieurs branches (d\'où l\'idée de factions politiques).', words: [{ jp: '立派', kana: 'りっぱ', fr: 'Splendide / Admirable' }, { jp: '派閥', kana: 'はばつ', fr: 'Faction / Clique' }] },
    { j: '閥', on: 'バツ', kun: '', f: 'Clique / Clan', rad: '門 (Porte)', story: 'Une porte (門) abritant des gens qui ont abattu d\'autres personnes (伐) pour former un groupe fermé.', words: [{ jp: '派閥', kana: 'はばつ', fr: 'Faction' }, { jp: '財閥', kana: 'ざいばつ', fr: 'Zaibatsu (Conglomérat financier)' }] },

    // --- PHILOSOPHIE, ESPRIT ET RELIGION ---
    { j: '幻', on: 'ゲン', kun: 'まぼろし', f: 'Illusion / Fantôme', rad: '幺 (Cocon)', story: 'Le fil (幺) du cocon est coupé, créant une forme éphémère et irréelle.', words: [{ jp: '幻', kana: 'まぼろし', fr: 'Une illusion / Un mirage' }, { jp: '幻想', kana: 'げんそう', fr: 'Fantaisie / Illusion' }] },
    { j: '魂', on: 'コン', kun: 'たましい', f: 'Âme / Esprit', rad: '鬼 (Démon)', story: 'L\'esprit ou le démon (鬼) qui flotte comme un nuage (云) à l\'intérieur du corps.', words: [{ jp: '魂', kana: 'たましい', fr: 'L\'âme' }, { jp: '霊魂', kana: 'れいこん', fr: 'L\'esprit (d\'un mort)' }] },
    { j: '霊', on: 'レイ, リョウ', kun: 'たま', f: 'Esprit / Fantôme', rad: '雨 (Pluie)', story: 'La pluie (雨) tombe sur trois bouches (口) appelant l\'esprit du sorcier (巫).', words: [{ jp: '幽霊', kana: 'ゆうれい', fr: 'Un fantôme' }, { jp: '悪霊', kana: 'あくりょう', fr: 'Un esprit maléfique' }] },
    { j: '悟', on: 'ゴ', kun: 'さと(る)', f: 'Éveil / Compréhension', rad: '心 (Cœur)', story: 'Mon propre (吾) cœur (忄) qui s\'ouvre soudainement à la vérité universelle.', words: [{ jp: '悟る', kana: 'さとる', fr: 'Atteindre l\'illumination / Comprendre' }, { jp: '覚悟', kana: 'かくご', fr: 'Détermination / Résolution' }] },
    { j: '縁', on: 'エン', kun: 'ふち', f: 'Lien karmique / Bord', rad: '糸 (Fil)', story: 'Le fil (糸) invisible qui lie la tête du porc (彖) à notre propre destin. Les connexions humaines.', words: [{ jp: '縁', kana: 'えん', fr: 'Le destin / Le lien karmique' }, { jp: '縁側', kana: 'えんがわ', fr: 'Véranda (au bord de la maison)' }] },
    { j: '倫', on: 'リン', kun: '', f: 'Éthique / Morale', rad: '亻 (Humain)', story: 'Un humain (亻) qui rassemble (侖) ses pensées pour agir de manière juste.', words: [{ jp: '倫理', kana: 'りんり', fr: 'L\'éthique / La morale' }, { jp: '不倫', kana: 'ふりん', fr: 'Adultère' }] },
    { j: '儒', on: 'ジュ', kun: '', f: 'Confucianisme', rad: '亻 (Humain)', story: 'L\'humain (亻) qui a besoin (需) d\'enseignements vertueux et de douceur.', words: [{ jp: '儒教', kana: 'じゅきょう', fr: 'Le Confucianisme' }, { jp: '儒者', kana: 'じゅしゃ', fr: 'Un érudit confucéen' }] },

    // --- ACTIONS EXTRÊMES ET DESTRUCTION ---
    { j: '奪', on: 'ダツ', kun: 'うば(う)', f: 'Priver / Voler (par la force)', rad: '大 (Grand)', story: 'Un grand oiseau (大 et 隹) qui plonge pour arracher sa proie avec ses serres (寸).', words: [{ jp: '奪う', kana: 'うばう', fr: 'Arracher / Dérober' }, { jp: '略奪', kana: 'りゃくだつ', fr: 'Pillage' }] },
    { j: '狂', on: 'キョウ', kun: 'くる(う), くる(おしい)', f: 'Folie / Devenir fou', rad: '犬 (Chien)', story: 'Un chien (犭) infecté par la rage, agissant en roi (王) fou.', words: [{ jp: '狂う', kana: 'くるう', fr: 'Devenir fou / Se dérégler' }, { jp: '熱狂', kana: 'ねっきょう', fr: 'Enthousiasme délirant' }] },
    { j: '隠', on: 'イン', kun: 'かく(す), かく(れる)', f: 'Cacher / Se dissimuler', rad: '阝 (Colline)', story: 'Se cacher derrière la colline (阝) en retenant son souffle et son cœur (心) avec certitude (ヨ).', words: [{ jp: '隠す', kana: 'かくす', fr: 'Cacher (quelque chose)' }, { jp: '隠れる', kana: 'かくれる', fr: 'Se cacher' }] },
    { j: '崩', on: 'ホウ', kun: 'くず(れる), くず(す)', f: 'S\'effondrer / Détruire', rad: '山 (Montagne)', story: 'Une montagne (山) où de nombreux amis/personnes (朋) tombent dans un glissement de terrain.', words: [{ jp: '崩れる', kana: 'くずれる', fr: 'S\'effondrer' }, { jp: '崩壊', kana: 'ほうかい', fr: 'L\'effondrement / La ruine' }] },
    { j: '躍', on: 'ヤク', kun: 'おど(る)', f: 'Bondir / Sauter', rad: '足 (Pied)', story: 'Un pied (足) qui ressemble à un oiseau s\'envolant (翟) haut dans le ciel.', words: [{ jp: '活躍', kana: 'かつやく', fr: 'Jouer un rôle actif / Briller' }, { jp: '飛躍', kana: 'ひやく', fr: 'Bond en avant / Essor' }] },
    { j: '襲', on: 'シュウ', kun: 'おそ(う)', f: 'Attaquer / Assaillir', rad: '衣 (Vêtement)', story: 'Un dragon (龍) qui se cache sous un vêtement (衣) pour surprendre sa proie.', words: [{ jp: '襲う', kana: 'おそう', fr: 'Attaquer' }, { jp: '襲撃', kana: 'しゅうげき', fr: 'Un raid / Un assaut' }] },
    { j: '覆', on: 'フク', kun: 'おお(う), くつがえ(す)', f: 'Recouvrir / Renverser', rad: '襾 (Ouest/Couverture)', story: 'Marcher (彳) pour recouvrir (襾) l\'ordre établi et le retourner (復) complètement.', words: [{ jp: '覆う', kana: 'おおう', fr: 'Recouvrir' }, { jp: '覆す', kana: 'くつがえす', fr: 'Renverser (une décision/un régime)' }] },
    { j: '撃', on: 'ゲキ', kun: 'う(つ)', f: 'Frapper / Tirer', rad: '手 (Main)', story: 'Utiliser la main (手) pour heurter violemment un char (車) avec une arme (殳).', words: [{ jp: '攻撃', kana: 'こうげき', fr: 'Une attaque' }, { jp: '目撃', kana: 'もくげき', fr: 'Être témoin de' }] },
    { j: '裂', on: 'レツ', kun: 'さ(く), さ(ける)', f: 'Déchirer', rad: '衣 (Vêtement)', story: 'Des dents ou une lame alignées (列) déchirant brutalement un vêtement (衣).', words: [{ jp: '裂く', kana: 'さく', fr: 'Déchirer' }, { jp: '破裂', kana: 'はれつ', fr: 'Une explosion / Une rupture' }] },

    // --- LITTÉRATURE, ARTS ET POÉSIE ---
    { j: '叙', on: 'ジョ', kun: '', f: 'Narrer / Décrire', rad: '又 (Main droite)', story: 'Une main (又) tenant un outil pour tisser et raconter une histoire fil par fil.', words: [{ jp: '叙述', kana: 'じょじゅつ', fr: 'Description / Narration' }, { jp: '叙情', kana: 'じょじょう', fr: 'Lyrisme' }] },
    { j: '韻', on: 'イン', kun: '', f: 'Rime / Élégance', rad: '音 (Son)', story: 'Un son (音) qui résonne et s\'harmonise comme l\'argent (員). La rime poétique.', words: [{ jp: '余韻', kana: 'よいん', fr: 'Résonance / Arrière-goût' }, { jp: '韻文', kana: 'いんぶん', fr: 'Versification / Poésie' }] },
    { j: '琴', on: 'キン', kun: 'こと', f: 'Harpe (Koto)', rad: '玉 (Joyau)', story: 'Deux rois/joyaux (王) représentant les ponts d\'une harpe japonaise que l\'on pince aujourd\'hui (今).', words: [{ jp: '琴', kana: 'こと', fr: 'Koto (Harpe japonaise)' }, { jp: '木琴', kana: 'もっきん', fr: 'Xylophone' }] },
    { j: '譜', on: 'フ', kun: '', f: 'Partition musicale / Généalogie', rad: '言 (Parole)', story: 'Des mots (言) organisés de manière universelle (普) pour écrire la musique ou l\'histoire.', words: [{ jp: '楽譜', kana: 'がくふ', fr: 'Partition musicale' }, { jp: '系譜', kana: 'けいふ', fr: 'Arbre généalogique' }] },
    { j: '墨', on: 'ボク', kun: 'すみ', f: 'Encre (de Chine)', rad: '土 (Terre)', story: 'La suie noire (黒) mélangée à de la terre (土) pour créer un bloc d\'encre pure.', words: [{ jp: '墨', kana: 'すみ', fr: 'L\'encre de Chine' }, { jp: '水墨画', kana: 'すいぼくが', fr: 'Lavis (peinture à l\'encre)' }] },
    { j: '碑', on: 'ヒ', kun: '', f: 'Stèle / Monument', rad: '石 (Pierre)', story: 'Une pierre (石) dressée qui s\'abaisse (卑) pour honorer les ancêtres.', words: [{ jp: '石碑', kana: 'せきひ', fr: 'Monument en pierre' }, { jp: '記念碑', kana: 'きねんひ', fr: 'Mémorial' }] },
    { j: '朗', on: 'ロウ', kun: 'ほが(らか)', f: 'Clair / Sonore / Joyeux', rad: '月 (Lune)', story: 'La perfection d\'une bonne lune (良 + 月) qui brille d\'une lumière claire et joyeuse.', words: [{ jp: '朗らか', kana: 'ほがらか', fr: 'Joyeux / Serein' }, { jp: '朗読', kana: 'ろうどく', fr: 'Lecture à voix haute' }] },

    // --- NATURE EXTRÊME ET ÉLÉMENTS ---
    { j: '嵐', on: 'ラン', kun: 'あらし', f: 'Tempête / Ouragan', rad: '山 (Montagne)', story: 'Le vent (風) hurle et s\'abat violemment sur la montagne (山).', words: [{ jp: '嵐', kana: 'あらし', fr: 'Tempête' }, { jp: '砂嵐', kana: 'すなあらし', fr: 'Tempête de sable' }] },
    { j: '雷', on: 'ライ', kun: 'かみなり', f: 'Tonnerre / Foudre', rad: '雨 (Pluie)', story: 'La pluie (雨) qui s\'abat sur la rizière (田) avec un fracas assourdissant.', words: [{ jp: '雷', kana: 'かみなり', fr: 'Le tonnerre / La foudre' }, { jp: '地雷', kana: 'じらい', fr: 'Mine terrestre' }] },
    { j: '滝', on: 'ロウ', kun: 'たき', f: 'Cascade', rad: '氵 (Eau)', story: 'L\'eau (氵) d\'un dragon (竜) mythique tombant avec majesté du haut d\'une falaise.', words: [{ jp: '滝', kana: 'たき', fr: 'Cascade' }, { jp: '白滝', kana: 'しらたき', fr: 'Chute blanche (aussi des nouilles)' }] },
    { j: '霧', on: 'ム', kun: 'きり', f: 'Brouillard', rad: '雨 (Pluie)', story: 'Une pluie (雨) si fine qu\'elle semble liée à des tâches ménagères (務), bloquant la vue.', words: [{ jp: '霧', kana: 'きり', fr: 'Brouillard' }, { jp: '濃霧', kana: 'のうむ', fr: 'Brouillard épais' }] },
    { j: '露', on: 'ロ, ロウ', kun: 'つゆ', f: 'Rosée / Exposé', rad: '雨 (Pluie)', story: 'La pluie (雨) qui repose sur la route (路) au petit matin sous forme de rosée.', words: [{ jp: '露', kana: 'つゆ', fr: 'Rosée' }, { jp: '露出', kana: 'ろしゅつ', fr: 'Exposition' }] },
    { j: '霜', on: 'ソウ', kun: 'しも', f: 'Givre', rad: '雨 (Pluie)', story: 'La pluie (雨) gelée qui se forme ensemble mutuellement (相) sur le sol.', words: [{ jp: '霜', kana: 'しも', fr: 'Le givre' }, { jp: '霜焼け', kana: 'しもやけ', fr: 'Engelure' }] },
    { j: '暁', on: 'ギョウ', kun: 'あかつき', f: 'Aube / Crépuscule matinal', rad: '日 (Soleil)', story: 'Le soleil (日) qui se lève abondamment (尭), marquant le triomphe de la lumière.', words: [{ jp: '暁', kana: 'あかつき', fr: 'Aube' }, { jp: '春暁', kana: 'しゅんぎょう', fr: 'Matin de printemps' }] },
    { j: '崖', on: 'ガイ', kun: 'がけ', f: 'Falaise / Précipice', rad: '山 (Montagne)', story: 'La montagne (山) dont la paroi a été grattée (圭) jusqu\'à devenir verticale.', words: [{ jp: '崖', kana: 'がけ', fr: 'Une falaise' }, { jp: '断崖', kana: 'だんがい', fr: 'Précipice / Abîme' }] },

    // --- CORPS, MÉDECINE ET SCIENCE ---
    { j: '菌', on: 'キン', kun: '', f: 'Bactérie / Champignon', rad: '艹 (Herbe)', story: 'Une herbe (艹) enfermant l\'intérieur d\'un grenier (禾+囗) : la moisissure microscopique.', words: [{ jp: '細菌', kana: 'さいきん', fr: 'Bactérie / Bacille' }, { jp: '殺菌', kana: 'さっきん', fr: 'Stérilisation' }] },
    { j: '髄', on: 'ズイ', kun: '', f: 'Moelle / Cœur (d\'un sujet)', rad: '骨 (Os)', story: 'Ce qui suit ou coule (随) à l\'intérieur de l\'os (骨).', words: [{ jp: '骨髄', kana: 'こつずい', fr: 'Moelle osseuse' }, { jp: '真髄', kana: 'しんずい', fr: 'L\'essence / L\'esprit profond' }] },
    { j: '肝', on: 'カン', kun: 'きも', f: 'Foie / Courage', rad: '月 (Chair)', story: 'L\'organe de chair (月) essentiel comme un bouclier (干) pour purifier le sang.', words: [{ jp: '肝臓', kana: 'かんぞう', fr: 'Le foie' }, { jp: '肝心', kana: 'かんじん', fr: 'Essentiel / Crucial' }] },
    { j: '睡', on: 'スイ', kun: 'ねむ(る)', f: 'Sommeil / Dormir', rad: '目 (Œil)', story: 'Un œil (目) lourd qui pend vers le sol (垂) à cause de l\'épuisement.', words: [{ jp: '睡眠', kana: 'すいみん', fr: 'Sommeil' }, { jp: '一睡', kana: 'いっすい', fr: 'Un somme / Un petit roupillon' }] },
    { j: '尿', on: 'ニョウ', kun: '', f: 'Urine', rad: '尸 (Corps)', story: 'L\'eau (水) qui s\'évacue du bas du corps (尸).', words: [{ jp: '尿', kana: 'にょう', fr: 'Urine' }, { jp: '糖尿病', kana: 'とうにょうびょう', fr: 'Le diabète' }] },
    { j: '痘', on: 'トウ', kun: '', f: 'Variole', rad: '疒 (Maladie)', story: 'Une maladie (疒) qui fait gonfler la peau comme des haricots (豆).', words: [{ jp: '水痘', kana: 'すいとう', fr: 'La varicelle' }] },

    // --- SOCIÉTÉ MODERNE ET CONCEPTS SPÉCIFIQUES ---
    { j: '覇', on: 'ハ', kun: '', f: 'Hégémonie / Domination', rad: '襾 (Ouest)', story: 'La lune (月) se levant sur l\'hégémonie totale et absolue de l\'Ouest (襾).', words: [{ jp: '覇者', kana: 'はしゃ', fr: 'Champion / Conquérant' }, { jp: '制覇', kana: 'せいは', fr: 'Conquête / Domination' }] },
    { j: '譲', on: 'ジョウ', kun: 'ゆず(る)', f: 'Céder / Transférer', rad: '言 (Parole)', story: 'Utiliser des mots polis (言) pour partager (襄) sa place avec autrui.', words: [{ jp: '譲る', kana: 'ゆずる', fr: 'Céder (un siège, un droit)' }, { jp: '譲渡', kana: 'じょうと', fr: 'Transfert / Cession' }] },
    { j: '妥', on: 'ダ', kun: '', f: 'Compromis / Adéquat', rad: '女 (Femme)', story: 'La main (爪) se posant doucement sur la femme (女) pour apaiser le conflit et trouver un accord.', words: [{ jp: '妥協', kana: 'だきょう', fr: 'Un compromis' }, { jp: '妥当', kana: 'だとう', fr: 'Approprié / Juste' }] },
    { j: '尽', on: 'ジン', kun: 'つ(くす), つ(きる)', f: 'Épuiser / Dévouer', rad: '尸 (Corps)', story: 'Un récipient (皿) tenu avec une main sous le toit (尸) jusqu\'à ce qu\'il soit totalement vidé.', words: [{ jp: '尽くす', kana: 'つくす', fr: 'Dédier / Épuiser (ses forces)' }, { jp: '無尽蔵', kana: 'むじんぞう', fr: 'Inépuisable' }] },
    { j: '貢', on: 'コウ, ク', kun: 'みつ(ぐ)', f: 'Tribut / Financer', rad: '貝 (Argent)', story: 'L\'argent (貝) ou le travail (工) offert à un supérieur.', words: [{ jp: '貢献', kana: 'こうけん', fr: 'Contribution' }] }
  ]
};

// 2. BASE DE DONNÉES DU VOCABULAIRE CATÉGORISÉ (Générateur Procédural)
const DB_VOCAB = {
  N5: {
    subjects: [
      { jp: "私", kana: "わたし", romaji: "watashi", fr: "Je" },
      { jp: "先生", kana: "せんせい", romaji: "sensei", fr: "Le professeur" },
      { jp: "学生", kana: "がくせい", romaji: "gakusei", fr: "L'étudiant" },
      { jp: "友達", kana: "ともだち", romaji: "tomodachi", fr: "L'ami" },
      { jp: "猫", kana: "ねこ", romaji: "neko", fr: "Le chat" },
      { jp: "犬", kana: "いぬ", romaji: "inu", fr: "Le chien" },
      { jp: "彼", kana: "かれ", romaji: "kare", fr: "Il" },
      { jp: "彼女", kana: "かのじょ", romaji: "kanojo", fr: "Elle" },
      { jp: "母", kana: "はは", romaji: "haha", fr: "Ma mère" },
      { jp: "父", kana: "ちち", romaji: "chichi", fr: "Mon père" },
      { jp: "子供", kana: "こども", romaji: "kodomo", fr: "L'enfant" },
      { jp: "医者", kana: "いしゃ", romaji: "isha", fr: "Le médecin" },
      { jp: "店員", kana: "てんいん", romaji: "ten'in", fr: "L'employé de magasin" }
    ],
    places: [
      { jp: "学校", kana: "がっこう", romaji: "gakkō", fr: "l'école" },
      { jp: "東京", kana: "とうきょう", romaji: "tōkyō", fr: "Tokyo" },
      { jp: "庭", kana: "にわ", romaji: "niwa", fr: "le jardin" },
      { jp: "日本", kana: "にほん", romaji: "nihon", fr: "le Japon" },
      { jp: "部屋", kana: "へや", romaji: "heya", fr: "la chambre" },
      { jp: "店", kana: "みせ", romaji: "mise", fr: "le magasin" },
      { jp: "病院", kana: "びょういん", romaji: "byōin", fr: "l'hôpital" },
      { jp: "駅", kana: "えき", romaji: "eki", fr: "la gare" },
      { jp: "家", kana: "いえ", romaji: "ie", fr: "la maison" },
      { jp: "銀行", kana: "ぎんこう", romaji: "ginkō", fr: "la banque" },
      { jp: "公園", kana: "こうえん", romaji: "kōen", fr: "le parc" },
      { jp: "海", kana: "うみ", romaji: "umi", fr: "la mer" },
      { jp: "スーパー", kana: "すーぱー", romaji: "sūpā", fr: "le supermarché" },
      { jp: "レストラン", kana: "れすとらん", romaji: "resutoran", fr: "le restaurant" },
      { jp: "トイレ", kana: "といれ", romaji: "toire", fr: "les toilettes" }
    ],
    objects: [
      { jp: "水", kana: "みず", romaji: "mizu", fr: "l'eau" },
      { jp: "お茶", kana: "おちゃ", romaji: "ocha", fr: "le thé" },
      { jp: "ご飯", kana: "ごはん", romaji: "gohan", fr: "le riz / le repas" },
      { jp: "パン", kana: "ぱん", romaji: "pan", fr: "le pain" },
      { jp: "肉", kana: "にく", romaji: "niku", fr: "la viande" },
      { jp: "魚", kana: "さかな", romaji: "sakana", fr: "le poisson" },
      { jp: "本", kana: "ほん", romaji: "hon", fr: "le livre" },
      { jp: "お金", kana: "おかね", romaji: "okane", fr: "l'argent" },
      { jp: "車", kana: "くるま", romaji: "kuruma", fr: "la voiture" },
      { jp: "電話", kana: "でんわ", romaji: "denwa", fr: "le téléphone" },
      { jp: "鞄", kana: "かばん", romaji: "kaban", fr: "le sac" },
      { jp: "靴", kana: "くつ", romaji: "kutsu", fr: "les chaussures" }
    ],
    verbs_motion: [
      { jp: "行きます", kana: "いきます", romaji: "ikimasu", fr: "vais / va (à)" },
      { jp: "来ます", kana: "きます", romaji: "kimasu", fr: "viens / vient (à)" },
      { jp: "帰ります", kana: "かえります", romaji: "kaerimasu", fr: "rentre (à)" },
      { jp: "出かけます", kana: "でかけます", romaji: "dekakemasu", fr: "sors / sort (à)" },
      { jp: "歩きます", kana: "あるきます", romaji: "arukimasu", fr: "marche (vers)" },
      { jp: "走ります", kana: "はしります", romaji: "hashirimasu", fr: "cours / court (vers)" }
    ],
    verbs_action: [
      { jp: "食べます", kana: "たべます", romaji: "tabemasu", fr: "mange" },
      { jp: "飲みます", kana: "のみます", romaji: "nomimasu", fr: "boit" },
      { jp: "見ます", kana: "みます", romaji: "mimasu", fr: "regarde / voit" },
      { jp: "聞きます", kana: "ききます", romaji: "kikimasu", fr: "écoute" },
      { jp: "読みます", kana: "よみます", romaji: "yomimasu", fr: "lit" },
      { jp: "書きます", kana: "かきます", romaji: "kakimasu", fr: "écrit" },
      { jp: "買います", kana: "かいます", romaji: "kaimasu", fr: "achète" },
      { jp: "話します", kana: "はなします", romaji: "hanashimasu", fr: "parle" },
      { jp: "作ります", kana: "つくります", romaji: "tsukurimasu", fr: "fabrique / prépare" }
    ],
    adjectives: [
      { jp: "大きい", kana: "おおきい", romaji: "ookii", fr: "grand" },
      { jp: "小さい", kana: "ちいさい", romaji: "chiisai", fr: "petit" },
      { jp: "新しい", kana: "あたらしい", romaji: "atarashii", fr: "nouveau" },
      { jp: "古い", kana: "ふるい", romaji: "furui", fr: "vieux" },
      { jp: "高い", kana: "たかい", romaji: "takai", fr: "cher / haut" },
      { jp: "安い", kana: "やすい", romaji: "yasui", fr: "bon marché" },
      { jp: "美味しい", kana: "おいしい", romaji: "oishii", fr: "délicieux" },
      { jp: "忙しい", kana: "いそがしい", romaji: "isogashii", fr: "occupé" },
      { jp: "静か", kana: "しずか", romaji: "shizuka", fr: "calme (na)" },
      { jp: "綺麗", kana: "きれい", romaji: "kirei", fr: "beau / propre (na)" }
    ],
    expressions: [
      { jp: "おはようございます", kana: "おはようございます", romaji: "ohayou gozaimasu", fr: "Bonjour (matin)" },
      { jp: "こんにちは", kana: "こんにちは", romaji: "konnichiwa", fr: "Bonjour (journée)" },
      { jp: "こんばんは", kana: "こんばんは", romaji: "konbanwa", fr: "Bonsoir" },
      { jp: "ありがとうございます", kana: "ありがとうございます", romaji: "arigatou gozaimasu", fr: "Merci beaucoup" },
      { jp: "すみません", kana: "すみません", romaji: "sumimasen", fr: "Excusez-moi / Pardon" },
      { jp: "お願いします", kana: "おねがいします", romaji: "onegai shimasu", fr: "S'il vous plaît" },
      { jp: "いただきます", kana: "いただきます", romaji: "itadakimasu", fr: "Bon appétit (avant repas)" },
      { jp: "ごちそうさまでした", kana: "ごちそうさまでした", romaji: "gochisousama deshita", fr: "Merci pour ce repas" }
    ]
  },
  N4: {
    subjects: [
      { jp: "会社員", kana: "かいしゃいん", romaji: "kaishain", fr: "L'employé de bureau" },
      { jp: "運転手", kana: "うんてんしゅ", romaji: "untenshu", fr: "Le chauffeur" },
      { jp: "看護師", kana: "かんごし", romaji: "kangoshi", fr: "L'infirmier(e)" },
      { jp: "警察官", kana: "けいさつかん", romaji: "keisatsukan", fr: "Le policier" },
      { jp: "社長", kana: "しゃちょう", romaji: "shachō", fr: "Le directeur (PDG)" },
      { jp: "留学生", kana: "りゅうがくせい", romaji: "ryūgakusei", fr: "L'étudiant étranger" },
      { jp: "家族", kana: "かぞく", romaji: "kazoku", fr: "La famille" },
      { jp: "泥棒", kana: "どろぼう", romaji: "dorobō", fr: "Le voleur" },
      { jp: "お客さん", kana: "おきゃくさん", romaji: "okyakusan", fr: "Le client / l'invité" },
      { jp: "赤ちゃん", kana: "あかちゃん", romaji: "akachan", fr: "Le bébé" }
    ],
    places: [
      { jp: "空港", kana: "くうこう", romaji: "kūkō", fr: "l'aéroport" },
      { jp: "事務所", kana: "じむしょ", romaji: "jimusho", fr: "le bureau (lieu)" },
      { jp: "大使館", kana: "たいしかん", romaji: "taishikan", fr: "l'ambassade" },
      { jp: "京都", kana: "きょうと", romaji: "kyōto", fr: "Kyoto" },
      { jp: "会場", kana: "かいじょう", romaji: "kaijō", fr: "le lieu de l'événement" },
      { jp: "工場", kana: "こうじょう", romaji: "kōjō", fr: "l'usine" },
      { jp: "美術館", kana: "びじゅつかん", romaji: "bijutsukan", fr: "le musée d'art" },
      { jp: "旅館", kana: "りょかん", romaji: "ryokan", fr: "l'auberge traditionnelle" },
      { jp: "市役所", kana: "しやくしょ", romaji: "shiyakusho", fr: "la mairie" }
    ],
    objects: [
      { jp: "携帯", kana: "けいたい", romaji: "keitai", fr: "le téléphone portable" },
      { jp: "パソコン", kana: "ぱそこん", romaji: "pasokon", fr: "l'ordinateur" },
      { jp: "冷蔵庫", kana: "れいぞうこ", romaji: "reizouko", fr: "le réfrigérateur" },
      { jp: "荷物", kana: "にもつ", romaji: "nimotsu", fr: "les bagages" },
      { jp: "お土産", kana: "おみやげ", romaji: "omiyage", fr: "le souvenir (cadeau)" },
      { jp: "鍵", kana: "かぎ", romaji: "kagi", fr: "la clé" }
    ],
    verbs_motion: [
      { jp: "向かいます", kana: "むかいます", romaji: "mukaimasu", fr: "se dirige (vers)" },
      { jp: "集まります", kana: "あつまります", romaji: "atsumarimasu", fr: "se rassemble (à)" },
      { jp: "出発します", kana: "しゅっぱつします", romaji: "shuppatsu shimasu", fr: "part (de) / s'en va (à)" },
      { jp: "到着します", kana: "とうちゃくします", romaji: "tōchaku shimasu", fr: "arrive (à)" },
      { jp: "急ぎます", kana: "いそぎます", romaji: "isogimasu", fr: "se dépêche (d'aller à)" },
      { jp: "引っ越します", kana: "ひっこします", romaji: "hikkoshimasu", fr: "déménage (à)" },
      { jp: "通います", kana: "かよいます", romaji: "kayoimasu", fr: "fait le trajet régulièrement (vers)" }
    ],
    verbs_action: [
      { jp: "片付けます", kana: "かたづけます", romaji: "katadzukemasu", fr: "range / met en ordre" },
      { jp: "探します", kana: "さがします", romaji: "sagashimasu", fr: "cherche" },
      { jp: "調べます", kana: "しらべます", romaji: "shirabemasu", fr: "examine / consulte" },
      { jp: "手伝います", kana: "てつだいます", romaji: "tetsudaimasu", fr: "aide" },
      { jp: "予約します", kana: "よやくします", romaji: "yoyakushimasu", fr: "réserve" },
      { jp: "払います", kana: "はらいます", romaji: "haraimasu", fr: "paie" }
    ],
    adjectives: [
      { jp: "危ない", kana: "あぶない", romaji: "abunai", fr: "dangereux" },
      { jp: "安全", kana: "あんぜん", romaji: "anzen", fr: "sûr / en sécurité (na)" },
      { jp: "複雑", kana: "ふくざつ", romaji: "fukuzatsu", fr: "complexe (na)" },
      { jp: "簡単", kana: "かんたん", romaji: "kantan", fr: "facile / simple (na)" },
      { jp: "嬉しい", kana: "うれしい", romaji: "ureshii", fr: "heureux / content" },
      { jp: "悲しい", kana: "かなしい", romaji: "kanashii", fr: "triste" },
      { jp: "寂しい", kana: "さびしい", romaji: "sabishii", fr: "solitaire / se sentir seul" }
    ]
  },
  N3: {
    subjects: [
      { jp: "政治家", kana: "せいじか", romaji: "seijika", fr: "Le politicien" },
      { jp: "司会者", kana: "しかいしゃ", romaji: "shikaisha", fr: "L'animateur" },
      { jp: "裁判官", kana: "さいばんかん", romaji: "saibankan", fr: "Le juge" },
      { jp: "労働者", kana: "ろうどうしゃ", romaji: "rōdōsha", fr: "Le travailleur" },
      { jp: "経営者", kana: "けいえいしゃ", romaji: "keieisha", fr: "Le gérant" },
      { jp: "専門家", kana: "せんもんか", romaji: "senmonka", fr: "L'expert" },
      { jp: "選手", kana: "せんしゅ", romaji: "senshu", fr: "L'athlète" },
      { jp: "担当者", kana: "たんとうしゃ", romaji: "tantōsha", fr: "La personne en charge" }
    ],
    places: [
      { jp: "市役所", kana: "しやくしょ", romaji: "shiyaksho", fr: "la mairie" },
      { jp: "薬局", kana: "やっきょく", romaji: "yakkyoku", fr: "la pharmacie" },
      { jp: "裁判所", kana: "さいばんしょ", romaji: "saibansho", fr: "le tribunal" },
      { jp: "支店", kana: "してん", romaji: "shiten", fr: "la succursale" },
      { jp: "会議室", kana: "かいぎしつ", romaji: "kaigishitsu", fr: "la salle de réunion" },
      { jp: "営業所", kana: "えいぎょうしょ", romaji: "eigyōsho", fr: "l'agence commerciale" },
      { jp: "現場", kana: "げんば", romaji: "genba", fr: "le chantier / la scène" },
      { jp: "故郷", kana: "こきょう", romaji: "kokyō", fr: "le pays natal" }
    ],
    objects: [
      { jp: "書類", kana: "しょるい", romaji: "shorui", fr: "les documents" },
      { jp: "資料", kana: "しりょう", romaji: "shiryou", fr: "les données / matériaux" },
      { jp: "契約書", kana: "けいやくしょ", romaji: "keiyakusho", fr: "le contrat (papier)" },
      { jp: "商品", kana: "ひんしつ", romaji: "shouhin", fr: "la marchandise" },
      { jp: "機械", kana: "きかい", romaji: "kikai", fr: "la machine" }
    ],
    verbs_motion: [
      { jp: "戻ります", kana: "もどります", romaji: "modorimasu", fr: "retourne / revient (à)" },
      { jp: "移転します", kana: "いてんします", romaji: "itenshimasu", fr: "déménage (entreprise) (à)" },
      { jp: "出席します", kana: "しゅっせきします", romaji: "shusseki shimasu", fr: "assiste (à)" },
      { jp: "退職します", kana: "たいしょくします", romaji: "taishoku shimasu", fr: "se retire / démissionne (de)" },
      { jp: "留学します", kana: "りゅうがくします", romaji: "ryūgakushimasu", fr: "part étudier (à)" },
      { jp: "逃げます", kana: "にげます", romaji: "nigemasu", fr: "s'enfuit (de/vers)" }
    ],
    verbs_action: [
      { jp: "確認します", kana: "かくにんします", romaji: "kakunin shimasu", fr: "confirme / vérifie" },
      { jp: "提案します", kana: "ていあんします", romaji: "teian shimasu", fr: "propose" },
      { jp: "報告します", kana: "ほうこくします", romaji: "houkoku shimasu", fr: "signale / rapporte" },
      { jp: "比較します", kana: "ひかくします", romaji: "hikaku shimasu", fr: "compare" },
      { jp: "我慢します", kana: "がまんします", romaji: "gaman shimasu", fr: "supporte / endure" }
    ],
    adjectives: [
      { jp: "正確", kana: "せいかく", romaji: "seikaku", fr: "précis / exact (na)" },
      { jp: "面倒", kana: "めんどう", romaji: "mendou", fr: "ennuyeux / laborieux (na)" },
      { jp: "詳細", kana: "しょうさい", romaji: "shousai", fr: "détaillé (na)" },
      { jp: "厳しい", kana: "きびしい", romaji: "kibishii", fr: "sévère / strict" },
      { jp: "詳しい", kana: "くわしい", romaji: "kuwashii", fr: "détaillé / connaisseur" }
    ]
  },
  N2: {
    subjects: [
      { jp: "裁判員", kana: "さいばんいん", romaji: "saiban'in", fr: "Le juré (justice)" },
      { jp: "候補者", kana: "こうほしゃ", romaji: "kōhosha", fr: "Le candidat" },
      { jp: "取材班", kana: "しゅざいはん", romaji: "shuzaihan", fr: "L'équipe de reportage" },
      { jp: "主催者", kana: "しゅさいしゃ", romaji: "shusaisha", fr: "L'organisateur" },
      { jp: "被害者", kana: "ひがいしゃ", romaji: "higaisha", fr: "La victime" },
      { jp: "専門医", kana: "せんもんい", romaji: "senmon'i", fr: "Le médecin spécialiste" },
      { jp: "官僚", kana: "かんりょう", romaji: "kanryō", fr: "Le bureaucrate" },
      { jp: "教授", kana: "きょうじゅ", romaji: "kyōju", fr: "Le professeur d'université" }
    ],
    places: [
      { jp: "選挙区", kana: "せんきょく", romaji: "senkyoku", fr: "la circonscription électorale" },
      { jp: "開発課", kana: "かいはつか", romaji: "kaihatsuka", fr: "le département de développement" },
      { jp: "事務局", kana: "じむきょく", romaji: "jimukyoku", fr: "le secrétariat général" },
      { jp: "目的地", kana: "もくてきち", romaji: "mokutekichi", fr: "la destination" },
      { jp: "首都", kana: "しゅと", romaji: "shuto", fr: "la capitale" },
      { jp: "刑務所", kana: "けいむしょ", romaji: "keimusho", fr: "la prison" },
      { jp: "出張先", kana: "しゅっちょうさき", romaji: "shucchōsaki", fr: "le lieu du voyage d'affaires" }
    ],
    verbs_motion: [
      { jp: "赴任します", kana: "ふにんします", romaji: "funinshimasu", fr: "part prendre son poste (à)" },
      { jp: "進出します", kana: "しんしゅつします", romaji: "shinshutsu shimasu", fr: "s'implante / se développe (à)" },
      { jp: "視察します", kana: "しさつします", romaji: "shisatsushimasu", fr: "inspecte / visite officiellement" },
      { jp: "同行します", kana: "どうこうします", romaji: "dōkōshimasu", fr: "accompagne quelqu'un (à)" },
      { jp: "帰還します", kana: "きかんします", romaji: "kikanshimasu", fr: "rapatrie / rentre sain et sauf (à)" },
      { jp: "移住します", kana: "いじゅうします", romaji: "ijūshimasu", fr: "émigre / s'installe définitivement (à)" }
    ]
  },
  N1: {
    subjects: [
      { jp: "容疑者", kana: "ようぎしゃ", romaji: "yōgisha", fr: "Le suspect" },
      { jp: "開拓者", kana: "かいたくしゃ", romaji: "kaitakusha", fr: "Le pionnier" },
      { jp: "大統領", kana: "だいとうりょう", romaji: "daitōryō", fr: "Le président (d'un pays)" },
      { jp: "派遣団", kana: "はけんだん", romaji: "hakendan", fr: "La délégation" },
      { jp: "先駆者", kana: "せんくしゃ", romaji: "senkusha", fr: "Le précurseur" },
      { jp: "覇者", kana: "はしゃ", romaji: "hasha", fr: "Le conquérant / Le champion" },
      { jp: "皇帝", kana: "こうてい", romaji: "kōtei", fr: "L'Empereur" },
      { jp: "刺客", kana: "しかく", romaji: "shikaku", fr: "L'assassin" }
    ],
    places: [
      { jp: "駐屯地", kana: "ちゅうとんち", romaji: "chūtonchi", fr: "la base militaire / garnison" },
      { jp: "開拓地", kana: "かいたくち", romaji: "kaitakuchi", fr: "la terre colonisée" },
      { jp: "任地", kana: "にんち", romaji: "ninchi", fr: "le lieu d'affectation" },
      { jp: "密林", kana: "みつりん", romaji: "mitsurin", fr: "la jungle / forêt dense" },
      { jp: "前線", kana: "ぜんせん", romaji: "zensen", fr: "la ligne de front" },
      { jp: "敵陣", kana: "てきじん", romaji: "tekijin", fr: "le camp ennemi" },
      { jp: "頂", kana: "いただき", romaji: "itadaki", fr: "le sommet" }
    ],
    verbs_motion: [
      { jp: "赴きます", kana: "おもむきます", romaji: "omomukimasu", fr: "se rend (vers) [littéraire]" },
      { jp: "潜入します", kana: "せんにゅうします", romaji: "sennyūshimasu", fr: "s'infiltre / s'introduit secrètement (à)" },
      { jp: "凱旋します", kana: "がいせんします", romaji: "gaisenshimasu", fr: "revient triomphalement (à)" },
      { jp: "左遷されます", kana: "させんされます", romaji: "sasensaremasu", fr: "est rétrogradé / banni (à)" },
      { jp: "亡命します", kana: "ぼうめいします", romaji: "bōmeishimasu", fr: "s'exile / demande l'asile (à)" },
      { jp: "侵攻します", kana: "しんこうします", romaji: "shinkōshimasu", fr: "envahit / mène une incursion (à)" }
    ]
  }
};

// 3. BASE DE DONNÉES DE LA DICTÉE BILINGUE (Inclus Tameguchi & Kotowaza)
const DB_DICTATION = {
  N5: [
    // --- Japonais Standard ---
    { jp: "おはようございます", fr: "Bonjour (le matin)", wrong_fr: ["Bonsoir", "Merci beaucoup", "Au revoir"], wrong_jp: ["こんばんは", "ありがとうございます", "さようなら"] },
    { jp: "りんごを食べます", fr: "Je mange une pomme", wrong_fr: ["Je bois de l'eau", "J'achète une pomme", "Il mange du pain"], wrong_jp: ["水を飲みます", "りんごを買います", "パンを食べます"] },
    { jp: "どこに行きますか", fr: "Où allez-vous ?", wrong_fr: ["D'où venez-vous ?", "Que faites-vous ?", "Quand partez-vous ?"], wrong_jp: ["どこから来ましたか", "何をしますか", "いつ出発しますか"] },
    // --- Japonais Familier (Tameguchi) ---
    { jp: "お腹すいた！", fr: "J'ai faim !", wrong_fr: ["J'ai soif !", "J'ai sommeil !", "C'est délicieux !"], wrong_jp: ["喉が渇いた！", "眠い！", "美味しい！"] },
    { jp: "行く？", fr: "Tu y vas ?", wrong_fr: ["Tu manges ?", "Tu viens ?", "Tu rentres ?"], wrong_jp: ["食べる？", "来る？", "帰る？"] },
    { jp: "すごい！", fr: "Incroyable / Super !", wrong_fr: ["C'est nul !", "C'est grand !", "C'est chaud !"], wrong_jp: ["だめ！", "大きい！", "熱い！"] }
  ],
  N4: [
    // --- Japonais Standard ---
    { jp: "雨が降りそうです", fr: "On dirait qu'il va pleuvoir", wrong_fr: ["Il a plu hier", "Il pleut beaucoup", "J'ai entendu qu'il allait pleuvoir"], wrong_jp: ["昨日雨が降りました", "雨がたくさん降っています", "雨が降るそうです"] },
    { jp: "安ければ、買います", fr: "Si c'est pas cher, j'achèterai", wrong_fr: ["Quand je l'ai acheté, c'était pas cher", "Je veux l'acheter même si c'est cher", "Si j'achète, ce sera pas cher"], wrong_jp: ["買った時、安かったです", "高くても買いたいです", "買えば、安くなります"] },
    // --- Japonais Familier (Anime Style) ---
    { jp: "何やってんの？", fr: "Tu fais quoi là ?", wrong_fr: ["Où vas-tu ?", "Qui es-tu ?", "Pourquoi tu pleures ?"], wrong_jp: ["どこ行くの？", "誰なの？", "なんで泣いてるの？"] },
    { jp: "マジで？", fr: "Sérieux ? / Vraiment ?", wrong_fr: ["C'est une blague ?", "C'est faux ?", "Bien sûr !"], wrong_jp: ["冗談でしょ？", "嘘でしょ？", "もちろん！"] },
    { jp: "やばい！", fr: "C'est dingue / Chaud !", wrong_fr: ["C'est facile !", "C'est bon !", "C'est fini !"], wrong_jp: ["簡単！", "美味しい！", "終わった！"] }
  ],
  N3: [
    // --- Japonais Standard ---
    { jp: "温かいうちに食べてください", fr: "Mangez pendant que c'est chaud", wrong_fr: ["Mangez quand ce sera froid", "Ne mangez pas ceci", "C'est chaud et bon"], wrong_jp: ["冷たい内に食べてください", "これを食べないでください", "温かくて美味しいです"] },
    { jp: "このプロジェクトは失敗するはずがない", fr: "Il est impossible que ce projet échoue", wrong_fr: ["Ce projet va probablement échouer", "Ce projet n'a pas le droit d'échouer", "Je ne sais pas si ce projet va échouer"], wrong_jp: ["このプロジェクトは失敗するかもしれない", "このプロジェクトは失敗してはいけない", "このプロジェクトが失敗するか分からない"] },
    // --- Japonais Familier & Émotionnel ---
    { jp: "絶対許さない！", fr: "Je ne te pardonnerai jamais !", wrong_fr: ["Je n'oublierai jamais !", "Je ne perdrai pas !", "Je ne comprends pas !"], wrong_jp: ["絶対忘れない！", "絶対負けない！", "全然分からない！"] },
    { jp: "しょうがないな", fr: "On n'y peut rien / Tant pis", wrong_fr: ["C'est de ta faute", "C'est impossible", "Je ne sais pas"], wrong_jp: ["君のせいだ", "ありえないな", "知らないな"] },
    { jp: "気にしないで", fr: "Ne t'en fais pas / T'inquiète", wrong_fr: ["Fais attention", "Ne l'oublie pas", "Ne me touche pas"], wrong_jp: ["気をつけて", "忘れないで", "触らないで"] }
  ],
  N2: [
    // --- Japonais Standard ---
    { jp: "予定を変更せざるを得ない", fr: "Nous sommes obligés de modifier le programme", wrong_fr: ["Nous voulons changer de programme", "Il est impossible de changer le planning", "Le programme est annulé"], wrong_jp: ["予定を変更したいです", "予定を変更するのは不可能です", "予定は中止になりました"] },
    { jp: "その意見には賛成しかねます", fr: "Je ne peux me résoudre à approuver cette opinion", wrong_fr: ["J'approuve totalement cette idée", "Je vais y réfléchir", "Cette opinion est stupide"], wrong_jp: ["その意見に完全に賛成します", "それについて考えてみます", "その意見は馬鹿げています"] },
    // --- Proverbes (Kotowaza) & Expressions ---
    { jp: "猿も木から落ちる", fr: "L'erreur est humaine (Même les singes tombent)", wrong_fr: ["Le chien aboie, la caravane passe", "Tel père, tel fils", "Il n'y a pas de fumée sans feu"], wrong_jp: ["犬が吠えてもキャラバンは進む", "蛙の子は蛙", "火のない所に煙は立たぬ"] },
    { jp: "一期一会", fr: "Une rencontre, une opportunité (Chaque instant est unique)", wrong_fr: ["Une pierre, deux coups", "Après la pluie, le beau temps", "Le silence est d'or"], wrong_jp: ["一石二鳥", "雨降って地固まる", "沈黙は金"] },
    { jp: "面倒くさいな", fr: "C'est galère / C'est pénible", wrong_fr: ["C'est intéressant", "C'est compliqué", "C'est effrayant"], wrong_jp: ["面白いな", "複雑だな", "怖いな"] }
  ],
  N1: [
    // --- Japonais Standard ---
    { jp: "彼は私の顔を見るや否や逃げ出した", fr: "Dès qu'il a vu mon visage, il s'est enfui", wrong_fr: ["Il a souri en voyant mon visage", "Il m'a regardé puis est venu me parler", "À peine est-il parti que je l'ai vu"], wrong_jp: ["彼は私の顔を見て微笑んだ", "彼は私を見て話しかけてきた", "彼が出発するや否や私は彼を見た"] },
    { jp: "愛していればこそ厳しく叱るのです", fr: "C'est précisément parce que je l'aime que je le gronde", wrong_fr: ["Je le gronde car je ne l'aime pas", "Bien que je l'aime, je suis méchant", "Je le gronde doucement"], wrong_jp: ["彼を愛していないから叱るのです", "彼を愛しているけれど、私は意地悪です", "彼を優しく叱るのです"] },
    // --- Proverbes Épiques & Dramatiques ---
    { jp: "出る杭は打たれる", fr: "Le clou qui dépasse appelle le marteau (Conformisme)", wrong_fr: ["On récolte ce que l'on sème", "Le temps, c'est de l'argent", "La nuit porte conseil"], wrong_jp: ["自業自得", "時は金なり", "明日は明日の風が吹く"] },
    { jp: "自業自得", fr: "On récolte ce que l'on sème (Karma)", wrong_fr: ["L'amour est aveugle", "Il vaut mieux prévenir que guérir", "L'union fait la force"], wrong_jp: ["恋は盲目", "転ばぬ先の杖", "三人寄れば文殊の知恵"] },
    { jp: "ふざけるな！", fr: "Ne te fous pas de moi !", wrong_fr: ["Ne pars pas !", "Ne me regarde pas !", "Ne pleure pas !"], wrong_jp: ["行かないで！", "見ないで！", "泣かないで！"] }
  ]
};


// 4. BASE DE DONNÉES DES KANAS (Hiragana & Katakana)
const HIRAGANA_BASE = [
  {j:'あ',r:'a'},{j:'い',r:'i'},{j:'う',r:'u'},{j:'え',r:'e'},{j:'お',r:'o'},
  {j:'か',r:'ka'},{j:'き',r:'ki'},{j:'く',r:'ku'},{j:'け',r:'ke'},{j:'こ',r:'ko'},
  {j:'さ',r:'sa'},{j:'し',r:'shi'},{j:'す',r:'su'},{j:'せ',r:'se'},{j:'そ',r:'so'},
  {j:'た',r:'ta'},{j:'ち',r:'chi'},{j:'つ',r:'tsu'},{j:'て',r:'te'},{j:'と',r:'to'},
  {j:'な',r:'na'},{j:'に',r:'ni'},{j:'ぬ',r:'nu'},{j:'ね',r:'ne'},{j:'の',r:'no'},
  {j:'は',r:'ha'},{j:'ひ',r:'hi'},{j:'ふ',r:'fu'},{j:'へ',r:'he'},{j:'ほ',r:'ho'},
  {j:'ま',r:'ma'},{j:'み',r:'mi'},{j:'む',r:'mu'},{j:'め',r:'me'},{j:'も',r:'mo'},
  {j:'や',r:'ya'},{e:true},{j:'ゆ',r:'yu'},{e:true},{j:'よ',r:'yo'},
  {j:'ら',r:'ra'},{j:'り',r:'ri'},{j:'る',r:'ru'},{j:'れ',r:'re'},{j:'ろ',r:'ro'},
  {j:'わ',r:'wa'},{e:true},{e:true},{e:true},{j:'を',r:'wo'},
  {j:'ん',r:'n'},{e:true},{e:true},{e:true},{e:true}
];

const HIRAGANA_DAKUTEN = [
  {j:'が',r:'ga'},{j:'ぎ',r:'gi'},{j:'ぐ',r:'gu'},{j:'げ',r:'ge'},{j:'ご',r:'go'},
  {j:'ざ',r:'za'},{j:'じ',r:'ji'},{j:'ず',r:'zu'},{j:'ぜ',r:'ze'},{j:'ぞ',r:'zo'},
  {j:'だ',r:'da'},{j:'ぢ',r:'ji'},{j:'づ',r:'zu'},{j:'で',r:'de'},{j:'ど',r:'do'},
  {j:'ば',r:'ba'},{j:'び',r:'bi'},{j:'ぶ',r:'bu'},{j:'べ',r:'be'},{j:'ぼ',r:'bo'},
  {j:'ぱ',r:'pa'},{j:'ぴ',r:'pi'},{j:'ぷ',r:'pu'},{j:'ぺ',r:'pe'},{j:'ぽ',r:'po'}
];

const HIRAGANA_YOON = [
  {j:'きゃ',r:'kya'}, {j:'きゅ',r:'kyu'}, {j:'きょ',r:'kyo'},
  {j:'しゃ',r:'sha'}, {j:'しゅ',r:'shu'}, {j:'しょ',r:'sho'},
  {j:'ちゃ',r:'cha'}, {j:'ちゅ',r:'chu'}, {j:'ちょ',r:'cho'},
  {j:'にゃ',r:'nya'}, {j:'にゅ',r:'nyu'}, {j:'にょ',r:'nyo'},
  {j:'ひゃ',r:'hya'}, {j:'ひゅ',r:'hyu'}, {j:'ひょ',r:'hyo'},
  {j:'みゃ',r:'mya'}, {j:'みゅ',r:'myu'}, {j:'みょ',r:'myo'},
  {j:'りゃ',r:'rya'}, {j:'りゅ',r:'ryu'}, {j:'りょ',r:'ryo'},
  {j:'ぎゃ',r:'gya'}, {j:'ぎゅ',r:'gyu'}, {j:'ぎょ',r:'gyo'},
  {j:'じゃ',r:'ja'}, {j:'じゅ',r:'ju'}, {j:'じょ',r:'jo'},
  {j:'びゃ',r:'bya'}, {j:'びゅ',r:'byu'}, {j:'びょ',r:'byo'},
  {j:'ぴゃ',r:'pya'}, {j:'ぴゅ',r:'pyu'}, {j:'ぴょ',r:'pyo'}
];

const KATAKANA_BASE = [
  {j:'ア',r:'a'},{j:'イ',r:'i'},{j:'ウ',r:'u'},{j:'エ',r:'e'},{j:'オ',r:'o'},
  {j:'カ',r:'ka'},{j:'キ',r:'ki'},{j:'ク',r:'ku'},{j:'ケ',r:'ke'},{j:'コ',r:'ko'},
  {j:'サ',r:'sa'},{j:'シ',r:'shi'},{j:'ス',r:'su'},{j:'セ',r:'se'},{j:'ソ',r:'so'},
  {j:'タ',r:'ta'},{j:'チ',r:'chi'},{j:'ツ',r:'tsu'},{j:'テ',r:'te'},{j:'ト',r:'to'},
  {j:'ナ',r:'na'},{j:'ニ',r:'ni'},{j:'ヌ',r:'nu'},{j:'ネ',r:'ne'},{j:'ノ',r:'no'},
  {j:'ハ',r:'ha'},{j:'ヒ',r:'hi'},{j:'フ',r:'fu'},{j:'ヘ',r:'he'},{j:'ホ',r:'ho'},
  {j:'マ',r:'ma'},{j:'ミ',r:'mi'},{j:'ム',r:'mu'},{j:'メ',r:'me'},{j:'モ',r:'mo'},
  {j:'ヤ',r:'ya'},{e:true},{j:'ユ',r:'yu'},{e:true},{j:'ヨ',r:'yo'},
  {j:'ラ',r:'ra'},{j:'リ',r:'ri'},{j:'ル',r:'ru'},{j:'レ',r:'re'},{j:'ロ',r:'ro'},
  {j:'ワ',r:'wa'},{e:true},{e:true},{e:true},{j:'ヲ',r:'wo'},
  {j:'ン',r:'n'},{e:true},{e:true},{e:true},{e:true}
];

const KATAKANA_DAKUTEN = [
  {j:'ガ',r:'ga'},{j:'ギ',r:'gi'},{j:'グ',r:'gu'},{j:'ゲ',r:'ge'},{j:'ゴ',r:'go'},
  {j:'ザ',r:'za'},{j:'ジ',r:'ji'},{j:'ズ',r:'zu'},{j:'ゼ',r:'ze'},{j:'ゾ',r:'zo'},
  {j:'ダ',r:'da'},{j:'ヂ',r:'ji'},{j:'ヅ',r:'zu'},{j:'デ',r:'de'},{j:'ド',r:'do'},
  {j:'バ',r:'ba'},{j:'ビ',r:'bi'},{j:'ブ',r:'bu'},{j:'ベ',r:'be'},{j:'ボ',r:'bo'},
  {j:'パ',r:'pa'},{j:'ピ',r:'pi'},{j:'プ',r:'pu'},{j:'ペ',r:'pe'},{j:'ポ',r:'po'}
];

const KATAKANA_YOON = [
  {j:'キャ',r:'kya'}, {j:'キュ',r:'kyu'}, {j:'キョ',r:'kyo'},
  {j:'シャ',r:'sha'}, {j:'シュ',r:'shu'}, {j:'ショ',r:'sho'},
  {j:'チャ',r:'cha'}, {j:'チュ',r:'chu'}, {j:'チョ',r:'cho'},
  {j:'ニャ',r:'nya'}, {j:'ニュ',r:'nyu'}, {j:'ニョ',r:'nyo'},
  {j:'ヒャ',r:'hya'}, {j:'ヒュ',r:'hyu'}, {j:'ヒョ',r:'hyo'},
  {j:'ミャ',r:'mya'}, {j:'ミュ',r:'myu'}, {j:'ミョ',r:'myo'},
  {j:'リャ',r:'rya'}, {j:'リュ',r:'ryu'}, {j:'リョ',r:'ryo'},
  {j:'ギャ',r:'gya'}, {j:'ギュ',r:'gyu'}, {j:'ギョ',r:'gyo'},
  {j:'ジャ',r:'ja'}, {j:'ジュ',r:'ju'}, {j:'ジョ',r:'jo'},
  {j:'ビャ',r:'bya'}, {j:'ビュ',r:'byu'}, {j:'ビョ',r:'byo'},
  {j:'ピャ',r:'pya'}, {j:'ピュ',r:'pyu'}, {j:'ピョ',r:'pyo'}
];

// 5. BASE DE DONNÉES DE GRAMMAIRE (Texte à trous JLPT)
const DB_GRAMMAR = [
  // --- NIVEAU N5 (Particules et Bases) ---
  { lvl: 'N5', q: "わたし ___ 学生です。", opts: ["が", "で", "を", "は"], ans: "は", fr: "Je suis étudiant.", expl: "La particule『は』(wa) marque le thème de la phrase (Ce dont on parle)." },
  { lvl: 'N5', q: "りんご ___ 食べます。", opts: ["が", "で", "を", "に"], ans: "を", fr: "Je mange une pomme.", expl: "La particule『を』(o) marque le Complément d'Objet Direct de l'action de manger." },
  { lvl: 'N5', q: "鉛筆 ___ 書きます。", opts: ["に", "で", "と", "を"], ans: "で", fr: "J'écris avec un crayon.", expl: "La particule『で』indique le moyen ou l'instrument utilisé pour accomplir l'action." },
  { lvl: 'N5', q: "日曜日 ___ 東京に行きます。", opts: ["は", "が", "に", "を"], ans: "に", fr: "Je vais à Tokyo dimanche.", expl: "La particule『に』marque un point précis dans le temps (ici, dimanche)." },
  { lvl: 'N5', q: "机の上 ___ 本があります。", opts: ["に", "で", "を", "へ"], ans: "に", fr: "Il y a un livre sur le bureau.", expl: "La particule『に』indique le lieu d'existence avec les verbes あります et います." },

  // --- NIVEAU N4 (Conditionnels, Faveurs et Apparences) ---
  { lvl: 'N4', q: "雨が降っ ___ 、行きません。", opts: ["と", "ば", "たら", "なら"], ans: "たら", fr: "S'il pleut, je n'irai pas.", expl: "『〜たら』(tara) exprime une condition chronologique (Si / Une fois que) très utilisée à l'oral." },
  { lvl: 'N4', q: "先生に漢字を教えて ___ 。", opts: ["あげました", "くれました", "もらいました", "きました"], ans: "もらいました", fr: "J'ai reçu l'enseignement des kanjis du professeur.", expl: "『〜てもらう』signifie recevoir une faveur de quelqu'un (marqué par に)." },
  { lvl: 'N4', q: "このケーキは美味し ___ ですね。", opts: ["そう", "みたい", "らしい", "よう"], ans: "そう", fr: "Ce gâteau a l'air délicieux.", expl: "Racine de l'adjectif (美味しい sans le い) + そう = Une apparence visuelle immédiate." },
  { lvl: 'N4', q: "図書館で話しては ___ 。", opts: ["いけません", "なりません", "だめです", "ないです"], ans: "いけません", fr: "Il ne faut pas parler à la bibliothèque.", expl: "La structure 『〜てはいけません』exprime une interdiction formelle." },
  { lvl: 'N4', q: "漢字が書ける ___ なりました。", opts: ["こと", "ため", "よう", "そう"], ans: "ように", fr: "Je suis devenu capable d'écrire les kanjis.", fr: "Je suis devenu capable d'écrire les kanjis.", expl: "『〜ようになる』exprime un changement d'état ou l'acquisition d'une capacité." },

  // --- NIVEAU N3 (Passif/Causatif, Keigo et Limites) ---
  { lvl: 'N3', q: "子供の頃、母に野菜を食べ ___ 。", opts: ["させた", "させられた", "された", "してくれた"], ans: "させられた", fr: "Enfant, ma mère me forçait à manger des légumes.", expl: "Causatif-Passif (させられる) : Être forcé par quelqu'un à faire une action que l'on ne veut pas faire." },
  { lvl: 'N3', q: "社長が ___ 。", opts: ["きました", "まいりました", "いらっしゃいました", "お伺いしました"], ans: "いらっしゃいました", fr: "Le directeur est arrivé.", expl: "『いらっしゃる』est le Sonkeigo (langage de respect) pour le verbe 来る (venir) concernant un supérieur." },
  { lvl: 'N3', q: "日本に住んでいる ___ 、富士山に登りたい。", opts: ["間に", "うちに", "たびに", "ついでに"], ans: "うちに", fr: "Pendant que j'habite au Japon, je veux escalader le mont Fuji.", expl: "『〜うちに』signifie 'Pendant que c'est encore le cas' (avant que l'occasion ne disparaisse)." },
  { lvl: 'N3', q: "明日の会議は、午後2時から行われる ___ になっている。", opts: ["よう", "もの", "わけ", "こと"], ans: "こと", fr: "Il a été décidé que la réunion de demain aura lieu à 14h.", expl: "『〜ことになる』indique une décision prise par une règle ou un groupe, pas par soi-même." },
  { lvl: 'N3', q: "このプロジェクトは失敗する ___ がない。", opts: ["はず", "わけ", "もの", "こと"], ans: "はず", fr: "Il est impossible que ce projet échoue.", expl: "『〜はずがない』exprime une impossibilité logique forte basée sur des faits." },

  // --- NIVEAU N2 (Langage formel et obligations) ---
  { lvl: 'N2', q: "お申し込みに ___ 、写真が必要です。", opts: ["際して", "あたって", "わたって", "沿って"], ans: "際して", fr: "À l'occasion de votre inscription, une photo est requise.", expl: "『〜に際して』(ni saishite) est une tournure très formelle signifiant 'Au moment de / À l'occasion de'." },
  { lvl: 'N2', q: "そのご意見には賛成し ___ 。", opts: ["かねます", "得ません", "ざるを得ない", "がたいです"], ans: "かねます", fr: "Je ne peux me résoudre à approuver cette opinion.", expl: "『〜かねる』s'attache à la racine d'un verbe pour exprimer une impossibilité polie (souvent psychologique ou protocolaire)." },
  { lvl: 'N2', q: "台風のため、イベントを中止せ ___ 。", opts: ["ざるを得ない", "ずにはいられない", "っこない", "得ない"], ans: "ざるを得ない", fr: "À cause du typhon, nous n'avons d'autre choix que d'annuler l'événement.", expl: "『〜ざるを得ない』(zaru o enai) signifie être obligé de faire quelque chose contre sa volonté." },
  { lvl: 'N2', q: "日本の景気は回復し ___ ある。", opts: ["つつ", "ながら", "がてら", "かたがた"], ans: "つつ", fr: "L'économie japonaise est en train de se redresser.", expl: "『〜つつある』(tsutsu aru) indique un processus de changement qui est actuellement en cours." },
  { lvl: 'N2', q: "彼は政治家としてある ___ 行動をとった。", opts: ["まじき", "べき", "ごとき", "べからざる"], ans: "まじき", fr: "Il a eu un comportement indigne d'un politicien.", expl: "『〜あるまじき』est une expression sévère signifiant 'qui ne devrait jamais exister chez ce type de personne'." },

  // --- NIVEAU N1 (Littérature, emphase et instantanéité) ---
  { lvl: 'N1', q: "彼は私の顔を見る ___ 逃げ出した。", opts: ["や否や", "が早いか", "そばから", "なり"], ans: "や否や", fr: "Dès qu'il a vu mon visage, il s'est enfui.", expl: "『〜や否や』(ya ina ya) indique qu'une action B se produit presque simultanément après l'action A, avec un effet de surprise." },
  { lvl: 'N1', q: "愛していれ ___ 厳しく叱るのです。", opts: ["ばこそ", "ばこそか", "るからこそ", "るがゆえに"], ans: "ばこそ", fr: "C'est précisément parce que je l'aime que je le gronde sévèrement.", expl: "『〜ばこそ』(ba koso) met fortement l'accent sur une cause qui peut paraître paradoxale." },
  { lvl: 'N1', q: "そんな恐ろしい事件が起きるなど、想像する ___ 恐ろしい。", opts: ["だに", "すら", "さえ", "のみ"], ans: "だに", fr: "Rien que d'imaginer qu'un tel incident se produise me terrifie.", expl: "『〜だに』(dani) s'utilise avec des mots comme imaginer ou entendre, et signifie 'rien que de... cela provoque un sentiment intense'." },
  { lvl: 'N1', q: "その問題については、今さら議論する ___ もない。", opts: ["まで", "こと", "わけ", "はず"], ans: "まで", fr: "Il n'y a même pas besoin de débattre de ce problème à ce stade.", expl: "『〜までもない』(made mo nai) signifie qu'il n'est pas nécessaire d'aller jusqu'à faire cette action, car c'est évident." },
  { lvl: 'N1', q: "彼女の才能は、天才と呼ぶに ___ 。", opts: ["足る", "堪える", "及ぶ", "値する"], ans: "足る", fr: "Son talent mérite amplement qu'on la qualifie de génie.", expl: "『〜に足る』(ni taru) signifie 'être digne de / valoir la peine de'." }
];

// 6. BASE DE DONNÉES DES COMPTEURS (Classificateurs)
const DB_COUNTERS = [
  { id: "tsu", counter: "つ", kana: "つ", fr: "Objets généraux / abstraits", items: ["りんご (Pomme)", "机 (Bureau)", "質問 (Question)", "鍵 (Clé)"] },
  { id: "nin", counter: "人", kana: "にん / り", fr: "Personnes", items: ["学生 (Étudiant)", "友達 (Ami)", "先生 (Professeur)", "子供 (Enfant)"] },
  { id: "mai", counter: "枚", kana: "まい", fr: "Objets plats et fins", items: ["紙 (Papier)", "切符 (Billet)", "シャツ (Chemise)", "写真 (Photo)"] },
  { id: "hon", counter: "本", kana: "ほん / ぽん", fr: "Objets longs et cylindriques", items: ["ペン (Stylo)", "傘 (Parapluie)", "木 (Arbre)", "映画 (Film)"] },
  { id: "hiki", counter: "匹", kana: "ひき / ぴき", fr: "Petits animaux", items: ["猫 (Chat)", "犬 (Chien)", "魚 (Poisson)", "虫 (Insecte)"] },
  { id: "dai", counter: "台", kana: "だい", fr: "Machines et véhicules", items: ["車 (Voiture)", "パソコン (Ordinateur)", "自転車 (Vélo)", "テレビ (TV)"] },
  { id: "satsu", counter: "冊", kana: "さつ", fr: "Livres et cahiers", items: ["本 (Livre)", "辞書 (Dictionnaire)", "雑誌 (Magazine)", "ノート (Cahier)"] },
  { id: "hai", counter: "杯", kana: "はい / ぱい", fr: "Tasses et verres", items: ["お茶 (Thé)", "水 (Eau)", "コーヒー (Café)", "ビール (Bière)"] }
];

// 7. BASE DE DONNÉES DE LECTURE (Graded Reading)
const DB_READING = [
  {
    id: "r1", lvl: "N5", title: "自己紹介 (Présentation)",
    text: "[私|わたし|Moi, Je]は[学生|がくせい|étudiant]です。[毎日|まいにち|tous les jours]、[日本語|にほんご|le japonais]を[勉強|べんきょう|étude]します。[週末|しゅうまつ|le week-end]は[友達|ともだち|ami]と[映画|えいが|film]を[見|み|voir]に行きます。"
  },
  {
    id: "r2", lvl: "N4", title: "桃太郎 (Momotaro - Extrait)",
    text: "むかしむかし、ある[所|ところ|endroit]に、お[爺さん|じいさん|vieux monsieur]とお[婆さん|ばあさん|vieille dame]がいました。お爺さんは[山|やま|montagne]へ芝刈りに、お婆さんは[川|かわ|rivière]へ[洗濯|せんたく|lessive]に行きました。"
  },
  {
    id: "r3", lvl: "N3", title: "日本の電車 (Les trains japonais)",
    text: "[日本|にほん|Japon]の[電車|でんしゃ|train]はとても[便利|べんり|pratique]で、[時間|じかん|temps/heure]に[正確|せいかく|exact/précis]です。[朝|あさ|matin]の[通勤|つうきん|trajet domicile-travail]の時間はとても[混雑|こんざつ|bondé/affluence]しますが、みんな[静か|しずか|calme]に[乗って|のって|monter/prendre]います。"
  }
];

window.DB_READING = DB_READING; // À rajouter dans la zone d'exportation globale
// Exportation globale
window.HIRAGANA_BASE = HIRAGANA_BASE;
window.HIRAGANA_DAKUTEN = HIRAGANA_DAKUTEN;
window.HIRAGANA_YOON = HIRAGANA_YOON;
window.KATAKANA_BASE = KATAKANA_BASE;
window.KATAKANA_DAKUTEN = KATAKANA_DAKUTEN;
window.KATAKANA_YOON = KATAKANA_YOON;
// Exporte les variables pour les rendre accessibles par index.html
window.DB_KANJI = DB_KANJI;
window.DB_VOCAB = DB_VOCAB;
window.DB_DICTATION = DB_DICTATION;
window.DB_GRAMMAR = DB_GRAMMAR;
window.DB_COUNTERS = DB_COUNTERS;
