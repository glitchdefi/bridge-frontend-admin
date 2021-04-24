import React from 'react';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="pp-footer">
        <div className="container text-center text-muted">Copyright © {currentYear}. All Rights Reserved by BSCPad</div>
      </div>
    </>
  );
}