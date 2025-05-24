
// ini bauat ketika nanti di klik maka bakalan masuk ke detial
document.addEventListener("click", function (e){
  if(e.target.className.includes("detail-film")){
    const dataId = e.target.dataset.id;
    localStorage.setItem("DataId", dataId);
    if(e.target.value != "/index.html"){
      window.location.href = "detail.html";
    }
  }
})

document.addEventListener("DOMContentLoaded", async function () {
  const datadariapi = await ambilDatatopRating();
  console.log(datadariapi);
  tampilData(datadariapi);
  nambahPageKelayar();
});

// buat si pagenya

document.addEventListener("click", async function (e) {
  if (e.target.className.includes("button-page")) {
    let data = await ambilDatatopRating(e.target.dataset.page);
    tampilData(data);
    nambahPageKelayar();
  }
});

function nambahPageKelayar() {
  let container = document.querySelector(".container-topRating");
  let pagenya = page();
  container.appendChild(pagenya);
}

function tampilData(data) {
  let container = document.querySelector(".container-topRating");
  let dataKosong = "";
  data.forEach((e) => {
    dataKosong += templateStringData(e);
  });

  container.innerHTML = dataKosong;
}

function ambilDatatopRating(page = null) {
  const confignya = konfigurasianjay();
  let url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
    page ? page : 1
  }`;
  const request = new Request(url, confignya);
  return fetch(request)
    .then((dataString) => {
      return dataString.json();
    })
    .then((dataJson) => {
      return dataJson.results;
    })
    .catch((err) => {
      console.log("error -> ", err);
    });
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

  return div;
}

function templateStringData(e) {
  return `
    ${
      e.poster_path
        ? `
      <div class="card-item">
              <img 
              loading="lazy"
              src="https://image.tmdb.org/t/p/original${
                e.poster_path
              }" alt="Poster topRating">
              <div class="preview-topRating">
                <p class="preview-judul">
                  ${e.title ? e.title : "tidak bernama"}
                </p>
                <p class="preview-rilis">
                  ${e.release_date}
                </p>
                <p class="preview">
                      Rating : ${e.vote_average}
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
