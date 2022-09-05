import { extend } from "vee-validate";
import { required, alpha, email, length, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
});

extend("email", {
  ...email,
  message: "Invalid email"
});

extend("length", {
  ...length,
  message: "Invalid email"
});

extend("confirmed", {
  ...confirmed,
  message: "Password comfirmation doesn't match "
});