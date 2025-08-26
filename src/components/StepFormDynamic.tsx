import React, { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const StepFormDynamic = () => {
  const steps = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <>test</>,
    <>hdhfsi</>,
  ];
  const [currentStep, setCurrentStep] = useState(4);
  console.log("🚀 ~ StepFormDynamic ~ steps.length:", steps.length);
  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex items-center justify-center gap-2">
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={goPrev}
          disabled={currentStep === 0}
        >
          PREV BUTTON
        </button>
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={goNext}
          disabled={currentStep === steps.length - 1}
        >
          NEXT BUTTON
        </button>
      </div>

      <div className="p-10 bg-white text-black mt-5">{steps[currentStep]}</div>
    </div>
  );
};

export default StepFormDynamic;
