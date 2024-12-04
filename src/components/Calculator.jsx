import React, { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastOperation, setLastOperation] = useState("");

  const handleNumber = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
    setEquation((prev) => prev + num);
  };

  const handleOperator = (op) => {
    setLastOperation(op);
    setEquation((prev) => prev + " " + op + " ");
    setDisplay("0");
  };

  const handleBracket = (bracket) => {
    setEquation((prev) => prev + bracket);
    setDisplay("0");
  };

  const handleBackspace = () => {
    if (equation.length > 0) {
      // Remove last character from equation
      let newEquation = equation;
      // If last character was part of an operator with spaces
      if (equation.endsWith(" ")) {
        newEquation = equation.slice(0, -3); // Remove operator and spaces
      } else {
        newEquation = equation.slice(0, -1); // Remove single character
      }
      setEquation(newEquation);

      // Update display
      const lastNumber =
        newEquation
          .split(/[\s\(\)]/)
          .filter(Boolean)
          .pop() || "0";
      setDisplay(lastNumber);
    } else {
      setDisplay("0");
    }
  };

  const calculate = () => {
    try {
      // Using Function constructor instead of eval for better security
      const result = new Function("return " + equation)();
      setDisplay(result.toString());
      setEquation(result.toString());
    } catch (error) {
      setDisplay("Error");
      setEquation("");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setLastOperation("");
  };

  const buttons = [
    "C",
    "(",
    ")",
    "⌫",
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  const getBtnClassName = (btn) => {
    const baseClass = `
      h-14 rounded-lg text-white text-xl font-light
      transform transition-all duration-100
      hover:scale-95 hover:brightness-110
      active:scale-90 active:brightness-90
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
    `;

    if (btn === "⌫") return `${baseClass} bg-red-600 hover:bg-red-500`;
    if (/[0-9.]/.test(btn)) return `${baseClass} bg-gray-700`;
    if (/[÷×\-+]/.test(btn)) return `${baseClass} bg-blue-600`;
    if (btn === "=") return `${baseClass} bg-blue-500`;
    if (/[\(\)]/.test(btn)) return `${baseClass} bg-gray-600`;
    return `${baseClass} bg-gray-600`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 noselect">
      <div className="w-full max-w-xs bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all ">
        <div className="p-4">
          <div className="text-blue-400 text-sm font-medium mb-2">
            Calculator made by Prince
          </div>
          <div className="text-right mb-2">
            <div className="text-gray-400 text-sm h-6 overflow-hidden">
              {equation || "\u00A0"}
            </div>
            <div className="text-white text-4xl font-light tracking-wider overflow-hidden">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {buttons.map((btn) => (
              <button
                key={btn}
                className={getBtnClassName(btn)}
                onClick={() => {
                  if (/[0-9.]/.test(btn)) handleNumber(btn);
                  else if (/[÷×\-+]/.test(btn)) handleOperator(btn);
                  else if (/[\(\)]/.test(btn)) handleBracket(btn);
                  else if (btn === "=") calculate();
                  else if (btn === "C") clear();
                  else if (btn === "⌫") handleBackspace();
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
