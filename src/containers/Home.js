import React from "react";
import { Link } from "react-router-dom";
import Man from "../assets/images/man.svg";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header />
      <section class="main-bg-sectoin landing-page landing-content">
        <div class="container">
          <div class="row">
            <div class="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="text-center title">
                <h1>Welcome to the Corigan online patient portal</h1>
              </div>
              <div>
                <Link className={"primary-btn"} to={"/signup"}>
                  Register
                </Link>
              </div>
              <div class="text-center">
                <p>
                  Already have an account? <Link to={`/login`}>Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="img-wrppaer full-img">
          <img src={Man} class="man-img" alt="man" />
        </div> */}
      </section>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Home</h1>
  //     <h3>User is currently: </h3>
  //     <Link to="/login/">
  //       <button>Login</button>
  //     </Link>
  //     <Link to="/signup/">
  //       <button>SignUp</button>
  //     </Link>
  //   </div>
  // );
}

// onClick={() => dispatch(requestLogin())}

export default Home;
