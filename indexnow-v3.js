(function () {
  try {
    var pingUrl = "https://www.bing.com/indexnow?url=" + encodeURIComponent(location.href) + "&key=a1527aefef5c4d62bec596081250ff9c";

    fetch(pingUrl, { mode: "no-cors" })
      .then(function () {
        console.log("IndexNow ping sent (no-cors)");
      })
      .catch(function (error) {
        console.warn("Ping error:", error);
      });
  } catch (e) {
    console.error("IndexNow script error:", e);
  }
})();
