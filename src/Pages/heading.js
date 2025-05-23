import pic from '../assets/pic.jpeg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import Plus from '../Components/Plus/plus';
const Heading = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  return (
    <div className="container this white">
      <div className="row jcc aic box-shadow1">
        <div className="col-9-ld">
        
          <div className="container">
            <div className="row">
              <div className="col-12 flex jcc aic text-center">
                <h1 className="listings doctorname text-center ">
                  Multi speciality Doctor <span>Naveed Ali</span> Now in Varadaiahpalem
                </h1>
              </div>
              <div className="doctorpic col-12 flex flex-column text-ld jcc aic">
                  <img src={pic} alt="Doctor"   />
                  <h3 className='text-blue bg-white w-80 text-center'>MBBS DOCTOR <span className='red'>Reg No. 80105</span>  </h3>
              </div>

              <div className="col-12">
              <ul className="experience ">
                <li className="w-100 flex aic">
                  <div><Plus /></div>
                  <span>12 years of overall medical experience.</span>
                </li>
                <li className="w-100  flex aic">
                  <div><Plus /></div>
                  <span>10 years of clinical practice in Dubai.</span>
                </li>
                <li className="w-100 flex aic">
                  <div><Plus /></div>
                  <span>2 years of service at MIOT International Hospital Chennai.</span>
                </li>
              </ul>
            </div>
            
            </div>
          </div>

        </div>

        <div className="col-3-ld text-center">
          <div className="text-light text-md">Doctor's Login</div>

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
