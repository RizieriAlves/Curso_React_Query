import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deletePost, updatePost }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });
  if (isLoading) {
    return <h3>Loading</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deletePost.mutate(post.id)}>Delete</button>{" "}
      {deletePost.isPending ? (
        <p style={{ color: "red" }}>IsPending!!!</p>
      ) : null}
      {deletePost.isSuccess ? (
        <p style={{ color: "green" }}>Deletado!</p>
      ) : null}
      <button onClick={() => updatePost.mutate(post.id)}>Update title</button>
      {updatePost.isPending ? (
        <p style={{ color: "red" }}>IsPending!!!</p>
      ) : null}
      {updatePost.isSuccess ? <p style={{ color: "green" }}>Updated!</p> : null}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
