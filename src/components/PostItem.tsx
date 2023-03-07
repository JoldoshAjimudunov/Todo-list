import { Box, Card, Container, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { FC, useState } from "react";
import { IPost } from "../models/IPost";
import "../style/post.css";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };
  const handleUpdate = (event: React.MouseEvent) => {
    // const title = prompt() || "";
    const title = edit || "";

    update({ ...post, title });
    setOpen(false);
  };

  // function handleEditInput(e) {
  //   let newObj = edit
  //   newObj.edit = e.target.value;
  //   setEdit(newObj);
  // }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState<string>("");

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
              onClick={handleOpen}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            type="text"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          />
          <Button onClick={handleUpdate}>edit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PostItem;
