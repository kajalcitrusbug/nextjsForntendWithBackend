import { useState, useEffect } from "react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignUp({ csrfToken }) {
  const router = useRouter();
  const session = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signupUser = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, name: name }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message === "Registered successfully") {
      router.push("/auth/login");
    }
  };
  // useEffect(() => {
  //   const { data } = session;
  //   if (data) {
  //     router.push("/");
  //   } else {
  //     router.push("/auth/login");
  //   }
  // }, [session]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <div className="card w-50">
        <div className="card-header">
          <h4>Registration</h4>
        </div>
        <div className="card-body">
          <form className="px-4 py-3" onSubmit={(e) => signupUser(e)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p style={{ color: "red", fontSize: 14 }}>{message}</p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => signupUser(e)}
            >
              Sign up
            </button>
          </form>
          <div class="dropdown-divider"></div>
          <Link href="/auth/login" legacyBehavior>
            <a className="dropdown-item">
              Already Registered User? Click here to login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
