// Array
let tasks = [
	{ name: "iniziare l'esercizio", done: true },
	{ name: "prendere il caffè", done: true },
	{ name: "completare l'esercizio", done: true },
	{ name: "convertire in oggetti", done: false }
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

		const { name, done } = tasks[i];

		// testo
		const span = document.createElement("span");
		span.textContent = name;
		if (done) { span.style.textDecoration = "line-through"; }

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

	const name = input.value.trim();
	console.log(`list.add`, name);

	if (name === "") return;

	const newTodo = {
		name,
		done: false
	};

	tasks.push(newTodo);

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
		tasks[index].done = !tasks[index].done;
	}

	if (action === "remove") {
		tasks.splice(index, 1);
	}

	renderTasks();
});

// Primo render
renderTasks();
