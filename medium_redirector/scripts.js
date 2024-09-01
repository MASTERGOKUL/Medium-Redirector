document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("github_link").addEventListener("click", function () {
    redirect("github");
  });

  document.getElementById("readmedium").addEventListener("click", function () {
    redirect("readmedium");
  });

  document.getElementById("freedium").addEventListener("click", function () {
    redirect("freedium");
  });
});

function redirect(site) {
  (async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    var medium_full_link = tab.url; // normal window.location.href will not work
   
    var medium_link = medium_full_link.split("//");
    var medium_link = medium_link[1].split("/");
    if (site === "readmedium") {
      medium_link[0] = "readmedium.com";
      chrome.tabs.create({ url: "https://" + medium_link.join("/") }, function (newTab) {
       
        chrome.tabs.move(newTab.id, { index: tab.index + 1 }); // Move the new tab next to the current tab
      });
      // chrome.tabs.update(tab.id, { url: "https://" + medium_link.join("/")}); // normal window.location.href will not work
    } else if (site === "freedium") {
        medium_link[0] = "freedium.cfd";
        chrome.tabs.create({ url: "https://" + medium_link.join("/") }, function (newTab) {
          chrome.tabs.move(newTab.id, { index: tab.index + 1 });
        });
    }
    else if (site === "github") {
      chrome.tabs.create({ url: "https://github.com/mastergokul" }, function (newTab) {
        chrome.tabs.move(newTab.id, { index: tab.index + 1 });
      }); 
    }
  })();
}
