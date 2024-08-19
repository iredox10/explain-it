import { FaTimes } from "react-icons/fa";

const Form = ({ title, subtitle, onsubmit,close, children }) => {
  return (
    <div className="border border-primary-color">
      <div className="bg-primary-color text-white  text-2xl px-2 py-3 flex items-center ">
        <h1 className="">
          {title} <span className="text-sm">{subtitle}</span>
        </h1>
        <button className="self-end ml-12" onClick={close}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={onsubmit} className="my-6 px-2">
        {children}
      </form>
    </div>
  );
};

export default Form;
