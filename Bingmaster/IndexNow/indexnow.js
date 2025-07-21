
window.addEventListener("DOMContentLoaded", function () {
  const indexNowURL = "https://www.bing.com/indexnow?url=" + encodeURIComponent(window.location.href) + "&key=2c551ea6ba90422cb715a280c6023eb7";
  fetch(indexNowURL)
    .then(response => console.log("IndexNow success:", response.status))
    .catch(error => console.warn("IndexNow failed:", error));
});
