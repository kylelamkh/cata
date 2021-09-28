import React, { useState, useEffect } from 'react'
import dragElement from './dragElement'

function Card(props) {
	const naturalState = {
		nope: false,
		like: false,
		superLike: false,
	}
	const [state, setState] = useState({
		nope: false,
		like: false,
		superLike: false,
	})

	useEffect(() => {
		const card = document.getElementById('top')
		dragElement(card, state)
	}, [state])

	const handleMouseEnter = (evt) => {
		try {
			// let enterElement = evt.target
			// enterElement.style.fontSize = '3.5rem'
			// let enterIcon = document.getElementsByClassName(enterElement.id + 'Icon')
			// enterIcon[0].style.display = 'block'
			let enterElementId = evt.target.id

			setState(() => naturalState)
			setState((prevState) => {
				return { ...prevState, [enterElementId]: true }
			})
			//console.log(state)
		} catch (e) {
			console.error(e)
		}
	}

	const handleMouseLeave = (evt) => {
		try {
			// let leaveElement = evt.target
			// leaveElement.style = ''
			// let leaveIcon = document.getElementsByClassName(leaveElement.id + 'Icon')
			// leaveIcon[0].style = ''
			//let leaveElementId = evt.target.id
			setState(() => naturalState)
			//console.log(state)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<div className="card" id={props.id}>
			<img src={props.photoURL} alt="logo" draggable="false" />
			<div className="grid-container">
				{state.like ? <div className="likeIcon">LIKE</div> : null}
				{state.nope ? <div className="nopeIcon">NOPE</div> : null}
				{state.superLike ? <div className="superLikeIcon">SUPER LIKE</div> : null}

				<div className="controls">
					<div className="buttons">
						<div className="button" id="nopeBtn">
							<span
								className="material-icons"
								id="nope"
								onMouseEnter={(evt) => handleMouseEnter(evt)}
								onMouseLeave={(evt) => handleMouseLeave(evt)}>
								close
							</span>
						</div>
						<div className="button" id="superLikeBtn">
							<span
								className="material-icons"
								id="superLike"
								onMouseEnter={(evt) => handleMouseEnter(evt)}
								onMouseLeave={(evt) => handleMouseLeave(evt)}>
								star_border
							</span>
						</div>
						<div className="button" id="likeBtn">
							<span
								className="material-icons"
								id="like"
								onMouseEnter={(evt) => handleMouseEnter(evt)}
								onMouseLeave={(evt) => handleMouseLeave(evt)}>
								favorite_border
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
