import { Card, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";
import { IPost } from "../models/IPost";
import "../style/post.css";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };
  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || "";
    update({ ...post, title });
  };
  return (
    <div className="post">
      <Card sx={{ width: 505, m: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {post.title}
          <div>
            <Button
              sx={{ width: "20px", height: "30px", fontSize: "12px" }}
              variant="contained"
              onClick={handleUpdate}
            >
              edit
            </Button>
            <Button
              sx={{ width: "20px", height: "30px", fontSize: "12px" }}
              variant="contained"
              onClick={handleRemove}
            >
              delete
            </Button>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default PostItem;
