// App state, startup and event listeners.
import { getCreatures, searchCards, resetPagination } from "./services/api.js";
import { getSavedCreatures, saveCreature, getLastSearch, saveLastSearch, clearLastSearch } from "./storage.js";
import { affich, detail, hideDetail, showStatus, clearGrid, setLoadMoreVisible, teamCreation, error, errorRemovale } from "./ui.js";

let creatures = [];
let team = [];
const max = 6;
const knownCreatures = new Map();
const grid = document.querySelector("#grid");
const rech = document.querySelector("#search");
const tpSelect = document.querySelector("#typeFilter");
const load_more = document.querySelector("#load-more");
const detailPanel = document.querySelector("#detail");
const teamSlots = document.querySelector("#team-slots");
const teamMsg = document.querySelector("#team-msg");

function rememberCards(cards) {
  cards.forEach(card => knownCreatures.set(String(card.id), card));
}

function findCreature(id) {
  return knownCreatures.get(String(id)) ?? null;
}

function renderCurrent() {
  rememberCards(creatures);
  const type = tpSelect.value;
  const filtered = creatures.filter(creature =>
    type === "Tous" ||
    (type === "Monster" && creature.type.includes("Monster")) ||
    creature.type === type
  );
  affich(filtered, creatures.length, team.length);
}

async function loadInitialCards() {
  resetPagination();
  const first = await getCreatures();
  creatures = [...first, ...getSavedCreatures()];
  renderCurrent();
  setLoadMoreVisible(true);
  hideDetail();
}

async function init() {
  showStatus("Chargement des cartes...");
  try {
    const last = getLastSearch();
    if (last) {
      rech.value = last;
      await handleSearch();
    } else {
      await loadInitialCards();
      showStatus("");
    }
  } catch (error) {
    console.error(error);
    showStatus("Erreur de chargement des cartes");
  }
}

async function loadMore() {
  load_more.disabled = true;
  try {
    const more = await getCreatures();
    creatures.push(...more);
    renderCurrent();
  } catch (error) {
    console.error(error);
    showStatus("Erreur de chargement des cartes");
  } finally {
    load_more.disabled = false;
  }
}

async function handleSearch() {
  const value = rech.value.trim();
  rech.disabled = true;
  showStatus(value ? "Recherche en cours..." : "Chargement des cartes...");
  try {
    if (!value) {
      await loadInitialCards();
      clearLastSearch();
    } else {
      const result = await searchCards(value);
      saveLastSearch(value);
      creatures = result;
      renderCurrent();
      setLoadMoreVisible(false);
      hideDetail();
      if (result.length === 0) {
        clearGrid();
        showStatus("Aucune carte trouvée");
        return;
      }
    }
    showStatus("");
  } catch (error) {
    console.error(error);
    showStatus("Erreur lors de la recherche");
  } finally {
    rech.disabled = false;
  }
}

function searchFilter() {
  renderCurrent();
}

function addToTeam(id) {
  if (team.includes(id)) {
    teamMsg.textContent = "this creature is already in the team";
    return;
  }
  if (team.length >= max) {
    teamMsg.textContent = "the team is already full";
    return;
  }
  team.push(id);
  teamCreation(team, findCreature);
}

function removeFromTeam(id) {
  team = team.filter(item => item !== id);
  teamCreation(team, findCreature);
}
// id validation
function idValidation() {
  const id = document.querySelector("#id").value.trim();
  errorRemovale("#idError", "#id");
  const regex = /^#\d{3}$/;

  if (id === "") {
    error("idError", "id required", "#id");
    return false;
  }
  if (!regex.test(id)) {
    error("idError", "the id should be a # followed by 3 numbers", "#id");
    return false;
  }
  for (let i = 0; i < creatures.length; i++) {
    if (String(creatures[i].id) === String(id)) {
      error("idError", "this id already exist", "#id");
      return false;
    }
  }

  return true;
}

// name validation
function nameValidation() {
  const name = document.querySelector("#name").value.trim();
  errorRemovale("#nameError", "#name");

  if (name === "") {
    error("nameError", "name is required", "#name");
    return false;
  }
  if (name.length <= 2) {
    error("nameError", "name should be at least 3 letters", "#name");
    return false;
  }

  return true;
}
// type validation
function typeValidation() {
  const type = document.querySelector("#type").value;

  if (type === "" || type === "Choisir un type") {
    error("typeError", "Please select a valid type", "#type");
    return false;
  }

  errorRemovale("#typeError", "#type");
  return true;
}

// attack validation
function attackValidation() {
  const attack = document.querySelector("#attack").value.trim();
  errorRemovale("#attackError", "#attack");

  if (attack === "") {
    error("attackError", "stats is required", "#attack");
    return false;
  }
  if (isNaN(attack)) {
    error("attackError", "stats should be a number", "#attack");
    return false;
  }
  if (Number(attack) > 5000) {
    error("attackError", "the max stats is 5000", "#attack");
    return false;
  }
  if (Number(attack) < 0) {
    error("attackError", "the  stats should be positive ", "#attack");
    return false;
  }

  return true;
}

// defence validation
function defenceValidation() {
  const defence = document.querySelector("#defence").value.trim();
  errorRemovale("#defenceError", "#defence");

  if (defence === "") {
    error("defenceError", "stats is required", "#defence");
    return false;
  }
  if (isNaN(defence)) {
    error("defenceError", "stats should be a number");
    return false;
  }
  if (Number(defence) > 5000) {
    error("defenceError", "the max stats is 5000", "#defence");
    return false;
  }
  if (Number(defence) < 0) {
    error("defenceError", "the stat should be positive ", "#defence");
    return false;
  }
  return true;
}

// img validation
function imgValidation() {
  const img = document.querySelector("#img").value.trim();
  errorRemovale("#imgError", "#img");

  const regexImg =
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;
  if (img === "") {
    error("imgError", "image required", "#img");
    return false;
  } else if (!regexImg.test(img)) {
    error("imgError", "this is not a valid image url", "#img");
    return false;
  }
  return true;
}

// description validation
function descriptionValidation() {
  const description = document.querySelector("#description").value.trim();
  errorRemovale("#descriptionError", "#description");

  if (description === "") {
    error("descriptionError", "description is required", "#description");
    return false;
  }
  if (description.length <= 9) {
    error(
      "descriptionError",
      "description should be at least 10 letters",
      "#description",
    );
    return false;
  }

  return true;
}
// level validation
function levelValidation() {
  const level = document.querySelector("#level").value.trim();
  errorRemovale("#levelError", "#level");

  if (level === "") {
    error("levelError", "stats is required", "#level");
    return false;
  }
  if (Number(level) > 12) {
    error("levelError", "the max level is 12", "#level");
    return false;
  }
  return true;
}

function formValidation() {
  const form = document.querySelector("#creature-form");
  // real time check
  form.addEventListener("input", function (e) {
    const field = e.target.id;

    if (field === "id") idValidation();
    if (field === "name") nameValidation();
    if (field === "attack") attackValidation();
    if (field === "defence") defenceValidation();
    if (field === "img") imgValidation();
    if (field === "description") descriptionValidation();
    if (field === "level") levelValidation();
    if (field === "type") typeValidation();
  });

  // document.querySelector("#type").addEventListener("change", typeValidation);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const idOk = idValidation();
    const nameOk = nameValidation();
    const attackOk = attackValidation();
    const defenceOk = defenceValidation();
    const imgOk = imgValidation();
    const levelOk = levelValidation();
    const descriptionOk = descriptionValidation();
    const typeOk=typeValidation()

    if (
      idOk &&
      nameOk &&
      attackOk &&
      defenceOk &&
      imgOk &&
      levelOk &&
      descriptionOk &&
      typeOk
    ) {
      // alert("the form is submitted");
      const newCreature = {
        id: document.querySelector("#id").value.trim(),
        name: document.querySelector("#name").value.trim(),
        type: document.querySelector("#type").value,
        level: "Niveau " + document.querySelector("#level").value.trim(),
        image: document.querySelector("#img").value.trim(),
        description: document.querySelector("#description").value.trim(),
        icon: "",
        stats: {
          attack: Number(document.querySelector("#attack").value),
          defence: Number(document.querySelector("#defence").value),
        },
      };
      creatures.push(newCreature);

      saveCreature(newCreature);
      knownCreatures.set(String(newCreature.id), newCreature);
      renderCurrent();
      form.reset();
    }
  });
}

// Event listeners
grid.addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("btn-add")) {
    addToTeam(target.dataset.id);
    return;
  }
  const card = target.closest("article[data-id]");
  if (!card) return;
  const creature = findCreature(card.dataset.id);
  if (creature) detail(creature, team.length);
});

detailPanel.addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("btn-add")) addToTeam(target.dataset.id);
  if (target.classList.contains("btn-close")) hideDetail();
});

rech.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});
tpSelect.addEventListener("change", searchFilter);
load_more.addEventListener("click", loadMore);
teamSlots.addEventListener("click", event => {
  if (event.target.classList.contains("btn-remove")) {
    removeFromTeam(event.target.dataset.id);
  }
});

formValidation();
teamCreation(team, findCreature);
init();
