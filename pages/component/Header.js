import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const session = useSession();
  useEffect(() => {
    const { data } = session;
    if (data) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">Student Portal</a>
        </Link>

        <div className="d-flex">
          <ul className="navbar-nav">
            {isAuthenticated && (
              <li className="nav-item">
                <Link href="/students/add-student" legacyBehavior>
                  <a className="nav-link active" aria-current="page">
                    Add student
                  </a>
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link href="/about" legacyBehavior>
                  <a className="nav-link">About</a>
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link href="/contactus" legacyBehavior>
                  <a className="nav-link">Contact Us</a>
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <button className="nav-link" onClick={() => signOut()}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
