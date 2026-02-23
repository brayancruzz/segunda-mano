import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

function Login() {
  return (
    <AuthLayout
      heading="Iniciar sesión"
      footerText="¿Aún no tienes una cuenta?"
      footerLinkTo="/signup"
      footerLinkLabel="Registrarme"
    >
      <AuthForm submitLabel="Iniciar sesión" variant="login" />
    </AuthLayout>
  );
}

export default Login;
