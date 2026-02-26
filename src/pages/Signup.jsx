import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

function Signup() {
  return (
    <AuthLayout
      heading="Crear cuenta"
      // footerText="¿Ya tienes cuenta?"
      // footerLinkTo="/login"
      footerLinkLabel="Iniciar sesión"
    >
      <AuthForm submitLabel="Registrarse" variant="signup" />
    </AuthLayout>
  );
}

export default Signup;
