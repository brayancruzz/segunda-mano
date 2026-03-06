function IDUpload({ frontFile, onFrontChange, backFile, onBackChange }) {
  return (
    <div className="id-upload">
      <div className="upload-section">
        <div className="upload-box" onClick={() => document.getElementById("front-input").click()}>
          {frontFile ? frontFile.name : "Sube una foto de tu cédula (Parte frontal)"}
          <input
            id="front-input"
            type="file"
            accept="image/*"
            onChange={(e) => onFrontChange(e.target.files[0])}
            hidden
          />
        </div>
        <div className="upload-box" onClick={() => document.getElementById("back-input").click()}>
          {backFile ? backFile.name : "Sube una foto de tu cédula (Parte trasera)"}
          <input
            id="back-input"
            type="file"
            accept="image/*"
            onChange={(e) => onBackChange(e.target.files[0])}
            hidden
          />
        </div>
      </div>
      <div className="info-card">
        <strong>¿Por qué pedimos tu documento?</strong>
        <p>
          Validamos la identidad de todos los usuarios para crear un ambiente seguro
          de compra y venta. Tu información está protegida y encriptada.
        </p>
      </div>
    </div>
  );
}

export default IDUpload;
