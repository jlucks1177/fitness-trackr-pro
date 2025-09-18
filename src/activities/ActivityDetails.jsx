import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import { useNavigate } from "react-router";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const { data, loading, error } = useQuery(`/activities/${activityId}`);
  const { token } = useAuth();
  const navigate = useNavigate();

  const { mutate: deleteActivity } = useMutation(
    "DELETE",
    "/activities/" + activityId,
    ["activities"]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No Activity Found</p>;

  const activity = data.activity ?? data;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created By: {activity.creatorName}</p>
      {token && (
        <button
          onClick={async () => {
            await deleteActivity();
            navigate("/activities");
          }}
        >
          Delete
        </button>
      )}
    </>
  );
}
