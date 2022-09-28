const input = document.querySelector(`.input`);
const btn = document.querySelector(`.btn`);
const p = document.querySelector(`.p`);
const select = document.querySelector(`.select`);
const btnSelect = document.querySelector(`.btnSelect`);
const updateError = document.querySelector(`.updateError`);

// script for updating name

const Update = async () => {
  const input = select.options[select.selectedIndex].innerText;
  const responseObject = await fetch(`/shuffles/6333fc7f2f1ad17d22f3653c`, {
    method: `PUT`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: input }),
  });
  const response = await responseObject.json();
  if (responseObject.status === 200) {
    updateError.style.display = `block`;
    updateError.style.color = `green`;
    updateError.innerHTML = response;
    setTimeout(() => {
      updateError.style.display = `none`;
    }, 3500);
  } else {
    updateError.style.display = `block`;
    updateError.style.color = `red`;
    updateError.innerHTML = response;
    setTimeout(() => {
      updateError.style.display = `none`;
    }, 3500);
  }
};

btnSelect.addEventListener(`click`, Update);

// script for updating number of running per day
const Send = async (e) => {
  e.preventDefault();
  let number = input.value;
  if (!number) {
    p.innerHTML = `Please input numbers`;
    setTimeout(() => {
      p.innerHTML = ``;
    }, 4000);
  } else {
    p.innerHTML = ``;
    input.value = ``;
    const responseObject = await fetch(`/shuffle/63317d7beef74169d636fba9`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: Number(number) }),
    });
    if (responseObject.status === 200) {
      const { msg } = await responseObject.json();
      p.style.color = `green`;
      p.innerHTML = msg;
      setTimeout(() => {
        p.innerHTML = ``;
      }, 4000);
    } else {
      const { msg } = await responseObject.json();
      p.innerHTML = msg;
      setTimeout(() => {
        p.innerHTML = ``;
      }, 4000);
    }
  }
};

btn.addEventListener(`click`, Send);
