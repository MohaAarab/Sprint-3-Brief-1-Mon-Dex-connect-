# Mon Dex · Encyclopédie Yu-Gi-Oh!

Une application web interactive permettant d'explorer les cartes de l'univers **Yu-Gi-Oh!** grâce à l'API publique **YGOPRODeck**.

L'utilisateur peut consulter les cartes, rechercher par nom, filtrer par type, afficher leurs détails, charger davantage de résultats, gérer ses favoris, créer ses propres cartes et composer une équipe de six cartes maximum.

Projet réalisé dans le cadre de la formation **YouCode Safi — Sprint 3 · Brief 1 : Mon Dex connecté**.

**Démo en ligne :** [Mon Dex](https://mohaaarab.github.io/Sprint-3-Brief-1-Mon-Dex-connect-/)

**Repository GitHub :** [yugioh-dex](https://github.com/MohaAarab/Sprint-3-Brief-1-Mon-Dex-connect-.git)

**Tableau de planification :** [Trello](https://trello.com/invite/b/6af1e07329fd19742b6d8113/ATTIe9c8b33f501435d91251cc9acae3311eE9286456/sprint-3-brief-1-mon-dex-connecte)

---

## 1. Contexte du projet

Dans le Sprint 2, une première version de Mon Dex utilisait un tableau JavaScript statique pour afficher les cartes.

Le Sprint 3 consiste à connecter cette application à une **API externe** afin de récupérer les cartes dynamiquement.

L'objectif est de réutiliser l'interface existante tout en intégrant les notions suivantes :

- Consommation d'une API REST avec `fetch()`.
- Programmation asynchrone avec `async/await`.
- Transformation de données JSON.
- Pagination et chargement progressif.
- Recherche à partir de l'API.
- Gestion des états de chargement, de succès, de résultat vide et d'erreur.
- Sauvegarde des favoris avec LocalStorage.
- Conservation de la dernière recherche avec SessionStorage.
- Organisation du JavaScript en modules ES.

## 2. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure et éléments sémantiques |
| Tailwind CSS | Design, animations et responsive |
| JavaScript ES6 | Logique et interactivité |
| Fetch API | Requêtes HTTP |
| Async / Await | Gestion des opérations asynchrones |
| YGOPRODeck API | Source des cartes |
| LocalStorage | Favoris et cartes personnalisées |
| SessionStorage | Dernière recherche |
| Git / GitHub | Versionnement et déploiement |
| GitHub Pages | Hébergement du site |

Le projet utilise du JavaScript natif, sans framework frontend.

## 3. API utilisée

**YGOPRODeck API**

Documentation : https://ygoprodeck.com/api-guide/

URL de base :

`https://db.ygoprodeck.com/api/v7/`

L'API est gratuite et ne nécessite pas de clé d'authentification.

### Endpoints

**Récupération des cartes**

```text
GET /cardinfo.php?num=20&offset=0
```

Récupère les vingt premières cartes.

**Pagination**

```text
GET /cardinfo.php?num=20&offset=20
GET /cardinfo.php?num=20&offset=40
```

Chaque requête récupère la page suivante.

**Recherche par nom**

```text
GET /cardinfo.php?fname=Dark%20Magician
```

Le paramètre `fname` permet d'effectuer une recherche partielle sur les noms.

**Recherche paginée**

```text
GET /cardinfo.php?fname=Dragon&num=20&offset=0
```

Les résultats sont récupérés progressivement par groupes de vingt.

## 4. Fonctionnalités

### Affichage dynamique

- [x] Récupération des cartes depuis l'API.
- [x] Vérification des réponses HTTP avec `response.ok`.
- [x] Transformation des données API en objets JavaScript simplifiés.
- [x] Affichage dynamique avec `map()` et `innerHTML`.
- [x] Affichage des images, noms, types et niveaux.

### Pagination

- [x] Chargement initial de vingt cartes.
- [x] Bouton « Charger plus ».
- [x] Gestion des paramètres `limit` et `offset`.
- [x] Ajout des nouvelles cartes aux cartes déjà chargées.
- [x] Désactivation du bouton pendant une requête.
- [x] Pagination distincte pour les recherches.

### Recherche et filtres

- [x] Recherche par nom directement depuis l'API.
- [x] Prise en charge des noms contenant plusieurs mots avec `encodeURIComponent()`.
- [x] Recherche déclenchée avec la touche Entrée.
- [x] Filtrage par catégorie : Tous, Monstres, Magie et Pièges.
- [x] Filtre Favoris.
- [x] Retour à la liste initiale lorsque la recherche est effacée.
- [x] Conservation de la dernière recherche dans SessionStorage.

Le filtre de type s'applique aux cartes actuellement chargées.

### Détails des cartes

- [x] Ouverture du panneau de détails au clic sur une carte.
- [x] Affichage de l'image et du nom.
- [x] Affichage du type et de la description.
- [x] Affichage des statistiques ATK et DEF.
- [x] Barres vis