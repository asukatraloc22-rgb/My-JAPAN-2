/* =========================================================================
   DATABASE.JS - Base de données centrale de Nihongo no Michi
   ========================================================================= */

// 1. BASE DE DONNÉES DES KANJIS (Intégrale)
const DB_KANJI = {
  N5: [
    {j:'一', on:'イチ', kun:'ひと', f:'Un'}, {j:'二', on:'ニ', kun:'ふた', f:'Deux'}, {j:'三', on:'サン', kun:'み', f:'Trois'}, {j:'四', on:'シ', kun:'よん', f:'Quatre'}, {j:'五', on:'ゴ', kun:'いつ', f:'Cinq'}, {j:'六', on:'ロク', kun:'む', f:'Six'}, {j:'七', on:'シチ', kun:'なな', f:'Sept'}, {j:'八', on:'ハチ', kun:'や', f:'Huit'}, {j:'九', on:'キュウ', kun:'ここの', f:'Neuf'}, {j:'十', on:'ジュウ', kun:'とお', f:'Dix'}, {j:'百', on:'ヒャク', kun:'もも', f:'Cent'}, {j:'千', on:'セン', kun:'ち', f:'Mille'}, {j:'万', on:'マン', kun:'よろず', f:'Dix-mille'},
    {j:'日', on:'ニチ', kun:'ひ', f:'Jour, Soleil'}, {j:'月', on:'ゲツ', kun:'つき', f:'Lune, Mois'}, {j:'火', on:'カ', kun:'ひ', f:'Feu'}, {j:'水', on:'スイ', kun:'みず', f:'Eau'}, {j:'木', on:'モク', kun:'き', f:'Bois'}, {j:'金', on:'キン', kun:'かね', f:'Or'}, {j:'土', on:'ド', kun:'つち', f:'Terre'},
    {j:'人', on:'ジン', kun:'ひと', f:'Personne'}, {j:'男', on:'ダン', kun:'おとco', f:'Homme'}, {j:'女', on:'ジョ', kun:'おんな', f:'Femme'}, {j:'子', on:'シ', kun:'こ', f:'Enfant'}, {j:'父', on:'フ', kun:'ちち', f:'Père'}, {j:'母', on:'ボ', kun:'はは', f:'Mère'}, {j:'友', on:'ユウ', kun:'とも', f:'Ami'},
    {j:'目', on:'モク', kun:'め', f:'Œil'}, {j:'口', on:'コウ', kun:'くち', f:'Bouche'}, {j:'耳', on:'ジ', kun:'みみ', f:'Oreille'}, {j:'手', on:'シュ', kun:'て', f:'Main'}, {j:'足', on:'ソク', kun:'あし', f:'Pied'},
    {j:'上', on:'ジョウ', kun:'うえ', f:'Haut'}, {j:'下', on:'カ', kun:'した', f:'Bas'}, {j:'左', on:'サ', kun:'ひだり', f:'Gauche'}, {j:'右', on:'ウ', kun:'みぎ', f:'Droite'}, {j:'中', on:'チュウ', kun:'なか', f:'Milieu'}, {j:'外', on:'ガイ', kun:'そと', f:'Dehors'}, {j:'前', on:'ゼン', kun:'まえ', f:'Avant'}, {j:'後', on:'ゴ', kun:'うし.ろ', f:'Après'}, {j:'東', on:'トウ', kun:'ひがし', f:'Est'}, {j:'西', on:'セイ', kun:'にし', f:'Ouest'}, {j:'南', on:'ナン', kun:'みなみ', f:'Sud'}, {j:'北', on:'ホク', kun:'きた', f:'Nord'},
    {j:'大', on:'ダイ', kun:'おお', f:'Grand'}, {j:'小', on:'ショウ', kun:'ちい.さい', f:'Petit'}, {j:'高', on:'コウ', kun:'たka.i', f:'Haut'}, {j:'安', on:'アン', kun:'やす.i', f:'Paisible'}, {j:'新', on:'シン', kun:'あたら.しい', f:'Nouveau'}, {j:'古', on:'コ', kun:'ふる.i', f:'Vieux'}, {j:'長', on:'チョウ', kun:'なが.i', f:'Long'}, {j:'多', on:'タ', kun:'おお.i', f:'Beaucoup'}, {j:'少', on:'ショウ', kun:'すく.ない', f:'Peu'}, {j:'白', on:'ハク', kun:'しろ', f:'Blanc'},
    {j:'食', on:'ショク', kun:'た.べる', f:'Manger'}, {j:'飲', on:'イン', kun:'の.む', f:'Boire'}, {j:'見', on:'ケン', kun:'み.る', f:'Voir'}, {j:'聞', on:'ブン', kun:'き.く', f:'Écouter'}, {j:'話', on:'ワ', kun:'はな.す', f:'Parler'}, {j:'読', on:'ドク', kun:'よ.む', f:'Lire'}, {j:'書', on:'ショ', kun:'か.く', f:'Écrire'}, {j:'買', on:'バイ', kun:'か.う', f:'Acheter'}, {j:'行', on:'コウ', kun:'い.く', f:'Aller'}, {j:'出', on:'シュツ', kun:'de.る', f:'Sortir'}, {j:'入', on:'ニュウ', kun:'はい.る', f:'Entrer'}, {j:'休', on:'キュウ', kun:'やす.む', f:'Se reposer'}, {j:'立', on:'リツ', kun:'た.つ', f:'Se lever'}, {j:'生', on:'セイ', kun:'い.きる', f:'Vivre'},
    {j:'山', on:'サン', kun:'やま', f:'Montagne'}, {j:'川', on:'セン', kun:'かわ', f:'Rivière'}, {j:'空', on:'クウ', kun:'そら', f:'Ciel'}, {j:'気', on:'キ', kun:'-', f:'Esprit, Air'}, {j:'雨', on:'ウ', kun:'あme', f:'Pluie'}, {j:'電', on:'デン', kun:'-', f:'Électricité'}, {j:'車', on:'シャ', kun:'くるま', f:'Voiture'}, {j:'学', on:'ガク', kun:'まな.ぶ', f:'Étudier'}, {j:'校', on:'コウ', kun:'-', f:'École'}, {j:'語', on:'ゴ', kun:'-', f:'Langue'}, {j:'本', on:'ホン', kun:'もと', f:'Livre'}
  ],
  N4: [
    {j:'会', on:'カイ', kun:'あ.う', f:'Se rencontrer'}, {j:'同', on:'ドウ', kun:'おな.じ', f:'Même'}, {j:'事', on:'ジ', kun:'こと', f:'Chose'}, {j:'自', on:'ジ', kun:'みずか.ら', f:'Soi-même'}, {j:'社', on:'シャ', kun:'やしろ', f:'Société'}, {j:'発', on:'ハツ', kun:'-', f:'Émettre'}, {j:'者', on:'シャ', kun:'mono', f:'Personne'}, {j:'地', on:'チ', kun:'-', f:'Terrain'}, {j:'業', on:'ギョウ', kun:'わざ', f:'Profession'}, {j:'方', on:'ホウ', kun:'かた', f:'Direction'}, 
    {j:'新', on:'シン', kun:'あたら.しい', f:'Nouveau'}, {j:'場', on:'ジョウ', kun:'ば', f:'Endroit'}, {j:'員', on:'イン', kun:'-', f:'Membre'}, {j:'開', on:'カイ', kun:'あ.く', f:'Ouvrir'}, {j:'力', on:'リョク', kun:'ちから', f:'Force'}, {j:'問', on:'モン', kun:'と.う', f:'Question'}, {j:'代', on:'ダイ', kun:'か.わる', f:'Remplacer'}, {j:'明', on:'メイ', kun:'あか.るい', f:'Clair'}, {j:'動', on:'ドウ', kun:'うご.く', f:'Bouger'}, {j:'京', on:'キョウ', kun:'みやこ', f:'Capitale'}, 
    {j:'通', on:'ツウ', kun:'とお.る', f:'Passer'}, {j:'言', on:'GEN', kun:'い.う', f:'Dire'}, {j:'理', on:'リ', kun:'-', f:'Raison'}, {j:'体', on:'タイ', kun:'からだ', f:'Corps'}, {j:'田', on:'デン', kun:'た', f:'Rizière'}, {j:'作', on:'サク', kun:'つく.る', f:'Fabriquer'}, {j:'用', on:'ヨウ', kun:'もち.いる', f:'Utiliser'}, {j:'強', on:'キョウ', kun:'つよ.i', f:'Fort'}, {j:'公', on:'コウ', kun:'おおやけ', f:'Public'}, {j:'野', on:'ヤ', kun:'の', f:'Champ'},
    {j:'思', on:'シ', kun:'おmo.う', f:'Penser'}, {j:'家', on:'カ', kun:'いえ', f:'Maison'}, {j:'起', on:'キ', kun:'お.きる', f:'Se lever'}, {j:'歩', on:'ホ', kun:'ある.く', f:'Marcher'}, {j:'待', on:'タイ', kun:'ま.つ', f:'Attendre'}, {j:'知', on:'チ', kun:'し.る', f:'Savoir'}, {j:'売', on:'バイ', kun:'う.る', f:'Vendre'}, {j:'着', on:'チャク', kun:'き.る', f:'Porter'}, {j:'乗', on:'ジョウ', kun:'の.る', f:'Monter'}, {j:'答', on:'トウ', kun:'こた.え', f:'Répondre'},
    {j:'夜', on:'ヤ', kun:'よる', f:'Nuit'}, {j:'朝', on:'チョウ', kun:'あさ', f:'Matin'}, {j:'昼', on:'チュウ', kun:'ひる', f:'Midi'}, {j:'春', on:'シュン', kun:'はる', f:'Printemps'}, {j:'夏', on:'カ', kun:'なつ', f:'Été'}, {j:'秋', on:'シュウ', kun:'あき', f:'Automne'}, {j:'冬', on:'トウ', kun:'ふゆ', f:'Hiver'}, {j:'花', on:'カ', kun:'はな', f:'Fleur'}, {j:'海', on:'カイ', kun:'うみ', f:'Mer'}, {j:'風', on:'フウ', kun:'かぜ', f:'Vent'},
    {j:'音', on:'オン', kun:'おと', f:'Son'}, {j:'楽', on:'ガク', kun:'たの.しい', f:'Musique'}, {j:'歌', on:'カ', kun:'うた', f:'Chanson'}, {j:'画', on:'ガ', kun:'-', f:'Image'}, {j:'紙', on:'シ', kun:'かみ', f:'Papier'}, {j:'映', on:'エイ', kun:'うつ.す', f:'Projeter'}, {j:'急', on:'キュウ', kun:'いそ.ぐ', f:'Dépêcher'}, {j:'教', on:'キョウ', kun:'おし.える', f:'Enseigner'}, {j:'黒', on:'コク', kun:'くろ', f:'Noir'}, {j:'茶', on:'チャ', kun:'-', f:'Thé'}
  ],
  N3: [
    {j:'感', on:'カン', kun:'-', f:'Sentiment, Sensation'}, {j:'情', on:'ジョウ', kun:'なさ.け', f:'Émotion'}, {j:'悲', on:'ヒ', kun:'かな.しい', f:'Triste'}, {j:'笑', on:'ショウ', kun:'わら.う', f:'Rire'}, {j:'泣', on:'キュウ', kun:'な.く', f:'Pleurer'}, {j:'怒', on:'ド', kun:'おこ.る', f:'Se fâcher'}, {j:'苦', on:'ク', kun:'くる.しい', f:'Souffrance, Amer'}, {j:'痛', on:'ツウ', kun:'いた.i', f:'Douleur'}, {j:'疲', on:'ヒ', kun:'つka.les', f:'Fatigue'}, {j:'恥', on:'チ', kun:'はずか.しい', f:'Honte'},
    {j:'覚', on:'カク', kun:'おぼ.える', f:'Mémoriser, Se réveiller'}, {j:'忘', on:'ボウ', kun:'わす.れる', f:'Oublier'}, {j:'決', on:'ケツ', kun:'き.める', f:'Décider'}, {j:'信', on:'シン', kun:'-', f:'Croire, Confiance'}, {j:'考', on:'コウ', kun:'かんが.える', f:'Penser, Réfléchir'}, {j:'念', on:'ネン', kun:'-', f:'Pensée, Regret'}, {j:'疑', on:'ギ', kun:'うたga.う', f:'Douter'}, {j:'解', on:'カイ', kun:'と.く', f:'Résoudre, Comprendre'},
    {j:'経', on:'ケイ', kun:'へ.る', f:'Passer (temps), Économie'}, {j:'済', on:'サイ', kun:'す.む', f:'Finir, Économie'}, {j:'政', on:'セイ', kun:'まつりごと', f:'Politique'}, {j:'治', on:'ジ, チ', kun:'なお.る', f:'Gouverner, Guérir'}, {j:'活', on:'カツ', kun:'い.きる', f:'Activité, Vie'}, {j:'法', on:'ホウ', kun:'-', f:'Loi, Méthode'}, {j:'規', on:'キ', kun:'-', f:'Règle, Standard'}, {j:'則', on:'ソク', kun:'-', f:'Règle'}, {j:'禁', on:'キン', kun:'-', f:'Interdire'},
    {j:'関', on:'カン', kun:'せき', f:'Lien, Barrière'}, {j:'係', on:'ケイ', kun:'かか.る', f:'Relation, Préposé'}, {j:'役', on:'ヤク', kun:'-', f:'Rôle, Service'}, {j:'辞', on:'ジ', kun:'や.める', f:'Démissionner, Mot'}, {j:'就', on:'シュウ', kun:'つ.く', f:'Prendre un poste'}, {j:'職', on:'ショク', kun:'-', f:'Emploi'}, {j:'退', on:'タイ', kun:'しりぞ.く', f:'Se retirer, Reculer'}, {j:'労', on:'ロウ', kun:'-', f:'Travail, Labeur'}, {j:'給', on:'キュウ', kun:'-', f:'Salaire, Fournir'},
    {j:'求', on:'キュウ', kun:'moト.める', f:'Demander, Exiger'}, {j:'受', on:'ジュ', kun:'う.ける', f:'Recevoir'}, {j:'投', on:'トウ', kun:'な.げる', f:'Jeter, Lancer'}, {j:'打', on:'ダ', kun:'う.つ', f:'Frapper'}, {j:'勝', on:'ショウ', kun:'か.つ', f:'Gagner'}, {j:'負', on:'フ', kun:'ま.ける', f:'Perdre'}, {j:'残', on:'ザン', kun:'のこ.る', f:'Rester, Laisser'}, {j:'交', on:'コウ', kun:'まじ.わる', f:'Mélanger, Échanger'}, {j:'換', on:'カン', kun:'か.える', f:'Échanger'}, {j:'変', on:'ヘン', kun:'か.わる', f:'Changer'},
    {j:'原', on:'ゲン', kun:'はら', f:'Origine, Plaine'}, {j:'因', on:'イン', kun:'よ.rU', f:'Cause'}, {j:'寒', on:'カン', kun:'さむ.i', f:'Froid (climat)'}, {j:'暑', on:'ショ', kun:'あつ.i', f:'Chaud (climat)'}, {j:'暖', on:'ダン', kun:'あたた.かi', f:'Doux, Chaleureux'}, {j:'涼', on:'リョウ', kun:'すず.しい', f:'Frais'}, {j:'冷', on:'レイ', kun:'つめ.たi', f:'Froid (toucher)'}, {j:'温', on:'オン', kun:'あたた.かi', f:'Chaud (toucher)'}, {j:'氷', on:'ヒョウ', kun:'こおり', f:'Glace'},
    {j:'薬', on:'ヤク', kun:'くすり', f:'Médicament'}, {j:'局', on:'キョク', kun:'-', f:'Bureau, Département'}, {j:'客', on:'キャク', kun:'-', f:'Client, Invité'}, {j:'石', on:'セキ', kun:'いし', f:'Pierre'}, {j:'油', on:'ユ', kun:'あぶら', f:'Huile'}, {j:'酒', on:'シュ', kun:'さけ', f:'Alcool'}, {j:'塩', on:'エン', kun:'しお', f:'Sel'}, {j:'皿', on:'ベイ', kun:'さら', f:'Assiette'}, {j:'血', on:'ケツ', kun:'ち', f:'Sang'}, {j:'息', on:'ソク', kun:'いき', f:'Souffle'},
    {j:'飛', on:'ヒ', kun:'と.ぶ', f:'Voler (air)'}, {j:'降', on:'コウ', kun:'お.りる', f:'Descendre, Tomber (pluie)'}, {j:'迎', on:'ゲイ', kun:'むか.える', f:'Accueillir'}, {j:'呼', on:'コ', kun:'よ.ぶ', f:'Appeler'}, {j:'泊', on:'ハク', kun:'と.まる', f:'Passer la nuit'}, {j:'戻', on:'レイ', kun:'もど.る', f:'Retourner'}, {j:'払', on:'フツ', kun:'はら.う', f:'Payer'}, {j:'育', on:'イク', kun:'そだ.つ', f:'Élever, Grandir'}, {j:'続', on:'ゾク', kun:'つづ.く', f:'Continuer'}, {j:'落', on:'ラク', kun:'お.ちる', f:'Tomber'},
    {j:'忙', on:'ボウ', kun:'いそが.しい', f:'Occupé'}, {j:'静', on:'セイ', kun:'しず.か', f:'Calme'}, {j:'危', on:'キ', kun:'あぶ.ない', f:'Dangereux'}, {j:'険', on:'ケン', kun:'けわ.しい', f:'Escarpé, Danger'}, {j:'暗', on:'アン', kun:'くら.i', f:'Sombre'}, {j:'細', on:'サイ', kun:'ほそ.i', f:'Fin, Détaillé'}, {j:'太', on:'タイ', kun:'ふと.i', f:'Gros'}, {j:'浅', on:'セン', kun:'あさ.i', f:'Peu profond'}, {j:'深', on:'シン', kun:'ふか.i', f:'Profond'}, {j:'若', on:'ジャク', kun:'わか.i', f:'Jeune'}
  ],
  N2: [
    {j:'識', on:'シキ', kun:'し.る', f:'Discernement'}, {j:'観', on:'カン', kun:'み.る', f:'Observer'}, {j:'察', on:'サツ', kun:'-', f:'Inspecter'}, {j:'判', on:'ハン', kun:'わか.る', f:'Juger'}, {j:'断', on:'ダン', kun:'ことわ.る', f:'Couper, Refuser'}, {j:'認', on:'ニン', kun:'みと.める', f:'Reconnaître'}, {j:'確', on:'カク', kun:'たし.か', f:'Certain, Sûr'}, {j:'想', on:'ソウ', kun:'おも.う', f:'Pensée, Idée'}, {j:'像', on:'ゾウ', kun:'-', f:'Image, Statue'}, {j:'視', on:'シ', kun:'み.る', f:'Vision, Regarder'},
    {j:'務', on:'ム', kun:'つと.める', f:'Tâche, Devoir'}, {j:'営', on:'エイ', kun:'いとな.む', f:'Gérer, Diriger'}, {j:'績', on:'セキ', kun:'-', f:'Exploit, Bilan'}, {j:'価', on:'カ', kun:'あたい', f:'Valeur, Prix'}, {j:'値', on:'チ', kun:'ね', f:'Prix, Valeur'}, {j:'額', on:'ガク', kun:'ひたい', f:'Montant, Front'}, {j:'割', on:'カツ', kun:'わ.る', f:'Diviser, Proportion'}, {j:'財', on:'ザイ', kun:'-', f:'Richesse, Fortune'}, {j:'産', on:'サン', kun:'う.む', f:'Produire, Accoucher'}, {j:'費', on:'ヒ', kun:'つい.やす', f:'Dépense'},
    {j:'報', on:'ホウ', kun:'むく.いる', f:'Rapport, Récompenser'}, {j:'告', on:'コク', kun:'つ.げる', f:'Annoncer'}, {j:'伝', on:'デン', kun:'つた.わる', f:'Transmettre'}, {j:'記', on:'キ', kun:'しる.す', f:'Chronique, Écrire'}, {j:'録', on:'ロク', kun:'-', f:'Enregistrer'}, {j:'議', on:'ギ', kun:'-', f:'Débat, Délibération'}, {j:'論', on:'ロン', kun:'-', f:'Théorie, Argument'}, {j:'述', on:'ジュツ', kun:'の.べる', f:'Mentionner, Déclarer'}, {j:'訳', on:'ヤク', kun:'わけ', f:'Raison, Traduction'}, {j:'刊', on:'カン', kun:'-', f:'Publier'},
    {j:'態', on:'タイ', kun:'-', f:'Condition, État'}, {j:'状', on:'ジョウ', kun:'-', f:'Condition, Forme'}, {j:'況', on:'キョウ', kun:'-', f:'Situation'}, {j:'境', on:'キョウ', kun:'さかい', f:'Frontière, Milieu'}, {j:'防', on:'ボウ', kun:'ふせ.ぐ', f:'Défendre, Prévenir'}, {j:'守', on:'シュ', kun:'まも.る', f:'Protéger'}, {j:'救', on:'キュウ', kun:'すく.う', f:'Sauver'}, {j:'援', on:'エン', kun:'-', f:'Aider, Assister'}, {j:'護', on:'ゴ', kun:'-', f:'Protéger'}, {j:'武', on:'ブ, ム', kun:'-', f:'Militaire, Arme'},
    {j:'達', on:'タツ', kun:'たち', f:'Atteindre, Pluriel'}, {j:'展', on:'テン', kun:'-', f:'Déployer, Étendre'}, {j:'導', on:'ドウ', kun:'みちび.く', f:'Guider'}, {j:'派', on:'ハ', kun:'-', f:'Faction, Groupe'}, {j:'過', on:'カ', kun:'す.ぎる', f:'Passer, Dépasser'}, {j:'程', on:'テイ', kun:'ほど', f:'Degré, Limite'}, {j:'歴', on:'レキ', kun:'-', f:'Parcours, Histoire'}, {j:'史', on:'シ', kun:'-', f:'Histoire'}, {j:'期', on:'キ', kun:'-', f:'Période, Attente'}, {j:'限', on:'ゲン', kun:'かぎ.る', f:'Limite'}
  ],
  N1: [
    {j:'響', on:'キョウ', kun:'ひび.く', f:'Résonner, Écho'}, {j:'驚', on:'キョウ', kun:'おどろ.く', f:'Surprise'}, {j:'嘆', on:'タン', kun:'なげ.く', f:'Déplorer'}, {j:'慰', on:'イ', kun:'なぐさ.める', f:'Consoler'}, {j:'嫌', on:'ケン', kun:'きら.う', f:'Détester'}, {j:'憾', on:'カン', kun:'-', f:'Regret'}, {j:'憤', on:'フン', kun:'いきどお.る', f:'Indignation'}, {j:'悟', on:'ゴ', kun:'さと.る', f:'Comprendre, Éveil'}, {j:'哀', on:'アイ', kun:'あわ.れ', f:'Pitié, Tristesse'}, {j:'狂', on:'キョウ', kun:'くる.う', f:'Folie'},
    {j:'幻', on:'ゲン', kun:'まぼろし', f:'Illusion'}, {j:'魂', on:'コン', kun:'たましい', f:'Âme'}, {j:'魅', on:'ミ', kun:'みせ.る', f:'Fasciner'}, {j:'矛', on:'ム', kun:'ほこ', f:'Lance'}, {j:'盾', on:'ジュン', kun:'たて', f:'Bouclier'}, {j:'覆', on:'フク', kun:'おお.う', f:'Couvrir, Renverser'}, {j:'覇', on:'ハ', kun:'-', f:'Hégémonie'}, {j:'劣', on:'レツ', kun:'おと.る', f:'Inférieur'}, {j:'崩', on:'ホウ', kun:'くず.れる', f:'S\'effondrer'}, {j:'陥', on:'カン', kun:'おちい.る', f:'Sombrer, Chute'},
    {j:'殉', on:'ジュン', kun:'-', f:'Martyr'}, {j:'拘', on:'コウ', kun:'こだわ.る', f:'Saisir, S\'attacher'}, {j:'逮', on:'タイ', kun:'-', f:'Appréhender'}, {j:'糾', on:'キュウ', kun:'-', f:'Enquêter, Blâmer'}, {j:'紛', on:'フン', kun:'まぎ.れる', f:'Confusion, Conflit'}, {j:'錯', on:'サク', kun:'-', f:'Mélangé, Illusion'}, {j:'妥', on:'ダ', kun:'-', f:'Compromis'}, {j:'脅', on:'キョウ', kun:'おどか.す', f:'Menacer'}, {j:'犠', on:'ギ', kun:'-', f:'Sacrifice'}, {j:'牲', on:'セイ', kun:'-', f:'Victime'},
    {j:'躍', on:'ヤク', kun:'おど.る', f:'Bondir'}, {j:'瞬', on:'シュン', kun:'またた.く', f:'Instant'}, {j:'駆', on:'ク', kun:'か.ける', f:'Courir, Chasser'}, {j:'漏', on:'ロウ', kun:'も.れる', f:'Fuir (liquide)'}, {j:'縛', on:'バク', kun:'しば.る', f:'Attacher'}, {j:'奪', on:'ダツ', kun:'うば.う', f:'Priver, Voler'}, {j:'獲', on:'カク', kun:'え.る', f:'Capturer'}, {j:'絞', on:'コウ', kun:'しぼ.る', f:'Essorer'}, {j:'遮', on:'シャ', kun:'さえぎ.る', f:'Intercepter'}, {j:'頻', on:'ヒン', kun:'-', f:'Fréquence'}
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
      { jp: "彼", kana: "かれ", romaji: "kare", fr: "Il" }
    ],
    places: [
      { jp: "学校", kana: "がっこう", romaji: "gakkō", fr: "l'école" },
      { jp: "東京", kana: "とうきょう", romaji: "tōkyō", fr: "Tokyo" },
      { jp: "庭", kana: "にわ", romaji: "niwa", fr: "le jardin" },
      { jp: "日本", kana: "にほん", romaji: "nihon", fr: "le Japon" },
      { jp: "部屋", kana: "へや", romaji: "heya", fr: "la chambre" },
      { jp: "店", kana: "みせ", romaji: "mise", fr: "le magasin" }
    ],
    verbs_motion: [
      { jp: "行きます", kana: "いきます", romaji: "ikimasu", fr: "vais / va à" },
      { jp: "来ます", kana: "きます", romaji: "kimasu", fr: "viens / vient à" },
      { jp: "帰ります", kana: "かえります", romaji: "kaerimasu", fr: "rentre à" }
    ]
  },
  N4: {
    subjects: [
      { jp: "会社員", kana: "かいしゃいん", romaji: "kaishain", fr: "L'employé de bureau" },
      { jp: "医者", kana: "いしゃ", romaji: "isha", fr: "Le médecin" },
      { jp: "看護師", kana: "かんごし", romaji: "kangoshi", fr: "L'infirmier(e)" },
      { jp: "警察官", kana: "けいさつかん", romaji: "keisatsukan", fr: "Le policier" },
      { jp: "社長", kana: "しゃちょう", romaji: "shachō", fr: "Le directeur (PDG)" },
      { jp: "留学生", kana: "りゅうがくせい", romaji: "ryūgakusei", fr: "L'étudiant étranger" },
      { jp: "家族", kana: "かぞく", romaji: "kazoku", fr: "La famille" }
    ],
    places: [
      { jp: "病院", kana: "びょういん", romaji: "byōin", fr: "l'hôpital" },
      { jp: "空港", kana: "くうこう", romaji: "kūkō", fr: "l'aéroport" },
      { jp: "事務所", kana: "じむしょ", romaji: "jimusho", fr: "le bureau (lieu)" },
      { jp: "大使館", kana: "たいしかん", romaji: "taishikan", fr: "l'ambassade" },
      { jp: "京都", kana: "きょうと", romaji: "kyōto", fr: "Kyoto" },
      { jp: "駅", kana: "えき", romaji: "eki", fr: "la gare" }
    ],
    verbs_motion: [
      { jp: "向かいます", kana: "むかいます", romaji: "mukaimasu", fr: "se dirige vers" },
      { jp: "集まります", kana: "あつまります", romaji: "atsumarimasu", fr: "se rassemble à" },
      { jp: "出発します", kana: "しゅっぱつします", romaji: "shuppatsu shimasu", fr: "part de / s'en va à" },
      { jp: "到着します", kana: "とうちゃくします", romaji: "tōchaku shimasu", fr: "arrive à" }
    ]
  },
 N3: {
    subjects: [
      { jp: "政治家", kana: "せいじか", romaji: "seijika", fr: "Le politicien" },
      { jp: "司会者", kana: "しかいしゃ", romaji: "shikaisha", fr: "L'animateur / Le présentateur" },
      { jp: "裁判官", kana: "さいばんかん", romaji: "saibankan", fr: "Le juge" },
      { jp: "労働者", kana: "ろうどうしゃ", romaji: "rōdōsha", fr: "Le travailleur / L'ouvrier" },
      { jp: "経営者", kana: "けいえいしゃ", romaji: "keieisha", fr: "Le chef d'entreprise / Gérant" },
      { jp: "お客さん", kana: "おきゃくさん", romaji: "okyakusan", fr: "Le client" }
    ],
    places: [
      { jp: "市役所", kana: "しやくしょ", romaji: "shiyaksho", fr: "la mairie" },
      { jp: "薬局", kana: "やっきょく", romaji: "yakkyoku", fr: "la pharmacie" },
      { jp: "裁判所", kana: "さいばんしょ", romaji: "saibansho", fr: "le tribunal" },
      { jp: "支店", kana: "してん", romaji: "shiten", fr: "la succursale / filiale" },
      { jp: "会議室", kana: "かいぎしつ", romaji: "kaigishitsu", fr: "la salle de réunion" }
    ],
    verbs_motion: [
      { jp: "戻ります", kana: "もどります", romaji: "modorimasu", fr: "retourne / revient à" },
      { jp: "移転します", kana: "いてんします", romaji: "itenshimasu", fr: "déménage / est transféré à" },
      { jp: "出席します", kana: "しゅっせきします", romaji: "shusseki shimasu", fr: "assiste à / est présent à" },
      { jp: "退職します", kana: "たいしょくします", romaji: "taishoku shimasu", fr: "démissionne / part en retraite de" }
    ]
  },
   N2: {
    subjects: [
      { jp: "裁判員", kana: "さいばんいん", romaji: "saiban'in", fr: "Le juré (justice)" },
      { jp: "担当者", kana: "たんとうしゃ", romaji: "tantōsha", fr: "Le responsable (d'un dossier)" },
      { jp: "候補者", kana: "こうほしゃ", romaji: "kōhosha", fr: "Le candidat" },
      { jp: "取材班", kana: "しゅざいはん", romaji: "shuzaihan", fr: "L'équipe de reportage / Les journalistes" },
      { jp: "主催者", kana: "しゅさいしゃ", romaji: "shusaisha", fr: "L'organisateur" }
    ],
    places: [
      { jp: "選挙区", kana: "せんきょく", romaji: "senkyoku", fr: "la circonscription électorale" },
      { jp: "裁判所", kana: "さいばんしょ", romaji: "saibansho", fr: "le tribunal" },
      { jp: "開発課", kana: "かいはつか", romaji: "kaihatsuka", fr: "le département de développement" },
      { jp: "事務局", kana: "じむきょく", romaji: "jimukyoku", fr: "le secrétariat général" },
      { jp: "目的地", kana: "もくてきち", romaji: "mokutekichi", fr: "la destination" }
    ],
    verbs_motion: [
      { jp: "赴任します", kana: "ふにんします", romaji: "funinshimasu", fr: "part prendre son poste à" },
      { jp: "進出します", kana: "しんしゅつします", romaji: "shinshutsu shimasu", fr: "s'implante à / se développe vers" },
      { jp: "視察します", kana: "しさつします", romaji: "shisatsushimasu", fr: "inspecte / fait une visite officielle à" },
      { jp: "同行します", kana: "どうこうします", romaji: "dōkōshimasu", fr: "accompagne (quelqu'un) à" }
    ]
  },
  N1: {
    subjects: [
      { jp: "容疑者", kana: "ようぎしゃ", romaji: "yōgisha", fr: "Le suspect" },
      { jp: "開拓者", kana: "かいたくしゃ", romaji: "kaitakusha", fr: "Le pionnier" },
      { jp: "大統領", kana: "だいとうりょう", romaji: "daitōryō", fr: "Le président (d'un pays)" },
      { jp: "派遣団", kana: "はけんだん", romaji: "hakendan", fr: "La délégation / Les envoyés" },
      { jp: "先駆者", kana: "せんくしゃ", romaji: "senkusha", fr: "Le précurseur" }
    ],
    places: [
      { jp: "駐屯地", kana: "ちゅうとんち", romaji: "chūtonchi", fr: "la base militaire / garnison" },
      { jp: "開拓地", kana: "かいたくち", romaji: "kaitakuchi", fr: "la terre colonisée / nouvelle colonie" },
      { jp: "任地", kana: "にんち", romaji: "ninchi", fr: "le lieu d'affectation" },
      { jp: "密林", kana: "みつりん", romaji: "mitsurin", fr: "la jungle / forêt dense" }
    ],
    verbs_motion: [
      { jp: "赴きます", kana: "おもむきます", romaji: "omomukimasu", fr: "se rend vers (littéraire)" },
      { jp: "潜入します", kana: "せんにゅうします", romaji: "sennyūshimasu", fr: "s'infiltre à / s'introduit secrètement dans" },
      { jp: "凱旋します", kana: "がいせんします", romaji: "gaisenshimasu", fr: "revient triomphalement à" },
      { jp: "左遷されます", kana: "させんされます", romaji: "sasensaremasu", fr: "est rétrogradé / banni à" }
    ]
  }

// 3. BASE DE DONNÉES DE LA DICTÉE BILINGUE
const DB_DICTATION = {
  N5: [
    { jp: "おはようございます", fr: "Bonjour (le matin)", wrong_fr: ["Bonsoir", "Merci beaucoup", "Au revoir"], wrong_jp: ["こんばんは", "ありがとうございます", "さようなら"] },
    { jp: "りんごを食べます", fr: "Je mange une pomme", wrong_fr: ["Je bois de l'eau", "J'achète une pomme", "Il mange du pain"], wrong_jp: ["水を飲みます", "りんごを買います", "パンを食べます"] },
    { jp: "どこに行きますか", fr: "Où allez-vous ?", wrong_fr: ["D'où venez-vous ?", "Que faites-vous ?", "Quand partez-vous ?"], wrong_jp: ["どこから来ましたか", "何をしますか", "いつ出発しますか"] },
    { jp: "わたしは学生です", fr: "Je suis étudiant", wrong_fr: ["Je suis professeur", "Il est étudiant", "C'est mon école"], wrong_jp: ["わたしは先生です", "彼は学生です", "これは私の学校です"] }
  ],
  N4: [
    { jp: "雨が降りそうです", fr: "On dirait qu'il va pleuvoir", wrong_fr: ["Il a plu hier", "Il pleut beaucoup", "J'aime la pluie"], wrong_jp: ["昨日雨が降りました", "雨がたくさん降っています", "雨が好きです"] }
  ],
   N3: [
    { jp: "社長がいらっしゃいました", fr: "Le directeur est arrivé (respectueux)", wrong_fr: ["Le directeur a mangé", "Je suis le directeur", "Le directeur va partir"], wrong_jp: ["社長が召し上がりました", "私は社長です", "社長が出発します"] },
    { jp: "温かいうちに食べてください", fr: "Mangez pendant que c'est chaud", wrong_fr: ["Mangez quand ce sera froid", "Ne mangez pas ceci", "C'est chaud et bon"], wrong_jp: ["冷たい内に食べてください", "これを食べないでください", "温かくて美味しいです"] }
  ],
   N2: [
    { jp: "予定を変更せざるを得ない", fr: "Nous sommes obligés de modifier le programme", wrong_fr: ["Nous voulons changer de programme", "Il est impossible de changer le planning", "Le programme est annulé"], wrong_jp: ["予定を変更したいです", "予定を変更するのは不可能です", "予定は中止になりました"] },
    { jp: "その意見には賛成しかねます", fr: "Je ne peux me résoudre à approuver cette opinion", wrong_fr: ["J'approuve totalement cette idée", "Je vais y réfléchir", "Cette opinion est stupide"], wrong_jp: ["その意見に完全に賛成します", "それについて考えてみます", "その意見は馬鹿げています"] }
  ],
  N1: [
    { jp: "彼は私の顔を見るや否や逃げ出した", fr: "Dès qu'il a vu mon visage, il s'est enfui", wrong_fr: ["Il a souri en voyant mon visage", "Il m'a regardé puis est venu me parler", "À peine est-il parti que je l'ai vu"], wrong_jp: ["彼は私の顔を見て微笑んだ", "彼は私を見て話しかけてきた", "彼が出発するや否や私は彼を見た"] },
    { jp: "愛していればこそ厳しく叱るのです", fr: "C'est précisément parce que je l'aime que je le gronde", wrong_fr: ["Je le gronde car je ne l'aime pas", "Bien que je l'aime, je suis méchant", "Je le gronde doucement"], wrong_jp: ["彼を愛していないから叱るのです", "彼を愛しているけれど、私は意地悪です", "彼を優しく叱るのです"] }
  ]
};

// Exporte les variables pour les rendre accessibles par index.html
window.DB_KANJI = DB_KANJI;
window.DB_VOCAB = DB_VOCAB;
window.DB_DICTATION = DB_DICTATION;
