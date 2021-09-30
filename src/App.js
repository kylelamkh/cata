import React, { useState, useEffect, useCallback } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

import Controls from './Controls'
import Card from './Card'
import loading from './loading.gif'
import './App.css'

async function getPhotos() {
	let url = []
	try {
		const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=20&size=full&mime_types=png,jpg', {
			method: 'GET',
			headers: { 'x-api-key': 'f2acafec-002e-43e5-8d28-2acfffc1bc77' },
		})
		const data = await response.json()
		url = data.map((entry) => {
			return entry.url
		})
	} catch (e) {
		console.log(e)
	}
	return url
}

function App() {
	const naturalState = {
		nope: false,
		like: false,
		superLike: false,
	}

	const [state, setState] = useState(naturalState)
	const [stateArr, setStateArr] = useState(['none'])
	const [photoURL, setPhotoURL] = useState([loading])
	const [urlPointer, setUrlPointer] = useState(0)
	const [isBtnClicked, setIsBtnClicked] = useState(false)

	const swiping = useCallback(() => {
		let elmnt = document.getElementById('discard')
		let originalLeft = elmnt.offsetLeft
		let id = null
		let left = elmnt.offsetLeft
		let top = elmnt.offsetTop
		const naturalState = {
			nope: false,
			like: false,
			superLike: false,
		}
		clearInterval(id)
		if (state.like) id = setInterval(likeAnimation, 1)
		else if (state.nope) id = setInterval(nopeAnimation, 1)
		else if (state.superLike) id = setInterval(superLikeAnimation, 1)

		function likeAnimation() {
			let rotateDegree = elmnt.offsetLeft - originalLeft
			if (top > window.innerHeight || left > window.innerWidth) {
				clearInterval(id)
				setIsBtnClicked(() => false)
				setState(() => naturalState)
			} else {
				top += 3
				left += 10
				elmnt.style.top = top + 'px'
				elmnt.style.left = left + 'px'
				elmnt.style.transform = 'rotate(' + 0.05 * rotateDegree + 'deg)'
			}
		}

		function nopeAnimation() {
			let rotateDegree = elmnt.offsetLeft - originalLeft
			if (top > window.innerHeight || left < elmnt.offsetWidth * -1) {
				clearInterval(id)
				setIsBtnClicked(() => false)
				setState(() => naturalState)
			} else {
				top += 3
				left -= 10
				elmnt.style.top = top + 'px'
				elmnt.style.left = left + 'px'
				elmnt.style.transform = 'rotate(' + 0.05 * rotateDegree + 'deg)'
			}
		}

		function superLikeAnimation() {
			if (top < elmnt.offsetHeight * -1) {
				clearInterval(id)
				setIsBtnClicked(() => false)
				setState(() => naturalState)
			} else {
				top -= 10
				elmnt.style.top = top + 'px'
			}
		}
	}, [state])

	useEffect(() => {
		if (urlPointer >= photoURL.length - 10) {
			;(async () => {
				const newPhotos = await getPhotos()
				setPhotoURL((prevArr) => [...prevArr, ...newPhotos])
			})()
		}
		if (photoURL.length > 1 && urlPointer === 0) setUrlPointer(() => 1)
	}, [urlPointer, photoURL.length])

	useDeepCompareEffect(() => {
		if (isBtnClicked) {
			let stateToString = ''
			for (const key in state) {
				if (state[key]) stateToString = key
			}
			setStateArr((prevArr) => [...prevArr, stateToString])
			setUrlPointer((prevValue) => prevValue + 1)
			swiping()
		}
	}, [isBtnClicked, state])

	return (
		<div className="container">
			<Controls state={state} setState={setState} naturalState={naturalState} isBtnClicked={isBtnClicked} setIsBtnClicked={setIsBtnClicked} />
			{isBtnClicked ? <Card id="discard" state={state} photoURL={photoURL[urlPointer - 1]} localState={stateArr[urlPointer - 1]} /> : null}
			<Card id="top" photoURL={photoURL[urlPointer]} state={state} setState={setState} naturalState={naturalState} />
			{urlPointer + 1 > photoURL.length ? <Card id="bottom" photoURL={photoURL[0]} /> : <Card id="bottom" photoURL={photoURL[urlPointer + 1]} />}
		</div>
	)
}

export default App
