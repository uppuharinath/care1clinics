import img1 from "./img1.jpeg"
import img2 from './img2.jpeg'
import img3 from './img3.jpeg'
import img4 from './img4.jpeg'


const Gallery = () => {
  const images = [img1, img2, img3, img4];

  return (
    <div className="container ">
      <h1>Photos of care1clinics.com</h1>
      <div className="row gallery flex jcc jcsa  aic text-center">
        
        {images.map((src, index) => (
          <div className="col-5-ld col-5-xld col-12-md col-12-sm " key={index}>
            <img src={src} alt={`Gallery ${index + 1}`} className="w-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;