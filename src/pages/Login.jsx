import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

function Login() {
  return (
    <AuthLayout
      heading="Iniciar sesión"
      footerText="Olvidaste tu contraseña?"
      footerLinkTo="/signup"
      footerLinkLabel="Recuperar contraseña"
    >
      <AuthForm submitLabel="Iniciar sesión" variant="login" />
    </AuthLayout>
  );
}

export default Login;
