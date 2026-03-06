import { Link } from "react-router-dom";

function StepHeader({ step, total, onBack }) {
  const percent = Math.round((step / total) * 100);
  return (
    <header className="step-header">
      <div className="step_top_row">
        <span className="step_text">Paso {step} de {total}</span>
        {onBack && (
          <Link to="#" className="back_button" onClick={(e) => { e.preventDefault(); onBack(); }}>
            ← Volver
          </Link>
        )}
      </div>
      <div className="progress_bar_bg">
        <div className="progress_bar_fill" style={{ width: `${percent}%` }}></div>
      </div>
    </header>
  );
}

export default StepHeader;
