import {
  Button,
  Stack,
  styled,
  Typography,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { register } from "../../redux/slices/auth/useCases/register";
import { useRouter } from "next/router";
import OSTextField from "../shared/input/OSTextField";

const SectionRegister = () => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [formError, setFormError]: any = React.useState("");
  const router = useRouter();

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    postalAddress: "",
    password: "",
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
        <Typography variant="h4" color="initial" sx={{ textAlign: "center" }}>
          Inscription
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center" }}
          color={theme.palette.grey[400]}
        >
          Veuillez remplir ce formulaire.
        </Typography>
      </ContentTitle>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            setIsLoading(true);
            await dispatch(
              register({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                postalAddress: values.postalAddress,
              })
            ).unwrap();
            router.push("/login");
            setFormError(undefined);
            actions.setSubmitting(false);
          } catch (error) {
            setFormError("E-mail ou mot de passe incorrect");
            actions.setSubmitting(false);
            setIsLoading(false);
          }
        }}
      >
        <Form>
          <FormContainer spacing={4}>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <OSTextField label="Nom" name="lastName" />
              <OSTextField label="Prenom" name="firstName" />
            </CustomStack>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <OSTextField label="Adresse email" name="email" />
              <OSTextField label="adresse postale" name="postalAddress" />
            </CustomStack>

            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
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
              <OSTextField
                type={showPwd ? "text" : "password"}
                name="confirmation"
                label="Confirmation de mot de passe"
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
            </CustomStack>

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
                S&apos;INSCRIRE
              </Button>
            )}
          </FormContainer>
        </Form>
      </Formik>
    </SectionLeftContainer>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Champ obligatoire"),
  lastName: Yup.string().required("Champ obligatoire"),
  email: Yup.string()
    .email("Adresse e-mail non valide")
    .required("Obligatoire"),
  postalAddress: Yup.string().required("Champ obligatoire"),
  password: Yup.string().required("Obligatoire"),
  confirmation: Yup.string()
    .required("Obligatoire")
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    ),
});

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

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

export default SectionRegister;
