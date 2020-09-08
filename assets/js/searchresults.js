const requestSearchResultsFactory = (elasticURL, elasticIndex) => (
  searchQuery,
  scope,
  maxAnswers
) => {
  let input = searchQuery.trim();
  const defaultResult = { results: [], total: 0 };
  if (!input) return Promise.resolve(defaultResult);

  let encoded = encodeURIComponent(input.replace(/[\/\\]/g, ""));

  if (scope) {
    encoded += " AND url:" + encodeURIComponent(scope);
  }

  return fetch(
    `${elasticURL}/${elasticIndex}/_search?size=${maxAnswers}&q=text:${encoded}`
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

  initialRequest(request) {
    if (!request) return;

    const splitted = request.split("/");
    if (splitted.length < 1) return;

    const query = {
      scope: splitted.length > 1 ? splitted.shift() : null,
      text: splitted.join("/"),
    };

    const decodedQuery = decodeURIComponent(query.text);

    this.querySelector("#query").innerText = decodedQuery;

    requestSearchResults(query.text, query.scope, 30).then((r) => {
      this.setResults(r);
    });

    const maininput = document.getElementById("topsearch-input");
    if (maininput) maininput.value = decodedQuery;
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
