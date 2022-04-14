import { useState, useEffect } from "react";
import QuoteText from "./QuoteText";
import QuoteAuthor from "./QuoteAuthor";
import NewQuoteBtn from "./NewQuoteBtn";
import TweetBtn from "./TweetBtn";

function QuoteBox() {
	const [quote, setQuote] = useState({});
	const [colour, setColour] = useState("");

	async function getQuote() {
		try {
			const request = await fetch(
				"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
			);
			const quoteData = await request.json();
			setQuote(
				quoteData.quotes[Math.floor(Math.random() * quoteData.quotes.length)]
			);
		} catch (error) {
			console.log("error, fetch quotes failed", error);
		}
	}

	function getRandomColour() {
		const letters = "0123456789ABCDEF";

		function generateHex() {
			let colour = "#";
			for (let i = 0; i < 6; i++) {
				colour += letters[Math.floor(Math.random() * 16)];
			}
			return colour;
		}

		let hexColour = generateHex();

		do {
			hexColour = generateHex();
		} while (hexColour === "#FFFFFF");

		setColour(hexColour);
	}

	useEffect(() => {
		getQuote();
		getRandomColour();
	}, []);

	return (
		<div id="wrapper" style={{ backgroundColor: colour }}>
			<div id="quote-box">
				<QuoteText text={quote.quote} colour={colour} />
				<QuoteAuthor text={quote.author} colour={colour} />
				<div className="btns">
					<TweetBtn colour={colour} tweet={quote} />
					<NewQuoteBtn
						generateQuote={getQuote}
						generateColour={getRandomColour}
						colour={colour}
					/>
				</div>
			</div>
		</div>
	);
}

export default QuoteBox;
