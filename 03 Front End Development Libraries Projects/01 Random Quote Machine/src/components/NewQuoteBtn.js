function NewQuoteBtn(props) {
	return (
		<button
			id="new-quote"
			onClick={() => {
				props.generateQuote();
				props.generateColour();
			}}
			style={{ backgroundColor: props.colour }}
		>
			New Quote
		</button>
	);
}

export default NewQuoteBtn;
