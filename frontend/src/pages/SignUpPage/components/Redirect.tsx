import Spinner from "@/components/Spinner/Spinner";

const Redirect = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default Redirect;
