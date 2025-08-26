import { useState } from "react";
import StatusBadge from "./StatusBadge";
import FunctionComponentExample from "./FunctionComponentExample.";
const HomeContent = () => {
  const [count, setCount] = useState(3);

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-4xl text-10 font-bold text-primary">HomeContent</h1>
        <h1 className="text-4xl font-bold text-red-800">HomeContent</h1>
        <h1 className="text-4xl font-medium font-100 text-primary-cst">
          HomeContent
        </h1>
        <h1 className="text-4xl font-bold text-custom-color">HomeContent</h1>
      </div>
      <StatusBadge status="active" />
      <StatusBadge status="inactive" />{" "}
      <div className="relative inline-block">
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={() => setCount(count + 1)}
        >
          Notifications
        </button>
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {count}
          </span>
        )}
      </div>
      <FunctionComponentExample />
    </>
  );
};

export default HomeContent;
