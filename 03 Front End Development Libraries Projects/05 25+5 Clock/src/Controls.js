function Controls(props) {
	return (
		<div className="controls">
			<button id="start_stop" onClick={props.control}>
				{props.state.started ? "Pause" : "Start"}
			</button>
			<button id="reset" onClick={props.reset}>
				Reset
			</button>
		</div>
	);
}

export default Controls;
