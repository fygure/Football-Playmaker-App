// CenterSquare.jsx
// TODO: Here is where we change the on click handler for click through
import React from 'react';
import { Rect } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

class CenterSquare extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.states = [{leftState: 0, rightState: 100, colorOne: props.initialColor, colorTwo: "black"}, // fully orange
                        {leftState: 0, rightState: 13, colorOne: "black", colorTwo: props.initialColor}, // right fill
                        {leftState: 0, rightState: 13, colorOne: props.initialColor, colorTwo: "black"}, // left fill
                        {leftState: -1, rightState: 0, colorOne: props.initialColor, colorTwo: "black"} // all fill
                        ]
        this.state = this.states[0];
        this.index = 0;
    }

    handleClick() {
        this.index++;
        if(this.index >= (this.states.length)){
            this.index = 0;
        }
        this.setState(this.states[this.index]);
    }
    
    render() {
        const {
            shapeRef,
            position,
            initialColor,
            showContextMenu,
            contextMenuPosition,
            //isSelected,
            handleOnClick,
            handleRightClick,
            handleDeleteClick,
            handleDragStart,
            handleDragEnd,
            handleHideContextMenu,
            //fontSize,
            rectSize
        } = this.props;

        const strokeOptions = { color: 'black', strokeWidth: 2 };
        return (
            <>
                <Rect
                    ref={shapeRef}
                    x={position.x}
                    y={position.y}
                    width={rectSize.width}
                    height={rectSize.height}
                    stroke={strokeOptions.color}
                    strokeWidth={strokeOptions.strokeWidth}
                    onDragStart={handleDragStart}
                    draggable={true}
                    onDragEnd={handleDragEnd}
                    onClick={this.handleClick}
                    onContextMenu={handleRightClick}
                    fillLinearGradientStartPoint= { {x: this.state.leftState, y: 0} }
                    fillLinearGradientEndPoint= { {x: this.state.rightState, y: 0 }}
                    fillLinearGradientColorStops= {[1, this.state.colorOne, 1, this.state.colorTwo]}
                />
                {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
            </>
        );
    }
}
export default CenterSquare;