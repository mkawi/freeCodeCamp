function Editor(props) {
	return (
		<div className="editor">
			<div className="header">
				<h3>Editor</h3>
			</div>
			<div className="inputs">
				<textarea
					id="editor"
					type="text"
					onChange={(e) => props.onChange(e)}
					value={props.markdown}
				/>
			</div>
		</div>
	);
}

export default Editor;
