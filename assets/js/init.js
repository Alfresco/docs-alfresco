(function () {
  // search bar
  const requestSearchResults = function (searchQuery) {
    const lowered = searchQuery.toLowerCase();
    return fetch(
      "https://cdn.rawgit.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json"
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (states) {
        return states.filter(function (state) {
          return state.name.toLowerCase().startsWith(lowered);
        });
      })
      .then(function (filtered) {
        return filtered.map(function (state) {
          return { label: state.name, value: state.abbreviation };
        });
      })
      .then(function (transformed) {
        return transformed.slice(0, 5);
      });
  };

  setupSearchBar(requestSearchResults);

  const onSelect = function (state) {
    console.log(state);
    // alert(`query: ${state.label}, id: ${state.value}, scope: ${state.special}`);
    window.location.href = `http://google.com/search?q=query: ${state.label}, id: ${state.value}, scope: ${state.special}`;
  };

  autocompleteInput(
    "topsearch-input",
    "topsearch-dropdown-content",
    "topsearch-clear",
    requestSearchResults,
    onSelect,
    200
  );
  // customelements
  customElements.define("alfresco-contenttabs", ContentTabs);
  customElements.define("alfresco-tooltip", Tooltip);

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

      console.log(id, sub);

      if (!id) return;

      const obj = document.getElementById(id);
      console.log(obj);
      if (!obj) return;

      doScrolling(getElementY(obj), 1000);

      if (obj.initialRequest) obj.initialRequest(sub);
    }
  };

  hljs.initHighlightingOnLoad();

  initialHashCheck();

  function addPreCopy() {
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
      console.log(preTag);
    });
  }
  addPreCopy();
})();
