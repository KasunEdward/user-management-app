import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import ButtonStyled from "../../components/ButtonStyled";
import { CustomDialog, CustomTextField } from "./styled.component";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface AddEditUserModalProps {
  isEdit: boolean;
  open: boolean;
  handleClose: () => void;
}

const UserSchema = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  age: Yup.number().required("Age is required").min(1, "Age must be positive").max(120, "Invalid age"),
  city: Yup.string().required("City is required").min(2, "City must be at least 2 characters"),
});

// type UserFormProps = {
//   initialValues: {
//     name: string;
//     age: number | "";
//     city: string;
//   };
//   onSubmit: (values: { name: string; age: number; city: string }) => void;
//   isEdit?: boolean;
// };
const initialValues = {
  name:"",
  age:"",
  city:""

}

const AddEditUserModal = (props: AddEditUserModalProps) => {
  const { open, handleClose,isEdit } = props;
  return(
    <CustomDialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
      <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={(values, { resetForm }) => {
        // onSubmit(values);mata 
        // if (!isEdit) resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={CustomTextField}
                fullWidth
                label="Name"
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={CustomTextField}
                fullWidth
                label="Age"
                name="age"
                type="number"
                error={touched.age && Boolean(errors.age)}
                helperText={touched.age && errors.age}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={CustomTextField}
                fullWidth
                label="City"
                name="city"
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button type="submit" variant="contained" color="primary">
                  {isEdit ? "Update User" : "Add User"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
      </DialogContent>
      <DialogActions>
        <ButtonStyled onClick={handleClose}>Cancel</ButtonStyled>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default AddEditUserModal;