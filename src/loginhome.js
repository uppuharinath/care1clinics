import { useAuth } from "./contexts/auth";
import SignOutButton from "./signout";

const LoginHome = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container bg-black">
      <div className="row col-12 flex jcc aic">
        {currentUser && (
        <div className="btn">
          <SignOutButton />
        </div>
      )}
      </div>
    </div>
  );
};

export default LoginHome;
