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
    </div>
  );
}

export default IDUpload;
