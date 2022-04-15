import { useState, useEffect } from "react";

function DrumPad(props) {
	const [active, setActive] = useState(false);

	function playSound() {
		const sound = document.getElementById(props.keyTrigger);
		sound.currentTime = 0;
		sound.play();
		document.querySelector("#display").innerText = props.clipId;
	}

	function handleKeyPress(e) {
		if (e.keyCode === props.keyCode) {
			playSound();
			document.querySelector("#display").innerText = props.clipId;
			setActive(true);
			setTimeout(() => {
				setActive(false);
			}, 100);
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", (e) => handleKeyPress(e));

		return document.removeEventListener("keydown", (e) => handleKeyPress(e));
	});

	return (
		<div
			className={active ? "drum-pad active" : "drum-pad"}
			id={props.clipId}
			onClick={playSound}
		>
			<audio className="clip" id={props.keyTrigger} src={props.clip} />
			{props.keyTrigger}
		</div>
	);
}

export default DrumPad;
