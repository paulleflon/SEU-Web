async function deleteUser(id) {
	if (confirm(`Are you sure you want to delete user #${id}`)) {
		const res = await fetch(`/users/delete/${id}`, {method: 'DELETE'});
		if (res.ok)
			location.href = '/?success=delete_user';
		else alert('Failed to delete user');
	}
}

const buttons = document.querySelectorAll('.delete-user');
for (const btn of buttons) {
	const id = btn.getAttribute('data-user-id');
	btn.addEventListener('click', () => deleteUser(id));
}

const error = new URLSearchParams(location.search).get('error');
const success = new URLSearchParams(location.search).get('success');
const container = document.querySelector('.status-message-container');

if (error) {
	container.classList.add('error');
	switch (error) {
		case 'add_missing_fields':
			container.textContent = 'Please fill in all fields';
			break;
		case 'add_invalid_email':
			container.textContent = 'Invalid email';
			break;
		case 'edit_missing_fields':
			container.textContent = 'Please fill in all fields';
			break;
		case 'edit_invalid_email':
			container.textContent = 'Invalid email';
			break;
		default:
			container.textContent = 'An error occurred';
	}
} else if (success) {
	container.classList.add('success');
	switch (success) {
		case 'add_user':
			container.textContent = 'User added successfully';
			break;
		case 'edit_user':
			container.textContent = 'User edited successfully';
			break;
		case 'delete_user':
			container.textContent = 'User deleted successfully';
			break;
		default:
			container.textContent = 'An error occurred';
	}
}