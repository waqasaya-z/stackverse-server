const z = require("zod");

const validationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First and Last Name must be atleast 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "First and Last Name must be atleast 3 characters" }),
  userEmail: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email"
  }),
  hashPassword: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" })
});

const validationLogInSchema = z.object({
  formEmail: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email"
  }),
  formPassword: z.string().min(1, { message: "Invalid Password" })
});

module.exports = {
  validationLogInSchema,
  validationSchema
};
