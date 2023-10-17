import {
  Stack,
  styled,
  Typography,
  Button,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { cancelEdit } from "../../../redux/slices/property/propertySlice";
import OSTextField from "../../shared/input/OSTextField";
import { createProperty, updateProperty } from "../../../redux/slices/property";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchProperty from "../hooks/useFetchProperty";
import OSSelectField from "../../shared/select/OSSelectField";

const PropertyForm = () => {
  const { isEditing, property } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();
  const fetchProperty = useFetchProperty();

  const types = [
    { id: "APARTMENT", value: "	Appartement" },
    { id: "HOUSES", value: "Maisons" },
  ];

  const handleSubmint = async (values: any) => {
    try {
      values.rental = +values.rental;
      if (isEditing) {
        // delete values.id;
        await dispatch(
          updateProperty({
            id: property.id!,
            property: values,
          })
        );
      } else {
        await dispatch(createProperty(values));
      }
      fetchProperty();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormContainer>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? property
            : {
                type: "",
                rental: "",
                area: "",
                postalAddress: "",
              }
        }
        validationSchema={Yup.object({
          type: Yup.string().required("Champ obligatoire"),
          rental: Yup.number().required("Champ obligatoire"),
          area: Yup.string().required("Champ obligatoire"),
          postalAddress: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmint(value);
          // console.log('vaeur recu', value)
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing={4}>
              <Typography variant="h5" color="initial">
                Formulaire (Créer/Modifier)
              </Typography>
              <OSSelectField
                id="type"
                label="Types"
                name="type"
                options={types}
                dataKey={"value"}
                valueKey="id"
              />
              <OSTextField
                label="location"
                name="rental"
                type="number"
              ></OSTextField>
              <OSTextField label="zone" name="area"></OSTextField>
              <OSTextField
                label="adresse postale"
                name="postalAddress"
              ></OSTextField>
              <BtnContainer
                direction="row"
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  size="medium"
                  color="warning"
                  variant="text"
                  onClick={() => {
                    formikProps.resetForm();
                    dispatch(cancelEdit());
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  size="medium"
                  color="primary"
                  variant="contained"
                >
                  Enregistrer
                </Button>
              </BtnContainer>
            </Stack>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

const BtnContainer = styled(Stack)(({ theme }) => ({}));

const FormContainer = styled("div")(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(2),
  marginBlock: theme.spacing(2),
  background: "#fff",
}));

export default PropertyForm;
