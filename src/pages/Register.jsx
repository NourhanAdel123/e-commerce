import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: handlesubmit,
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  function handlesubmit(values) {
    console.log(values);
    navigate("/Login");
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.username && formik.touched.username && (
          <p>{formik.errors.username}</p>
        )}
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Register;
