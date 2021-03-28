import React, { FormEventHandler } from "react";

interface Props {
  defaultTitle?: string;
  defaultBody?: string;
  onSubmit: FormEventHandler;
  buttonText: string;
}

const FeatureEditor: React.FC<Props> = ({ defaultTitle, defaultBody, onSubmit, buttonText }) => {
  return (
    <>
      <form className="feature-editor" onSubmit={onSubmit}>
        <div>
          <input type="text" name="title" placeholder="Title" defaultValue={defaultTitle} required />
          <textarea name="body" placeholder="Body" defaultValue={defaultBody} />
        </div>
        <button type="submit">{buttonText}</button>
      </form>

      <style jsx>{`
        form {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
        }

        div {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        input {
          width: 40%;
          margin-right: 20px;
          padding: 5px;
        }

        textarea {
          resize: none;
          width: 50%;
          font-size: 0.7rem;
          padding: 5px 10px;
          height: 100px;
        }

        input,
        textarea {
          border: 0.7px solid #929292;
        }

        button {
          margin-top: 10px;
          align-self: flex-end;
          cursor: pointer;
          border: 0.7px solid black;
          border-radius: 20px;
          padding: 5px 8px;
        }
      `}</style>
    </>
  );
};

export default FeatureEditor;
