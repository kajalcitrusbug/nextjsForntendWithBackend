import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AddStudentPage = () => {
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
  return <div>AddStudentPage</div>;
};

export default AddStudentPage;
