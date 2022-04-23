function BreakLength(props) {
	return (
		<div id="break-label">
			<h2>Break Length</h2>
			<div className="row">
				<button id="break-decrement" onClick={props.decrement}>
					🠋
				</button>
				<h3 id="break-length">{props.length}</h3>
				<button id="break-increment" onClick={props.increment}>
					🠉
				</button>
			</div>
		</div>
	);
}

export default BreakLength;
