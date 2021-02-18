// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
	if (event) {
		console.log('DOM loaded');
	}

	// UPDATE
	//assigns variable to buttons with chage-status class
	const changeStatusBtns = document.querySelectorAll('.change-status');

	// event listener for create button
	if (changeStatusBtns) {
		changeStatusBtns.forEach((button) => {
			button.addEventListener('click', (e) => {
				// Grabs the id of the element that goes by the name, "id"
				const id = e.target.getAttribute('data-id');
				const newStatus = e.target.getAttribute('data-newstatus');

				const statusUpdate = {
					eaten: newStatus
				};

				fetch(`/api/burgers/${id}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},

					// make sure to serialize the JSON body
					body: JSON.stringify(statusUpdate)
				}).then((response) => {
					//checks response and reloads page
					if (response.ok) {
						console.log(`changed status to: ${newStatus}`);
						location.reload('/');
					} else {
						//alerts user that status update did not work
						alert('something went wrong!');
					}
				});
			});
		});
	}

	// CREATE
	const createBurgerBtn = document.getElementById('create-form');

	if (createBurgerBtn) {
		//event listener for the add burger button
		createBurgerBtn.addEventListener('submit', (e) => {
			e.preventDefault();

			// Grabs the value of user input in form to assign new value to burger_name column
			const newBurger = {
				burger_name: document.getElementById('ca').value.trim()
			};

			// POST request
			fetch('/api/burgers', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},

				// make sure to serialize the JSON body
				body: JSON.stringify(newBurger)
			}).then(() => {
				// clears input box of user text
				document.getElementById('ca').value = '';

				// Reload the page
				location.reload();
			});
		});
	}

	// DELETE
	const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

	// Set up the event listeners for each delete button (1 delete button per burger)
	deleteBurgerBtns.forEach((button) => {
		button.addEventListener('click', (e) => {
			const id = e.target.getAttribute('data-id');

			// Send the delete request
			fetch(`/api/burgers/${id}`, {
				method: 'DELETE'
			}).then((res) => {
				console.log(res);
				//verify id of burger deleted in console
				console.log(`Deleted Burger: ${id}`);

				// Reload the page
				location.reload();
			});
		});
	});
});
