document.addEventListener("click", async function (e) {
  if ((e.target.className == "detail-trending-film")) {
    const dataId = e.target.id;
    console.log(dataId);
    localStorage.setItem("DataIdDetail", dataId);
    if(e.target.value != "index.html")
    window.location.href = "detail_2.html";
    console.log(dataId)
  }
});
document.addEventListener("DOMContentLoaded", async function () {
  const id = localStorage.getItem("DataId2");
//   localStorage.removeItem("DataId2");
  if (id) {
      console.log(id);
      const dataHasil = await ambilDataDariID(id);
      displayData(dataHasil);
  } else {
    const body = document.querySelector("body");
    body.textContent = "Data ID tidak ditemukan";
  }
});




function displayData(datanya) {
  const div = document.querySelector(".konten");
  div.innerHTML = "";
  let hasil = "";
  hasil = templateStringNya(datanya);
  div.innerHTML = hasil;
}

function ambilDataDariID(id) {
  const init = konfigurasianjay();
  const url = `https://api.themoviedb.org/3/person/${id}?append_to_response=combined_credits,external_ids,images,tagged_images`;

  return fetch(url, init)
    .then((dataMentah) => {
      if (!dataMentah.ok) {
        throw new Error(dataMentah.status);
      }
      return dataMentah.json();
    })
    .then((dataJson) => {
      return dataJson;
    })
    .catch((err) => {
      console.log(`error mengambil data : ${err.message}`);
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

function templateStringNya(e) {
  let data = e.combined_credits.cast;
  const dataCumaTiga = data.slice(0, 3);

  return `
    ${
      e.profile_path
        ? `      <div class="container-actor">
        <div class="actor-header">
          <div class="actor-profile">
            <img
              src="https://image.tmdb.org/t/p/original${e.profile_path}"
              alt="Actor Photo"
              class="actor-photo"
            />

            <div class="actor-info">
              <h1 class="actor-name">${e.name}.</h1>
              <div class="actor-meta">
                <p><span class="judul-data">birthday : </span> ${e.birthday}</p>
                <p>
                  <span class="judul-data">gender : </span>${
                    e.gender === 2 ? `a Man` : "a Women"
                  }
                </p>
                <p>
                  <span class="judul-data">place of birth :</span> ${
                    e.place_of_birth
                  }
                </p>
                <p>
                  <span class="judul-data">popularity :</span> ${e.popularity}
                </p>
                <p>
                  <span class="judul-data"
                    >homepage :
                    <a class="linknya" href="${e.homepage}"
                      >official Website</a
                    ></span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="garis"></div>

        <div class="actor-details">
          <div class="actor-bio">
            <h2 class="bagian-2">Biography</h2>
            <p class="bio">${e.biography}...</p>
          </div>
          <br />
        </div>

        <div class="garis"></div>

        <div class="actor-movies">
        <h2 class="bagian-2">Popular Films</h2>
          <div class="konten-film-nya">
            
            ${dataCumaTiga.map((data) => {
              return `
                    <div class="card-item-trending">
              <img
                loading="lazy"
                src="https://image.tmdb.org/t/p/original${data.poster_path}"
                alt="Poster Film"
              />
              <div class="preview-film-trending">
                <p class="preview-film-trending-judul">
                  ${data.original_title}
                </p>
                <button class="detail-trending-film" id="${data.id}">
                  Detail Film
                </button>
              </div>
            </div>
                `;
            }).join("")}


          </div>
        </div>
      </div>
`
        : "<div>data tidak teredia</div>"
    }
    `;
}
