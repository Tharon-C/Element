import React from 'react'
import classNames from 'classnames'
import Element from './Element'

const Text = ({className, variant, ...rest}) => {
    const wrapperClasses = classNames(
        { [className] : className },
        'Text',
    )

    return (
        <Element { ...rest}
            typography={variant}
            className={wrapperClasses}
        />
    )
}
export default Text;