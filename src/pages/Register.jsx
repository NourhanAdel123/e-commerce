import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
function Register() {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handlesubmit,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      rePassword: Yup.string()
        .required("Re Password is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0-2]{1}[0-9]{8}$/, "Invalid phone number"),
    }),
  });

  async function handlesubmit(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      console.log(data);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <p>{formik.errors.name}</p>
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
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone && (
          <p>{formik.errors.phone}</p>
        )}
        <br />
        <label>Re Password</label>
        <input
          type="password"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <p>{formik.errors.rePassword}</p>
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
        <button type="submit">
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Register"
          )}
        </button>
        <Link to="/login">Login</Link>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Register;
