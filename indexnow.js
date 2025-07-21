
window.addEventListener("DOMContentLoaded", function () {
  const indexNowURL = "https://www.bing.com/indexnow?url=" + encodeURIComponent(window.location.href) + "&key=a1527aefef5c4d62bec596081250ff9c";
  fetch(indexNowURL)
    .then(response => console.log("IndexNow success:", response.status))
    .catch(error => console.warn("IndexNow failed:", error));
});
