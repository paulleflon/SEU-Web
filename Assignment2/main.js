const { createApp, ref, defineModel, computed } = Vue;
createApp({
	setup() {
		const users = ref([]);
		const age = ref(14);
		const name = ref('');
		const location = ref(null);
		const skills = ref({
			JavaScript: false,
			'Vue.js': false,
			Python: false,
			'Data Science': false,
		});
		const formSent = ref(false);

		const displaySkills = computed(() =>
			Object.keys(skills.value)
				.filter((skill) => skills.value[skill])
				.join(', ')
		);
		const fancyBoxBackground = computed(() =>
			formSent.value ? '#00c3ff' : '#33c26f'
		);
		const send = () => {
			if (!name.value || !age.value || !location.value) {
				alert('Please fill in all fields');
				return;
			}
			formSent.value = true;
			users.value.push({
				name: name.value,
				age: age.value,
				location: location.value,
				skills: Object.keys(skills.value).filter(
					(skill) => skills.value[skill]
				),
			});
			clear();
		};

		const clear = (full = false) => {
			if (full) formSent.value = false;
			name.value = '';
			age.value = null;
			location.value = null;
			Object.keys(skills.value).forEach(
				(skill) => (skills.value[skill] = false)
			);
		};

		return {
			users,
			name,
			location,
			age,
			locations: [
				'Nan Jing',
				'Bei Jing',
				'Shang Hai',
				'Hang Zhou',
				'Guang Zhou',
			],
			skills,
			formSent,
			displaySkills,
			fancyBoxBackground,
			send,
			clear,
		};
	},
}).mount('#app');
