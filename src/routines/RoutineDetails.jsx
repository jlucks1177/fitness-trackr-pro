import { useParams, useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import RoutineSets from "./RoutineSets";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { routineId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(
    `/routines/${routineId}`,
    `routine:${routineId}`
  );

  const { mutate: deleteRoutine } = useMutation(
    "DELETE",
    "/routines/" + routineId,
    ["routines"]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No Routine Found</p>;

  const routine = data.routine ?? data;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>{routine.goal}</p>
      <RoutineSets sets={routine.sets ?? []} routineId={routine.id} />
      <SetForm routineId={routine.id} />
      <p>Created By: {routine.creatorName}</p>
      {token && (
        <button
          onClick={() => {
            deleteRoutine();
            navigate("/routines");
          }}
        >
          Delete
        </button>
      )}
    </>
  );
}
