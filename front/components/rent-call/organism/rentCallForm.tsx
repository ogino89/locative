import {
  Stack,
  styled,
  Typography,
  Button,
  FormControlLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchTenant from "../hooks/useFetchRentCalls";
import { cancelEdit } from "../../../redux/slices/tenant/tenantSlice";
import useFetchRentCalls from "../hooks/useFetchRentCalls";
import { createRentCall, updateRentCall } from "../../../redux/slices/rent-call";
import OSDatePicker from "../../shared/date/OSDatePicker";

const RentCallForm = () => {
  const { tenantList } = useAppSelector((state) => state.tenant);
  const { isEditing, rentCall } = useAppSelector((state) => state.rentCall);
  const dispatch = useAppDispatch();
  const fetchRentCall = useFetchRentCalls();
  const fetchTenant = useFetchTenant();
  const status = [
    { id: "PENDING", value: "	en_attente" },
    { id: "PAID", value: "payé" },
  ];

  useEffect(() => {
    fetchRentCall();
    fetchTenant();
  }, []);

  const handleSubmint = async (values: any) => {
    try {
      values.amount = +values.amount;
      if (isEditing) {
        // delete values.id;
        await dispatch(
          updateRentCall({
            id: rentCall.id!,
            rentCall: values,
          })
        );
      } else {
        await dispatch(createRentCall(values));
      }
      fetchRentCall();
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
            ? rentCall
            : {
              month: "",
              status: "",
              amount: "",
              tenantId: "",
              }
        }
        validationSchema={Yup.object({
          month: Yup.string().required("Champ obligatoire"),
          status: Yup.string().required("Champ obligatoire"),
          amount: Yup.number().required("Champ obligatoire"),
          tenantId: Yup.string().required("Champ obligatoire"),
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
                {/* <OSTextField label="Mois" name="month"></OSTextField> */}
              <OSDatePicker
                  label="Mois"
                  value={formikProps.values?.month}
                  name="month"
                  fullWidth
                  onChange={(value: any) =>
                    formikProps?.setFieldValue("month", value)
                  }
                />
              <OSTextField label="montant" name="amount" type="number"></OSTextField>
              <OSSelectField
                id="tenantId"
                label="locataire"
                name="tenantId"
                options={tenantList}
                dataKey={["firstName", "lastName"]}
                valueKey="id"
              />
              <OSSelectField
                id="status"
                label="statu"
                name="status"
                options={status}
                dataKey={"value"}
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

export default RentCallForm;
