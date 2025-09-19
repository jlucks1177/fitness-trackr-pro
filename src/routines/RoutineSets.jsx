import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function RoutineSets({ sets, routineId }) {
  const { token } = useAuth();

  if (!sets || sets.length === 0) return <p>No sets yet</p>;

  return (
    <ul>
      {sets.map((set) => (
        <RoutineSetItem
          key={set.id}
          set={set}
          routineId={routineId}
          token={token}
        />
      ))}
    </ul>
  );
}

function RoutineSetItem({ set, routineId, token }) {
  const { mutate: deleteSet } = useMutation("DELETE", `/sets/${set.id}`, [
    `routine:${routineId}`,
  ]);

  return (
    <li>
      {set.name} - {set.count} reps
      {token && (
        <button onClick={() => deleteSet({}, `/${set.id}`)}>Delete</button>
      )}
    </li>
  );
}
