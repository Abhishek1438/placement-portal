import logo from "../assets/logo1.png";

const Banner = () => {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-9 col-lg-3">
          <div className="site-branding-outer clearfix">
            <div className="site-branding">
              <a
                href="https://www.iiits.ac.in/"
                className="custom-logo-link"
                rel="home"
              >
                <img
                  width="105"
                  height="105"
                  src={logo}
                  className="custom-logo"
                  //   alt="Indian Institute of Information Technology"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-9 d-none d-lg-block" id="menurightidpd">
          <div className="headerrightmenu">
            <h3>
              Indian Institute of Information Technology Sri City, Chittoor
            </h3>

            <h4>भारतीय सूचना प्रौद्योगिकी संस्थान श्री सिटी, चित्तूर</h4>

            <h4>
              (An Institute of National Importance under an Act of Parliament)
            </h4>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Banner;
