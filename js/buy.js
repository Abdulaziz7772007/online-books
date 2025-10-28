import { buyCardTemplateEl, buyContainerEl } from './html-selection.js'

const boughtBooks = JSON.parse(localStorage.getItem('boughtBooks')) || []

boughtBooks.forEach(book => {
	const clone = buyCardTemplateEl.cloneNode(true).content
	
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

	buyContainerEl.appendChild(clone)
})
