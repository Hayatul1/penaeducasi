
(function() {
  var base = "https://www.bing.com/indexnow?url=" + encodeURIComponent(location.href);
  var key = "a1527aefef5c4d62bec596081250ff9c";
  fetch(base + "&" + "key=" + key).then(function(response) {
    if (!response.ok) {
      console.warn("IndexNow ping failed:", response.status);
    }
  }).catch(function(error) {
    console.error("IndexNow error:", error);
  });
})();
