const requestSearchResults = function (searchQuery, scope) {
  const input = searchQuery.trim();
  const defaultResult = { results: [], total: 0 };
  if (!input) return Promise.resolve(defaultResult);

  const encoded = encodeURI(input);

  return fetch(
    `https://search-test-dev-es-pxmeiqsie66va47wsko6p2q3jm.us-east-1.es.amazonaws.com/_search?size=30&q=text:${encoded}`
  )
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
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

class SearchResults extends HTMLElement {
  connectedCallback() {
    this.setup();
  }

  initialRequest(request) {
    if (!request) return;

    const splitted = request.split("/");
    if (splitted.length < 2) return;

    const query = {
      scope: splitted.shift(),
      text: splitted.join("/"),
    };

    this.querySelector("#query").innerText = query.text;

    requestSearchResults(query.text).then((r) => {
      this.setResults(r);
    });

    const maininput = document.getElementById("topsearch-input");
    if (maininput) maininput.value = query.text;
  }

  setResults(answer) {
    this.querySelector("#total").innerText =
      answer.total == 1 ? "1 result" : `${answer.total} results`;

    const container = this.querySelector("ul.results-list");
    const truncate = 300;
    container.innerHTML = "";

    answer.results.forEach((r) => {
      const c = document.createElement("li");
      c.innerHTML = this.templateHtml;

      const a = c.querySelector("a");
      a.href = r.value;
      a.innerText = r.chapter;

      c.querySelector(".result-text").innerText =
        r.label.length > truncate
          ? r.label.slice(0, truncate) + "..."
          : r.label;

      c.querySelector(".result-meta").innerText = r.chapter;

      container.append(c);
    });

    this.classList.add("is-active");
  }

  setup() {
    const templateNode = this.querySelector("ul.results-list > li");
    this.templateHtml = templateNode.innerHTML;

    templateNode.remove();
  }
}
