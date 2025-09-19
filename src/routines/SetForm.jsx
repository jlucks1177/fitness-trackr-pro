import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function SetForm({ routineId }) {
  const { token } = useAuth();
  if (!token) return null;

  const { data: activities = [] } = useQuery("/activities", "activities");

  const {
    mutate: createSet,
    loading,
    error,
  } = useMutation("POST", "/sets", [`routine:${routineId}`]);

  const addSet = (formData) => {
    const activityId = formData.get("activityId");
    const count = formData.get("count");
    createSet({ routineId, activityId, count });
  };

  return (
    <>
      <form action={addSet}>
        <label>
          Activity
          <select name="activityId" required>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reps
          <input type="number" name="count" min="1" required />
        </label>
        <button>{loading ? "Adding..." : "Add Set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
