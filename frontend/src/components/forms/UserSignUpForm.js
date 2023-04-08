import React, { useRef, useState } from "react";
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
import { connect } from "react-redux";
import { isByteLength, isEmail, isAlpha, equals } from "validator";

import { signUp } from "../../actions";

const validateFunctions = {
  username: {
    func: (value) => isByteLength(value, { min: 5 }),
    text: "Username must be at least 5 chars long!",
  },
  email: { func: isEmail, text: "Ivalid email!" },
  password: {
    func: (value) => isByteLength(value, { min: 5 }) && !isAlpha(value),
    text: "Password must be at least 5 chars long and contain 1 non alphabetic char!",
  },
  passwordRepeat: {
    func: (value) => isByteLength(value, { min: 5 }) && !isAlpha(value),
    text: "Password must be at least 5 chars long and contain 1 non alphabetic char!",
  },
};

function UserSignUpForm(props) {
  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    password: false,
    email: false,
    passwordRepeat: false,
  });

  const [fieldToched, setFieldTouched] = useState({
    username: false,
    password: false,
    email: false,
    passwordRepeat: true,
  });

  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      fieldErrors.username ||
      fieldErrors.password ||
      fieldErrors.passwordRepeat ||
      fieldErrors.email
    ) {
      return;
    }
    const data = new FormData(event.currentTarget);

    let email = data.get("email");
    let password = data.get("password");
    let username = data.get("username");

    let res = await props.signUp(username, email, password);
    console.log(res);
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

  const comparePasswords = (pass2) => {
    let pass1 = new FormData(formRef.current).get("password");
    if (!equals(pass1, pass2)) {
      setFieldErrors({
        ...fieldErrors,
        passwordRepeat: "Passwords must match!",
      });
    }
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
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        ref={formRef}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          onBlur={(event) =>
            onBlurHandle("username", event.currentTarget.value)
          }
          onChange={(event) =>
            validateInput("username", event.currentTarget.value)
          }
          error={fieldErrors.username ? true : false}
          helperText={fieldErrors.username}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onBlur={(event) => onBlurHandle("email", event.currentTarget.value)}
          onChange={(event) =>
            validateInput("email", event.currentTarget.value)
          }
          error={fieldErrors.email ? true : false}
          helperText={fieldErrors.email ? fieldErrors.email : ""}
          autoComplete="email"
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordRepeat"
          label="Repeat Password"
          type="password"
          id="passwordRepeat"
          onBlur={(event) =>
            onBlurHandle("passwordRepeat", event.currentTarget.value)
          }
          onChange={(event) => {
            validateInput("passwordRepeat", event.currentTarget.value);
            comparePasswords(event.currentTarget.value);
          }}
          error={fieldErrors.passwordRepeat ? true : false}
          helperText={
            fieldErrors.passwordRepeat ? fieldErrors.passwordRepeat : ""
          }
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
          Sign Up
        </Button>
        <Grid container>
          {/* <Grid item xs>
            <Link to="/">Forgot password?</Link>
          </Grid> */}
          <Grid item>
            <Link to="/">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { signUp })(UserSignUpForm);
