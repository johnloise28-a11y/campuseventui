import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Event Details</h2>
      <p>ID: {id}</p>
    </div>
  );
}