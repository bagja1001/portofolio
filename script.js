document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.getElementById("emailLink");
  const emailAddress = "miftasubagja10@gmail.com";

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // Jika perangkat mobile, gunakan mailto
    emailLink.href = "mailto:" + emailAddress;
  } else {
    // Jika laptop/desktop, buka Gmail di browser
    emailLink.href =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + emailAddress;
    emailLink.target = "_blank"; // Buka di tab baru
  }
});

function showDetails(project) {
  // Sembunyikan semua detail proyek lainnya
  document.querySelectorAll(".details").forEach((detail) => {
    detail.classList.add("hidden");
  });

  // Tampilkan detail hanya untuk proyek yang diklik
  const details = project.querySelector(".details");
  details.classList.toggle("hidden");
}
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const responseText = document.getElementById("response");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Cek apakah SweetAlert2 sudah terhubung
      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Success!",
          text: "Thank you for your message!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        alert("SweetAlert2 tidak ditemukan!");
      }

      // Menampilkan teks dengan animasi
      responseText.classList.add("animate-pulse");

      setTimeout(() => {
        responseText.classList.remove("animate-pulse");
      }, 2000);
    });
  } else {
    console.error("Form kontak tidak ditemukan!");
  }
});

function showDetails(element) {
  let details = element.querySelector(".details");
  details.classList.toggle("hidden");
}
document.querySelector(".email-link").addEventListener("click", function () {
  window.location.href = "mailto:miftasubagja10@gmail.com";
});
