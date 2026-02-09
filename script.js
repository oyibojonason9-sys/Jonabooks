
let eggHealth = 100;
let gameLocked = true;
let cooldown = false;

function lockGame() {
  const btn = document.getElementById("tapEggBtn") || document.getElementById("tapBtn");
  if (btn) btn.disabled = true;
}

function unlockGame() {
  const btn = document.getElementById("tapEggBtn") || document.getElementById("tapBtn");
  if (btn) btn.disabled = false;
  gameLocked = false;
}

window.addEventListener("load", () => {
  lockGame();
  if (typeof show_10570231 === "function") {
    show_10570231().finally(() => unlockGame());
  } else {
    unlockGame();
  }
  updateHealthUI();
});

function tapEgg() {
  if (gameLocked || cooldown || eggHealth <= 0) return;

  lockGame();
  if (typeof show_10570231 === "function") {
    show_10570231().finally(playTap);
  } else {
    playTap();
  }
}

function playTap() {
  const damage = Math.floor(Math.random() * 6) + 5;
  eggHealth = Math.max(0, eggHealth - damage);
  updateHealthUI();
  startCooldown();
  unlockGame();
}

function updateHealthUI() {
  const t = document.getElementById("eggHealthText");
  const b = document.getElementById("healthFill");
  if (t) t.innerText = eggHealth + "%";
  if (b) b.style.width = eggHealth + "%";
}

function startCooldown() {
  cooldown = true;
  const time = Math.floor(Math.random() * 46) + 15;
  setTimeout(() => cooldown = false, time * 1000);
}
