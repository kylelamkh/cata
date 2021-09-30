import React, { useEffect } from 'react'
import dragElement from './dragElement'

function Card(props) {
	useEffect(() => {
		const card = document.getElementById('top')
		dragElement(card)
	}, [props.state])

	if (props.id === 'top') {
		return (
			<div className="card" id={props.id}>
				<img src={props.photoURL} alt="logo" draggable="false" />
				<div className="grid-container">
					{props.state.like ? <div className="likeIcon">LIKE</div> : null}
					{props.state.nope ? <div className="nopeIcon">NOPE</div> : null}
					{props.state.superLike ? <div className="superLikeIcon">SUPER LIKE</div> : null}
					<div className="mask"></div>
				</div>
			</div>
		)
	} else if (props.id === 'bottom') {
		return (
			<div className="card" id={props.id}>
				<img src={props.photoURL} alt="logo" draggable="false" />
				<div className="grid-container">
					<div className="mask"></div>
				</div>
			</div>
		)
	} else if (props.id === 'discard') {
		return (
			<div className="card" id={props.id}>
				<img src={props.photoURL} alt="logo" draggable="false" />
				<div className="grid-container">
					{props.localState === 'like' ? <div className="likeIcon">LIKE</div> : null}
					{props.localState === 'nope' ? <div className="nopeIcon">NOPE</div> : null}
					{props.localState === 'superLike' ? <div className="superLikeIcon">SUPER LIKE</div> : null}
					<div className="mask"></div>
				</div>
			</div>
		)
	}
}

export default Card
