function Timer(props) {
	return (
		<div id="timer-label">
			<h2>{props.length.type === "session" ? "Session" : "Break"}</h2>
			<h1 id="time-left">
				{props.length.minutes < 10
					? "0" + props.length.minutes
					: props.length.minutes}
				:
				{props.length.seconds < 10
					? "0" + props.length.seconds
					: props.length.seconds}
			</h1>
		</div>
	);
}

export default Timer;
