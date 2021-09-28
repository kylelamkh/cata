import ReactTestUtils from 'react-dom/test-utils'

function dragElement(elmnt, state) {
	let pos1 = 0
	let pos2 = 0
	let pos3 = 0
	let pos4 = 0
	let upper = true
	console.log('On function called: ' + JSON.stringify(state))

	const originalLeft = (window.innerWidth - 375) / 2
	const originalTop = window.innerHeight * 0.1
	const screenMid = window.innerHeight / 2

	const nopeBtn = document.getElementById('nope')
	const superLikeBtn = document.getElementById('superLike')
	const likeBtn = document.getElementById('like')

	elmnt.onmousedown = dragMouseDown

	function dragMouseDown(e, state) {
		console.log('On mouse down: ' + JSON.stringify(state))
		e = e || window.event
		e.preventDefault()
		// get the mouse cursor position at startup:
		pos3 = e.clientX
		pos4 = e.clientY

		if (pos4 > screenMid) upper = false
		else upper = true

		document.onmouseup = closeDragElement
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag
	}

	function elementDrag(e) {
		console.log('On drag: ' + JSON.stringify(state))
		e = e || window.event
		e.preventDefault()
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX
		pos2 = pos4 - e.clientY
		pos3 = e.clientX
		pos4 = e.clientY
		// set the element's new position:
		let top = elmnt.offsetTop - pos2
		let left = elmnt.offsetLeft - pos1
		let rotateDegree = elmnt.offsetLeft - originalLeft - pos1
		if (!upper) rotateDegree *= -1

		elmnt.style.top = top + 'px'
		elmnt.style.left = left + 'px'
		elmnt.style.transform = 'rotate(' + 0.05 * rotateDegree + 'deg)'

		if (originalLeft - left > 35) {
			ReactTestUtils.Simulate.mouseEnter(nopeBtn)
		} else {
			//ReactTestUtils.Simulate.mouseLeave(nopeBtn)
			//ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
		}

		if (left - originalLeft > 35) {
			ReactTestUtils.Simulate.mouseEnter(likeBtn)
		} else {
			//ReactTestUtils.Simulate.mouseLeave(likeBtn)
			//ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
		}

		if (!(state.nope || state.like)) {
			if (originalTop - top > 30) {
				ReactTestUtils.Simulate.mouseEnter(superLikeBtn)
				// 	ReactTestUtils.Simulate.mouseLeave(nopeBtn)
				// 	ReactTestUtils.Simulate.mouseLeave(likeBtn)
			}
		} else {
			// 	ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
		}
	}

	function closeDragElement() {
		elmnt.style.top = originalTop + 'px'
		elmnt.style.left = originalLeft + 'px'
		elmnt.style.transform = 'rotate(0deg)'
		// stop moving when mouse button is released:
		document.onmouseup = null
		document.onmousemove = null
		elmnt.removeAttribute('style')
		ReactTestUtils.Simulate.mouseLeave(nopeBtn)
		ReactTestUtils.Simulate.mouseLeave(likeBtn)
		ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
	}
}

export default dragElement
