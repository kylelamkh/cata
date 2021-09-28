import React, { useState, useEffect } from 'react'

import Card from './Card'
import loading from './loading.gif'
import './App.css'

async function getPhotos() {
	let url = []
	try {
		const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&size=full&mime_types=png,jpg', {
			method: 'GET',
			headers: { 'x-api-key': 'f2acafec-002e-43e5-8d28-2acfffc1bc77' },
		})
		const data = await response.json()
		url = data.map((entry) => {
			return entry.url
		})
		console.log(url)
	} catch (e) {
		console.log(e)
	}
	return url
}

function App() {
	const [photoURL, setPhotoURL] = useState([loading])
	const [urlPointer, setUrlPointer] = useState(0)
	const [buttonPushed, setButtonPushed] = useState(false)

	useEffect(() => {
		;(async () => {
			setPhotoURL(await getPhotos())
		})()
	}, [])

	return (
		<div className="container">
			<Card photoURL={photoURL[urlPointer]} id="top" />
			<Card photoURL={photoURL[urlPointer + 1]} id="bottom" />
		</div>
	)
}

export default App
