import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: handlesubmit,
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
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Register;
