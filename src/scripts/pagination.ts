const pageSize = 4;

type Pager = {
	name: string;
	container: HTMLElement;
	items: HTMLElement[];
	buttons: HTMLButtonElement[];
	prev?: HTMLButtonElement | null;
	next?: HTMLButtonElement | null;
	page: number;
	total: number;
};

const pagers: Pager[] = [...document.querySelectorAll<HTMLElement>('[data-pagination]')].map((container) => {
	const name = container.dataset.pagination ?? '';
	const scope = name === 'journal'
		? document.querySelector<HTMLElement>('[data-journal]')
		: document.querySelector<HTMLElement>(`[data-paginated-list="${name}"]`)?.parentElement ?? null;

	const items = scope
		? [...scope.querySelectorAll<HTMLElement>('[data-page]')].filter((item) => item.closest('[data-pagination]') === null)
		: [];

	return {
		name,
		container,
		items,
		buttons: [...container.querySelectorAll<HTMLButtonElement>('[data-page-button]')],
		prev: container.querySelector<HTMLButtonElement>('[data-page-prev]'),
		next: container.querySelector<HTMLButtonElement>('[data-page-next]'),
		page: 1,
		total: Math.max(1, Math.ceil(items.length / pageSize))
	};
});

const render = (pager: Pager, nextPage: number) => {
	pager.page = Math.min(Math.max(nextPage, 1), pager.total);

	pager.items.forEach((item) => {
		item.hidden = Number(item.dataset.page) !== pager.page;
	});

	pager.buttons.forEach((button) => {
		const isActive = Number(button.dataset.pageButton) === pager.page;
		button.toggleAttribute('data-active', isActive);
		button.setAttribute('aria-current', isActive ? 'page' : 'false');
	});

	pager.prev?.toggleAttribute('disabled', pager.page === 1);
	pager.next?.toggleAttribute('disabled', pager.page === pager.total);
};

pagers.forEach((pager) => {
	render(pager, 1);

	pager.buttons.forEach((button) => {
		button.addEventListener('click', () => render(pager, Number(button.dataset.pageButton)));
	});

	pager.prev?.addEventListener('click', () => render(pager, pager.page - 1));
	pager.next?.addEventListener('click', () => render(pager, pager.page + 1));
});
