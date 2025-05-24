
const buttonSearch = document.querySelector(".search-button");
buttonSearch.addEventListener("click", async function () {
  console.log("searching...");
  searchFilm();
});
// https://api.themoviedb.org/3/search/movie?query=${query}
const dataPencarian = document.querySelector(".search-input");
dataPencarian.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault(); // Mencegah perilaku default form
    searchFilm();
  }
});

async function searchFilm() {

  // ini buat menghapus container sebelumnya
  let containerLama = document.querySelector(".container-search");
  if (containerLama) {
    containerLama.remove();
  }


  const footer = document.querySelector("footer");
  const divKonten = document.createElement("div");
  divKonten.className = "container-search";

  // lemen parent dari footer (body)
  // ini nanti bsia aja langsung si bodynya
  const bapak = footer.parentNode;

  bapak.insertBefore(divKonten, footer);
  const dataPencarian = document.querySelector(".search-input").value;
  const { results } = await ambilDataSearch(dataPencarian);
  displayKontenSearch(divKonten, results);
}

document.addEventListener("click", async function (e) {
  if (e.target.textContent.includes("More Detail")) {
    const dataId = e.target.dataset.id;
    console.log(dataId);
    localStorage.setItem("DataId", dataId);
    window.location.href = "detail.html";
  }
});

function displayKontenSearch(divKonten, data) {
  let hasil = "";
  data.forEach((e) => {
    hasil += templateStringNya(e);
  });
  divKonten.innerHTML = hasil;
}

function ambilDataSearch(pencarian) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${pencarian}`;
  const init = konfigurasianjay();
  return fetch(url, init)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error : ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((err) => {
      console.log(`error mengambil datanyah : ${err.message}`);
    });
}


// ini keren banget, penemuan,
// jadi kalo poster_pathnya itu null, maka kita tidak akan menampilkan card-item-search
function templateStringNya(e) {
  return `
    ${e.poster_path ? `
        <div class="card-item-search">
          <img src="https://image.tmdb.org/t/p/original${
            e.poster_path
          }" alt="tidak tersedia">
          <div class="preview-film-search">
            <p class="preview-film-search-judul">
              ${e.title ? e.title : "judul tidak tersedia"}
            </p>
            <p class="preview-film-search-rilis">
              ${e.release_date ? e.release_date : "tahun tidak ada"} 
            <p class="preview-film-search-search">
                  Rating : ${e.vote_average} 
            </p>
            <button class="detail-search-film" data-id="${e.id}">
              More Detail 
            </button>
          </div>
        </div>
    ` : ""}  
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
