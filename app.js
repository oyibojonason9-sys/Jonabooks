const tg = window.Telegram.WebApp;
tg.expand();

let mb = Number(localStorage.getItem("mb")) || 0;
let taps = Number(localStorage.getItem("taps")) || 20;
let videos = Number(localStorage.getItem("videos")) || 5;

const mbEl = document.getElementById("mb");
const tapsEl = document.getElementById("taps");
const videosEl = document.getElementById("videos");
const eggBtn = document.getElementById("egg");
const cooldownEl = document.getElementById("cooldown");

const userId = tg.initDataUnsafe?.user?.id || Math.floor(Math.random() * 1e9);
const refParam = new URLSearchParams(window.location.search).get("ref");
const claimedRef = localStorage.getItem("claimedRef");
const baseLink = "https://YOUR_DOMAIN/index.html";
const refLink = `${baseLink}?ref=${userId}`;
document.getElementById("refLink").value = refLink;
document.getElementById("copyRef").onclick = () => {
  navigator.clipboard.writeText(refLink);
  alert("Referral link copied!");
};
if (refParam && !claimedRef && refParam !== String(userId)) {
  mb += 20;
  localStorage.setItem("mb", mb);
  localStorage.setItem("claimedRef", refParam);
}

function updateUI() {
  mbEl.textContent = mb.toFixed(2);
  tapsEl.textContent = taps;
  videosEl.textContent = videos;
  eggBtn.disabled = taps <= 0;
}
updateUI();

function showRewardedSessionAd() {
  if (typeof show_10570231 === "function") show_10570231().catch(() => {});
}

function showRewardedVideoAd(onReward) {
  if (typeof show_10570231 === "function") {
    show_10570231("pop")
      .then(() => onReward())
      .catch(() => alert("Ad not available"));
  } else alert("Ads still loading, please wait");
}

eggBtn.onclick = () => {
  if (taps <= 0) return;
  eggBtn.classList.add("tap");
  setTimeout(() => eggBtn.classList.remove("tap"), 400);
  taps--;
  const reward = (Math.random() * (10 - 2) + 2).toFixed(2);
  mb += Number(reward);
  localStorage.setItem("taps", taps);
  localStorage.setItem("mb", mb);
  updateUI();
  showRewardedSessionAd();
  startCooldown();
};

document.getElementById("watchAd").onclick = () => {
  if (videos <= 0) return alert("No videos left today");
  showRewardedVideoAd(() => {
    videos--;
    const videoReward = (Math.random() * (20 - 10) + 10).toFixed(2);
    mb += Number(videoReward);
    localStorage.setItem("videos", videos);
    localStorage.setItem("mb", mb);
    updateUI();
    alert(`🎉 You earned ${videoReward} MB for watching the video!`);
  });
};

function startCooldown() {
  eggBtn.disabled = true;
  const time = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
  let remaining = time;
  cooldownEl.textContent = `⏳ Cooldown: ${remaining}s`;
  const interval = setInterval(() => {
    remaining--;
    cooldownEl.textContent = `⏳ Cooldown: ${remaining}s`;
    if (remaining <= 0) {
      clearInterval(interval);
      cooldownEl.textContent = "";
      eggBtn.disabled = taps <= 0;
    }
  }, 1000);
}

const MIN_WITHDRAW = 100;
const WITHDRAW_DAY = 0;
const withdrawStatus = document.getElementById("withdrawStatus");
const withdrawBtn = document.getElementById("withdrawBtn");
const TELEGRAM_CHANNEL = "https://t.me/dicebooks";

function isWithdrawDay() { return new Date().getDay() === WITHDRAW_DAY; }

function updateWithdrawUI() {
  if (!isWithdrawDay()) {
    withdrawStatus.textContent = "Closed (Weekly)";
    withdrawBtn.disabled = true;
    return;
  }
  if (mb < MIN_WITHDRAW) {
    withdrawStatus.textContent = "Not enough MB";
    withdrawBtn.disabled = true;
    return;
  }
  withdrawStatus.textContent = "Open ✅";
  withdrawBtn.disabled = false;
}

withdrawBtn.onclick = () => {
  alert("📸 Take a screenshot of your balance\n📤 Submit it in the Telegram group\n⏳ Payments are processed manually");
  window.open(TELEGRAM_CHANNEL, "_blank");
};

document.getElementById("freebiesBtn").onclick = () => {
  alert("🎁 Go to Telegram channel for weekly freebies!");
  window.open(TELEGRAM_CHANNEL, "_blank");
};

updateWithdrawUI();

const today = new Date().toDateString();
if (localStorage.getItem("day") !== today) {
  localStorage.setItem("day", today);
  taps = 20;
  videos = 5;
  localStorage.setItem("taps", taps);
  localStorage.setItem("videos", videos);
}