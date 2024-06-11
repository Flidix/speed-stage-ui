import * as yup from "yup";

export const AuthValidationSchema = yup.object().shape({
  projectId: yup.string().required("project id is required"),
  token: yup.string().required("Token is required"),
});

export type AuthFormValue = yup.InferType<typeof AuthValidationSchema>;
