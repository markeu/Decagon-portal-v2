import { useHistory  } from "react-router-dom";
import "./index.scss";

const Success = () => {
  const {location} = useHistory()

  return (
    <main>
      <div className="success-wrapper">
        <div className="success-container">
          <h1 className="font-muli font-bold">Thank You !</h1>
          <p className="font-semibold text-2xl mt-6">An email have been sent to your mail address, kindly verify to proceed</p>
          <p>
          {location.state}
          </p>
          <div className="back-button">
              <a href="https://applications.decagonhq.com/">
                <button className="btn-back">Back to Home</button>
              </a>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Success;
