function exportCSV(column1, column2) {
	// intestazione
	let csvContent = "id;testo;done\n";

	for (let i = 0; i < column1.length; i++) {
		const id = i + 1; //id inventato a partire dall'indice
		const text = column1[i].replaceAll(";", ","); // sostituisce tutti i ";"
		const completed = column2[i] ? "si" : "no";

		csvContent += `${id};${text};${completed}\n`;
	}

	return csvContent;
}

function downloadFile(content, type, name) {

	const blob = new Blob([content], { type: type });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();

	URL.revokeObjectURL(url);
}