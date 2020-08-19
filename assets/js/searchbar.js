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

const autocompleteInput = (idInput, idMenu, idClear, onChanged, onSelect) => {
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

  // callback
  const _setValue = (label, value, special) => {
    inputElement.value = label;
    if (onSelect) {
      onSelect({ label, value, special });
    }

    _deleteResults();
    menuContainer.classList.remove("is-active");
    dropdownIndex = 0;
    clearButton.classList.add("is-hidden");
  };

  const _clickHandler = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const index = parseInt(target.dataset.index);

    if (index < specialItems.length) {
      var label = target.querySelector(".query").innerText;
      var value = target.dataset.value;
      _setValue(label, null, value);
    } else {
      var label = target.text;
      var value = target.dataset.value;
      _setValue(label, value);
    }
  };

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
    Array.from(specialItems).forEach(
      (n) => (n.querySelector(".query").innerHTML = value)
    );

    onChanged(value).then((result) => {
      _deleteResults();

      // map results into menu options
      result
        .map(({ label, value }, i) => {
          const a = document.createElement("a");
          a.href = "#";
          a.classList.add("dropdown-item");
          a.innerText = label;
          a.dataset.value = value;
          a.dataset.index = i + specialItems.length;
          _addOptionHandlers(a);
          return a;
        })
        .map((n) => {
          optionsContainer.appendChild(n);
        });

      // check dropdownIndex on out of bounds and fix if neeeded
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
  const searchHolder = document.getElementById("searchbar-holder");

  if (!searchHolder) return;

  const searchToggler = document.getElementById("search-toggle");
  const searchClose = document.getElementById("search-close");
  const escapeHandler = (e) => {
    if (e.code === "Escape") searchClose.click();
  };

  // open search bar
  searchToggler.onclick = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (searchHolder.classList.contains("is-active")) return;

    document.addEventListener("keyup", escapeHandler);

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
    console.log(searchHolder.getBoundingClientRect().height);
  };

  // close search bar
  searchClose.onclick = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!searchHolder.classList.contains("is-active")) return;

    document.removeEventListener("keyup", escapeHandler);

    searchHolder.classList.remove("is-active");

    // remove margin for left side menu
    document.documentElement.style.setProperty("--search-bar", 0);
  };

  document.documentElement.style.setProperty("--search-bar", 0);
};
