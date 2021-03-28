import React from "react";

import Spinner from "./Spinner";

interface Props {
  text: string;
  isLoading: boolean;
  fontSize?: number;
  buttonType?: "button" | "submit" | "reset";
  paddingTb?: number;
  paddingLr?: number;
}

const SpinnerButton: React.FC<Props> = ({
  text,
  isLoading,
  buttonType = "button",
  fontSize = 0.9,
  paddingTb = 5,
  paddingLr = 10,
}) => {
  return (
    <React.Fragment>
      <button type={buttonType}>
        {isLoading ? (
          <div>
            <Spinner size={10} />
          </div>
        ) : (
          <p>{text}</p>
        )}
      </button>

      <style jsx>{`
        button {
          margin-top: 20px;
          width: 20%;
          min-width: 80px;
          min-height: 30px;
          padding: ${paddingTb}px ${paddingLr}px;
          border: none;
          border-radius: 4px;
          align-self: flex-end;
          background: #2ecd71;
          color: #fff;
          transition: background 0.5s;
          cursor: pointer;
          font-size: ${fontSize}rem;
        }

        button:hover {
          background: #1fa458;
        }

        div {
          position: relative;
        }
      `}</style>
    </React.Fragment>
  );
};

export default SpinnerButton;
