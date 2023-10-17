import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useField } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const OSDatePicker = ({
  name,
  label,
  value,
  onChange,
  ...otherProps
}: any) => {
  const [field, meta] = useField(name);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
};

export default OSDatePicker;
