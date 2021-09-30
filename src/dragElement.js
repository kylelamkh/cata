import ReactTestUtils from 'react-dom/test-utils'

function dragElement(elmnt) {
	let pos1 = 0
	let pos2 = 0
	let pos3 = 0
	let pos4 = 0
	let upper = true
	let isLeftRight = false
	let localState = {
		nope: false,
		like: false,
		superLike: false,
	}

	const originalLeft = elmnt.offsetLeft
	const originalTop = elmnt.offsetTop
	const screenMid = window.innerHeight / 2

	const nopeBtn = document.getElementById('nope')
	const superLikeBtn = document.getElementById('superLike')
	const likeBtn = document.getElementById('like')

	elmnt.onmousedown = dragMouseDown
	elmnt.ontouchstart = dragMouseDown

	function dragMouseDown(e) {
		e = e || window.event
		e.preventDefault()
		// get the mouse cursor position at startup:
		pos3 = e.clientX || e.targetTouches[0].pageX
		pos4 = e.clientY || e.targetTouches[0].pageY

		if (pos4 > screenMid) upper = false
		else upper = true

		document.onmouseup = closeDragElement
		document.ontouchend = closeDragElement
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag
		document.ontouchmove = elementDrag
	}

	function elementDrag(e) {
		function preventBehavior(e) {
			e.preventDefault()
		}

		document.addEventListener('touchmove', preventBehavior, { passive: false })
		e = e || window.event
		e.preventDefault(e)
		console.log(e)
		// calculate the new cursor position:
		pos1 = pos3 - (e.clientX || e.targetTouches[0].pageX)
		pos2 = pos4 - (e.clientY || e.targetTouches[0].pageY)
		pos3 = e.clientX || e.targetTouches[0].pageX
		pos4 = e.clientY || e.targetTouches[0].pageY
		// set the element's new position:
		let top = elmnt.offsetTop - pos2
		let left = elmnt.offsetLeft - pos1
		let rotateDegree = elmnt.offsetLeft - originalLeft - pos1
		if (!upper) rotateDegree *= -1

		elmnt.style.top = top + 'px'
		elmnt.style.left = left + 'px'
		elmnt.style.transform = 'rotate(' + 0.05 * rotateDegree + 'deg)'

		if (left < originalLeft - 35) {
			isLeftRight = true
			localState.nope = true
			ReactTestUtils.Simulate.mouseEnter(nopeBtn)
		} else if (originalLeft > left) {
			localState.nope = false
			ReactTestUtils.Simulate.mouseLeave(nopeBtn)
		}

		if (left > originalLeft + 35) {
			isLeftRight = true
			localState.like = true
			ReactTestUtils.Simulate.mouseEnter(likeBtn)
		} else if (originalLeft < left) {
			localState.like = false
			ReactTestUtils.Simulate.mouseLeave(likeBtn)
		}

		if (!isLeftRight) {
			if (top < originalTop - 30) {
				localState.superLike = true
				ReactTestUtils.Simulate.mouseEnter(superLikeBtn)
			} else if (originalTop > top) {
				localState.superLike = false
				ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
			}
		}
	}

	function closeDragElement() {
		if (localState.like) {
			ReactTestUtils.Simulate.click(likeBtn)
		} else if (localState.nope) {
			ReactTestUtils.Simulate.click(nopeBtn)
		} else if (localState.superLike) {
			ReactTestUtils.Simulate.click(superLikeBtn)
		} else {
			ReactTestUtils.Simulate.mouseLeave(likeBtn)
			ReactTestUtils.Simulate.mouseLeave(nopeBtn)
			ReactTestUtils.Simulate.mouseLeave(superLikeBtn)
		}
		localState = {
			nope: false,
			like: false,
			superLike: false,
		}
		try {
			let style = document.getElementById('top').getAttribute('style')
			const elemt = document.getElementById('discard')
			elemt.setAttribute('style', style)
		} catch {}
		elmnt.style.top = originalTop + 'px'
		elmnt.style.left = originalLeft + 'px'
		elmnt.style.transform = 'rotate(0deg)'
		isLeftRight = false
		// stop moving when mouse button is released:
		document.onmouseup = null
		document.onmousemove = null
		document.ontouchend = null
		document.ontouchmove = null
		elmnt.removeAttribute('style')
	}
}

export default dragElement
