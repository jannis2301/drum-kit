const keys = Array.from(document.querySelectorAll(".key"));

function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return; //stop the function from running all together

  key.classList.add("playing");
  audio.currentTime = 0; //rewind to the start
  audio.play();
}

function removeTransition(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!key) return;
  key.classList.remove("playing");
}

async function clickPlaySound(e) {
  const currentKey = e.currentTarget.dataset.key;
  const audio = document.querySelector(`audio[data-key="${currentKey}"]`);
  const key = document.querySelector(`.key[data-key="${currentKey}"]`);

  if (!audio) return; //stop the function from running all together

  key.classList.add("playing");
  audio.currentTime = 0; //rewind to the start
  audio.play();
  await wait(50);
  key.classList.remove('playing');
}

window.addEventListener("keydown", playSound);
window.addEventListener("keyup", removeTransition);
keys.forEach(key => key.addEventListener("click", clickPlaySound));
