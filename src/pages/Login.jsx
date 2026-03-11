import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import { useUser } from "../userProcess/useUser";

function Login() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

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
