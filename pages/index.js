import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    const { data } = session;
    if (data) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }, [session]);

  const Data = [
    {
      id: 1,
      firstname: "Mark",
      lastname: "Otto",
      address: "@mdo",
      studentemail: "a@as.ci",
    },
    {
      id: 2,
      firstname: "Jacob",
      lastname: "Thornton",
      address: "@fat",
      studentemail: "a@as.ci",
    },
    {
      id: 3,
      firstname: "Test",
      lastname: "Tes",
      address: "ada",
      studentemail: "a@as.ci",
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Birth Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
