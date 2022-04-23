import { useState } from "react";
import BreakLength from "./BreakLength";
import SessionLength from "./SessionLength";
import Timer from "./Timer";
import Controls from "./Controls";
let intervalID;

function App() {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);
	const [timer, setTimer] = useState({
		started: false,
		type: "session",
		minutes: 25,
		seconds: 0,
	});

	function incrementBreak() {
		if (timer.started) {
			return;
		}

		setBreakLength((prevState) => {
			if (prevState.minutes >= 60) {
				return (prevState = 60);
			} else {
				return prevState + 1;
			}
		});
	}

	function decrementBreak() {
		if (timer.started) {
			return;
		}

		setBreakLength((prevState) => {
			if (prevState <= 1) {
				return prevState;
			} else {
				return prevState - 1;
			}
		});
	}

	function incrementTimer() {
		if (timer.started) {
			return;
		}

		setTimer((prevState) => {
			if (prevState.minutes >= 60) {
				return { ...prevState, minutes: 60 };
			} else {
				return { ...prevState, minutes: prevState.minutes + 1 };
			}
		});

		setSessionLength((prevState) => {
			if (prevState >= 60) {
				return (prevState = 60);
			} else {
				return prevState + 1;
			}
		});
	}

	function decrementTimer() {
		if (timer.started) {
			return;
		}
		setTimer((prevState) => {
			if (prevState.minutes <= 1) {
				return prevState;
			} else {
				return { ...prevState, minutes: prevState.minutes - 1 };
			}
		});
		setSessionLength((prevState) => {
			if (prevState <= 1) {
				return prevState;
			} else {
				return prevState - 1;
			}
		});
	}

	function resetTimer() {
		setBreakLength(5);
		setSessionLength(25);
		setTimer({
			started: false,
			type: "session",
			minutes: 25,
			seconds: 0,
		});
		stop();
		document.querySelector("#beep").pause();
		document.querySelector("#beep").currentTime = 0;
	}

	function controlTimer() {
		if (timer.started) {
			console.log("stop");
			stop();
			setTimer((prevState) => {
				return { ...prevState, started: false };
			});
		} else {
			console.log("start");
			start();
			setTimer((prevState) => {
				return { ...prevState, started: true };
			});
		}
	}

	function start() {
		intervalID = setInterval(startTimer, 1000);
	}

	function stop() {
		clearInterval(intervalID);
	}

	function startTimer() {
		setTimer((prevState) => {
			if (prevState.seconds === 0 && prevState.minutes === 0) {
				// Run Audio beep
				document.querySelector("#beep").play();
				// Change type to opposite (break to session, session to break)
				// Begin countdown from start of type length
				if (prevState.type === "session") {
					return {
						...prevState,
						type: "break",
						minutes: breakLength,
						seconds: 0,
					};
				} else if (prevState.type === "break") {
					return {
						...prevState,
						type: "session",
						minutes: sessionLength,
						seconds: 0,
					};
				}
			} else if (prevState.seconds === 0) {
				return {
					...prevState,
					minutes: prevState.minutes - 1,
					seconds: 59,
				};
			}

			return { ...prevState, seconds: prevState.seconds - 1 };
		});
	}

	return (
		<div className="wrapper">
			<h1>Pomodoro Timer</h1>
			<div className="lengths">
				<BreakLength
					length={breakLength}
					increment={incrementBreak}
					decrement={decrementBreak}
				/>
				<SessionLength
					length={sessionLength}
					increment={incrementTimer}
					decrement={decrementTimer}
				/>
			</div>
			<Timer length={timer} />
			<Controls control={controlTimer} reset={resetTimer} state={timer} />
			<audio
				id="beep"
				preload="auto"
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			/>
		</div>
	);
}

export default App;
