import { useAlert } from "@/context/AlertContext";
import React from "react";

export default function Alerts(props) {
  let classes = "info";
  const alertStyles = {
    success: "bg-green-200 text-green-900 border-green-600",
    error: "bg-red-200 text-red-900 border-red-600",
    warning: "bg-yellow-200 text-yellow-900 border-yellow-600",
    info: "bg-blue-200 text-blue-900 border-blue-600",
  };

  const { Alert } = useAlert();
  const { type, msg } = Alert || {};
  classes = alertStyles[type];
  const capatalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div>
      {Alert && (
        <div
          className={`${classes} border-t-4 rounded-b px-4 py-2 shadow-md`}
          role="alert"
        >
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className={`fill-current h-6 w-6 ${classes} mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sM">
                {" "}
                <span className="font-bold">{capatalize(type)}</span> : {msg}{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
