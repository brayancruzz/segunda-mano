import { Link } from "react-router-dom";
import "../page_css/root.css";
import "../ui/color.css";
import "../ui/input.css";
import "../ui/btn_styles.css";
import "../page_css/share_css/signup_login.css";
import "./auth.css";
import InfoAccessBanner from "../layout/share_css/signup_login_banner";
import NavSignupLogin from "../layout/share_css/signup_login_nav";

function AuthLayout({ heading, children, footerText, footerLinkTo, footerLinkLabel }) {
  return (
    <section className="signup_login_main_container main_container">
      <div className="signup_login_container">
        <InfoAccessBanner />
        <div className="auth_container">
          <div className="auth_content">
            <NavSignupLogin />
            {heading && <h2 className="blue_gray_900">{heading}</h2>}
            {children}
            {footerText && footerLinkTo && footerLinkLabel && (
              <p className="signup_login-link blue_gray_800">
                {footerText}{" "}
                <Link to={footerLinkTo} className="teal_800">
                  {footerLinkLabel}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;

