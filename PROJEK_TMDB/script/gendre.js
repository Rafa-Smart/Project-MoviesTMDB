document.addEventListener("click", async function (e) {
  if ((e.target.textContent.includes("More Detail"))) {
    const dataId = e.target.dataset.id;
    console.log(dataId);
    localStorage.setItem("DataId", dataId);
    if(e.target.value != "home.html")
    window.location.href = "../halaman/detail.html";
  }
});



document.querySelector(".genre-button").addEventListener("click", function (e) {
  cariFilm();
});

  const input = document.querySelector(".genre-pilih");
  input.addEventListener("keydown", function(e){
    if (event.key === "Enter" || event.keyCode === 13){
        cariFilm();
    }
  })

function cariFilm() {
  const input = document.querySelector(".genre-pilih").value;
  // ini buat menghapus container sebelumnya
  //  jadi setiap kali si user klik atau milih gendre maka constainer sebelumnya bakal dihpus dan ganti container yag nampilihn data barunya dari pilihan si user
  let containerLama = document.querySelector(".container-gendre");
  if (containerLama) {
    containerLama.remove();
  }

  const footer = document.querySelector("footer");
  const divKonten = document.createElement("div");
  divKonten.className = "container-gendre";

  // lemen parent dari footer (body)
  // ini nanti bsia aja langsung si bodynya
  const bapak = footer.parentNode;

  bapak.insertBefore(divKonten, footer);
  tampilKeLayar(input, divKonten);
}

async function tampilKeLayar(pilihan, divkonten) {
  const datahasilFecth = await ambilData(pilihan);
  let tes = "";
  datahasilFecth.forEach((e) => {
    tes += templateStringNya(e);
  });

  divkonten.innerHTML = tes;
}

function ambilData(data) {
  const config = konfigurasianjay();
  const request = new Request(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${data}`,
    config
  );
  return fetch(request)
    .then((dataJson) => {
      return dataJson.json();
    })
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.log(error);
    });
}

// ini gausah sebenrnya

// function dataGendre(namanya) {
//   const gendre = [
//     {
//       id: 28,
//       name: "Action",
//     },
//     {
//       id: 12,
//       name: "Adventure",
//     },
//     {
//       id: 16,
//       name: "Animation",
//     },
//     {
//       id: 35,
//       name: "Comedy",
//     },
//     {
//       id: 80,
//       name: "Crime",
//     },
//     {
//       id: 99,
//       name: "Documentary",
//     },
//     {
//       id: 18,
//       name: "Drama",
//     },
//     {
//       id: 10751,
//       name: "Family",
//     },
//     {
//       id: 14,
//       name: "Fantasy",
//     },
//     {
//       id: 36,
//       name: "History",
//     },
//     {
//       id: 27,
//       name: "Horror",
//     },
//     {
//       id: 10402,
//       name: "Music",
//     },
//     {
//       id: 9648,
//       name: "Mystery",
//     },
//     {
//       id: 10749,
//       name: "Romance",
//     },
//     {
//       id: 878,
//       name: "Science Fiction",
//     },
//     {
//       id: 10770,
//       name: "TV Movie",
//     },
//     {
//       id: 53,
//       name: "Thriller",
//     },
//     {
//       id: 10752,
//       name: "War",
//     },
//     {
//       id: 37,
//       name: "Western",
//     },
//   ];

//   return gendre.find((e) => {
//     if (e.name === namanya) {
//       return e.id;
//     }
//   });
// }

// jadi kalo poster_pathnya itu null, maka kita tidak akan menampilkan card-item-search
function templateStringNya(e) {
  return `
    ${
      e.poster_path
        ? `
        <div class="card-item-gendre">
          <img src="https://image.tmdb.org/t/p/original${
            e.poster_path
          }" alt="tidak tersedia">
          <div class="preview-film-gendre">
            <p class="preview-film-gendre-judul">
              ${e.title ? e.title : "judul tidak tersedia"}
            </p>
            <p class="preview-film-gendre-rilis">
              ${e.release_date ? e.release_date : "tahun tidak ada"} 
            <p class="preview-film-gendre-gendre">
                  Rating : ${e.vote_average} 
            </p>
            <button class="detail-gendre-film" data-id="${e.id}">
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
