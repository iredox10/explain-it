import { FaTimes } from "react-icons/fa";

const Form = ({ title, subtitle, onsubmit,close, children }) => {
  return (
    <div className="border border-primary-color rounded-lg overflow-hidden shadow-lg">
      <div className="bg-primary-color text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-200 mt-1">{subtitle}</p>
          )}
        </div>
        <button 
          className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200" 
          onClick={close}
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={onsubmit} className="p-6 space-y-6 bg-white">
        {children}
      </form>
    </div>
  );
};

export default Form;
