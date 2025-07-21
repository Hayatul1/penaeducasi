(function () {
  try {
    var url = "https://www.bing.com/indexnow";
    var key = "a1527aefef5c4d62bec596081250ff9c";
    var target = location.href;

    var fullUrl = url + "?url=" + encodeURIComponent(target) + "&key=" + key;

    fetch(fullUrl)
      .then(function (response) {
        if (!response.ok) {
          console.warn("IndexNow ping failed:", response.status);
        }
      })
      .catch(function (error) {
        console.error("IndexNow request error:", error);
      });
  } catch (e) {
    console.error("IndexNow script error:", e);
  }
})();
