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

window.onload = () => {
  // search bar

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

  // tables wrapper

  ((container) => {
    if (!container) return;

    const tables = container.querySelectorAll("table:not(.no-wrap)");

    tables.forEach((t) => {
      const wrapper = document.createElement('div');
      wrap(t, wrapper);
      wrapper.classList.add("content-table-wrapper");
    })
  })(document.querySelector(".column-content"));

  // code copy button

  (() => {
    const codeTags = document.querySelectorAll("pre > code");

    const template = `<button class="button"><alfresco-tooltip class="tooltip" data-tooltip-mode="manual" data-tooltip-text="Code copied to clipboard."><span class="icon is-small"><i class="copy-icon"></i></span></alfresco-tooltip></button>`;

    Array.from(codeTags).forEach((c) => {
      const preTag = c.parentElement;
      const copyContainer = document.createElement("div");
      copyContainer.innerHTML = template;
      copyContainer.classList.add("copy-pane");

      const tooltip = copyContainer.querySelector("alfresco-tooltip");

      const btn = copyContainer.querySelector(".button");
      btn.addEventListener("click", (e) => {
        const el = document.createElement("textarea");
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

        tooltip.open();
        btn.classList.add("is-happy");

        const deleteTimeout = () => {
          clearTimeout(parseInt(btn.dataset.switchtimer));
          btn.dataset.switchtimer = "";
        };
        if (btn.dataset.switchtimer) {
          deleteTimeout();
        }
        btn.dataset.switchtimer = setTimeout(() => {
          btn.classList.remove("is-happy");
          tooltip.close();
          deleteTimeout();
        }, 1000);
      });

      preTag.prepend(copyContainer);
    });
  })();

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
    const btn = versionSelector.querySelector("button");

    const closeMenu = () => {
      versionSelector.classList.remove("is-active");
      window.removeEventListener("click", outsideClick);
    };
    const outsideClick = (e) => {
      if (!e.target.closest("#version-selector")) closeMenu();
    };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!versionSelector.classList.contains("is-active")) {
        window.addEventListener("click", outsideClick);
        versionSelector.classList.add("is-active");
      } else {
        closeMenu();
      }
    });
  })(document.getElementById("version-selector"));

  // notifications

  const showPreparedNotification = (notif) => {
    notif.classList.add("is-active");
  };

  (() => {
    if (typeof Storage !== "undefined") {
      const cookiesAccepted = localStorage.getItem("cookies-accepted");
      if (cookiesAccepted) return;

      const notif = document.getElementById("cookies-notif");

      if (!notif) return;

      notif.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("cookies-accepted", new Date().toString());
        notif.classList.remove("is-active");
      });

      showPreparedNotification(notif);
    }
  })();

  // anchors generator

  ((container) => {
    if (!container) return;

    container.createHref = (e) => `#${e.dataset.originalid}`;
    container.dataset.aredir = "createHref";

    const headersCollector = (container) => {
      return Array.from(
        container.querySelectorAll(
          "h2:not(.no-collect), h3:not(.no-collect), h4:not(.no-collect), h5:not(.no-collect), h6:not(.no-collect)"
        )
      );
    };

    const headersAnchoring = (headers) => {
      headers.forEach((h) => {
        h.classList.add("is-collected");
        let hrefGenerator = null;
        const redir = h.closest("[data-aredir]");
        if (!redir) return;

        hrefGenerator = redir[redir.dataset.aredir].bind(redir);

        // we should move original id to the hidden element to prevent
        // native page jumping without ugly returning to the top of window
        const anchor = document.createElement("a");
        h.dataset.originalid = h.id;

        h.removeAttribute("id");
        anchor.id = h.dataset.originalid;
        anchor.dataset.header = h.tagName;
        h.prepend(anchor);
        anchor.classList.add("is-hidden");

        const btn = document.createElement("a");
        btn.classList.add("button");
        btn.href = hrefGenerator(h);
        h.append(btn);

        anchor.initialRequest = () => h;
        anchor.changeRequest = anchor.initialRequest;
      });
    };

    const headers = headersCollector(container);

    headersAnchoring(headers);
  })(document.querySelector(".content"));

  // toc spy
  const tocSpy = ((selector, container, tocspy) => {
    if (!container || !tocspy) return;
    const headers = Array.from(container.querySelectorAll(selector));
    if (!headers.length) {
      tocspy.remove();
      return;
    }

    const spy = TocSpy(headers, container, tocspy);
    headers.forEach((h) => {
      const a = document.getElementById(h.dataset.originalid);
      a.initialRequest = () => spy.getSectionTopFromHeader(h);
      a.changeRequest = a.initialRequest;
    });

    return spy;
  })(
    "h2:not(.no-collect)",
    document.querySelector(".content"),
    document.getElementById("tocspy")
  );

  // initial scrolling

  (() => {
    const parseHash = (hash) => {
      const ahash = /^#([^\/]*)\/?((?:[^\/]*\/?)+)?$/.exec(hash);

      if (!ahash || !ahash[1]) return null;

      const id = ahash[1];
      const sub = ahash[2];

      return { id, sub };
    };

    const scrollToHash = (rawHash) => {
      const hash = parseHash(rawHash);
      if (!hash) return {};

      const obj = document.getElementById(hash.id);
      return { obj, sub: hash.sub };
    };

    const _scrollWindowTo = (obj, initiator) => {
      let scrollTarget = null;
      switch (typeof obj) {
        case "object":
          scrollTarget = getElementY(obj) - 20;
          break;
        case "number":
          scrollTarget = obj;
          break;
        case "boolean":
          if (obj) scrollTarget = getElementY(initiator) - 20;
          break;
      }
      if (scrollTarget !== null) doScrolling(Math.max(scrollTarget, 0), 1000);
    };

    if (location.hash) {
      const { obj, sub } = scrollToHash(location.hash);
      if (obj && obj.initialRequest) {
        const scrollTo = obj.initialRequest(sub);
        _scrollWindowTo(scrollTo, obj);
      }
    }

    window.addEventListener(
      "hashchange",
      (e) => {
        // if content is hidden, then we need to remove toc
        const contentContainer = document.querySelector('.column-content');
        if (contentContainer) {
          const containerDisplay = window.getComputedStyle(contentContainer).getPropertyValue('display');
          if (containerDisplay === 'none') tocToggler();  
        }
            
        const { obj, sub } = scrollToHash(location.hash);

        if (obj) {
          let scrollTo = null;
          if (obj.changeRequest) {
            scrollTo = obj.changeRequest(sub);
            _scrollWindowTo(scrollTo, obj);
          }
        }
        return true;
      },
      false
    );
  })();

  showLeftMenu(document.getElementById("leftside-menu"));
};

function showLeftMenu(leftmenu, expandAll = false) {
  if (!leftmenu || leftmenu.dataset.inited) return;
  const container = leftmenu.closest('.content-menu-column');
  const containerDisplay = window.getComputedStyle(container).getPropertyValue('display');

  // temporary show the element to compute heights 
  container.style.display = "block";

  const treeSelect = (li, ...classes) => {
    const parent = li.closest("#leftside-menu li");
    if (!parent) return;

    parent.classList.add(...classes);
    treeSelect(li.parentElement, ...classes);
  };

  const selected = leftmenu.querySelector("li.is-selected");

  if (selected) {
    treeSelect(selected, "is-expanded");
  }

  Array.from(leftmenu.querySelectorAll(".expand-button")).forEach((p) => {
    const li = p.closest("li");
    const ul = li.querySelector("ul");
    // 13px - margin for inner list
    const height = ul.getBoundingClientRect().height + 13;
    ul.style.setProperty("--max-height", height + "px");
    const title = li.querySelector(".menuitem-title");
    const click = (e) => {
      e.stopPropagation();
      li.classList.toggle("is-expanded");
    };
    p.addEventListener("click", click);
    if (title) title.addEventListener("click", click);
    if (expandAll) li.classList.toggle("is-expanded", true);
  });
  leftmenu.style.setProperty("--min-height", "0px");
  leftmenu.classList.add("is-ready-fade");
  leftmenu.dataset.inited = "true";
  container.style.display = ""; 
}

function tocToggler() {
  const body = document.querySelector("body");
  body.classList.toggle("toc-body");
  showLeftMenu(document.getElementById("leftside-menu"), body.classList.contains("toc-body"));

}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
