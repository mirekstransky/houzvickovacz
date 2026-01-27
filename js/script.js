const btnNav = document.querySelector(".btn-mobile-nav");
const bodyEl = document.querySelector("body");

if (btnNav && bodyEl) {
  btnNav.addEventListener("click", function () {
    bodyEl.classList.toggle("nav-open");
  });
}

// BMI kalkulačka
const bmiForm = document.querySelector(".bmi-form");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiResultEl = document.querySelector(".bmi-result .result-number");
const bmiCategoryEl = document.querySelector(".bmi-result .bmi-category");

if (bmiForm && heightInput && weightInput && bmiResultEl && bmiCategoryEl) {
  bmiForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Umožní zadat jak čárku, tak tečku jako desetinný oddělovač
    const heightValue = (heightInput.value || "")
      .toString()
      .trim()
      .replace(/,/g, ".");
    const weightValue = (weightInput.value || "")
      .toString()
      .trim()
      .replace(/,/g, ".");

    const height = parseFloat(heightValue);
    const weight = parseFloat(weightValue);

    if (!height || !weight || height <= 0 || weight <= 0) {
      bmiResultEl.textContent = "0";
      bmiCategoryEl.textContent = "";
      return;
    }

    const bmi = weight / (height * height);
    bmiResultEl.textContent = bmi.toFixed(1).replace(".", ",");

    // Určení slovní klasifikace BMI
    let category = "";
    if (bmi < 18.5) {
      category = "Podváha";
    } else if (bmi < 25) {
      category = "Optimální váha";
    } else if (bmi < 30) {
      category = "Nadváha";
    } else if (bmi < 35) {
      category = "Obezita prvního stupně";
    } else if (bmi < 40) {
      category = "Obezita druhého stupně";
    } else {
      category = "Obezita třetího stupně";
    }

    bmiCategoryEl.textContent = category;
  });
}

// Karusel aktualit v sekci .section-news-info
const newsArrow = document.querySelector(".news-info-arrow");
const newsImgEl = document.querySelector(".news-info-img img");
const newsTitleEl = document.querySelector(".news-info-text .heading-tertiary");
const newsTextEl = document.querySelector(".news-info-text .general-text");

const newsItems = [
  {
    image: "images/info.jpg",
    title: "Začínáme cvičit!",
    text: "Začínáme cvičit v pondělí 12.01.2026 a ve středu 14.01.2026!",
  },
];

// Inicializace obsahu aktualit – funguje i bez šipky (mobile first)
if (newsImgEl && newsTitleEl && newsTextEl && newsItems.length) {
  let currentNewsIndex = 0;

  const renderNewsItem = (index) => {
    const item = newsItems[index];
    newsImgEl.src = item.image;
    newsImgEl.alt = item.title;
    newsTitleEl.textContent = item.title;
    newsTextEl.textContent = item.text;
  };

  // Ukážeme první položku
  renderNewsItem(currentNewsIndex);

  // Pokud existuje šipka a má smysl (víc než 1 položka), zapneme přepínání
  if (newsArrow) {
    if (newsItems.length === 1) {
      newsArrow.style.display = "none";
    } else {
      newsArrow.addEventListener("click", () => {
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
        renderNewsItem(currentNewsIndex);
      });
    }
  }
}
