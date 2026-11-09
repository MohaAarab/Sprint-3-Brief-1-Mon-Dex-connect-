# Mon Dex · Encyclopédie Yu-Gi-Oh!

Une encyclopédie interactive de cartes monstres **Yu-Gi-Oh!**, utilisable sur téléphone et sur ordinateur. On peut parcourir les cartes, chercher, filtrer par type, voir le détail, créer ses propres créatures et composer une équipe de 6.

Projet réalisé dans le cadre de la formation **YouCode** (Safi) · Sprint 2 · Brief 1.

🔗 **Démo en ligne :** `https://mohaaarab.github.io/yugioh-dex/`
📋 **Tableau GitHub Projects :** `https://trello.com/invite/b/6ae12a0cad4e26e58b5782e0/ATTIdb0acf342c524c5ba1c2548b6d79be8cC9B24EDE/mon-dex-sprint-2`

---

## Univers choisi

**Yu-Gi-Oh!** : des cartes monstres avec un attribut/type, un niveau (étoiles), une ATK et une DEF.


## Technologies

| Outil | Rôle |
|---|---|
| HTML5 | Structure de la page (balises sémantiques, `aria-label`, labels accessibles) |
| Tailwind CSS | Mise en page, thème or/brun, responsive, états (survol, focus, désactivé) |
| JavaScript (modules ES) | Toute l'interactivité, sans librairie |
| LocalStorage | Sauvegarde des créatures créées |
| Git / GitHub | Versionnement, un commit par fonctionnalité |

---

## Fonctionnalités

### Obligatoires

- [x] **Affichage** : la grille est générée depuis le tableau `creatures` (`data.js`).
- [x] **Détail** : un clic sur une carte ouvre un panneau avec l'image, la description et les statistiques en barres. Un bouton ✕ le ferme.
- [x] **Recherche** : la liste se met à jour pendant la saisie, sans tenir compte des majuscules.
- [x] **Filtre par type** : un menu déroulant filtre par type, « Tous » réinitialise. La recherche et le filtre fonctionnent ensemble.
- [x] **Créer une créature** : formulaire validé champ par champ, messages d'erreur sous chaque champ, bordure rouge si invalide. Une créature invalide n'est jamais ajoutée.
- [x] **Mon équipe** : boutons « Ajouter à l'équipe » et « Retirer », gérés par **délégation d'événements** (un seul écouteur sur la grille, un sur l'équipe).
- [x] **Règles de l'équipe** : 6 créatures maximum, pas de doublon, message clair quand une action est refusée, compteur `x/6`.

### Interface

- Grille responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur grand écran.
- Les cartes se soulèvent au survol.
- Le bouton « Ajouter à l'équipe » est désactivé quand l'équipe est complète.
- Style de focus visible sur les éléments cliquables.

### Bonus

- [x] **LocalStorage** : les créatures créées sont conservées après rechargement de la page.
- [ ] Fetch API
- [ ] Tri de la grille
- [ ] Comparaison de deux créatures

---


## Structure du projet

```
├── design/              Maquettes desktop et mobile
├── dist/
│   └── output.css       CSS généré par Tailwind (à garder dans le dépôt)
├── src/
│   ├── images/          Logo, fond d'écran et icônes
│   └── input.css        Directives Tailwind et classes personnalisées
├── data.js              Tableau des créatures
├── index.html           Page du Dex
├── script.js            Logique JavaScript
├── tailwind.config.js   Thème (couleurs, polices)
└── package.json
```

---

## Les données

`data.js` contient un tableau d'au moins 12 créatures. Chaque créature est un objet :

```js
{
  id: "#001",
  name: "Nom de la carte",
  type: "Dragon",
  level: "Niveau 8",
  stats: { attack: 3000, defence: 2500 },
  image: "https://.../image.png",
  description: "Le texte de la carte."
}
```

**Source des images :** `À COMPLÉTER (ex. YGOPRODeck : https://ygoprodeck.com)`

---

## Validation du formulaire

Les champs sont vérifiés avec des expressions régulières. Voici les règles et leurs tests.

| Champ | Règle | Expression régulière |
|---|---|---|
| Numéro | `#` suivi de 3 chiffres, pas déjà utilisé | `/^#\d{3}$/` |
| Nom | 2 à 30 caractères, commence par une lettre ou un chiffre | `/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/` |
| Type | Choisi dans la liste | Pas de regex (un `select`) |
| Statistique | Nombre entier de 0 à 999 | `/^\d{1,3}$/` |
| Image | Lien https qui finit par `.png`, `.jpg`, `.jpeg`, `.webp` ou `.gif` | `/^https:\/\/\S+\.(png\|jpe?g\|webp\|gif)$/i` |
| Description | 10 à 200 caractères | `/^[\s\S]{10,200}$/` |

### Tests dans la console

Copiez ce code dans la console du navigateur (F12) :

```js
const tests = [
  ["Numéro",      /^#\d{3}$/,                                   "#010",                          true],
  ["Numéro",      /^#\d{3}$/,                                   "#999",                          true],
  ["Numéro",      /^#\d{3}$/,                                   "010",                           false],
  ["Numéro",      /^#\d{3}$/,                                   "#10",                           false],

  ["Nom",         /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,   "Kuriboh",                       true],
  ["Nom",         /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,   "Dragon Blanc aux Yeux Bleus",   true],
  ["Nom",         /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,   "A",                             false],
  ["Nom",         /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,   "-Dragon",                       false],

  ["Statistique", /^\d{1,3}$/,                                  "0",                             true],
  ["Statistique", /^\d{1,3}$/,                                  "999",                           true],
  ["Statistique", /^\d{1,3}$/,                                  "1000",                          false],
  ["Statistique", /^\d{1,3}$/,                                  "-5",                            false],

  ["Image",       /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,     "https://example.com/a.png",     true],
  ["Image",       /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,     "https://example.com/a.JPG",     true],
  ["Image",       /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,     "http://example.com/a.png",      false],
  ["Image",       /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,     "https://example.com/a.pdf",     false],

  ["Description", /^[\s\S]{10,200}$/,                           "Un monstre très puissant.",     true],
  ["Description", /^[\s\S]{10,200}$/,                           "a".repeat(200),                 true],
  ["Description", /^[\s\S]{10,200}$/,                           "Court",                         false],
  ["Description", /^[\s\S]{10,200}$/,                           "a".repeat(201),                 false],
];

tests.forEach(([champ, regex, valeur, attendu]) => {
  const resultat = regex.test(valeur);
  console.log(resultat === attendu ? "✅" : "❌", champ, JSON.stringify(valeur.slice(0, 30)), "→", resultat);
});
```

**Résultat attendu :** 20 lignes avec ✅.

> Collez ici une capture d'écran ou le résultat de la console.

---


## Auteur

**Mohamed Aarab** · étudiant à YouCode, Safi, Maroc

*Tous droits réservés. Projet réalisé dans le cadre d'une formation.*