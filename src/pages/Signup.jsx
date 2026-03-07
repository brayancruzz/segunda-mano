import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/profile');
    }
  }, [navigate]);

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
