import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import filterDomProps from "filter-react-dom-props";
import classnames from "classnames";
import * as events from "../utils/events";

// Each key of the returned styles object will be available as a className below.
const styles = ({ utility, typography, whitespace, elevation, base }) => ({
  ...utility,
  ...typography,
  ...whitespace,
  ...elevation,
  base
});

/**
 * Element is the core building block of our atomic system.
 *
 * It provides a typed interface to our shared styles.
 * - Typography
 * - Colors
 * - Layout
 * - Whitespace
 * - elevation
 * - zIndex
 * - Utilities
 *
 * Element is transparent. You can define the html element that will be rendered and apply any valid html attributes.
 * It can be useful to make more semantic or opinionated components from Element. For example Text is just Element with a more symantic name and interface.
 **/
class Element extends React.Component {
  clickHandler = e => {
    const { stopPropagation, onClick } = this.props;
    if (stopPropagation) events.stopPropagation(e);
    if (onClick) onClick(e);
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.clickHandler(e);
    }
  };

  render() {
    const {
      root = "div",
      className,
      classes,
      hide = false,
      hideReadable = false,
      typography = "body1",
      whitespace = [],
      elevation = 0,
      tabindex,
      onClick,
      ...rest
    } = this.props;

    const Root = root;
    const whitespaceClass = Array.isArray(whitespace)
      ? whitespace.map(i => classes[i]).join(" ")
      : classes[whitespace];
    const elevationClass = [classes["elevation" + elevation]];

    const wrapperClasses = classnames(
      { [className]: className },
      "Element",
      { [classes.hide]: hide },
      { [classes.hideReadable]: hideReadable },
      { [elevationClass]: elevation > 0 },
      classes.wrapper,
      classes[typography],
      whitespaceClass,
      classes.base
    );

    return (
      <Root
        {...filterDomProps(rest)}
        tabIndex={tabindex ? tabindex : onClick ? "0" : null}
        className={wrapperClasses}
        onClick={this.clickHandler}
        onKeyDown={this.onKeyDown}
      >
        {this.props.children}
      </Root>
    );
  }
}

Element.displayName = "Element";

Element.propTypes = {
  /**
   * As a primitive Element excepts any DOM node or component.
   */
  children: PropTypes.node,
  /**
   * The html tag to render, For example, "p", "div", "span". All html atrributes like "title", "src" etc.. are passed down.
   */
  root: PropTypes.string,
  /**
   * Hides Element from the DOM using `display: none`.
   */
  hide: PropTypes.bool,
  /**
   * Hides Element visually but is still visible to screen readers. Good for binding semantic interfaces to non semantic interfaces. Eg: binding a check box to some divs that are made to look like a toggle button.
   */
  hideReadable: PropTypes.bool,
  /**
   * The typography styles from the theme like "title" or "body1"
   */
  typography: PropTypes.string,
  /**
   * Whitespace can be a string or an array of strings representing a spacing property followed by a spacing unit ranging 0 - 20. The expected values are shorthand "mb1" is "margin-bottom" with a unit of 1 so "mt1" is top "ml1" is left etc..., Padding is the same with a "p" instead of an "m". Other values are: top and bottom "mv1" for vertical, right and left "ms1" for sides, and all directions "m1" see example above or in the theme documentation on whitespace for a list of values. It is good to use whitespace units (multiples of 8px) over other values for margin or padding for consistancy and best alignment. See the Material Design specs for guidence.
   */
  whitespace: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Elevation is how high the element comes off the page visually through shadow depth. Expects values between 0 and 24.
   */
  elevation: PropTypes.number
};

Element.defaultProps = {
  root: "div",
  hide: false,
  hideReadable: false,
  typography: "body1",
  whitespace: ["m0", "p0"]
};

export default injectSheet(styles)(Element);
