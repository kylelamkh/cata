import React from 'react'

function Controls(props) {
	const colorMap = {
		nope: 'rgb(224, 19, 98, 0.35)',
		like: 'rgb(0, 255, 157, 0.35)',
		superLike: 'rgb(45, 162, 240, 0.35)',
	}

	const handleMouseEnter = (evt) => {
		try {
			let enterElement = evt.target
			enterElement.style.fontSize = '3.25rem'

			let elementBtn = document.getElementById(enterElement.id + 'Btn')
			elementBtn.style.backgroundColor = colorMap[enterElement.id]

			props.setState(() => props.naturalState)
			props.setState((prevState) => {
				return { ...prevState, [enterElement.id]: true }
			})
		} catch (e) {
			console.error(e)
		}
	}

	const handleMouseLeave = (evt) => {
		try {
			let leaveElement = evt.target
			leaveElement.style = null

			let elementBtn = leaveElement.parentNode
			elementBtn.style = null

			props.setState(() => props.naturalState)
		} catch (e) {
			console.error(e)
		}
	}

	const handleClick = (evt) => {
		try {
			let element = evt.target
			let id = element.id
			element.style = null
			element = element.parentNode
			element.style = null
			//console.log(id)
			props.setState(() => props.naturalState)
			props.setState((prevState) => {
				return { ...prevState, [id]: true }
			})
			props.setIsBtnClicked(() => true)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<div className="controls-grid-container">
			<div className="controls">
				<div className="buttons">
					<div className="button" id="nopeBtn" onClick={(evt) => handleClick(evt)}>
						<span className="material-icons" id="nope" onMouseEnter={(evt) => handleMouseEnter(evt)} onMouseLeave={(evt) => handleMouseLeave(evt)}>
							close
						</span>
					</div>
					<div className="button" id="superLikeBtn" onClick={(evt) => handleClick(evt)}>
						<span
							className="material-icons"
							id="superLike"
							onMouseEnter={(evt) => handleMouseEnter(evt)}
							onMouseLeave={(evt) => handleMouseLeave(evt)}>
							star_border
						</span>
					</div>
					<div className="button" id="likeBtn" onClick={(evt) => handleClick(evt)}>
						<span className="material-icons" id="like" onMouseEnter={(evt) => handleMouseEnter(evt)} onMouseLeave={(evt) => handleMouseLeave(evt)}>
							favorite_border
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Controls
