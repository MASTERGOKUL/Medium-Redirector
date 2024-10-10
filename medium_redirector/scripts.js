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

function redirect(site){
  var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") > -1) {
      return "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    redirect_chrome(site);
  } else if (userAgent.indexOf("Firefox") > -1) {
    redirect_firefox(site);
  } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
      return "Opera";
  } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
      return "Internet Explorer";
  }
}

function redirect_chrome(site) {
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



function redirect_firefox(site) {
  (async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    var medium_full_link = tab.url; // normal window.location.href will not work
   
    var medium_link = medium_full_link.split("//");
    var medium_link = medium_link[1].split("/");
    if (site === "readmedium") {
      medium_link[0] = "readmedium.com";
      browser.tabs.create({ url: "https://" + medium_link.join("/") }, function (newTab) {
       
        browser.tabs.move(newTab.id, { index: tab.index + 1 }); // Move the new tab next to the current tab
      });
      // browser.tabs.update(tab.id, { url: "https://" + medium_link.join("/")}); // normal window.location.href will not work
    } else if (site === "freedium") {
        medium_link[0] = "freedium.cfd";
        browser.tabs.create({ url: "https://" + medium_link.join("/") }, function (newTab) {
          browser.tabs.move(newTab.id, { index: tab.index + 1 });
        });
    }
    else if (site === "github") {
      browser.tabs.create({ url: "https://github.com/mastergokul" }, function (newTab) {
        browser.tabs.move(newTab.id, { index: tab.index + 1 });
      }); 
    }
  })();
}
