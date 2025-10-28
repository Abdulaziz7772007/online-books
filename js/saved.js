import { saveCardTemplateEl, saveContainerEl } from './html-selection.js'

const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []

savedBooks.forEach(book => {
	const clone = saveCardTemplateEl.cloneNode(true).content

	const img = clone.getElementById('image')
	const title = clone.getElementById('title')
	const author = clone.getElementById('author')
	const category = clone.getElementById('category')
	const description = clone.getElementById('description')
	const price = clone.getElementById('price')

	img.src = book.image
	img.alt = book.title
	title.textContent = book.title
	author.textContent = book.author
	category.textContent = book.category
	description.textContent = book.description
	price.textContent = book.price

	saveContainerEl.appendChild(clone)
})
