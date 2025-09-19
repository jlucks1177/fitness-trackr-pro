import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function RoutineForm() {
  const { token } = useAuth();
  if (!token) return null;

  const {
    mutate: createRoutine,
    loading: creating,
    error: createError,
  } = useMutation("POST", "/routines", ["routines"]);

  const addRoutine = (formData) => {
    const name = formData.get("name");
    const goal = formData.get("goal");
    createRoutine({ name, goal });
  };

  return (
    <form action={addRoutine}>
      <h2>Create Routine</h2>
      <label>
        Name
        <input name="name" type="text" required />
      </label>
      <label>
        Goal
        <input name="goal" type="text" required />
      </label>
      <button>{creating ? "Creating..." : "Create Routine"}</button>
      {createError && <p>{createError}</p>}
    </form>
  );
}
