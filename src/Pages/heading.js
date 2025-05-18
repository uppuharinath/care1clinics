import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Heading = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  return (
    <div className="container this white">
      <div className="row jcc aic box-shadow1">
        <div className="col-9-ld">
        
         <h1 className="listings doctorname text-center ">
          Multi speciality Doctor <span>Naveed Ali</span> Now in Varadaiahpalem
          </h1>
      <ul>
        <li>Experienced in treating patients with personalized care and advanced medical techniques.</li>
        <li>Direct appointment booking with quick response times.</li>
        <li>Access to patient records and history securely managed through this portal.</li>
        <li>Offers teleconsultations and in-clinic visits as per patient convenience.</li>
        <li>Provides detailed follow-up and health advice to ensure full recovery.</li>
      </ul>

        </div>

        <div className="col-3-ld text-center">
          <div className="text-light text-md">Staff Login</div>

          {!isLoading && !currentUser ? (
            <>
              <button className="btn" onClick={() => navigate('/register')}>Signup</button>
              <button className="btn" onClick={() => navigate('/login')}>Login</button>
            </>
          ) : !isLoading && currentUser ? (
            <div className="text-success">
              Welcome: {currentUser.displayName || currentUser.email}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
