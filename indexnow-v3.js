(function () {
  try {
    var url = "https://www.bing.com/indexnow";
    var key = "a1527aefef5c4d62bec596081250ff9c";
    var target = window.location.href;

    var pingUrl = url + "?url=" + encodeURIComponent(target) + "&key=" + key;

    fetch(pingUrl, { mode: "no-cors" })
      .then(function () {
        console.log("IndexNow ping sent silently");
      })
      .catch(function (error) {
        console.warn("IndexNow ping failed silently:", error);
      });
  } catch (e) {
    console.error("IndexNow script error:", e);
  }
})();
