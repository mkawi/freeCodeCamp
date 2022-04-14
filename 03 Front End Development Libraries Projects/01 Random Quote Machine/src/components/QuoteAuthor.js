function QuoteAuthor(props) {
	return (
		<div class="quote-author" style={{ color: props.colour }}>
			<span id="author"> - {props.text}</span>
		</div>
	);
}

export default QuoteAuthor;
