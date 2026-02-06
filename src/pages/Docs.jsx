import React from 'react';
import { RedocStandalone } from 'redoc';

function Docs() {
  return (
    <div style={{ height: '100vh' }}>
      <RedocStandalone
        specUrl="/openapi2.yaml"
        options={{
          scrollYOffset: 50,
          theme: { colors: { primary: { main: '#dd5522' } } },
        }}
      />
    </div>
  );
}

export default Docs;
