document.addEventListener('DOMContentLoaded', async () => {
    // Ambil ID dari localStorage
    const id = localStorage.getItem('DataId');
    
    // Bersihkan localStorage setelah digunakan
    // localStorage.removeItem('DataId');
    
    if (id) {
        const data = await ambildataDariId(id)
        console.log(data)
        console.log(id)
        displayDetail(data)
        tesLimitDiv()
    } else {
        const body = document.querySelector("body")
        body.textContent = "Data ID tidak ditemukan"
    }
});

function tesLimitDiv() {
    const maxCount = 3;
    const container = document.querySelector(".production");
    if (!container) return;
    
    // Dapatkan semua div anak langsung (bukan turunan lebih dalam)
    const childDivs = container.querySelectorAll(':scope > div');
    // const childDivs = container.querySelectorAll('.procuction > div');
    
    // Jika jumlah div melebihi batas
    if (childDivs.length > maxCount) {
      // Loop mulai dari div ke-4 (indeks 3) sampai terakhir
      for (let i = maxCount; i < childDivs.length; i++) {
        container.removeChild(childDivs[i]); // i nya disini jadi 3, dan jadi 4, 4, 5, dst
      }
    }
  }



function ambildataDariId(dataId){
    const init = konfigurasianjay()
    return fetch(`https://api.themoviedb.org/3/movie/${dataId}?language=en-US`, init) 
    .then((response) => {
        if(!response.ok){
            throw new Error(`error http status : ${response.status}`)
        }
        return response.json()
    })
    .then((responseJson) => {
        return responseJson
    })
    .catch((err) => {
        console.log(`error mengambil data : ${err.message}`)
    })
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
    };
    return options;
  }

  function displayDetail(data){
    const div = document.querySelector(".konten")
    div.innerHTML = ""
    let hasil = "";
    hasil = templateStrinNya(data)
    div.innerHTML = hasil;
  }


  function templateStrinNya(e){
    return `
    ${e.backdrop_path ? `
        <div class="container">
        <img src="https://image.tmdb.org/t/p/original${e.backdrop_path}" alt="tidak ada" class="container-img">
        <h1 class="container-judul-film">
            ${e.original_title}
        </h1>
        <div class="keterangan-preview">
            <p class="tanggal">${e.release_date}&nbsp;&nbsp;&nbsp;</p>
            <p class="gendre"> • &nbsp;&nbsp;&nbsp;${e.genres.map(data => {
                return `
                    ${data.name}
                `
            }).join(" - ")}&nbsp;&nbsp;&nbsp;</p>
            <p class="waktu"> • &nbsp;&nbsp;&nbsp;${e.runtime} Min</p>
        </div>
        <div class="hitam"></div>
        <div class="container-bagian-2">
            <img src="https://image.tmdb.org/t/p/original${e.poster_path}" alt="tidak ada" class="container-img-2">
            <div class="container-bagian-2-kanan">
                <center><p class="tagline"><i>"${e.tagline}"</i></p></center>
                <h2 class="overview">Overview :</h2>
                <p class="ringkasan">${e.overview}</p>
                <div class="ringkasan-detail">
                    <p class="ringksan-detail-p" style="margin-top: 5%; font-weight: 700;  color: #01b4e4; font-size: 1.3rem;">
                        Production Companies :
                    </p>
                    <br>
                    <div class="production">
                    ${e.production_companies.map(data => {
                        return `
                            <div class="item-product">
                            <img src="https://image.tmdb.org/t/p/original${data.logo_path ? `${data.logo_path}` : "/rPnEeMwxjI6rYMGqkWqIWwIJXxi.png"}" alt="No more" class="item-product-img">
                            <p class="nama-product">
                                ${data.name}
                            </p>
                        </div>
                        `
                    }).join("")}
                        
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="hitam2"></div>
        <div class="hitam3"></div> 
        <div class="bagian-bawah">
            <p style="margin-bottom: 3%;" id="adict">Adictional Information :</p>
            <div class="bagian-bawah-1">
                <p class="budget">Budget : <br><span class="budget2">$ ${e.budget.toLocaleString("id-ID")}</span></p>
                <p class="revenue"> Revenue : <br><span class="revenue2">$ ${e.revenue.toLocaleString("id-ID")}</span></p>
                <p class="penonton">Views : <br><span class="penonton2">${e.popularity}</span></p>
                <p class="status"> Status : <br><span class="status2">${e.status}</span></p>
            </div>
        </div>
    </div>
    ` :"<div>data tidak tersedia</div>"}
    `
}





//     <div class="container">
//         <img src="https://image.tmdb.org/t/p/original${e.backdrop_path}" alt="tidak ada" class="container-img">
//         <h1 class="container-judul-film">
//             ${e.original_title}
//         </h1>
//         <div class="keterangan-preview">
//             <p class="tanggal">${e.release_date}&nbsp;&nbsp;&nbsp;</p>
//             <p class="gendre"> • &nbsp;&nbsp;&nbsp;${e.genres.map(element => {
//                 return `${element.name}`
//             }).join(" - ")}&nbsp;&nbsp;&nbsp;</p>
//             <p class="waktu"> • &nbsp;&nbsp;&nbsp;${e.runtime} Min</p>
//         </div>
//         <div class="hitam">

//         </div>
//         <div class="container-bagian-2">
//             <img src="https://image.tmdb.org/t/p/original${e.poster_path}" alt="tidak ada" class="container-img-2">
//             <div class="container-bagian-2-kanan">
//                 <center><p class="tagline"><i>"${e.tagline}"</i></p></center>
//                 <h2 class="overview">Overview :</h2>
//                 <p class="ringkasan">${e.overview}.</p>
//                 <div class="ringkasan-detail">
//                     <p class="ringksan-detail-p" style="margin-top: 5%; font-weight: 700;  color: #01b4e4;">
//                         Production Companies :
//                     </p>
//                     <br>
//                     <div class="production">
//                         ${e.production_companies.map((element2) => {
//                             return `
//                                 <div class="item-product">
//                                     <img src="https://image.tmdb.org/t/p/original${element2.logo_path ? element2.logo_path:"no more"}" alt="no more" class="item-product-img">
//                                     <p class="nama-product">
//                                         ${element2.name}
//                                     </p>
//                                 </div>
//                             `
//                         }).join("")}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="hitam2">

//         </div>
//         <div class="hitam3"></div> 
//         <div class="bagian-bawah">
//             <p style="margin-bottom: 3%;">Adictional Information :</p>
//             <div class="bagian-bawah-1">
//                 <p class="budget">Budget : <br><span class="budget2">${e.budget}</span></p>
//                 <p class="revenue"> Revenue : <br><span class="revenue2">${e.revenue}</span></p>
//                 <p class="penonton">Views : <br><span class="penonton2">${e.popularity}</span></p>
//                 <p class="status"> Status : <br><span class="status2">${e.status}</span></p>
//             </div>
//         </div>
//    </div>