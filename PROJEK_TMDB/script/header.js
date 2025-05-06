document.querySelector(".navbar-item-select").addEventListener('change', function(e) {
    // if (this.value) {
    //   window.location.href = this.value;
    // }
    if(e.target.value){
      window.location.href = e.target.value;
    }
  });

  document.getElementById("buttonKomentar").addEventListener("click", function () {
    alert("terkirim. terima kasih sudah berkomentar");
    window.location.reload();
  })