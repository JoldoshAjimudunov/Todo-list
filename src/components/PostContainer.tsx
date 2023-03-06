import Button from "@mui/material/Button";
import React, { useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import "../style/post.css";

interface IState {
  list: {
    todoitem: string;
  };
}

const PostContainer: React.FC = () => {
  const [state, setState] = useState<IState>({
    list: {
      todoitem: "",
    },
  });
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
    const title = JSON.stringify(state.list);
    await createPost({ title, body: title } as any);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };
  ///////////////

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      list: {
        ...state.list,
        [event.target.name]: event.target.value,
      },
    });
  };

  ///////////////
  return (
    <div>
      <div className="post__list">
        <input
          type="text"
          value={state.list.todoitem}
          onChange={handleChange}
          name="todoitem"
        />
        <Button variant="outlined" onClick={handleCreate}>
          add post
        </Button>
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
