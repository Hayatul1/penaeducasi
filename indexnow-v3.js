(function () {
  try {
    var bingEndpoint = "https://www.bing.com/indexnow";
    var key = "a1527aefef5c4d62bec596081250ff9c";
    var currentURL = location.href;

    var pingURL = bingEndpoint + "?url=" + encodeURIComponent(currentURL) + "&key=" + key;

    fetch(pingURL)
      .then(function (response) {
        if (!response.ok) {
          console.warn("IndexNow ping failed:", response.status);
        } else {
          console.log("IndexNow ping success:", response.status);
        }
      })
      .catch(function (error) {
        console.error("IndexNow request error:", error);
      });
  } catch (e) {
    console.error("IndexNow script error:", e);
  }
})();
