const requestSearchResultsFactory = (elasticURL, elasticIndex) => (
  searchQuery,
  scope,
  maxAnswers,
  from
) => {
  if (from === undefined) from = 0;
  let input = searchQuery.trim();
  const defaultResult = { results: [], total: 0 };
  if (!input) return Promise.resolve(defaultResult);

  let encoded = encodeURIComponent(`"${input}"`);

  if (scope) {
    encoded += " AND url:" + encodeURIComponent(`"${scope}"`);
  }

  return fetch(
    `${elasticURL}/${elasticIndex}/_search?from=${
      from * maxAnswers
    }&size=${maxAnswers}&q=text:${encoded}`
  )
    .then((r) => r.json())
    .then((r) => {
      const results = r.hits.hits.map((s) => ({
        label: s._source.text,
        value: s._source.url,
        chapter: s._source.title,
      }));

      return { results, total: r.hits.total.value };
    })
    .catch((r) => {
      return defaultResult;
    });
};

const elasticUrl = document.currentScript.dataset.elastic;
const elasticIndex = document.currentScript.dataset.index;
const requestSearchResults = requestSearchResultsFactory(
  elasticUrl,
  elasticIndex
);

class SearchResults extends HTMLElement {
  connectedCallback() {
    this.setup();
  }

  parseRequest(request) {
    const splitted = request.split("/");
    if (splitted.length < 2) return null;

    const escope = splitted[0];
    const etext = splitted[1];
    const scope = decodeURIComponent(escope);
    const text = decodeURIComponent(etext);
    const page = splitted.length > 2 ? parseInt(splitted[2]) : 1;

    return { escope, etext, scope, text, page };
  }

  requestReceived({ escope, etext, scope, text, page }) {
    this.querySelector("#querytext").innerText = text;

    return requestSearchResults(text, scope, this.pageSize, page - 1).then(
      (r) => {
        this.setResults(r);
        this.setPagination(
          r.total,
          this.pageSize,
          page,
          (p) => `/search/#query/${escope}/${etext}/${p}`
        );
      }
    );
  }

  initialRequest(request) {
    if (!request) return;

    const orequest = this.parseRequest(request);
    if (!orequest) return;

    this.requestReceived(orequest);

    const maininput = document.getElementById("topsearch-input");

    if (maininput) maininput.value = orequest.text;

    const scopeSelector = this.scopeSelector;
    if (scopeSelector) {
      scopeSelector.forEach((a) => {
        a.href = `${a.href}${orequest.etext}`;
        a.parentElement.classList.toggle(
          "is-selected",
          orequest.scope.indexOf(a.dataset.scope) === 0
        );
      });
    }

    return false;
  }

  changeRequest(request) {
    this.clearResults();

    if (!request) return;

    const orequest = this.parseRequest(request);
    if (!orequest) return;

    this.requestReceived(orequest).then(() => {
      doScrolling(0, 500);
    });
  }

  computePages(pageButtons, totalPages, currentPage) {
    const innerLeft = Math.max(
      Math.min(
        currentPage - Math.floor(pageButtons / 2),
        totalPages - pageButtons + 1
      ),
      1
    );

    const result = [];

    for (let i = 0; i < Math.min(pageButtons, totalPages); i++) {
      let num;

      if (i == 0) {
        num = 1;
      } else if (i == pageButtons - 1) {
        num = totalPages;
      } else num = innerLeft + i;

      result.push(num);
    }
    return result;
  }

  setPagination(totalResults, pageSize, currentPage, hrefFunc) {
    const pag = this.pagination;
    const ellipsis = Array.from(pag.querySelectorAll(".pagination-ellipsis"));
    const buttons = Array.from(pag.querySelectorAll(".pagination-link"));
    const totalPages = Math.ceil(totalResults / pageSize);

    const pages = this.computePages(buttons.length, totalPages, currentPage);

    pag.classList.toggle("is-hidden", totalPages <= 1);

    const setPageButton = (p, i) => {
      p.classList.toggle("is-hidden", !i);
      p.classList.toggle("is-current", i === currentPage);
      p.dataset.page = i;
      p.innerHTML = i.toString();
      p.setAttribute("aria-label", `Goto page ${i}`);
      p.href = hrefFunc(i);
    };

    for (let i = 0; i < buttons.length; i++) {
      const b = buttons[i];
      const p = i < pages.length ? pages[i] : false;
      setPageButton(b, p);
    }

    ellipsis[0].classList.toggle(
      "is-hidden",
      totalPages <= buttons.length || pages[1] === 2
    );
    ellipsis[1].classList.toggle(
      "is-hidden",
      totalPages <= buttons.length ||
        pages[pages.length - 2] === pages[pages.length - 1] - 1
    );

    const prev = pag.querySelector(".pagination-previous");
    const next = pag.querySelector(".pagination-next");

    prev.href = hrefFunc(currentPage - 1);
    next.href = hrefFunc(currentPage + 1);

    prev.classList.toggle("is-hidden", currentPage <= 1);
    next.classList.toggle("is-hidden", currentPage >= totalPages);
  }

  setResults(answer) {
    this.querySelector("#total").innerText =
      answer.total == 1 ? "1 result" : `${answer.total} results`;

    const container = this.querySelector("ul.results-list");
    const truncate = 300;
    container.innerHTML = "";

    const lis = Array.from(this.querySelectorAll("ul.results-list > li"));

    answer.results.forEach((r, i) => {
      let c = lis[i];
      if (!c) {
        c = document.createElement("li");
        c.innerHTML = this.templateHtml;
      }

      const url = r.value;

      const a = c.querySelector("a");
      a.href = url;
      a.innerText = r.chapter;

      c.querySelector(".result-text").innerText =
        r.label.length > truncate
          ? r.label.slice(0, truncate) + "..."
          : r.label;

      const ameta = c.querySelector(".result-meta");
      const aurl = url.split("/");
      const meta = { url, content: r.chapter };
      if (aurl.length > 2) {
        const [_, scopeId, scopeVersion] = aurl;
        const scope = this.scopeSelector.find(
          (s) => s.dataset.scope === scopeId
        );
        if (scope) {
          const formattedScope =
            scopeVersion === "latest" ? "Latest" : `Version ${scopeVersion}`;

          // very strange bug with chrome - if use innertext property, window frame jumps up
          meta.content = `${scope.innerHTML} | ${formattedScope}`;
          meta.url = `/${scopeId}/${scopeVersion}`;
        }
      }
      ameta.innerText = meta.content;
      ameta.href = meta.url;

      container.append(c);
    });

    this.classList.add("is-active");
  }

  clearResults() {
    Array.from(this.querySelectorAll("ul.results-list > li")).forEach((r) =>
      r.classList.add("is-invisible")
    );
  }

  setup() {
    const templateNode = this.querySelector("ul.results-list > li");
    this.templateHtml = templateNode.innerHTML;

    this.pageSize = 5;

    this.clearResults();

    const pagination = this.querySelector(".pagination");
    this.pagination = pagination;

    const _keyboardHandler = (e) => {
      if (!e.altKey) return;

      if (!["ArrowRight", "ArrowLeft"].includes(e.code)) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (e.type !== "keyup") {
        return;
      }

      let btnClass = ".pagination-previous";
      if (e.code === "ArrowRight") btnClass = ".pagination-next";

      const btn = pagination.querySelector(btnClass);
      if (!btn.classList.contains("is-hidden")) btn.click();
    };

    document.addEventListener("keyup", _keyboardHandler);
    document.addEventListener("keydown", _keyboardHandler);

    this.scopeSelector = Array.from(
      document
        .querySelector("#leftside-menu.scope-selector")
        .querySelectorAll("a[data-scope]")
    );
  }
}
