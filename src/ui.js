const loading = document.querySelector("#loading");

export function showStatus(message) {
  loading.textContent = message;
}

export function clearGrid() {
  document.querySelector("#grid").innerHTML = "";
  document.querySelector("#creature-count").textContent = "0";
}

export function setLoadMoreVisible(visible) {
  document.querySelector("#load-more").classList.toggle("hidden", !visible);
}

export function hideDetail() {
  document.querySelector("#detail").classList.add("hidden");
}

export function affich(list, total, teamCount) {
  const container = document.querySelector("#grid");
  container.innerHTML = list
    .map(
      (creature) => `
    <article data-id="${creature.id}" class="cursor-pointer flex flex-col gap-3 rounded-card bg-ground border-4 border-brand-light p-3 pb-4 transition duration-300 hover:-translate-y-2 shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_45px_rgba(250,204,21,0.9)]">
      <div class="card-img relative flex  items-center justify-center rounded-xl ">
        <img class=" w-full rounded-xl object-contain aspect-[59/86]" src="${creature.image}" alt="${creature.name}" loading="lazy">
        <span class="absolute left-3 top-2 font-mono font-bold text-sm text-white">${creature.id}</span>
      </div>

        <h3 class="cre-name font-display text-sm font-bold text-brand">${creature.name}</h3>
        <span class="cre-type rounded-full bg-brand-light px-2 py-2 text-sm font-bold text-ink text-center">${creature.type}</span>

      <p class=" text-sm text-muted">Niveau <span class="cre-niv">${creature.level}</span></p>
      <button type="button" class="btn-favorite btn-outline bg-brand text-line border-solid border-brand-light mt-auto shadow-[0_0_25px_rgba(250,204,21,0.6)] text-sm" data-id="${creature.id}">Favorite</button>
      <button type="button" data-id="${creature.id}" class="btn-add btn-primary btn-outline bg-brand text-line border-solid border-brand-light mt-auto shadow-[0_0_25px_rgba(250,204,21,0.6)] text-sm">Ajouter à l'équipe</button>
    </article>
    
  `,
    )
    .join("");

  document.querySelector("#creature-count").textContent = total;
  updateButtons(teamCount);
}

export function detail(creature, teamCount) {
  const max = 5000;
  // const hpPerc = Math.min(100, (creature.stats.hp / max) * 100);
  const attPerc = (creature.stats.attack / max) * 100;
  const defPerc = (creature.stats.defence / max) * 100;

  const detail = document.querySelector("#detail");
  detail.classList.remove("hidden");
  detail.innerHTML = "";

  detail.innerHTML = `
        <section  aria-label="Détail de la créature" class="flex flex-col gap-4 rounded-card border-4 border-brand-light bg-ground p-4 md:p-6 "style="box-shadow: 0 0 30px rgba(250, 204, 21, 0.6);">  
          <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">${creature.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="btn-close btn-outline w-11 px-0">✕</button>
          </div>
          <div class="flex  items-center justify-center rounded-2xl">
            <img src="${creature.image}" alt="${creature.name}" class="w-full max-w-xs rounded-2xl object-contain aspect-[59/86]">
          </div>
          <div class="flex flex-wrap justify-between">
            <h2 class="font-display text-3xl font-extrabold text-brand">${creature.name}</h2>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold">${creature.type}</span>
          </div>
          <p class="text-cream">${creature.description}</p>
          <div class="flex flex-col gap-2 text-sm text-cream">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width: ${attPerc}%"></span></span><span class="text-right font-mono">${creature.stats.attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width: ${defPerc}%"></span></span><span class="text-right font-mono">${creature.stats.defence}</span></div>
          </div>
          <button type="button" data-id="${creature.id}" class="btn-add btn-primary text-line border-2 border-brand-light shadow-[0_0_25px_rgba(250,204,21,0.6)] ">Ajouter à l'équipe</button>
        </section>


    `;
  updateButtons(teamCount);
}

export function error(id, msg, inputId) {
  const errorEL = document.getElementById(id);
  errorEL.innerHTML = msg;
  errorEL.style.display = "block";
  const input = document.querySelector(inputId);
  input.classList.remove("border-brand-light");
  input.classList.add("border-red-600");
}
// error remove function
export function errorRemovale(id, inputId) {
  const errorEL = document.querySelector(id);
  errorEL.textContent = "";
  errorEL.style.display = "none";
  const input = document.querySelector(inputId);
  input.classList.remove("border-red-600");
  input.classList.add("border-brand-light");
}

export function updateButtons(teamCount) {
  const buttons = document.querySelectorAll(".btn-add");

  for (let i = 0; i < buttons.length; i++) {
    if (teamCount >= 6) {
      buttons[i].disabled = true;
      buttons[i].classList.add("cursor-not-allowed");
      buttons[i].classList.add("text-gray-400" ,"border-gray-600","opacity-50");
      buttons[i].classList.remove("shadow-[0_0_25px_rgba(250,204,21,0.6)]","text-line","border-brand-light")
    } else {
      buttons[i].disabled = false;
      buttons[i].classList.remove("text-gray-400" ,"border-gray-600","opacity-50");
      buttons[i].classList.remove("cursor-not-allowed");
      buttons[i].classList.add("shadow-[0_0_25px_rgba(250,204,21,0.6)]","text-line","border-brand-light");

    }
  }
}

const max = 6;
const teamSlots = document.querySelector("#team-slots");
const teamMsg = document.querySelector("#team-msg");
const team_count = document.querySelector("#team-count");
const team_counter = document.querySelector("#team-counter");

export function teamCreation(team, findCreature) {
  let html = "";
  for (let i = 0; i < max; i++) {
    if (i < team.length) {
      const creature = findCreature(team[i]);
      if (!creature) continue;
      html += `
        <div class="border-2 border-brand-light p-2 flex flex-col gap-2 items-center">
          <img src="${creature.image}" alt="${creature.name}" class="w-full  rounded-lg object-contain aspect-[59/86]">
          <p class="text-sm font-bold">${creature.name}</p>
          <button type="button" data-id="${creature.id}" class="btn-remove text-xs underline text-line bg-brand border-2 border-brand-light rounded-full p-3 font-bold">Retirer</button>
        </div>
      `;
    } else {
      html += `<div class="border-dashed border-2 border-brand-light p-6 text-4xl text-brand">+</div>`;
    }
  }
  teamSlots.innerHTML = html;
  team_count.textContent = team.length;
  team_counter.textContent = team.length + "/" + max;

  if (team.length === 0) {
    teamMsg.textContent = "no creature on the team";
  } else {
    teamMsg.textContent = "";
  }

  updateButtons(team.length);
}
