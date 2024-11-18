import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="bg-cyan-950 p-4">
      <div className="flex items-center">
        <img
          src="https://www.tictuk.com/newsite/images/tictuk-logo.png"
          alt="Logo"
          className="h-10 mr-4"
        />
        <h1 className="text-white">User Management Platform</h1>
      </div>
    </nav>
  );
};

export default Navbar;
