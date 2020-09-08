(function () {
  // search bar

  ((localScopeHint, scope) => {
    if (!localScopeHint) return;
    if (!scope) return;

    const s = encodeURIComponent(`${scope.product}/${scope.version}`);

    localScopeHint.dataset.url += s + "/";
    localScopeHint.querySelector(".hint").innerHTML = `In: ${scope.product}`;
  })(document.getElementById("localscope"), window.searchScope);

  setupSearchBar();

  autocompleteInput(
    "topsearch-input",
    "topsearch-dropdown-content",
    "topsearch-clear",
    requestSearchResults
  );
  // customelements
  customElements.define("alfresco-contenttabs", ContentTabs);
  customElements.define("alfresco-tooltip", Tooltip);
  customElements.define("alfresco-searchresults", SearchResults);

  // tooltips
  document.addEventListener("touchstart", (e) => dismissAllTooltips(e));

  // initial scrolling

  function getElementY(el) {
    return window.pageYOffset + el.getBoundingClientRect().top;
  }
  function doScrolling(elementY, duration) {
    var startingY = window.pageYOffset;
    var diff = elementY - startingY;
    var start;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var time = timestamp - start;
      var percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }

  const initialHashCheck = () => {
    if (location.hash) {
      const hash = /^#([^\/]*)\/?((?:[^\/]+\/?)+)?$/.exec(location.hash);
      const id = hash[1];
      const sub = hash[2];

      if (!id) return;

      const obj = document.getElementById(id);
      if (!obj) return;

      if (obj.initialRequest) {
        const doScroll = obj.initialRequest(sub);
        if (doScroll) {
          doScrolling(getElementY(obj), 1000);
        }
      }
    }
  };

  initialHashCheck();

  hljs.initHighlightingOnLoad();

  // code copy button

  (() => {
    const codeTags = document.querySelectorAll("pre > code");

    const template = `<button class="button"><span class="icon is-small"><i class="copy-icon"></i></span></button>`;

    Array.from(codeTags).forEach((c) => {
      const preTag = c.parentElement;
      const copyContainer = document.createElement("div");
      copyContainer.innerHTML = template;
      copyContainer.classList.add("copy-pane");

      const btn = copyContainer.querySelector("button");
      btn.addEventListener("click", (e) => {
        var el = document.createElement("textarea");
        el.value = c.textContent;
        document.body.appendChild(el);
        el.style.display = "block";

        // select the entire textblock
        if (window.document.documentMode)
          el.setSelectionRange(0, el.value.length);
        else el.select();

        // copy to clipboard
        document.execCommand("copy");

        // clean up element
        document.body.removeChild(el);

        btn.classList.add("is-happy");
        if (btn.dataset.switchtimer) {
          clearTimeout(parseInt(btn.dataset.switchtimer));
          btn.dataset.switchtimer = "";
        }
        btn.dataset.switchtimer = setTimeout(() => {
          btn.classList.remove("is-happy");
        }, 1000);
      });

      preTag.prepend(copyContainer);
    });
  })();

  // left side menu
  ((leftmenu) => {
    if (!leftmenu) return;

    const treeSelect = (li, ...classes) => {
      const parent = li.closest("#leftside-menu li");
      if (!parent) return;

      parent.classList.add(...classes);
      treeSelect(li.parentElement, ...classes);
    };

    const selected = leftmenu.querySelector("li.is-selected");
    if (selected) treeSelect(selected, "is-selected", "is-expanded");

    Array.from(leftmenu.querySelectorAll(".expand-button")).forEach((p) => {
      const li = p.closest("li");
      const ul = li.querySelector("ul");
      const height = ul.getBoundingClientRect().height;
      ul.style.setProperty("--max-height", height + "px");
      p.addEventListener("click", (e) => {
        li.classList.toggle("is-expanded");
      });
    });
    leftmenu.style.setProperty("--min-height", "0px");
    leftmenu.classList.add("is-ready-fade");
  })(document.getElementById("leftside-menu"));

  // rating bar
  ((rating) => {
    if (!rating) return;
    ["thumb-down", "thumb-up"].forEach((b) => {
      const btn = rating.querySelector(`button[id=${b}]`);
      btn.addEventListener("click", (e) => {
        rating.dataset.toggled = b == rating.dataset.toggled ? "none" : b;
      });
    });
  })(document.querySelector(".content-rating"));

  // version selector
  ((versionSelector) => {
    if (!versionSelector) return;
    const focusHandler = (e) => versionSelector.classList.toggle("is-active");
    const btn = versionSelector.querySelector("button");

    btn.addEventListener("focus", focusHandler);
    btn.addEventListener("blur", focusHandler);
  })(document.getElementById("version-selector"));
})();
