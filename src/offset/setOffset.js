import css from '../css';
import offset from './getOffset';
import position from '../position';

export default function setOffset(elem, options){
	let curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
		positionState = css( elem, "position" ),
		curElem = elem,
		props = {};

	// Set position first, in-case top/left are set even on static elem
	if ( positionState === "static" ) {
		elem.style.position = "relative";
	}

	curOffset = offset(curElem);
	curCSSTop = css( elem, "top" );
	curCSSLeft = css( elem, "left" );
	calculatePosition = ( positionState === "absolute" || positionState === "fixed" ) &&
		( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

	// Need to be able to calculate position if either
	// top or left is auto and position is either absolute or fixed
	if ( calculatePosition ) {
		curPosition = position(curElem);
		curTop = curPosition.top;
		curLeft = curPosition.left;

	} else {
		curTop = parseFloat( curCSSTop ) || 0;
		curLeft = parseFloat( curCSSLeft ) || 0;
	}

	if ( options.top != null ) {
		props.top = ( options.top - curOffset.top ) + curTop;
	}
	if ( options.left != null ) {
		props.left = ( options.left - curOffset.left ) + curLeft;
	}

	if ( "using" in options ) {
		options.using.call( elem, props );

	} else {
		css( curElem, props );
	}	
}