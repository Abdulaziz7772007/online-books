import { BASE_URL } from './constants.js'
import { ui } from './ui.js'

function init() {
	fetch(BASE_URL)
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			const books = res.books
			localStorage.setItem('books', JSON.stringify(books))
			ui(books);
			
		})
		.catch(() => {})
		.finally(() => {})
}


init()