import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { isByteLength, isEmail, isAlpha, equals } from "validator";

import { signIn } from "../../actions";

const validateFunctions = {
  usernameOrEmail: {
    func: (value) => isByteLength(value, { min: 5 }),
    text: "Username or email must be at least 5 chars long!",
  },
  password: {
    func: (value) => isByteLength(value, { min: 5 }),
    text: "Password must be at least 5 chars long!",
  },
};

function UserSignInForm(props) {
  const [fieldErrors, setFieldErrors] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const [fieldToched, setFieldTouched] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fieldErrors.usernameOrEmail || fieldErrors.password) {
      return;
    }
    const data = new FormData(event.currentTarget);

    let usernameOrEmail = data.get("usernameOrEmail");
    let password = data.get("password");

    await props.signIn(usernameOrEmail, password);
  };

  const validateInput = (fieldName, value, isOnChange = true) => {
    if (isOnChange && !fieldToched[fieldName]) {
      return;
    }
    let validateFieldObj = validateFunctions[fieldName];
    if (!validateFieldObj.func(value)) {
      setFieldErrors({ ...fieldErrors, [fieldName]: validateFieldObj.text });
      return;
    }
    setFieldErrors({ ...fieldErrors, [fieldName]: false });
  };

  const onBlurHandle = (fieldName, value) => {
    if (fieldToched[fieldName]) {
      return;
    }
    setFieldTouched({ ...fieldToched, [fieldName]: true });
    validateInput(fieldName, value, false);
  };

  return (
    <Paper
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
      elevation={4}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username or email address"
          name="usernameOrEmail"
          autoComplete="email"
          autoFocus
          onBlur={(event) =>
            onBlurHandle("usernameOrEmail", event.currentTarget.value)
          }
          onChange={(event) =>
            validateInput("usernameOrEmail", event.currentTarget.value)
          }
          error={fieldErrors.usernameOrEmail ? true : false}
          helperText={
            fieldErrors.usernameOrEmail ? fieldErrors.usernameOrEmail : ""
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onBlur={(event) =>
            onBlurHandle("password", event.currentTarget.value)
          }
          onChange={(event) =>
            validateInput("password", event.currentTarget.value)
          }
          error={fieldErrors.password ? true : false}
          helperText={fieldErrors.password ? fieldErrors.password : ""}
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { signIn })(UserSignInForm);
