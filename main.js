// Array
let tasks = [
	"iniziare l'esercizio",
	"prendere il caffè",
	"completare l'esercizio"
];
let done = [
	true,
	true,
	false
];

// Riferimenti
const form = document.getElementById("todo-form");
const exportBtn = document.getElementById("btn-export-csv");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// Render con delegazione: nessun addEventListener qui
function renderTasks() {
	list.innerHTML = "";

	for (let i = 0; i < tasks.length; i++) {
		const li = document.createElement("li");

		// testo
		const span = document.createElement("span");
		span.textContent = tasks[i];
		if (done[i]) span.style.textDecoration = "line-through";

		// button completa
		const btnComplete = document.createElement("button");
		btnComplete.textContent = "✔";
		btnComplete.dataset.action = "toggle";
		btnComplete.dataset.index = i;

		// button elimina
		const btnDelete = document.createElement("button");
		btnDelete.textContent = "✖";
		btnDelete.dataset.action = "remove";
		btnDelete.dataset.index = i;

		li.appendChild(span);
		li.appendChild(btnComplete);
		li.appendChild(btnDelete);

		list.appendChild(li);
	}
}

// Submit: aggiunge attività
form.addEventListener("submit", function (event) {
	event.preventDefault();

	const text = input.value.trim();
	console.log(`list.add`, text);

	if (text === "") return;

	tasks.push(text);
	done.push(false);
	input.value = "";

	renderTasks();
});

// Delegazione eventi
list.addEventListener("click", function (event) {
	const action = event.target.dataset.action;
	const index = event.target.dataset.index;

	console.log(`list.clicked.${action}`, index);

	if (!action) return;

	if (action === "toggle") {
		done[index] = !done[index];
	}

	if (action === "remove") {
		tasks.splice(index, 1);
		done.splice(index, 1);
	}

	renderTasks();
});

exportBtn.addEventListener("click", function (event) {
	const fileContent = exportCSV(tasks, done);
	downloadFile(fileContent, "text/csv", "todo.csv");
})

// Primo render
renderTasks();
