import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { User } from "../../../types/user.type";
import { SxProps } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Theme } from "@emotion/react";
import { Alert, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icons from "@mui/icons-material/";
import { exampleSelector, reset } from "../../../store/slices/exampleSlice";
import { useAppDispatch } from "../../../store/store";
import { authSelector, register } from "../../../store/slices/authSlice";
// add any to fix error temporary
const classes: SxProps<Theme> | any = {
  root: { display: "flex", justifyContent: "center", alignItems: "center" },
  submitBtn: { marginTop: 4 },
  canelBtn: { marginTop: 2 },
};

const formValidateSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

type RegisterProps = {};
const Register = (props: RegisterProps) => {
  const navigate = useNavigate();
  const exampleReducer = useSelector(exampleSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: User) => {
    const result = await dispatch(register(values));
    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  const initialValue: User = { username: "", password: "" };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  });

  const showForm = () => {
    return (
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Email />
                  </InputAdornment>
                ),
              }}
              label="Username"
              autoComplete="email"
              autoFocus
            />
          )}
        ></Controller>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.password?.message}
              error={Boolean(errors.password?.message)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Password />
                  </InputAdornment>
                ),
              }}
              label="Password"
              type="password"
            />
          )}
        ></Controller>

        {authReducer.isError && (
          <Alert severity="error">Register failed - internal error</Alert>
        )}

        <Button
          sx={classes.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        <Button
          sx={classes.canelBtn}
          type="button"
          fullWidth
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </form>
    );
  };

  return (
    <Box sx={classes.root}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => dispatch(reset(-1))}
          >
            Register {exampleReducer.count}
          </Typography>
          {showForm()}
        </CardContent>
      </Card>
      <style>
        {`
          body {
            min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url(${process.env.PUBLIC_URL}/images/bg4.jpg);
            text-align: center;
          }
        `}
      </style>
    </Box>
  );
};

export default Register;
