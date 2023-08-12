import React, { useEffect } from "react";

interface AlertType {
  showAlert: boolean;
  hideAlert: () => void;
  type: string;
  message: string
}
export const Alert: React.FC<AlertType> = ({ showAlert, hideAlert, type, message }) => {
  // console.log("showAlert in component", showAlert);

  useEffect(() => {
    const timer = setTimeout(() => {
      hideAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showAlert ? (
        <div
          className={`z-20 fixed left-0 right-0 md:translate-x-24 bottom-2 mx-auto w-4/5 md:w-1/2 flex items-center my-4 px-6 py-4 border-0 text-white rounded-md ${
            type == "error" ? `bg-red-500` : `bg-emerald-400`
          }`}
        >
          <span className="text-xl block mr-9 ">
            <i className="fas fa-bell" />
          </span>
          <span className="block">
            <b className="capitalize">{message}</b>
          </span>
          <button
            className="ml-auto text-2xl font-semibold leading-none outline-none focus:outline-none"
            onClick={hideAlert}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
