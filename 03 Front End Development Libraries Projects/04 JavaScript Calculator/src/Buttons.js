import { clearStyle, operatorStyle, equalsStyle } from "./App";

function Buttons(props) {
	return (
		<div className="wrapper">
			<div className="first-row row">
				<button
					className="jumbo"
					id="clear"
					onClick={props.initialize}
					style={clearStyle}
					value="AC"
				>
					AC
				</button>
				<button
					id="divide"
					onClick={props.operators}
					style={operatorStyle}
					value="/"
				>
					/
				</button>
				<button
					id="multiply"
					onClick={props.operators}
					style={operatorStyle}
					value="x"
				>
					x
				</button>
			</div>
			<div className="second-row row">
				<button id="seven" onClick={props.numbers} value="7">
					7
				</button>
				<button id="eight" onClick={props.numbers} value="8">
					8
				</button>
				<button id="nine" onClick={props.numbers} value="9">
					9
				</button>
				<button
					id="subtract"
					onClick={props.operators}
					style={operatorStyle}
					value="‑"
				>
					‑
				</button>
			</div>
			<div className="third-row row">
				<button id="four" onClick={props.numbers} value="4">
					4
				</button>
				<button id="five" onClick={props.numbers} value="5">
					5
				</button>
				<button id="six" onClick={props.numbers} value="6">
					6
				</button>
				<button
					id="add"
					onClick={props.operators}
					style={operatorStyle}
					value="+"
				>
					+
				</button>
			</div>
			<div className="inner-wrapper">
				<div className="left">
					<div className="fourth-row row">
						<button id="one" onClick={props.numbers} value="1">
							1
						</button>
						<button id="two" onClick={props.numbers} value="2">
							2
						</button>
						<button id="three" onClick={props.numbers} value="3">
							3
						</button>
					</div>
					<div className="fifth-row row">
						<button
							className="jumbo"
							id="zero"
							onClick={props.numbers}
							value="0"
						>
							0
						</button>
						<button id="decimal" onClick={props.decimal} value=".">
							.
						</button>
					</div>
				</div>
				<div className="right">
					<button
						id="equals"
						onClick={props.evaluate}
						style={equalsStyle}
						value="="
					>
						=
					</button>
				</div>
			</div>
		</div>
	);
}

export default Buttons;
