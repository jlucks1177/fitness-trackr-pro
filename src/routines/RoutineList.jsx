import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Loading routines...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <RoutineItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

function RoutineItem({ routine }) {
  return (
    <li>
      <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
    </li>
  );
}
