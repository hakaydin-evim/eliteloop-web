(function () {
  function getShareTitle() {
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && ogTitle.content) return ogTitle.content.trim();

    var articleTitle = document.querySelector("h1");
    if (articleTitle && articleTitle.textContent) return articleTitle.textContent.trim();

    return document.title.replace(/\s*\|\s*EliteLoop.*$/, "").trim();
  }

  function updateStatus(container, message, isSuccess) {
    var status = container.querySelector(".article-share__status");
    if (!status) return;

    status.textContent = message;
    status.classList.toggle("is-success", Boolean(isSuccess));
  }

  function attachShare(container) {
    var url = window.location.href;
    var title = getShareTitle();
    var shareText = title + " — " + url;

    container.querySelectorAll("[data-share-network]").forEach(function (node) {
      var network = node.getAttribute("data-share-network");
      var targetUrl = "";

      if (network === "x") {
        targetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);
      } else if (network === "linkedin") {
        targetUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
      } else if (network === "whatsapp") {
        targetUrl = "https://wa.me/?text=" + encodeURIComponent(shareText);
      }

      if (targetUrl) {
        node.setAttribute("href", targetUrl);
      }
    });

    var copyButton = container.querySelector("[data-share-copy]");
    if (copyButton) {
      copyButton.addEventListener("click", async function () {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
          } else {
            var fallback = document.createElement("input");
            fallback.value = url;
            document.body.appendChild(fallback);
            fallback.select();
            document.execCommand("copy");
            document.body.removeChild(fallback);
          }
          updateStatus(container, "Link copied. Ready to share.", true);
        } catch (error) {
          updateStatus(container, "Copy failed. You can still share with the buttons.", false);
        }
      });
    }

    var nativeShareButton = container.querySelector("[data-share-native]");
    if (nativeShareButton) {
      if (!navigator.share) {
        nativeShareButton.style.display = "none";
      } else {
        nativeShareButton.addEventListener("click", async function () {
          try {
            await navigator.share({ title: title, text: title, url: url });
          } catch (error) {
            if (error && error.name !== "AbortError") {
              updateStatus(container, "Native share could not open right now.", false);
            }
          }
        });
      }
    }
  }

  document.querySelectorAll("[data-article-share]").forEach(attachShare);
})();
