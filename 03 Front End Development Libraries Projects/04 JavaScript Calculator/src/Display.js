function Display(props) {
	return (
		<div className="display">
			<div id="display">{props.calculation}</div>
			<div className="result">{props.result}</div>
		</div>
	);
}

export default Display;
