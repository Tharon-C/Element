import React from 'react'
import Element from './Element'

const Card = ({
    elevation = 3, 
    whitespace = "p3", 
    background = "white",
    style,
    ...rest}) => {
    return (
        <Element  { ...rest}
            style={{background, ...style}}
            elevation={elevation}
            whitespace={whitespace}
        />
    )
}

export default Card
