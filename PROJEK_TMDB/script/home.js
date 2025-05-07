

document.addEventListener("DOMContentLoaded", async function () {
  const divKontenTrending = document.querySelector(".konten-trending");
  const divkontenPopular = document.querySelector(".konten-most-popular");
  const divKontenRating = document.querySelector(".konten-rating");
  const { results:resultPopular } = await ambilDataPopular();
  const { results:resultTrending } = await ambilDataTrending();
  const { results:resultRating } = await ambilDataRating();
  displayKontenTrending(divKontenTrending, resultTrending);
  displayKontenRating(divKontenRating, resultRating);
  displayKontenPopular(divkontenPopular, resultPopular);
});

// ini buat tombol detail
document.addEventListener("click", async function (e) {
  if ((e.target.textContent.includes("More Detail"))) {
    const dataId = e.target.dataset.id;
    console.log(dataId);
    localStorage.setItem("DataId", dataId);
    if(e.target.value != "home.html")
    window.location.href = "../halaman/detail.html";
  }
});

function displayKontenTrending(divKonten, data) {
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStrinTrending(e);
  });
  divKonten.innerHTML = hasil;
}

function templateStrinTrending(e) {
  return `
  ${e.poster_path ? `
    <div class="card-item-trending">
            <img 
            loading="lazy"
            src="https://image.tmdb.org/t/p/original${
              e.poster_path
            }" alt="Poster Film">
            <div class="preview-film-trending">
              <p class="preview-film-trending-judul">
                ${e.title ? e.title : "judul tidak tersedia"}
              </p>
              <p class="preview-film-trending-rilis">
                ${e.release_date ? e.release_date : "tahun tidak ada"}
              </p>
              <p class="preview-film-trending-rating">
                    Rating : ${e.vote_average}
              </p>
              <button class="detail-trending-film" data-id="${e.id}">
                More Detail 
              </button>
            </div>
          </div>
  ` : ""} 
    `;
}

function ambilDataTrending() {
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
  const init = konfigurasianjay();
  return fetch(url, init)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error : ${response.status}`);
      }
      return response.json();
    })
    .then((responeJson) => {
      return responeJson;
    })
    .catch((err) => {
      console.log(`error mengambil datanyah : ${err.message}`);
    });
}


function displayKontenPopular(divKonten, data) {
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStrinPopular(e);
  });
  divKonten.innerHTML = hasil;
}

function ambilDataPopular(){
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
  const init = konfigurasianjay();
  return fetch(url, init)
  .then((response) => {
    if(!response.ok){
      throw new Error(`http error : ${response.status}`);
    }
    return response.json()
  })
  .then((responseJson) => {
    return responseJson
  })
  .catch((err) => {
    console.log(`error mengambil datanyah : ${err.message}`);
  })
}


function templateStrinPopular(e) {
  return `
  ${e.backdrop_path ? `
      <div class="card-item-popular">
            <img 
            loading="lazy"
            src="https://image.tmdb.org/t/p/original${e.backdrop_path}" alt="Poster Film">
            <div class="preview-film-popular">
              <p class="preview-film-popular-judul">
                ${e.original_title ? e.original_title : "judul tidak tersedia"}
              </p>
              <p class="preview-film-popular-rilis">
                ${e.release_date ? e.release_date : "tahun tidak ada"}
              </p>
              <button class="detail-popular-film" data-id="${e.id}">
                More Detail 
              </button>
            </div>
          </div>
  ` : ""}
  `
}

function ambilDataRating(){
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`
  const init = konfigurasianjay();
  return fetch(url, init)
  .then((response) => {
    if(!response.ok){
      throw new Error(`http error : ${response.status}`);
    }
    return response.json()
  })
  .then((responseJson) => {
    return responseJson
  })
  .catch((err) => {
    console.log(`error mengambil datanyah : ${err.message}`);
  })

}

function templateStrinRating(e) {
  return `
  ${e.poster_path ? `
      <div class="card-item-rating">
            <img 
            loading="lazy"
            src="https://image.tmdb.org/t/p/original${
              e.poster_path
            }" alt="Poster Film">
            <div class="preview-film-rating">
              <p class="preview-film-rating-judul">
                ${e.title ? e.title : "judul tidak tersedia"}
              </p>
              <p class="preview-film-rating-rilis">
                ${e.release_date ? e.release_date : "tahun tidak ada"}
              </p>
              <p class="preview-film-rating-rating">
                    Rating : ${e.vote_average}
              </p>
              <button class="detail-rating-film" data-id="${e.id}">
                More Detail 
              </button>
            </div>
          </div>
  ` : `<h1 style="margin-top: 500px;">tidak ada data </h1>`} 
    `;
}

function displayKontenRating(divKonten, data) {
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStrinRating(e);
  });
  divKonten.innerHTML = hasil;
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


