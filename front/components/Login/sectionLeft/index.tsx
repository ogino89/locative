import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { Visibility, VisibilityOff, Save } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { login } from "../../../redux/slices/auth";
import { enqueueSnackbar } from "../../../redux/notification/notificationSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import OSTextField from "../../shared/input/OSTextField";

const SectionLeft = () => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError]: any = React.useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValue = {
    email: "",
    password: "",
    remember: false,
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SectionLeftContainer>
      <ContentTitle>
        <Typography variant="h4" color="initial">
          Se connecter
        </Typography>
        <Typography variant="body2" color={theme.palette.grey[400]}>
          Saisir votre identifiant
        </Typography>
      </ContentTitle>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            setIsLoading(true);
            await dispatch(
              login({
                email: values.email,
                password: values.password,
                remember: values.remember,
              })
            ).unwrap();
            dispatch(
              enqueueSnackbar({
                message: `Bienvenue`,
                options: { variant: "success" },
              })
              );
            router.push("/");
            setFormError(undefined);
            actions.setSubmitting(false);
          } catch (error) {
            dispatch(
              enqueueSnackbar({
                message: `E-mail ou mot de passe incorrect`,
                options: { variant: "error" },
              })
              );
            actions.setSubmitting(false);
            setIsLoading(false);
          }
        }}
      >
        <Form>
          <FormContainer spacing={4}>
            <OSTextField label="Adresse email" name="email" type="text" />
            <OSTextField
              type={showPwd ? "text" : "password"}
              name="password"
              label="Mot de passe"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPwd(!showPwd)}
                      aria-label="Afficher"
                    >
                      {showPwd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ForgotContainer>
              <CustomCheckBoxLabel
                color={theme.palette.grey[200]}
                control={<CustomCheckBox />}
                label="Se rappeler de moi"
              />
              <Link href="/register">
                <Button variant="text">Créer un compte</Button>
              </Link>
            </ForgotContainer>
            {isLoading ? (
              <LoadingButton
                color="secondary"
                loading={true}
                loadingPosition="center"
                startIcon={<Save />}
                variant="contained"
              ></LoadingButton>
            ) : (
              <Button type="submit" variant="contained">
                Se connecter
              </Button>
            )}
          </FormContainer>
        </Form>
      </Formik>
    </SectionLeftContainer>
  );
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Adresse e-mail non valide")
    .required("Obligatoire"),
  password: Yup.string().required("Obligatoire"),
});

const CustomCheckBox = styled(Checkbox)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
}));

const CustomCheckBoxLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
}));

const ForgotContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const FormContainer = styled(Stack)(({ theme }) => ({}));

const ContentTitle = styled("div")(({ theme }) => ({
  textAlign: "start",
  paddingBottom: 25,
}));

const SectionLeftContainer = styled("div")(({ theme }) => ({
  padding: "56px 129px",
  minHeight: "100vh",
  marginTop: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down("lg")]: {
    padding: "56px 15px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "56px 15px",
  },
}));

export default SectionLeft;
