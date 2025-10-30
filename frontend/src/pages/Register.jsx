import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "/src/api/userApi";

export default function Register() {
  const navigate = useNavigate();

  const initialValues = { nombre: "", correo: "", contraseña: "" };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Requerido"),
    correo: Yup.string().email("Email invalido").required("Requerido"),
    contraseña: Yup.string().min(6, "Minimo 6 caracteres").required("Requerido"),
  });

  const onSubmit = async (values) => {
    try {
      const user = {
        nombre: values.nombre,
        correo: values.correo,
        edad: 18,
        contraseña: values.contraseña,
      };

      const res = await registerUser(user);

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Usuario registrado con exito");
      navigate("/"); // redirige al login
    } catch (err) {
      console.error("register error:", err);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Nombre</label>
              <Field name="nombre" className="input input-bordered w-full" />
              <ErrorMessage name="nombre" component="p" className="text-red-500 text-sm" />
            </div>

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

            <button type="submit" className="w-full btn btn-primary">Registrarse</button>

            <p className="text-center text-sm">
              ¿Ya tienes cuenta? <Link to="/" className="text-blue-600 font-semibold">Inicia sesión</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
