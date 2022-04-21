function Pad(props) {
	return (
		<div
			className={props.styles !== undefined ? "pad " + props.styles : "pad"}
			id={props.id}
			onClick={(e) => {
				props.trigger(e);
			}}
		>
			{props.symbol}
		</div>
	);
}

export default Pad;
