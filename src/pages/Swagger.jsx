import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function SwaggerDocs() {
  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI url="/openapi.yaml" />
    </div>
  );
}

export default SwaggerDocs;
