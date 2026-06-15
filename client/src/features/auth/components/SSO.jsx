import React from "react";
import googleLogo from "/google.png";
import appleLogo from "/apple.png";
export default function () {
  return (
    <div className="flex justify-between gap-2">
      <button className="flex items-center gap-2 rounded-xl border border-gray-500 px-6 min-w-38 md:min-w-60">
        <img src={googleLogo} alt="" className="size-6" />
        <p>Google</p>
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-gray-500 px-6 min-w-38 md:min-w-60">
        <img src={appleLogo} alt="" className="size-8" />
        <p>Apple</p>
      </button>
    </div>
  );
}
