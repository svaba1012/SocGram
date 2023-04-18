import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  borderRadius: "10px",
  boxShadow: 24,
  outline: 0,
};

function CustomOptionModal({
  open,
  handleClose,
  headerText,
  headerSubText,
  withCancel,
  withCloseBtn,
  options = [],
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {withCloseBtn ? (
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
            sx={{ position: "absolute", right: "5px", top: "5px", zIndex: 30 }}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          ""
        )}
        <List>
          {headerText ? (
            <ListItem divider>
              <ListItemText
                sx={{ textAlign: "center" }}
                disableTypography
                primary={
                  <Typography sx={{ fontSize: "1.3em" }}>
                    {headerText}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: "grey", fontSize: "1.1em" }}>
                    {headerSubText ? headerSubText : ""}
                  </Typography>
                }
              ></ListItemText>
            </ListItem>
          ) : (
            " "
          )}

          {options.map((option) => {
            let itemJsx = (
              <ListItem
                button
                divider
                onClick={option.onClick ? option.onClick : () => {}}
              >
                <Typography
                  sx={{
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    width: "100%",
                    textAlign: "center",
                    color: option.warning
                      ? "red"
                      : option.confirm
                      ? "blue"
                      : "inherit",
                  }}
                >
                  {option.text}
                </Typography>
              </ListItem>
            );
            if (option.to) {
              return (
                <Link
                  to={option.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {itemJsx}
                </Link>
              );
            }
            return itemJsx;
          })}

          {withCancel ? (
            <ListItem button onClick={handleClose}>
              <Typography
                sx={{
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Cancel
              </Typography>
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Box>
    </Modal>
  );
}

export default CustomOptionModal;
