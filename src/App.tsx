import { useEffect, useState } from "react";
import "./App.css";

function getQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("query") ?? "";
}

function updateQueryParams(query: string) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("query", query);
  const newUrl = [window.location.pathname, queryParams.toString()]
    .filter(Boolean)
    .join("?");
  window.history.pushState({}, "", newUrl);
}

function App() {
  const [query, setQuery] = useState(getQueryParam);

  const words = query.split(" ");

  const dogChecked = words.includes("dog");
  const catChecked = words.includes("cat");
  const caterpillarChecked = words.includes("caterpillar");

  useEffect(() => {
    window.addEventListener("popstate", () => setQuery(getQueryParam()));
  }, []);

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setQuery(newWords.filter(Boolean).join(" ").trim());
  }

  return (
    <div className="app">
      <form
        action={() => {
          updateQueryParams(query);
        }}
      >
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            name="query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dogChecked}
              onChange={(e) => handleCheck("dog", e.currentTarget.checked)}
            />{" "}
            🐶 dog
          </label>
          <label>
            <input
              type="checkbox"
              checked={catChecked}
              onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            />{" "}
            🐱 cat
          </label>
          <label>
            <input
              type="checkbox"
              checked={caterpillarChecked}
              onChange={(e) =>
                handleCheck("caterpillar", e.currentTarget.checked)
              }
            />{" "}
            🐛 caterpillar
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
