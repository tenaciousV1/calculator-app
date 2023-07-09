import { createMachine, assign } from "xstate";

const isNotZero = (context, event) => event.key !== "0";
const isMinus = (context, event) => event.key === "-";
const notDivideByZero = (context, event) => {
  return !(Number(context.display) === 0 && context.operator === "/");
};

function doMath(operand1, operand2, operator) {
  switch (operator) {
    case "+":
      return +operand1 + +operand2;
    case "-":
      return +operand1 - +operand2;
    case "/":
      return +operand1 / +operand2;
    case "x":
      return +operand1 * +operand2;
    default:
      return Infinity;
  }
}

const calculatorMachine = createMachine(
  {
    id: "calculator",
    entry: "clear_all",
    initial: "ready",
    states: {
      ready: {
        initial: "begin",
        states: {
          begin: {
            on: {
              OPER: {
                cond: "isMinus",
                target: "#calculator.negated1",
              },
            },
          },
          result: {},
        },
        on: {
          DIGIT: [
            {
              cond: "isNotZero",
              target: "#calculator.operand1.int",
              actions: "insert_initial_digit",
            },
            {
              target: "#calculator.operand1.zero",
            },
          ],
          POINT: {
            target: "#calculator.operand1.frac",
          },
          OPER: {
            target: "opEntered",
            actions: [
              assign({
                operand1: (context, event) => {
                  return context.display;
                },
              }),
              "saveOperator",
            ],
          },
        },
      },
      operand1: {
        initial: "zero",
        states: {
          zero: {
            on: {
              DIGIT: {
                cond: "isNotZero",
                target: "int",
                actions: "insert_initial_digit",
              },
              POINT: {
                target: "frac",
              },
            },
          },
          int: {
            on: {
              POINT: {
                target: "frac",
              },
              DIGIT: {
                actions: "insert_digit",
              },
            },
          },
          frac: {
            entry: "insert_point",
            on: {
              DIGIT: {
                actions: "insert_digit",
              },
            },
          },
        },
        on: {
          OPER: {
            target: "opEntered",
            actions: [
              assign({
                operand1: (context, event) => {
                  return context.display;
                },
              }),
              "saveOperator",
            ],
          },
          DEL: {
            target: "ready",
            actions: "clear_display",
          },
        },
      },
      opEntered: {
        on: {
          DIGIT: [
            {
              cond: "isNotZero",
              target: "#calculator.operand2.int",
              actions: "insert_initial_digit",
            },
            {
              target: "#calculator.operand2.zero",
              actions: "clear_display",
            },
          ],
          POINT: {
            target: "#calculator.operand2.frac",
          },
          OPER: {
            cond: "isMinus",
            target: "negated2",
          },
        },
      },
      negated1: {
        entry: "negative_operand",
        on: {
          DIGIT: [
            {
              target: "#calculator.operand1.int",
              cond: "isNotZero",
              actions: "insert_initial_negative_digit",
            },
            {
              target: "#calculator.operand1.zero",
            },
          ],
          POINT: {
            target: "#calculator.operand1.frac",
          },
          DEL: {
            target: "ready",
            actions: "clear_display",
          },
        },
      },
      operand2: {
        initial: "zero",
        states: {
          zero: {
            on: {
              DIGIT: {
                cond: "isNotZero",
                target: "int",
                actions: "insert_initial_digit",
              },
              POINT: {
                target: "frac",
              },
            },
          },
          int: {
            on: {
              POINT: {
                target: "frac",
              },
              DIGIT: {
                actions: "insert_digit",
              },
            },
          },
          frac: {
            entry: "insert_point",
            on: {
              DIGIT: {
                actions: "insert_digit",
              },
            },
          },
        },
        on: {
          OPER: [
            {
              cond: "notDivideByZero",
              target: "opEntered",
              actions: [
                assign({
                  operand2: (context, event) => {
                    return context.display;
                  },
                }),
                "compute",
                assign({
                  operand1: (context, event) => {
                    return context.display;
                  },
                }),
                "saveOperator",
              ],
            },
            {
              target: "error",
            },
          ],
          EQUALS: [
            {
              cond: "notDivideByZero",
              target: "#calculator.ready.result",
              actions: [
                assign({
                  operand2: (context, event) => {
                    return context.display;
                  },
                }),
                "compute",
              ],
            },
            {
              target: "error",
            },
          ],
          DEL: {
            target: "opEntered",
            actions: "clear_display",
          },
        },
      },
      negated2: {
        entry: "negative_operand",
        on: {
          DIGIT: [
            {
              cond: "isNotZero",
              target: "#calculator.operand2.int",
              actions: "insert_initial_negative_digit",
            },
            {
              target: "#calculator.operand2.zero",
            },
          ],
          POINT: {
            target: "#calculator.operand2.frac",
          },
          DEL: {
            target: "opEntered",
            actions: "clear_display",
          },
        },
      },
      error: {
        invoke: {
          src: (context, event) => () => {
            // eslint-disable-next-line no-alert
            alert("Cannot divide by zero!");
            return Promise.resolve();
          },
          onDone: {
            target: "#calculator",
          },
        },
      },
    },
    on: {
      RESET: {
        target: "#calculator",
      },
    },
    context: {
      display: "0",
      operand1: "null",
      operand2: "null",
      operator: "null",
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    guards: {
      isMinus,
      isNotZero,
      notDivideByZero,
    },
    actions: {
      insert_initial_digit: assign({
        display: (context, event) => {
          return `${event.key}`;
        },
      }),
      compute: assign({
        display: (context, event) => {
          const result = doMath(
            context.operand1,
            context.operand2,
            context.operator
          );

          return result.toString();
        },
      }),
      saveOperator: assign({
        operator: (context, event) => {
          return `${event.key}`;
        },
      }),
      insert_point: assign({
        display: (context, event) => {
          return `${context.display}.`;
        },
      }),
      insert_digit: assign({
        display: (context, event) => {
          return `${context.display}${event.key}`;
        },
      }),
      insert_initial_negative_digit: assign({
        display: (context, event) => {
          return `-${event.key}`;
        },
      }),
      negative_operand: assign({
        display: (context, event) => {
          return `-0`;
        },
      }),
      clear_all: assign({
        display: (context, event) => "0",
        operand1: (context, event) => "null",
        operand2: (context, event) => "null",
        operator: (context, event) => "null",
      }),
      clear_display: assign({
        display: () => "0",
      }),
    },
  }
);

export default calculatorMachine;
