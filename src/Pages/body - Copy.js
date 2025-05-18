import { useAuth } from "../contexts/auth";
import records from "../json/services.json";
import { useState } from "react";
import CardOut from "../../src/cardout";
import { FaHotel } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiAutoRepair, GiNoodles } from "react-icons/gi";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import Heading from "./heading";

const Body = ({ searchInput }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCardOut = (record) => setSelectedRecord(record);
  const handleBack = () => setSelectedRecord(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFiles([]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    if (typeof text !== "string") return text;

    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) =>
      typeof part === "string" && part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "skyblue" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Filtering includes phone and address fields now
  const filteredRecords = records.filter((record) => {
    if (!searchInput?.trim()) return true;

    const term = searchInput.toLowerCase();

    // Fields to check other than id
    const otherFields = [
      record.name,
      record.type,
      record.phone?.toString(),
      record.address,
    ];

    // Check other fields (case-insensitive includes)
    const otherMatch = otherFields.some(
      (field) =>
        typeof field === "string" && field.toLowerCase().includes(term)
    );

    // Special handling for record.id
    const idLower = typeof record.id === "string" ? record.id.toLowerCase() : "";

    let idMatch = false;
    if (term === "u") {
      // Match only if record.id is exactly "u" (case-insensitive)
      idMatch = idLower === "u";
    } else if (term.length > 1) {
      // For longer terms, do case-insensitive includes
      idMatch = idLower.includes(term);
    }

    return otherMatch || idMatch;
  });



  return (
    <div className="container main">
      <Heading />

      {/* Upload Section for logged-in users */}
      {userLoggedIn && (
        <div className="upload-section container b-1px black">
          <h1>Hi, {currentUser.displayName}</h1>
          <h3>Upload Your Business Photos</h3>
          <p>Showcase your business with up to 5 photos</p>

          <div className="upload-area black">
            <input
              type="file"
              id="business-photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              style={{ display: "none" }}
            />

            <label htmlFor="business-photos" className="upload-label">
              {files.length > 0 ? (
                <div className="file-list ">
                  <p>Selected {files.length} file(s):</p>
                  <ul className="black">
                    {files.map((file, index) => (
                      <li key={index}>
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="upload-prompt">
                  <svg className="upload-icon" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <p>Click to select photos or drag and drop</p>
                </div>
              )}
            </label>

            {files.length > 0 && (
              <div className="upload-controls">
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="upload-button"
                >
                  {isUploading ? "Uploading..." : "Upload Photos"}
                </button>
                {!isUploading && (
                  <button onClick={() => setFiles([])} className="cancel-button">
                    Clear Selection
                  </button>
                )}
              </div>
            )}

            {isUploading && (
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span className="progress-text">{uploadProgress}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedRecord ? (
        <CardOut record={selectedRecord} onBack={handleBack} />
      ) : (
        <div className="allcards flex-column ">
          {filteredRecords.map((record) => (
            <div key={record.id} className="box-shadow1 mt-1r">
              <li>Name : {highlightSearchTerm(record.name, searchInput)} </li>
              <li>Age : {record.age}Y</li>
              <li>Patient Id : {highlightSearchTerm(record.id, searchInput)}</li>
        

{record.phone && (
  <li>
    Phone No: {highlightSearchTerm(record.phone.toString(), searchInput)}
  </li>
)}



{record.notes && (
  <li>
    
      Allergies : {highlightSearchTerm(record.Allergies, searchInput)}
    
  </li>
)}

{record.notes && (
  <li>
    <div className="col-11-ld">
      {highlightSearchTerm(record.notes, searchInput)}
    </div>
  </li>
)}


 <button className="btn" onClick={() => handleCardOut(record)}>Edit</button>                 


            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Body;
