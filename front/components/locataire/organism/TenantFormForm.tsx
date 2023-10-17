import { Stack, styled, Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchTenant from "../hooks/useFetchTenants";
import { createTenant, updateTenant } from "../../../redux/slices/tenant";
import { cancelEdit } from "../../../redux/slices/tenant/tenantSlice";
import useFetchProperty from "../../biens/hooks/useFetchProperty";

const TenantForm = () => {
  const { propertyList } = useAppSelector((state) => state.property);
  const { isEditing, tenant, tenantList } = useAppSelector((state) => state.tenant);
  const dispatch = useAppDispatch();
  const fetchProperty = useFetchProperty();
  const fetchTenant = useFetchTenant();

  const tenantIds = tenantList.map(tenant => tenant.propertyId);

  const filteredPropertyList = propertyList.filter(property => !tenantIds.includes(property.id));


  useEffect(() => {
    fetchProperty();
  }, []);

  const handleSubmint = async (values: any) => {
    try {
      if (isEditing) {
        // delete values.id;
        await dispatch(
          updateTenant({
            id: tenant.id!,
            tenant: values,
          })
        );
      } else {
        await dispatch(createTenant(values));
      }
      fetchTenant();
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
            ? tenant
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                propertyId: "",
                postalAddress: "",
              }
        }
        validationSchema={Yup.object({
          firstName: Yup.string().required("Champ obligatoire"),
          lastName: Yup.string().required("Champ obligatoire"),
          email: Yup.string().required("Champ obligatoire"),
          phone: Yup.string().required("Champ obligatoire"),
          propertyId: Yup.string().required("Champ obligatoire"),
          postalAddress: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmint(value);
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing={4}>
              <Typography variant="h5" color="initial">
                Formulaire (Créer/Modifier)
              </Typography>
              <OSTextField label="Nom" name="lastName"></OSTextField>
              <OSTextField label="Prenom" name="firstName"></OSTextField>
              <OSTextField label="email" name="email"></OSTextField>
              <OSTextField label="telephone" name="phone"></OSTextField>
              <OSTextField
                label="adresse postale"
                name="postalAddress"
              ></OSTextField>
              <OSSelectField
                id="propertyId"
                label="Imobiliaire"
                name="propertyId"
                options={filteredPropertyList}
                dataKey={["type", "area", "postalAddress"]}
                valueKey="id"
              />
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

export default TenantForm;
