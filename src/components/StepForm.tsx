import React, { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import StepFormDynamic from "./StepFormDynamic";
import UseEffectExample from "./UseEffectExample";

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  console.log("🚀 ~ StepForm ~ currentStep:", currentStep);

  return (
    <>
      <UseEffectExample />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-center gap-2">
          {currentStep > 1 && (
            <button
              className={`bg-blue-600 text-white p-2 rounded min-w-[200px] ${
                currentStep === 4 ? "hidden" : ""
              }`}
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              PREV BUTTON
            </button>
          )}
          <button
            className={`bg-blue-600 text-white p-2 rounded min-w-[200px] ${
              currentStep === 4 ? "hidden" : ""
            }`}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {currentStep === 3 ? "SUBMIT" : "NEXT BUTTON"}
          </button>
        </div>
        <div className="p-10 bg-white text-black mt-5">
          {currentStep === 1 && (
            <div>
              <FirstStep />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <SecondStep />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <ThirdStep />
            </div>
          )}
          {currentStep === 4 && <div>Form is submit successfully</div>}
        </div>
      </div>
      <StepFormDynamic />
    </>
  );
};

export default StepForm;
