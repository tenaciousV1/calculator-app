import { useMachine } from "@xstate/react";
import calculatorMachine from "./../calculatorMachine";
import { ThemeContext } from "../ThemeContext";
import { useContext, useState } from "react";
//import { inspect } from "@xstate/inspect";

/*
inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false, // open in new window
});
*/

function Calculator() {
  const [state, send] = useMachine(calculatorMachine, { devTools: true });
  const { setTheme } = useContext(ThemeContext);

  const [rangeValue, setRangeValue] = useState(1);

  function formatNumberWithCommas(num) {
    let parts = num.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const handleRangeChange = (event) => {
    const value = event.target.value;

    let mappedValue = 0;
    if (value <= 2) mappedValue = 1;
    else if (value >= 3 && value <= 7) mappedValue = 5;
    else mappedValue = 9;

    setRangeValue(mappedValue);
    // Perform any additional logic or actions based on the range value
    switch (mappedValue) {
      case 1:
        setTheme("theme-1");
        break;
      case 5:
        setTheme("theme-2");
        break;
      default:
        setTheme("theme-3");
        break;
    }
  };

  return (
    <>
      <div className="w-[327px] pt-[30px] mx-auto font-display md:w-[540px] md:pt-[98px]">
        <div className="h-[42px] mb-8 flex justify-between text-screen-text">
          <h2 className="ml-[7px] text-[32px] tracking-[-0.53px] mt-[10px]">
            calc
          </h2>
          <div className="flex">
            <p className="mt-[26px] mr-[26px] text-[12px] tracking-[1px]">
              THEME
            </p>
            <div>
              <div className="flex justify-between mx-[7px] mb-[5px] text-[12px]">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={rangeValue}
                onChange={handleRangeChange}
                className="appearance-none range h-[26px] w-[71px] bg-keypad-background rounded-[13px] hover:cursor-pointer custom-range-input accent-equal-key-background hover:accent-equal-key-hover"
              />
            </div>
          </div>
        </div>
        <div className="overflow-scroll h-[88px] bg-screen-background text-[40px] tracking-[-0.67px] text-screen-text text-right px-6 pt-[19px] rounded-[10px] md:h-[128px] md:text-[56px] md:tracking-[-0.93px] md:pt-[30px] md:px-8">
          {formatNumberWithCommas(state.context.display)}
        </div>
        <div className="grid grid-cols-4 grid-rows-5 p-6 bg-keypad-background mt-6 rounded-[10px] gap-[13px] md:p-8 md:gap-6">
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "7" });
            }}
          >
            7
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "8" });
            }}
          >
            8
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "9" });
            }}
          >
            9
          </button>
          <button
            className="text-[20px] h-[60px] tracking-[-0.33px] md:text-[28px] md:tracking-[-0.47px] text-command-key-text bg-command-key-background rounded-[5px] hover:bg-command-key-hover shadow-[0_4px_0_0_var(--command-key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DEL");
            }}
          >
            DEL
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "4" });
            }}
          >
            4
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "5" });
            }}
          >
            5
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "6" });
            }}
          >
            6
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("OPER", { key: "+" });
            }}
          >
            +
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "1" });
            }}
          >
            1
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "2" });
            }}
          >
            2
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "3" });
            }}
          >
            3
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("OPER", { key: "-" });
            }}
          >
            -
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("POINT");
            }}
          >
            .
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("DIGIT", { key: "0" });
            }}
          >
            0
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("OPER", { key: "/" });
            }}
          >
            /
          </button>
          <button
            className="bg-key-background h-[60px] text-[32px] tracking-[-0.53px] md:text-[40px] md:tracking-[-0.67px] text-key-text hover:bg-key-hover rounded-[5px] shadow-[0_4px_0_0_var(--key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("OPER", { key: "x" });
            }}
          >
            x
          </button>
          <button
            className="col-span-2 text-[20px] h-[60px] tracking-[-0.33px] md:text-[28px] md:tracking-[-0.47px] text-command-key-text bg-command-key-background rounded-[5px] hover:bg-command-key-hover shadow-[0_4px_0_0_var(--command-key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("RESET");
            }}
          >
            RESET
          </button>
          <button
            className="col-span-2 text-[20px] h-[60px] tracking-[-0.33px] md:text-[28px] md:tracking-[-0.47px] text-equal-key-text bg-equal-key-background rounded-[5px] hover:bg-equal-key-hover shadow-[0_4px_0_0_var(--equal-key-shadow)] md:rounded-[10px]"
            onClick={() => {
              send("EQUALS");
            }}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
