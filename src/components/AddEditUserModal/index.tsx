import {
  Autocomplete,
  Backdrop,
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Grid,
  Popper,
  styled,
  TextField,
} from "@mui/material";
import ButtonStyled from "../ButtonStyled";
import { CustomAutoComplete, CustomDialog, CustomTextField } from "./styled.component";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect, useState } from "react";
import { addUserRequest, updateUserRequest, User } from "../../services/slices/userSlice";
import { CITIES, City } from "../../utils/constants";

interface AddEditUserModalProps {
  open: boolean;
  existingUser:User | undefined;
  handleClose: () => void;
  handleCancel: () => void;
}

const AddEditUserModal = (props: AddEditUserModalProps) => {
  const { open, handleClose, existingUser,handleCancel } = props;
  const [submitted, setSubmitted] = useState(false);
  const { loadingAddEdit } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submitted && !loadingAddEdit) {
      setSubmitted(false); // Reset the submitted state
      handleClose(); // Close the dialog
    }
  }, [submitted, loadingAddEdit, handleClose]);

  const UserSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    age: Yup.number()
      .required("Age is required")
      .min(1, "Age must be positive")
      .max(120, "Invalid age"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 2 characters"),
  });

  const initialValues = existingUser??{
    name: "",
    age: null,
    city: "",
  };

  const handleSubmit = (fields: User) => {
    setSubmitted(true); // Mark the form as submitted
    if(existingUser){
      dispatch(updateUserRequest(fields));
    }else{
      dispatch(addUserRequest(fields));
    } 
  };

  return (
    <CustomDialog open={open} onClose={handleClose}>
      <DialogTitle>{existingUser? "Update User":"Add User"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    required
                    as={CustomTextField}
                    fullWidth
                    label="Name"
                    name="name"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomAutoComplete
                  options={CITIES}
                  getOptionLabel={(option) => (option as City).name}
                  value={CITIES.find((city) => city.name === values.city) || null}
                  onChange={(event, value) => setFieldValue("city", (value as City | null)?.name || "")}
                  // PopperComponent={DownwardPopper}
                  renderInput={(params: any) => (
                    <TextField
                    required
                    {...params}
                    label="City"
                    variant="outlined"
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    />
                  )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={CustomTextField}
                    required
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <ButtonStyled type="submit" color="primary">
                      {existingUser ? "Update" : "Add"}
                    </ButtonStyled>
                    <ButtonStyled outlined onClick={handleCancel}>
                      Cancel
                    </ButtonStyled>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {loadingAddEdit && (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={loadingAddEdit}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </DialogContent>
    </CustomDialog>
  );
};

export default AddEditUserModal;
