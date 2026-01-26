document.addEventListener("DOMContentLoaded", function() {
  var content = document.querySelector(".post-body");
  if (!content) return;

  var parts = content.innerHTML.split("<!--nextpage-->");
  if (parts.length <= 1) return;

  var urlParams = new URLSearchParams(window.location.search);
  var currentPage = parseInt(urlParams.get("page")) || 1;
  if (currentPage > parts.length) currentPage = parts.length;

  content.innerHTML = parts[currentPage - 1];

  // Buat elemen pagination
  var pagination = document.createElement("div");
  pagination.className = "post-pagination";
  pagination.style.textAlign = "center";
  pagination.style.marginTop = "30px";
  pagination.style.fontSize = "16px";

  // Tambahkan label "Halaman:"
  var label = document.createElement("span");
  label.textContent = "Halaman: ";
  label.style.fontWeight = "bold";
  label.style.marginRight = "8px";
  pagination.appendChild(label);

  // Tambahkan link nomor halaman
  for (let i = 1; i <= parts.length; i++) {
    let link = document.createElement("a");
    link.href = "?page=" + i;
    link.textContent = i;
    link.style.margin = "0 5px";
    link.style.textDecoration = "none";
    link.style.padding = "5px 10px";
    link.style.border = "1px solid #ccc";
    link.style.borderRadius = "5px";
    link.style.color = (i === currentPage) ? "#fff" : "#333";
    link.style.backgroundColor = (i === currentPage) ? "#007bff" : "#f9f9f9"; 
    link.style.fontWeight = (i === currentPage) ? "bold" : "normal";
    pagination.appendChild(link);
  } 

  // Tombol “Selanjutnya”
  if (currentPage < parts.length) {
    let next = document.createElement("a");
    next.href = "?page=" + (currentPage + 1);
    next.textContent = "Selanjutnya »";
    next.style.marginLeft = "10px";
    next.style.textDecoration = "none";
    next.style.padding = "5px 10px";
    next.style.border = "1px solid #ccc";
    next.style.borderRadius = "5px";
    next.style.backgroundColor = "#f9f9f9";
    next.style.color = "#333";
    pagination.appendChild(next);
  }

  content.parentNode.appendChild(pagination);
});