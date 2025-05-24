const buttonSearch = document.querySelector(".search-button");
buttonSearch.addEventListener("click", async function () {
  console.log("lagi nyari nihh...");
});

// ini untuk buttonnya
document.addEventListener("click", function (e) {
  if (e.target.textContent.includes("More Detail")) {
    const data_id = e.target.dataset.id;
    console.log(data_id);
    localStorage.setItem("DataId2", data_id);
    if (e.target.value != "index.html") {
      window.location.href = "../halaman/detail_aktor.html";
    }
  }
});

// button untuk pagenya
document.addEventListener("click", async function (e) {
  if (e.target.className.includes("button-page")) {
    const semuaElement = document.querySelectorAll("*");
    semuaElement.forEach((element) => {
      if (element.classList.contains("aktif")) {
        element.classList.remove("aktif");
      }
    });

    e.target.classList.add("aktif");

    const dataPage = Number(e.target.dataset.page);
    const data = await ambilData(dataPage);
    console.log(data);
    const container = document.querySelector(".container-aktor");
    container.innerHTML = "";
    tampilData(data, container);
  }
});

const dataPencarian = document.querySelector(".search-input");
dataPencarian.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    const container = document.querySelector(".container-aktor");
    container.innerHTML = "";
    seacrhFilmnyaa();
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".container-aktor");
  const dataAktor = await ambilData(null);
  tampilData(dataAktor, container);
});

function ambilData(page) {
  const init = konfigurasianjay();
  // jadi disini kalo misalkan kita panggil ini di defaultnya maka pagenya kita isi null, dan defaultnya akan menampilkan page 1, tapi kalo fungsi ini kita panggil di button-page, maka di parameter ambildatanya kita kasih nilai dataPage dari si button yang di kliknya, anjay
  const url = `https://api.themoviedb.org/3/person/popular?page=${
    page ? page : "1"
  }`;
  return fetch(url, init)
    .then((data) => {
      return data.json();
    })
    .then((dataJson) => {
      console.log(dataJson);
      // nah nanti disini ita cek dan filter harus dibagi 4 agar pagenya bisa bgus
      if (dataJson.results.length % 2 !== 0) {
        dataJson.results.pop();
      }
      return dataJson.results;
    })
    .catch((err) => {
      console.log(`terjadi error : ${err}`);
    });
}

function tampilData(data, container) {
  console.log(data);
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStringData(e);
  });
  container.innerHTML = hasil;
  const divPage = page();
  console.log(divPage);
  container.append(divPage);
}
function tampilDataSearch(data, container) {
  console.log(data);
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStringData(e);
  });
  container.innerHTML = hasil;
}

function page() {
  const div = document.createElement("div");
  div.className = "page";
  div.innerHTML = `
        <button data-page="1" class="button-page">1</button>
        <button data-page="2" class="button-page">2</button>
        <button data-page="3" class="button-page">3</button>
        <button data-page="4" class="button-page">4</button>
        <button data-page="5" class="button-page">5</button>
        <button data-page="6" class="button-page">6</button>
        <button data-page="7" class="button-page">7</button>
        <button data-page="8" class="button-page">8</button>
        <button data-page="9" class="button-page">9</button>
        <button data-page="10" class="button-page">10</button>
    `;

  // 3. Kembalikan div sebagai Node Element
  return div;
}

function templateStringData(e) {
  return `
    ${
      e.profile_path
        ? `
      <div class="card-item">
              <img 
              loading="lazy"
              src="https://image.tmdb.org/t/p/original${
                e.profile_path
              }" alt="Poster aktor">
              <div class="preview-aktor">
                <p class="preview-judul">
                  ${e.name ? e.name : "tidak bernama"}
                </p>
                <p class="preview-rilis">
                  ${e.gender === 1 ? "Female" : "Male"}
                </p>
                <p class="preview">
                      Rating : ${e.known_for[0].vote_average}
                </p>
                <button class="detail-film" data-id="${e.id}">
                  More Detail 
                </button>
              </div>
            </div>
    `
        : ""
    } 
      `;
}

// ini buat search filmnya
async function seacrhFilmnyaa() {
  const container = document.querySelector(".container-aktor");
  const data = await ambilDataSearch();
  tampilDataSearch(data, container);
}
function ambilDataSearch() {
  const pencarian = document.querySelector(".search-input").value;

  // wahh ini sih penemuan cuyyy, keren keren
  const array = pencarian.split(" ");
  console.log(array);
  const url = `https://api.themoviedb.org/3/search/person?query=${array
    .map((e) => {
      return e;
    })
    .join("+")}`;
  const init = konfigurasianjay();
  return fetch(url, init)
    .then((data) => {
      return data.json();
    })
    .then((dataJson) => {
      // nah nanti disini ita cek dan filter harus dibagi 4 agar pagenya bisa bgus
      if (dataJson.results.length % 2 !== 0) {
        dataJson.results.pop();
      }
      return dataJson.results;
    })
    .catch((err) => {
      console.log(`terjadi error : ${err}`);
    });
}

function konfigurasianjay() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDk2MDgyZjU2NTQ5Mzc4NTEzYzgxYjhmMWNiZGRiMyIsIm5iZiI6MTc0MTQ4OTg0NC4wMTUsInN1YiI6IjY3Y2QwNmI0YTRkZjk3ZGI5NjRmYTA5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fcw3AcCmPC6y1RN1mbk0foGUl9bmYqpYoDdHn9ZSUgk";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  return options;
}
