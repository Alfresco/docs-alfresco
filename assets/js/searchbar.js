function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

const autocompleteInput = (idInput, idMenu, idClear, onChanged) => {
  const inputElement = document.getElementById(idInput);
  const menuContainer = document.getElementById(idMenu);
  const clearButton = document.getElementById(idClear);
  const optionsContainer = menuContainer.querySelector(".dropdown-content");

  clearButton.addEventListener("click", (e) => {
    inputElement.value = "";
    inputElement.focus();
  });

  // special not deletable items on the top of result search
  const specialItems = optionsContainer.querySelectorAll(
    ".dropdown-item.special"
  );

  let dropdownIndex = 0;

  const _deleteResults = () => {
    // get all options
    const options = optionsContainer.querySelectorAll(".dropdown-item");

    // delete all except special items
    let i = options.length;
    while (i-- > specialItems.length) {
      _removeOptionHandlers(options[i]);
      options[i].remove();
    }
  };

  const _clickHandler = (e) => {};

  const _mousemoveHandler = (e) => {
    const target = e.currentTarget;
    const newIndex = parseInt(target.dataset.index);

    if (newIndex === dropdownIndex) return;

    const selected = optionsContainer.querySelectorAll(".dropdown-item");
    selected[dropdownIndex].classList.remove("is-active");

    dropdownIndex = newIndex;

    selected[dropdownIndex].classList.add("is-active");
  };

  const _addOptionHandlers = (n) => {
    n.addEventListener("click", _clickHandler);
    n.addEventListener("mousemove", _mousemoveHandler);
  };
  const _removeOptionHandlers = (n) => {
    n.removeEventListener("click", _clickHandler);
    n.removeEventListener("mousemove", _mousemoveHandler);
  };

  // set click handlers for special items and index data
  Array.from(specialItems).forEach((n, i) => {
    n.dataset.index = i;
    _removeOptionHandlers(n);
    _addOptionHandlers(n);
  });

  // from the start - first element is active
  specialItems[0].classList.add("is-active");

  const _changedHandler = (e) => {
    // get the input text
    const value = e.target.value;

    if (value.length) {
      clearButton.classList.remove("is-hidden");
    } else {
      clearButton.classList.add("is-hidden");
    }
    // be sure that menu is showed
    menuContainer.classList.add("is-active");

    // place content into special items
    Array.from(specialItems).forEach((n) => {
      n.href = n.dataset.url + encodeURIComponent(value);
      n.querySelector(".query").innerHTML = value;
    });

    onChanged(value, null, 5).then((answer) => {
      _deleteResults();

      // map results into menu options
      const result = answer.results;
      result
        .map(({ label, value, chapter }, i) => {
          const a = document.createElement("a");
          a.href = value;
          a.classList.add("dropdown-item");
          // a.innerText = label;

          const echapter = document.createElement("b");
          echapter.innerText = chapter;

          a.append(echapter);

          const etext = document.createElement("span");
          etext.innerText = label;

          a.append(etext);

          a.dataset.value = value;
          a.dataset.index = i + specialItems.length;
          _addOptionHandlers(a);
          return a;
        })
        .map((n) => {
          optionsContainer.appendChild(n);
        });

      // check dropdownIndex on out of bounds and fix if needed
      if (dropdownIndex >= result.length + specialItems.length) {
        dropdownIndex = result.length + specialItems.length - 1;
      }

      // set active option
      optionsContainer
        .querySelectorAll(".dropdown-item")
        [dropdownIndex].classList.add("is-active");
    });
  };

  const _keyboardHandler = (e) => {
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.code)) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (e.type !== "keyup") {
      return;
    }

    const oldIndex = dropdownIndex;

    const options = optionsContainer.querySelectorAll(".dropdown-item");

    const maxIndex = options.length;
    if (maxIndex === 0) return;

    if (e.code === "Enter") {
      const o = options[dropdownIndex];
      o.click();
    }

    if (e.code === "ArrowUp") dropdownIndex = Math.max(dropdownIndex - 1, 0);

    if (e.code === "ArrowDown")
      dropdownIndex = Math.min(dropdownIndex + 1, maxIndex - 1);

    if (oldIndex === dropdownIndex) return;

    options[oldIndex].classList.remove("is-active");
    options[dropdownIndex].classList.add("is-active");
  };

  inputElement.addEventListener("keyup", _keyboardHandler);
  inputElement.addEventListener("keydown", _keyboardHandler);
  inputElement.addEventListener("input", debounce(_changedHandler, 200));

  inputElement.addEventListener("focusout", (e) => {
    if (
      e.relatedTarget === null ||
      !e.relatedTarget.classList.contains("dropdown-item")
    ) {
      menuContainer.classList.remove("is-active");
    }
  });
  inputElement.addEventListener("focusin", _changedHandler);
};

const setupSearchBar = () => {
  ((localScopeHint, scope) => {
    if (!localScopeHint) return;
    if (!scope || !scope.product) {
      localScopeHint.remove();
      return;
    }

    const s = encodeURIComponent(
      `${scope.product}${scope.version ? "/" + scope.version : ""}`
    );

    localScopeHint.dataset.url += s + "/";
    localScopeHint.querySelector(".hint").innerHTML = `In: ${scope.product}`;
  })(document.getElementById("localscope"), window.searchScope);

  document.documentElement.style.setProperty("--search-bar", 0);
  const searchHolder = document.getElementById("searchbar-holder");

  if (!searchHolder) return;

  const searchToggler = document.getElementById("search-toggle");
  const searchClose = document.getElementById("search-close");
  const searchBack = document.getElementById("search-back");
  const escapeHandler = (e) => {
    if (e.code === "Escape") searchClose.click();
  };
  let oldScrollPos = window.pageYOffset;
  const scrollHandler = (e) => {
    var currentScrollPos = window.pageYOffset;
    if (oldScrollPos > currentScrollPos+30) {
      searchClose.click();
    }
    oldScrollPos = currentScrollPos;
  }

  // open search bar
  if (searchToggler) {
    searchToggler.onclick = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (searchHolder.classList.contains("is-active")) return;

      document.addEventListener("keyup", escapeHandler);
      oldScrollPos = window.pageYOffset
      window.addEventListener("scroll", scrollHandler)

      searchHolder.ontransitionend = (e) => {
        if (e.propertyName === "opacity") {
          document.getElementById("topsearch-input").focus();
        }
      };

      searchHolder.classList.add("is-active");

      // set margin for left side menu

      document.documentElement.style.setProperty(
        "--search-bar",
        searchHolder.getBoundingClientRect().height + "px"
      );
    };
  } else {
    searchHolder.classList.add("is-active");
    document.documentElement.style.setProperty(
      "--search-bar",
      searchHolder.getBoundingClientRect().height + "px"
    );
  }

  // close search bar
  if (searchClose)
    searchClose.onclick = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!searchHolder.classList.contains("is-active")) return;

      document.removeEventListener("keyup", escapeHandler);
      window.removeEventListener("scroll", scrollHandler)

      searchHolder.classList.remove("is-active");

      // remove margin for left side menu
      document.documentElement.style.setProperty("--search-bar", 0);
    };

  if (searchBack)
    searchBack.onclick = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      window.history.back();
    };
};
