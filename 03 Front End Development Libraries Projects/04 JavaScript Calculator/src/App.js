import { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./App.css";

const isOperator = /[x/+‑]/,
	endsWithOperator = /[x+‑/]$/,
	endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
	clearStyle = { background: "#ac3939" },
	operatorStyle = { background: "#666666" },
	equalsStyle = {
		background: "#004466",
		position: "relative",
		height: 148,
	};

function App() {
	const [state, setState] = useState({
		currentVal: "0",
		prevVal: "0",
		formula: "",
		currentSign: "pos",
		lastClicked: "",
		evaluated: false,
	});

	function resetBtn() {
		setState({
			currentVal: "0",
			prevVal: "0",
			formula: "",
			currentSign: "pos",
			lastClicked: "",
			evaluated: false,
		});
	}

	function maxDigitWarning() {
		setState((prevState) => {
			return {
				...prevState,
				currentVal: "Digit Limit Met",
				prevVal: state.currentVal,
			};
		});

		setTimeout(
			() =>
				setState((prevState) => {
					return { ...prevState, currentVal: state.prevVal };
				}),
			1000
		);
	}

	function handleEvaluate() {
		if (!state.currentVal.includes("Limit")) {
			let expression = state.formula;

			while (endsWithOperator.test(expression)) {
				expression = expression.slice(0, -1);
			}

			expression = expression
				.replace(/x/g, "*")
				.replace(/‑/g, "-")
				.replace("--", "+0+0+0+0+0+0+");

			let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;

			setState((prevState) => {
				return {
					...prevState,
					currentVal: answer.toString(),
					formula:
						expression
							.replace(/\*/g, "⋅")
							.replace(/-/g, "‑")
							.replace("+0+0+0+0+0+0+", "‑-")
							.replace(/(x|\/|\+)‑/, "$1-")
							.replace(/^‑/, "-") +
						"=" +
						answer,
					prevVal: answer,
					evaluated: true,
				};
			});
		}
	}

	function handleOperators(e) {
		if (!state.currentVal.includes("Limit")) {
			const value = e.target.value;
			const { formula, prevVal, evaluated } = state;

			setState((prevState) => {
				return {
					...prevState,
					currentVal: value,
					evaluated: false,
				};
			});

			if (evaluated) {
				setState((prevState) => {
					return {
						...prevState,
						formula: prevVal + value,
					};
				});
			} else if (!endsWithOperator.test(formula)) {
				setState((prevState) => {
					return {
						...prevState,
						prevVal: formula,
						formula: formula + value,
					};
				});
			} else if (!endsWithNegativeSign.test(formula)) {
				setState((prevState) => {
					return {
						...prevState,
						formula:
							(endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
							value,
					};
				});
			} else if (value !== "‑") {
				setState((prevState) => {
					return {
						...prevState,
						formula: prevVal + value,
					};
				});
			}
		}
	}

	function handleNumbers(e) {
		if (!state.currentVal.includes("Limit")) {
			const { currentVal, formula, evaluated } = state;
			const value = e.target.value;
			setState((prevState) => {
				return {
					...prevState,
					evaluated: false,
				};
			});
			if (currentVal.length > 21) {
				maxDigitWarning();
			} else if (evaluated) {
				setState((prevState) => {
					return {
						...prevState,
						currentVal: value,
						formula: value !== "0" ? value : "",
					};
				});
			} else {
				setState((prevState) => {
					return {
						...prevState,
						currentVal:
							currentVal === "0" || isOperator.test(currentVal)
								? value
								: currentVal + value,
						formula:
							currentVal === "0" && value === "0"
								? formula === ""
									? value
									: formula
								: /([^.0-9]0|^0)$/.test(formula)
								? formula.slice(0, -1) + value
								: formula + value,
					};
				});
			}
		}
	}

	function handleDecimal() {
		if (state.evaluated === true) {
			setState((prevState) => {
				return {
					...prevState,
					currentVal: "0.",
					formula: "0.",
					evaluated: false,
				};
			});
		} else if (
			!state.currentVal.includes(".") &&
			!state.currentVal.includes("Limit")
		) {
			setState((prevState) => {
				return { ...prevState, evaluated: false };
			});

			if (state.currentVal.length > 21) {
				maxDigitWarning();
			} else if (
				endsWithOperator.test(state.formula) ||
				(state.currentVal === "0" && state.formula === "")
			) {
				setState((prevState) => {
					return {
						...prevState,
						currentVal: "0.",
						formula: state.formula + "0.",
					};
				});
			} else {
				setState((prevState) => {
					return {
						...prevState,
						currentVal: state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
						formula: state.formula + ".",
					};
				});
			}
		}
	}

	return (
		<div className="calculator">
			<Display
				result={state.currentVal}
				calculation={state.formula.replace(/x/g, "⋅")}
			/>
			<Buttons
				decimal={handleDecimal}
				evaluate={handleEvaluate}
				initialize={resetBtn}
				numbers={handleNumbers}
				operators={handleOperators}
			/>
		</div>
	);
}

export default App;
export { clearStyle, operatorStyle, equalsStyle };
