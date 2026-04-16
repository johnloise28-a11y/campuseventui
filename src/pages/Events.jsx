import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setEvents(data.slice(0, 10));
        setLoading(false);
      });
  };

  // FIRST LOAD
  useEffect(() => {
    fetchData();
  }, []);

  // AUTO REFRESH
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Events</h2>

      {/* ✅ STEP 13: SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
      />

      {/* ✅ FILTERED EVENTS */}
      {events
        .filter(e =>
          e.title.toLowerCase().includes(search.toLowerCase())
        )
        .map(e => (
          <div key={e.id}>
            <Link to={`/events/${e.id}`}>{e.title}</Link>
          </div>
        ))}

      {/* ✅ OPTIONAL: No results message */}
      {events.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
      ).length === 0 && <p>No events found</p>}
    </div>
  );
}