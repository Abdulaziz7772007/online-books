import {  cardContainerEl, cardTemplateEl } from './html-selection.js'

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
		alert(`${book.title} allaqachon sotib olingan!`)
		return
	}

	boughtBooks.push(book)
	localStorage.setItem('boughtBooks', JSON.stringify(boughtBooks))
	alert(`${book.title} muvaffaqiyatli sotib olindi! 🛍`)
}

export function ui(books) {
	cardContainerEl.innerHTML = ''

	const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []

	books.forEach(book => {
		const clone = cardTemplateEl.cloneNode(true).content

		const titleEl = clone.getElementById('title')
		const authorEl = clone.getElementById('author')
		const priceEl = clone.getElementById('price')
		const imageEl = clone.getElementById('image')
		const categoryEl = clone.getElementById('category')
		const descriptionEl = clone.getElementById('description')
		const saveBtnEl = clone.getElementById('save')
		const buyBtnEl = clone.getElementById('buy')

		imageEl.src = book.image
		imageEl.alt = book.title
		titleEl.textContent = book.title
		authorEl.textContent = book.author
		categoryEl.textContent = book.category
		descriptionEl.textContent = book.description
		priceEl.textContent = `${book.price} so'm`
		buyBtnEl.addEventListener('click', () => buy(book.id, books))
		const isSaved = savedBooks.some(b => b.id === book.id)
		saveBtnEl.textContent = isSaved ? '❤' : '♡'
		saveBtnEl.addEventListener('click', () => {
			add(book.id, books)

			const updatedSaved = JSON.parse(localStorage.getItem('savedBooks')) || []
			const nowSaved = updatedSaved.some(b => b.id === book.id)
			saveBtnEl.textContent = nowSaved ? '❤' : '♡'
		})

		cardContainerEl.appendChild(clone)
	})
}
