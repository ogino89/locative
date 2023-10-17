// import React from "react";
// import { TextField } from "@mui/material";
// import { useField } from "formik";

// const OSDateTimePicker = ({ name, ...otherProps }: any) => {
//   const [field, meta] = useField(name);

//   const configDateTimePicker = {
//     ...field,
//     ...otherProps,
//     type: "date",
//     variant: "outlined",
//     placeholder: "dd/mm/yyyy",
//     fullWidth: true,
//     InputLabelProps: {
//       shrink: true,
//     },
//   };

//   if (meta && meta.touched && meta.error) {
//     configDateTimePicker.error = true;
//     configDateTimePicker.helperText = meta.error;
//   }

//   return <TextField {...configDateTimePicker} />;
// };

// export default OSDateTimePicker;
