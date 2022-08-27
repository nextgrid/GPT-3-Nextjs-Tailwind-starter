import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";


export default function Home() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  // What we want to render
  return (
    <>
      <div className={styles.generateIdeasWrapper}>
        <form className={styles.generateIdeasForm}>
          <input
            className={styles.generateIdeasInput}
            type="text"
            name="idea"
            placeholder="Type any idea"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        <button
          onClick={() => setSearch(query)}
          className={styles.generateIdeasButton}
        >
          Generate Ideayaz
        </button>
        <div className={styles.dataContainer}>
          {isLoading ? <div>Loading...</div> : <span>{data.text}</span>}
        </div>
      </div>
    </>
  );
}
