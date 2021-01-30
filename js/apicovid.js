const baseUrl = "https://indonesia-covid-19.mathdro.id/api";
const baseUrl2 = "https://data.covid19.go.id/public/api/update.json";
const corsUrl = "https://cors-anywhere.herokuapp.com/";
//const token = "6acd4debffc449c7a96ed6b6a1f72120";
$(document).ready(() => {
  $(".preloader-wrapper").fadeOut(3000);
});
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
//ambil data 
function getData() {
  if ('caches' in window) {
    caches.match(`${baseUrl}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            let datasHTML = "";
            //data.forEach((datas) => {
                datasHTML += `
                <div class="row">
                  <div class="col s12">
                    <div class="card">
                      <div class="card-content light-blue">
                        <span class="card-title truncate">INDONESIA</span>
                        <div class="card-panel yellow accent-2">
                          <span class="black-text center">Confirmed : <p>${data.update.total.jumlah_positif}</p></span>
                        </div>
                        <div class="card-panel green accent-3">
                          <span class="black-text center">Recovered : <p>${data.update.total.jumlah_sembuh}</p></span>
                        </div>
                        <div class="card-panel red accent-4">
                          <span class="black-text center">Deaths : <p color=red>${data.update.total.jumlah_meninggal}</p></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
              //});
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = datasHTML;
          });
        }
      }
    )
  }
  fetch(`${corsUrl}`+${baseUrl2}`,{
    method: "GET",
    /*headers: {
      "X-Auth-Token": `${token}`
    }*/
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel match secara dinamis
      let datasHTML = "";
      //data.forEach((datas) => {
          datasHTML += `
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-content light-blue">
                    <span class="card-title truncate">Total Kumulatif</span>
                    <div class="card-panel yellow accent-2">
                      <span class="black-text center">Confirmed : <p>${data.update.total.jumlah_positif}</p></span>
                    </div>
                    <div class="card-panel green accent-3">
                      <span class="black-text center">Recovered : <p>${data.update.total.jumlah_sembuh}</p></span>
                    </div>
                    <div class="card-panel red accent-4">
                      <span class="black-text center">Deaths : <p color=red>${data.update.total.jumlah_meninggal}</p></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
       // });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = datasHTML;
    })
    .catch(error);
}

//ambil data top scorers
function getScorers() {
  if ('caches' in window) {
    caches.match(`${baseUrl}/provinsi`).then((response) => {
      if (response) {
        response.json().then((data) => {
            let scorersHTML = "";
            data.data.forEach((datas) => {
              scorersHTML += `
                <div class="row">
                  <div class="col s12">
                    <div class="card">
                      <div class="card-content light-blue">
                        <span class="card-title truncate"><a href="./team.html?id=" black-text>Prov. ${datas.provinsi}</a></span>
                        <div class="card-panel yellow accent-2">
                          <span class="black-text center">Confirmed : <p>${datas.kasusPosi}</p></span>
                        </div>
                        <div class="card-panel green accent-3">
                          <span class="black-text center">Recovered : <p>${datas.kasusSemb}</p></span>
                        </div>
                        <div class="card-panel red accent-4">
                          <span class="black-text center">Deaths : <p color=red>${datas.kasusMeni}</p></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = scorersHTML;
        });
      }
    })
  }
  fetch(`${baseUrl}/provinsi`,{
    method: "GET",
    /*headers: {
      "X-Auth-Token": `${token}`
    }*/
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel match secara dinamis
      let scorersHTML = "";
      data.data.forEach((datas) => {
        scorersHTML += `
          <div class="row">
            <div class="col s12">
              <div class="card">
                <div class="card-content light-blue">
                  <span class="card-title truncate black-text">Prov. ${datas.provinsi}</span>
                  <div class="card-panel yellow accent-2">
                    <span class="black-text center">Confirmed : <p>${datas.kasusPosi}</p></span>
                  </div>
                  <div class="card-panel green accent-3">
                    <span class="black-text center">Recovered : <p>${datas.kasusSemb}</p></span>
                  </div>
                  <div class="card-panel red accent-4">
                    <span class="black-text center">Deaths : <p color=red>${datas.kasusMeni}</p></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = scorersHTML;
    })
    .catch(error);
}

function getSavedArticles() {
    getAll().then((articles) => {
        console.log(articles);
        // Menyusun komponen card artikel secara dinamis
        let articlesHTML = "";
        articles.forEach((article) => {
            articlesHTML += `
              <div class="card">
                <a href="./team.html?id=${article.id}&saved=true">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img class="responsive-img" src="${article.crestUrl}" />
                    </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                </div>
              </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("body-content").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getSavedArticleById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    getById(idParam).then((article) => {
        articleHTML = '';
        let articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${article.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${article.name}</span>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
    })
    .catch(error);
}
