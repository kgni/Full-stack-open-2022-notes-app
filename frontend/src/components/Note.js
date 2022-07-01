const Note = ({ note, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important';

	return (
		<li className="note">
			{note.content}
			<button className="btn important-btn" onClick={toggleImportance}>
				{label}
			</button>
		</li>
	);
};

export default Note;
