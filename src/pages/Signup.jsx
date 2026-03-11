import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import { useUser } from "../userProcess/useUser";

function Signup() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

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
