import Button from "@mui/material/Button";
import React, { useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import "../style/post.css";

// interface IState {
//   list: {
//     task: string;
//   };
// }

const PostContainer: React.FC = () => {
  // const [task, setTask] = useState<IState>({
  //   list: {
  //     task: "",
  //   },
  // });
  const [task, setTask] = useState<string>("");
  const [limit, setLimit] = useState(100);
  const {
    data: posts,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery(limit);
  const [createPost, {}] = postAPI.useCreatePostMutation({});
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleCreate = async () => {
    let title = JSON.stringify(task);
    title = title.replace(/[""]/g, "");
    await createPost({ title, body: title } as any);
    setTask("");
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };
  ///////////////

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setTask({
    //   list: {
    //     ...task.list,
    //     [event.target.name]: event.target.value,
    //   },
    // });
    setTask(event.target.value);
  };

  ///////////////
  return (
    <div>
      <div className="post__list">
        <div>
          <input
            type="text"
            value={task}
            onChange={handleChange}
            name="task"
            style={{ height: "28px", width: "300px" }}
          />
          <Button variant="outlined" onClick={handleCreate}>
            add post
          </Button>
        </div>
        {isLoading && <h1>loading in proccess</h1>}
        {error && <h1>error</h1>}
        {posts &&
          posts.map((post) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
