// =============================================================
// data.js — Les créatures de votre univers Yu-Gi-Oh!
// =============================================================

// Fonction pour créer les icônes SVG
const svg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">${inner}</svg>`;

// =============================================================
// ICÔNES DES TYPES DE CRÉATURES
// Chaque icône représente visuellement un type de créature.
// =============================================================

const icons = {
  // Bête : empreinte de patte
  beast: svg(`
    <g fill="currentColor" stroke="none">
      <ellipse cx="12" cy="16" rx="5" ry="4"/>
      <circle cx="6" cy="10" r="2"/>
      <circle cx="10" cy="6" r="2"/>
      <circle cx="14" cy="6" r="2"/>
      <circle cx="18" cy="10" r="2"/>
    </g>
  `),

  // Bête-Guerrier : hache de combat
  beastWarrior: svg(`
    <path d="M6 20L16 6M14 4l6 4-1 5-5-3z"/>
  `),

  // Dieu Créateur : soleil avec rayons
  creatorGod: svg(`
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
  `),

  // Cyberse : puce électronique
  cyberse: svg(`
    <rect x="7" y="7" width="10" height="10" rx="1"/>
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>
  `),

  // Dinosaure : silhouette simplifiée d'un dinosaure
  dinosaur: svg(`
    <path d="M12 21v-9M12 12L6 7M12 12l6-5M12 12V4"/>
  `),

  // Bête Divine : soleil entouré d'ailes
  divineBeast: svg(`
    <circle cx="12" cy="12" r="3"/>
    <path d="M9 12C6 12 4 10 2 8c1 4 3 6 7 6M15 12c3 0 5-2 7-4-1 4-3 6-7 6"/>
  `),

  // Dragon : tête de dragon avec cornes
  dragon: svg(`
    <path d="M3 4l5 4h8l5-4-1 8-4 8h-8l-4-8z"/>
    <circle cx="9" cy="12" r="1" fill="currentColor"/>
    <circle cx="15" cy="12" r="1" fill="currentColor"/>
  `),

  // Démon : visage avec cornes
  fiend: svg(`
    <path d="M5 3c0 4 1 6 3 7M19 3c0 4-1 6-3 7"/>
    <circle cx="12" cy="15" r="6"/>
    <circle cx="10" cy="14" r="1" fill="currentColor"/>
    <circle cx="14" cy="14" r="1" fill="currentColor"/>
    <path d="M10 17.5c1 1 3 1 4 0"/>
  `),

  // Poisson : poisson avec sa nageoire
  fish: svg(`
    <path d="M3 12c4-6 10-6 14 0-4 6-10 6-14 0zM17 12l4-4v8z"/>
    <circle cx="8" cy="11" r="1" fill="currentColor"/>
  `),

  // Insecte : scarabée avec antennes et pattes
  insect: svg(`
    <ellipse cx="12" cy="13" rx="5" ry="7"/>
    <path d="M12 6v14M7 10L3 8M7 14l-4 2M17 10l4-2M17 14l4 2M10 6L8 3M14 6l2-3"/>
  `),

  // Machine : engrenage mécanique
  machine: svg(`
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="7"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>
  `),

  // Rocheux : rocher avec des fissures
  rock: svg(`
    <path d="M4 17l3-9 6-3 6 5 1 7z"/>
    <path d="M7 8l4 5 8-1M11 13l1 6"/>
  `),

  // Serpent de mer : vagues et tête de serpent
  seaSerpent: svg(`
    <path d="M2 18c2-3 4-3 6 0s4 3 6 0 3-2 4-1"/>
    <path d="M18 17c-1-4 0-8 3-8 1 0 1 2 0 3"/>
  `),

  // Magicien : chapeau de sorcier
  spellcaster: svg(`
    <path d="M12 2L7 16h10z"/>
    <path d="M3 18h18"/>
  `),

  // Tonnerre : éclair électrique
  thunder: svg(`
    <path d="M13 2L4 14h7l-1 8 9-12h-7z"/>
  `),

  // Guerrier : épée
  warrior: svg(`
    <path d="M20 4L9 15M6 12l6 6M7 17l-3 3"/>
  `),

  // Bête Ailée : plume d'une créature volante
  wingedBeast: svg(`
    <path d="M20 4C9 4 5 11 5 19c8 0 15-5 15-15zM5 19l-2 2M5 19L14 10"/>
  `),
};


export const creatures = [
  {
    id: "#001",
    name: "Gazelle des Légendes",
    type: "Bête",
    // icon: icons.beast,
    level: "Niveau 4",
    stats: { attack: 110, defence: 90 },
    image: "https://images.ygoprodeck.com/images/cards/86569121.jpg",
    description:
      "Une gazelle rapide qui court plus vite que le vent. Les autres bêtes la respectent comme une reine.",
  },

  {
    id: "#002",
    name: "Bœuf de Guerre",
    type: "Bête-Guerrier",
    // // icon: icons.beastWarrior,
    level: "Niveau 4",
    stats: { attack: 170, defence: 100 },
    image: "https://images.ygoprodeck.com/images/cards/5053103.jpg",
    description:
      "Un guerrier mi-homme mi-bœuf, fort et courageux. Il fonce droit sur ses ennemis avec sa hache.",
  },

  {
    id: "#003",
    name: "Horakhty Créateur",
    type: "Dieu Créateur",
    // // icon: icons.creatorGod,
    level: "Niveau 10",
    stats: { attack: 250, defence: 250 },
    image: "https://images.ygoprodeck.com/images/cards/10000040.jpg",
    description:
      "Un dieu très rare qui a créé la lumière. Personne n'ose le défier.",
  },

  {
    id: "#004",
    name: "Dragon Pare-feu",
    type: "Cyberse",
    // // icon: icons.cyberse,
    level: "Niveau 5",
    stats: { attack: 160, defence: 110 },
    image: "https://images.ygoprodeck.com/images/cards/5043010.jpg",
    description:
      "Un dragon numérique qui vit dans les réseaux. Il protège le monde virtuel contre les intrus.",
  },

  {
    id: "#005",
    name: "Tyrannosaure Conducteur",
    type: "Dinosaure",
    // // icon: icons.dinosaur,
    level: "Niveau 8",
    stats: { attack: 240, defence: 180 },
    image: "https://images.ygoprodeck.com/images/cards/18013090.jpg",
    description:
      "Un énorme dinosaure qui fait trembler le sol. Quand il attaque, rien ne l'arrête.",
  },

  {
    id: "#006",
    name: "Dragon du Ciel Divin",
    type: "Bête Divine",
    // // icon: icons.divineBeast,
    level: "Niveau 10",
    stats: { attack: 300, defence: 200 },
    image: "https://images.ygoprodeck.com/images/cards/10000020.jpg",
    description:
      "Une bête sacrée qui vole au-dessus des nuages. Plus ses ennemis sont nombreux, plus elle devient forte.",
  },

  {
    id: "#007",
    name: "Dragon Blanc aux Yeux Bleus",
    type: "Dragon",
    // // icon: icons.dragon,
    level: "Niveau 8",
    stats: { attack: 300, defence: 250 },
    image: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
    description:
      "Un dragon légendaire à l'attaque puissante. Il est très rare et très redouté.",
  },

  {
    id: "#008",
    name: "Ange des Ténèbres",
    type: "Démon",
    // // icon: icons.fiend,
    level: "Niveau 10",
    stats: { attack: 270, defence: 150 },
    image: "https://images.ygoprodeck.com/images/cards/78371393.jpg",
    description:
      "Un démon qui garde un amour fou pour ses amis. Il devient très dangereux quand on le trahit.",
  },

  {
    id: "#009",
    name: "Poisson Arc-en-ciel",
    type: "Poisson",
    // // icon: icons.fish,
    level: "Niveau 2",
    stats: { attack: 60, defence: 70 },
    image: "https://images.ygoprodeck.com/images/cards/23771716.jpg",
    description:
      "Un joli poisson aux sept couleurs. Il nage vite et se cache facilement.",
  },

  {
    id: "#010",
    name: "Cafard Géant",
    type: "Insecte",
    // // icon: icons.insect,
    level: "Niveau 2",
    stats: { attack: 70, defence: 60 },
    image: "https://images.ygoprodeck.com/images/cards/23434538.jpg",
    description:
      "Un insecte qui apparaît toujours au mauvais moment. Il est petit, mais difficile à écraser.",
  },

  {
    id: "#011",
    name: "Dragon Cybernétique",
    type: "Machine",
    // // icon: icons.machine,
    level: "Niveau 5",
    stats: { attack: 180, defence: 120 },
    image: "https://images.ygoprodeck.com/images/cards/70095154.jpg",
    description:
      "Un dragon de métal qui apparaît quand l'ennemi attaque en premier. Il ne dort jamais.",
  },

  {
    id: "#012",
    name: "Soldat de Pierre",
    type: "Rocheux",
    // // icon: icons.rock,
    level: "Niveau 3",
    stats: { attack: 60, defence: 220 },
    image: "https://images.ygoprodeck.com/images/cards/13039848.jpg",
    description:
      "Un géant de pierre qui ne bouge presque jamais. Il attaque peu mais sa défense est très solide.",
  },

  {
    id: "#013",
    name: "Diva des Profondeurs",
    type: "Serpent de mer",
    // // icon: icons.seaSerpent,
    level: "Niveau 2",
    stats: { attack: 70, defence: 80 },
    image: "https://images.ygoprodeck.com/images/cards/78868776.jpg",
    description:
      "Un petit serpent de mer avec une voix magnifique. Son chant attire les créatures de l'océan.",
  },

  {
    id: "#014",
    name: "Magicien Sombre",
    type: "Magicien",
    // // icon: icons.spellcaster,
    level: "Niveau 7",
    stats: { attack: 250, defence: 210 },
    image: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    description:
      "Le magicien le plus puissant de son monde. Il utilise la magie pour protéger son maître.",
  },

  {
    id: "#015",
    name: "Dragon de l'Orage",
    type: "Tonnerre",
    // // icon: icons.thunder,
    level: "Niveau 5",
    stats: { attack: 160, defence: 100 },
    image: "https://images.ygoprodeck.com/images/cards/31786629.jpg",
    description:
      "Un dragon qui crée des éclairs avec ses ailes. Quand il rugit, le ciel devient noir.",
  },

  {
    id: "#016",
    name: "Chevalier Gaïa",
    type: "Guerrier",
    // // icon: icons.warrior,
    level: "Niveau 7",
    stats: { attack: 230, defence: 130 },
    image: "https://images.ygoprodeck.com/images/cards/6368038.jpg",
    description:
      "Un chevalier courageux qui charge à cheval avec sa lance. Il n'a jamais peur, même face à un dragon.",
  },

  {
    id: "#017",
    name: "Dame Harpie",
    type: "Bête Ailée",
    // // icon: icons.wingedBeast,
    level: "Niveau 4",
    stats: { attack: 130, defence: 90 },
    image: "https://images.ygoprodeck.com/images/cards/76812113.jpg",
    description:
      "Une belle harpie qui vole très vite. Elle attaque en groupe avec ses sœurs.",
  },
];