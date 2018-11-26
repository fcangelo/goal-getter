import React from 'react';

function FileUpload(props) {
  return (
    <label className="button">
      <input 
        type="file" 
        id={props.id} 
        className="no-display" 
        accept={props.type} 
        onChange={(e) => props.handleFile(e.target.files[0])}
      />
      Import
    </label>
  );
}

export default FileUpload;
