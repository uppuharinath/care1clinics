const Footer = () => {
  return (
    <footer className="container">
        <div className="row">
          <div className="col-12 flex jcc aic">
            <div className="care1clinic text-sm text-gray-600">
              &copy; {new Date().getFullYear()} care1clinic. All rights reserved.
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
