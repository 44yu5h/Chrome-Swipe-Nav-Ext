const container = document.createElement("div");
container.className = "browser-extension-swipe-back-container";

const leftArrow = document.createElement("img");
leftArrow.className = "browser-extension-swipe-back-arrow browser-extension-swipe-back-arrow-left";
const rightArrow = document.createElement("img");
rightArrow.className = "browser-extension-swipe-back-arrow browser-extension-swipe-back-arrow-right";

let selectedIcon;
chrome.storage.local.get(["selectedIcon"], function (data) {
  selectedIcon = data.selectedIcon ?? "4.svg";
  leftArrow.src = chrome.runtime.getURL(`assets/arrow_styles/${selectedIcon}`);
  rightArrow.src = leftArrow.src;
});

document.body.appendChild(leftArrow);
document.body.appendChild(rightArrow);

let position = 0;
let freezeUntil = 0;
let transitionTimeoutID = 0;
let resetTimeoutID = 0;

const imageInitialLeft = -110;

let arrowSize, iconTravelDist, fadeDelay, sensitivity ; // user-settings

chrome.storage.local.get(["sensitivity", "travelDistance", "arrowSize", "fadeDelay"], function (data) {
  fadeDelay = data.fadeDelay ?? 600;
  sensitivity = data.sensitivity ?? 16;
  iconTravelDist = data.travelDistance ?? 120;
  arrowSize = data.arrowSize ?? 70;
  sensitivity = sensitivity / 200;

  // Inject CSS after settings are loaded
  const style = document.createElement('style');
  style.textContent = `
    .browser-extension-swipe-back-arrow {
      position: fixed;
      top: calc(50vh - ${arrowSize}px / 2);
      width: ${arrowSize}px;
      height: ${arrowSize}px;
      z-index: 99999;
      transition: transform 300ms;
    }

    .browser-extension-swipe-back-arrow-left {
      left: -100px;
    }

    .browser-extension-swipe-back-arrow-right {
      right: -100px;
      transform: ${selectedIcon.includes('_') ? 'none' : 'scaleX(-1)'};
    }

    .browser-extension-swipe-back-arrow.transition {
      transition: opacity ${fadeDelay}ms;
      opacity: 0;
    }

    .picker {
      border-radius: 50px;
    }
  `;
  document.head.appendChild(style);
});

function debounce(fn, duration) {
  let expiresAt = 0;
  return function debouncedFn() {
    if (Date.now() < expiresAt) {
    return;
    }
    expiresAt = Date.now() + duration;
    fn();
  };
}

const historyBack = debounce(function back() {
  window.history.back();
}, 500);

const historyForward = debounce(function historyForward() {
    window.history.forward();
}, 500);

function resetPosition() {
  position = 0;
  leftArrow.style.left = imageInitialLeft + "px";
  rightArrow.style.right = imageInitialLeft + "px";
}

function animateArrow(arrowElement) {
  const arrow = arrowElement;

  if (arrow === leftArrow) {
    arrow.style.left = `${
      imageInitialLeft +
      Math.min(position * sensitivity, iconTravelDist)
    }px`;
  } else {
    arrow.style.right = `${
      imageInitialLeft +
      Math.min(-position * sensitivity, iconTravelDist)
    }px`;
  }

  //TODO show only 1 icon at a time
  arrow.classList.remove("transition");
  window.clearTimeout(transitionTimeoutID);
  transitionTimeoutID = window.setTimeout(() => {
    arrow.classList.add("transition");
  }, 200);
}

function handleWheel(event) {
  if (event.deltaY !== 0) {
    freezeUntil = Date.now() + 50;
    return;
  }
  if (Date.now() < freezeUntil) {
    return;
  }
  position -= event.deltaX;

  if (position > 0) {
    animateArrow(leftArrow);
  } else {
    animateArrow(rightArrow);
  }

  if (position * sensitivity  >= iconTravelDist|| position * sensitivity  <= -iconTravelDist) {
    freezeUntil = Date.now() + 500;
    if (position > 0) {
    historyBack();
    } else {
    historyForward();
    }
    position = 0;
  }
  if (resetTimeoutID) {
    clearTimeout(resetTimeoutID);
  }
  resetTimeoutID = setTimeout(() => {
    resetPosition();
  }, fadeDelay);
}

let lastScrollX = 0;
function handleScroll(event) {
  const scrollX = event.target.scrollX ?? event.target.scrollLeft;
  // only handles horizontal scroll
  if (scrollX !== lastScrollX) {
    position = 0;
    freezeUntil = Date.now() + 1000;
  }
  lastScrollX = scrollX;
}

function init() {
  // @ts-ignore
  if (/Mac/.test(window.navigator.platform)) {
    return;
  }
  document.body.appendChild(container);
  document.addEventListener("wheel", handleWheel);
  document.addEventListener("scroll", handleScroll, { capture: true });
}

chrome.storage.local.get(["enableFeature"], function (data) {
  if (!data.enableFeature) {
    return;
  }
init();});
