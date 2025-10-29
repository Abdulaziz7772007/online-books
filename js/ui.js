import { buyNumEl, cardContainerEl, cardTemplateEl } from './html-selection.js'

export function add(id, books) {
	const book = books.find(b => b.id === id)
	if (!book) {
		console.error('Kitob topilmadi:', id)
		return
	}

	let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []
	const alreadyExists = savedBooks.some(b => b.id === book.id)

	if (alreadyExists) {
		savedBooks = savedBooks.filter(b => b.id !== book.id)
		localStorage.setItem('savedBooks', JSON.stringify(savedBooks))
		alert(`${book.title} saqlanganlardan olib tashlandi!`)
	} else {
		savedBooks.push(book)
		localStorage.setItem('savedBooks', JSON.stringify(savedBooks))
		alert(`${book.title} saqlandi!`)
	}
}

export function buy(id, books) {
	const book = books.find(b => b.id === id)
	if (!book) return

	let boughtBooks = JSON.parse(localStorage.getItem('boughtBooks')) || []
	const alreadyBought = boughtBooks.some(b => b.id === book.id)

	if (alreadyBought) {
		boughtBooks = boughtBooks.filter(b => b.id !== book.id)
		localStorage.setItem('boughtBooks', JSON.stringify(boughtBooks))
		alert(`${book.title} sotib olinganlardan olib tashlandi!`)
	} else {
		boughtBooks.push(book)
		localStorage.setItem('boughtBooks', JSON.stringify(boughtBooks))
		alert(`${book.title} muvaffaqiyatli sotib olindi! 🛍`)
	}

	buyNumEl.textContent = boughtBooks.length
}

export function ui(books) {
	cardContainerEl.innerHTML = ''

	const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []
	const boughtBooks = JSON.parse(localStorage.getItem('boughtBooks')) || []
	buyNumEl.textContent = boughtBooks.length

	let searchInput = document.getElementById('searchInput')
	

	function render(filteredBooks) {
		cardContainerEl.innerHTML = ''
		filteredBooks.forEach(book => {
			const clone = cardTemplateEl.cloneNode(true).content

			const titleEl = clone.getElementById('title')
			const authorEl = clone.getElementById('author')
			const priceEl = clone.getElementById('price')
			const imageEl = clone.getElementById('image')
			const categoryEl = clone.getElementById('category')
			const descriptionEl = clone.getElementById('description')
			const saveBtnEl = clone.getElementById('save')
			const buyBtnEl = clone.getElementById('buy')
			const readBtnEl = clone.getElementById('read')

			imageEl.src = book.image
			imageEl.alt = book.title
			titleEl.textContent = book.title
			authorEl.textContent = book.author
			categoryEl.textContent = book.category
			descriptionEl.textContent = book.description
			priceEl.textContent = `${book.price} so'm`

			const isBought = boughtBooks.some(b => b.id === book.id)
			buyBtnEl.textContent = isBought ? '✅ Sotib olingan' : '🛒 Sotib olish'
			buyBtnEl.className = isBought
				? 'bg-green-500 text-white px-3 py-1 rounded cursor-pointer'
				: 'bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer'

			buyBtnEl.addEventListener('click', () => {
				buy(book.id, books)

				const updatedBought =
					JSON.parse(localStorage.getItem('boughtBooks')) || []
				const nowBought = updatedBought.some(b => b.id === book.id)

				buyBtnEl.textContent = nowBought ? '✅ Sotib olingan' : '🛒 Sotib olish'
				buyBtnEl.className = nowBought
					? 'bg-green-500 text-white px-3 py-1 rounded cursor-pointer'
					: 'bg-blue-500 text-white px-3 py-1 rounded  cursor-pointer'
			})

			const isSaved = savedBooks.some(b => b.id === book.id)
			saveBtnEl.textContent = isSaved ? '❤' : '♡'
			saveBtnEl.addEventListener('click', () => {
				add(book.id, books)

				const updatedSaved =
					JSON.parse(localStorage.getItem('savedBooks')) || []
				const nowSaved = updatedSaved.some(b => b.id === book.id)
				saveBtnEl.textContent = nowSaved ? '❤' : '♡'
			})

			readBtnEl.addEventListener('click', () => {
				if (book.pdf) {
					window.open(book.pdf, '_blank')
				} else {
					alert('Bu kitob uchun PDF mavjud emas 😔')
				}
			})

			cardContainerEl.appendChild(clone)
		})
	}

	render(books)

	searchInput.addEventListener('input', e => {
		const query = e.target.value.toLowerCase()
		const filtered = books.filter(
			book =>
				book.title.toLowerCase().includes(query) ||
				book.author.toLowerCase().includes(query)
		)
		render(filtered)
	})
}
