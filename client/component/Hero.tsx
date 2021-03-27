import React from "react";

const Hero: React.FC = () => {
  const moongateImgPath = "/moongate.jpg";

  return (
    <>
      <div className="hero-container">
        <div className="center">
          <h1>Y11 INTERACTIVE WEBSITE</h1>
          <p>Your source of Y11 News and Updates</p>
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          height: 100vh;
          width: 100vw;
          background: url(${moongateImgPath}) no-repeat fixed;
          background-size: cover;
        }

        .center h1,
        .center p {
          color: white;
          text-align: center;
        }

        .center {
          width: 40%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          transform: translateY(-20px);
        }

        .center h1 {
          font-size: 4.5rem;
          line-height: 1.3em;
          margin-bottom: 10px;
        }

        .center p {
          font-family: Avenir, serif;
          font-size: 1.2rem;
        }

        @media screen and (max-width: 800px) {
          .center {
            width: 60%;
          }

          .center h1 {
            font-size: 3.5rem;
          }
        }

        @media screen and (max-width: 500px) {
          .center {
            width: 70%;
          }

          .center h1 {
            font-size: 3rem;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
