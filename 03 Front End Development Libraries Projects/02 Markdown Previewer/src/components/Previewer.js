import { marked } from "marked";

function Previewer(props) {
	marked.setOptions({
		breaks: true,
	});

	const renderer = new marked.Renderer();
	renderer.link = function (href, title, text) {
		return `<a target="_blank" href="${href}">${text}</a>`;
	};

	return (
		<div className="previewer">
			<div className="header">
				<h3>Preview</h3>
			</div>
			<div
				id="preview"
				dangerouslySetInnerHTML={{
					__html: marked(props.markdown, { renderer: renderer }),
				}}
			></div>
		</div>
	);
}

export default Previewer;
