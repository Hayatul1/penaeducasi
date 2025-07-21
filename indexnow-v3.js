(function () {
  try {
    const url = "https://www.bing.com/indexnow";
    const key = "a1527aefef5c4d62bec596081250ff9c";
    const target = location.href;
    const pingUrl = url + "?url=" + encodeURIComponent(target) + "&key=" + key;

    fetch(pingUrl)
      .then(function (response) {
        if (response.ok) {
          console.info("IndexNow success:", response.status);
        } else {
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
