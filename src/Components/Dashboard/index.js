import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();

  // Tabs
  const [activeTab, setActiveTab] = useState('register');

  // Register patient state
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regEmail, setRegEmail] = useState('');

  // Fetch patient state
  const [fetchId, setFetchId] = useState('');
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [fetchError, setFetchError] = useState('');

  // Update patient state
  const [updateId, setUpdateId] = useState('');
  const [updatePatient, setUpdatePatient] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  // List patients state
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  // Fetch all patients
  const fetchPatients = async () => {
    setLoadingPatients(true);
    try {
      const q = query(collection(db, 'patients'), orderBy('registeredAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const patientsList = [];
      querySnapshot.forEach((doc) => {
        patientsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setPatients(patientsList);
    } catch (error) {
      console.error("Error fetching patients: ", error);
      alert('Failed to fetch patients');
    } finally {
      setLoadingPatients(false);
    }
  };

  // Load patients when list tab is active
  useEffect(() => {
    if (activeTab === 'list') {
      fetchPatients();
    }
  }, [activeTab]);

  // Register patient handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'patients'), {
        name: regName,
        age: Number(regAge),
        email: regEmail,
        registeredAt: new Date(),
      });
      alert(`Patient registered with ID: ${docRef.id}`);
      setRegName('');
      setRegAge('');
      setRegEmail('');
      // Refresh the patient list if we're on that tab
      if (activeTab === 'list') {
        fetchPatients();
      }
    } catch (error) {
      alert('Error registering patient: ' + error.message);
    }
  };

  // Fetch patient handler
  const handleFetch = async () => {
    if (!fetchId) return alert('Enter Patient ID');
    try {
      const docRef = doc(db, 'patients', fetchId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFetchedPatient(docSnap.data());
        setFetchError('');
      } else {
        setFetchedPatient(null);
        setFetchError('No patient found with that ID');
      }
    } catch (err) {
      setFetchError('Failed to fetch patient');
      console.error(err);
    }
  };

  // Fetch patient for update on ID change
  useEffect(() => {
    if (!updateId) {
      setUpdatePatient(null);
      setUpdateError('');
      return;
    }
    setUpdateLoading(true);
    const fetchPatientForUpdate = async () => {
      try {
        const docRef = doc(db, 'patients', updateId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUpdatePatient(docSnap.data());
          setUpdateError('');
        } else {
          setUpdatePatient(null);
          setUpdateError('Patient not found');
        }
      } catch (err) {
        setUpdateError('Error fetching patient');
        console.error(err);
      } finally {
        setUpdateLoading(false);
      }
    };
    fetchPatientForUpdate();
  }, [updateId]);

  // Update patient handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateId) return alert('Enter Patient ID first');
    try {
      const docRef = doc(db, 'patients', updateId);
      await updateDoc(docRef, {
        name: updatePatient.name,
        age: Number(updatePatient.age),
        email: updatePatient.email,
      });
      alert('Patient details updated successfully');
      // Refresh the patient list if we're on that tab
      if (activeTab === 'list') {
        fetchPatients();
      }
    } catch (err) {
      alert('Failed to update patient: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="container mb-1r mt-1r">
      <div className="row">
        <div className="col-12">
          <div className="dashboard-container">
            

            {currentUser && (
              <>
                <div className="row flex flex-column jcc aic ">
                  <hr className="mb-1r w-50" />
                  <p className="mb-1r">
                    <strong>Welcome:</strong> {currentUser.displayName} <br/>

                    <button onClick={signOut} className="btn red mb-1r">
    Sign Out
  </button>
                  </p>
                                      <h5>Click on the <span className='blue'>Dashboard</span>  to view full screen</h5>

                  <hr className="mb-1r w-50" />
                </div>

                <nav className="mb-2r">
                  <button
                    className={`btn ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                  >
                    Register Patient
                  </button>
                  <button
                    className={`btn ${activeTab === 'fetch' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fetch')}
                    style={{ marginLeft: '10px' }}
                  >
                    Fetch Patient
                  </button>
                  <button
                    className={`btn ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => setActiveTab('update')}
                    style={{ marginLeft: '10px' }}
                  >
                    Update Patient
                  </button>
                  <button
                    className={`btn ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                    style={{ marginLeft: '10px' }}
                  >
                    List Patients
                  </button>
                </nav>

                {activeTab === 'register' && (
                  <form onSubmit={handleRegister}>
                    <h2>Register Patient</h2>
                    <input
                      type="text"
                      placeholder="Name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="mb-1r"
                      style={{ width: '100%' }}
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={regAge}
                      onChange={(e) => setRegAge(e.target.value)}
                      required
                      className="mb-1r"
                      style={{ width: '100%' }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="mb-1r"
                      style={{ width: '100%' }}
                    />
                    <button type="submit" className="btn">
                      Register Patient
                    </button>
                  </form>
                )}

                {activeTab === 'fetch' && (
                  <div>
                    <h2>Fetch Patient by ID</h2>
                    <input
                      type="text"
                      placeholder="Enter Patient ID"
                      value={fetchId}
                      onChange={(e) => setFetchId(e.target.value)}
                      className="mb-1r"
                      style={{ width: '100%' }}
                    />
                    <button onClick={handleFetch} className="btn">
                      Fetch Patient
                    </button>

                    {fetchError && (
                      <p style={{ color: 'red', marginTop: '1rem' }}>
                        {fetchError}
                      </p>
                    )}

                    {fetchedPatient && (
                      <div
                        style={{
                          marginTop: '1rem',
                          border: '1px solid #ccc',
                          padding: '10px',
                        }}
                      >
                        <p>
                          <strong>Name:</strong> {fetchedPatient.name}
                        </p>
                        <p>
                          <strong>Age:</strong> {fetchedPatient.age}
                        </p>
                        <p>
                          <strong>Email:</strong>{' '}
                          {fetchedPatient.email || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'update' && (
                  <div>
                    <h2>Update Patient Details</h2>
                    <input
                      type="text"
                      placeholder="Enter Patient ID"
                      value={updateId}
                      onChange={(e) => setUpdateId(e.target.value)}
                      className="mb-1r"
                      style={{ width: '100%' }}
                    />

                    {updateLoading && <p>Loading patient data...</p>}

                    {updateError && (
                      <p style={{ color: 'red', marginTop: '1rem' }}>
                        {updateError}
                      </p>
                    )}

                    {updatePatient && (
                      <form onSubmit={handleUpdate}>
                        <input
                          type="text"
                          value={updatePatient.name}
                          onChange={(e) =>
                            setUpdatePatient({
                              ...updatePatient,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                          required
                          className="mb-1r"
                          style={{ width: '100%' }}
                        />
                        <input
                          type="number"
                          value={updatePatient.age}
                          onChange={(e) =>
                            setUpdatePatient({
                              ...updatePatient,
                              age: e.target.value,
                            })
                          }
                          placeholder="Age"
                          required
                          className="mb-1r"
                          style={{ width: '100%' }}
                        />
                        <input
                          type="email"
                          value={updatePatient.email}
                          onChange={(e) =>
                            setUpdatePatient({
                              ...updatePatient,
                              email: e.target.value,
                            })
                          }
                          placeholder="Email"
                          className="mb-1r"
                          style={{ width: '100%' }}
                        />
                        <button type="submit" className="btn">
                          Update Patient
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'list' && (
                  <div>
                    <h2>All Patients</h2>
                    <button 
                      onClick={fetchPatients} 
                      className="btn mb-1r"
                      disabled={loadingPatients}
                    >
                      {loadingPatients ? 'Refreshing...' : 'Refresh List'}
                    </button>

                    {loadingPatients && patients.length === 0 ? (
                      <p>Loading patients...</p>
                    ) : patients.length === 0 ? (
                      <p>No patients found</p>
                    ) : (
                      <div className="patient-list black">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ backgroundColor: 'gray' }} >
                              <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
                              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
                              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Registered At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patients.map((patient) => (
                              <tr key={patient.id} style={{ borderBottom: '1px solid #ddd' } }>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.id}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.name}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.age}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.email || 'N/A'}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                  {patient.registeredAt?.toDate().toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {!currentUser && <p>Please log in to access the dashboard.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;