import { useState, useEffect } from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login({ csrfToken }) {
  const router = useRouter();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const signinUser = async (e) => {
    e.preventDefault();
    let options = { redirect: false, email, password };
    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    }
    return router.push("/");
  };

  useEffect(() => {
    const { data } = session;
    if (data) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }, [session]);
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
          <h4>LOGIN</h4>
        </div>
        <div className="card-body">
          <form className="px-4 py-3" onSubmit={(e) => signinUser(e)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
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
              <label htmlFor="password" className="form-label">
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
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <div className="dropdown-divider"></div>
          <Link href="/auth/signup" legacyBehavior>
            <a className="dropdown-item">New around here? Sign up</a>
          </Link>
          <a className="dropdown-item" href="#">
            Forgot password?
          </a>
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
