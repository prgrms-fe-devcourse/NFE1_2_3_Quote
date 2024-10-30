import Spinner from "@/components/Spinner/Spinner";
import { useEffect } from "react";

const RedirectPage = () => {
  console.log("redirect");
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    fetch(`http://localhost:5173/auth/kakao/callback?code=${code}`).then(
      (res) => console.log(res),
    );
  });
  return (
    <div>
      <Spinner />
    </div>
  );
};

export default RedirectPage;
