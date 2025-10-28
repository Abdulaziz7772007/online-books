import {
	buyCardTemplateEl,
	buyContainerEl,
	pricesEl,
} from './html-selection.js'

let boughtBooks = JSON.parse(localStorage.getItem('boughtBooks')) || []
let priceEl = 0

function renderBoughtBooks() {
	buyContainerEl.innerHTML = ''
	priceEl = 0

	boughtBooks.forEach(book => {
		const clone = buyCardTemplateEl.cloneNode(true).content

		const img = clone.getElementById('image')
		const title = clone.getElementById('title')
		const author = clone.getElementById('author')
		const category = clone.getElementById('category')
		const description = clone.getElementById('description')
		const price = clone.getElementById('price')
		const unBuyEl = clone.getElementById('unBuy')

		img.src = book.image
		img.alt = book.title
		title.textContent = book.title
		author.textContent = book.author
		category.textContent = book.category
		description.textContent = book.description
		price.textContent = `${book.price} so'm`
		priceEl += book.price

		unBuyEl.addEventListener('click', () => {
			boughtBooks = boughtBooks.filter(b => b.id !== book.id)
			localStorage.setItem('boughtBooks', JSON.stringify(boughtBooks))
			renderBoughtBooks()
		})

		buyContainerEl.appendChild(clone)
	})

	pricesEl.textContent = `${priceEl} so'm`
}

renderBoughtBooks()
