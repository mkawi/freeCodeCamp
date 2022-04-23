function SessionLength(props) {
	return (
		<div id="session-label">
			<h2>Session Length</h2>
			<div className="row">
				<button id="session-decrement" onClick={props.decrement}>
					🠋
				</button>
				<h3 id="session-length">{props.length}</h3>
				<button id="session-increment" onClick={props.increment}>
					🠉
				</button>
			</div>
		</div>
	);
}

export default SessionLength;
