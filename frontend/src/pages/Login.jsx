import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "/src/api/userApi";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const initialValues = { correo: "", contraseña: "" };

  const validationSchema = Yup.object({
    correo: Yup.string().email("Email invalido").required("Requerido"),
    contraseña: Yup.string().required("Requerido"),
  });

  const onSubmit = async (values) => {
    try {
      const user = await loginUser(values.correo, values.contraseña);

      if (user.error) {
        alert(user.error);
        return;
      }

      setUser(user);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesion");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesion</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <Field name="correo" type="email" className="input input-bordered w-full" />
              <ErrorMessage name="correo" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Contraseña</label>
              <Field name="contraseña" type="password" className="input input-bordered w-full" />
              <ErrorMessage name="contraseña" component="p" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full btn btn-primary">Entrar</button>

            <p className="text-center text-sm">
              ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-semibold">Registrate</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
