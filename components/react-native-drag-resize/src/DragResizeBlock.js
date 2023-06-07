import React, { Component } from 'react';
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import { Connector, CONNECTOR_TOP_MIDDLE } from './Connector';

export const AXIS_X = 'x';
export const AXIS_Y = 'y';
export const AXIS_ALL = 'all';

const CONNECTOR_SIZE = 14;
const DEFAULT_Z_INDEX = 1;

/**
 * Drag resize block.
 */
export class DragResizeBlock extends Component {
  constructor(props) {
    super(props);

    const { x, y, w, h, minW, minH } = props;

    this.state = {
      isSelected: false,
      x,
      y,
      w: w < minW ? minW : w,
      h: h < minH ? minH : h,
    };

    /**
     * Connectors binding.
     */
    this.connectorsMap = {};

    /**
     * Top middle connector.
     */
    this.connectorsMap[CONNECTOR_TOP_MIDDLE] = {
      calculateX: width => {
        return width / 2 - CONNECTOR_SIZE / 2;
      },
      calculateY: height => {
        return 0;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeTM,
      onEnd: this.onResizeEnd,
    };
  }

  /**
   * Handle press event.
   * @param {Event} event - Press event.
   */
  onPress = event => {
    const { onPress } = this.props;

    if (onPress !== null) {
      onPress(event);
    }
  };

  /**
   * Handle resize start event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onResizeStart = coord => {
    const { onResizeStart } = this.props;

    this.setState(() => {
      return {
        isSelected: true,
      };
    });

    if (onResizeStart !== null) {
      onResizeStart([this.state.x, this.state.y]);
    }
  };

  onResizeTM = coord => {
    const { minH, axis, isResizable, limitation, onResize } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newY = this.state.y + coord[1];
      const newH = this.state.y + this.state.h - newY;

      if (newH >= minH && axis != AXIS_X && this.state.y != 0) {

        if (limitation.y <= newY) {
          // console.log(newY);
          // console.log(newH);

          this.state.h = newH;
          this.state.y = newY;
        }
        if (newY <= 0.2 * Dimensions.get('window').height) {
          // console.log(newY);
          this.state.h = Dimensions.get('window').height - 80;
          this.state.y = 0;
        }
      }

      if (onResize !== null) {
        onResize([this.state.x, this.state.y]);
      }

      return this.state;
    });
  };

  /**
   * Handle resize end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onResizeEnd = coord => {
    const { onResizeEnd } = this.props;

    this.setState(() => {
      return {
        isSelected: false,
      };
    });

    if (onResizeEnd !== null) {
      onResizeEnd([this.state.x, this.state.y]);
    }
  };

  /**
   * Handle drag start event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDragStart = coord => {
    const { onDragStart } = this.props;

    this.setState(() => {
      return {
        isSelected: true,
      };
    });

    if (onDragStart !== null) {
      onDragStart([this.state.x, this.state.y]);
    }
  };

  /**
   * Handle drag event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDrag = coord => {
    const { axis, isDraggable, limitation, onDrag } = this.props;

    if (!isDraggable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + coord[0];
      const newY = this.state.y + coord[1];

      if (axis != AXIS_Y) {
        if (limitation.x <= newX && limitation.w >= newX + this.state.w) {
          this.state.x = newX;
        }
      }

      if (axis != AXIS_X) {
        if (limitation.y <= newY && limitation.h >= newY + this.state.h) {
          this.state.y = newY;
        }
      }

      if (onDrag !== null) {
        onDrag([this.state.x, this.state.y]);
      }

      return this.state;
    });
  };

  /**
   * Handle drag end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onDragEnd = coord => {
    const { onDragEnd } = this.props;

    this.setState(() => {
      return {
        isSelected: false,
      };
    });

    if (onDragEnd !== null) {
      onDragEnd([this.state.x, this.state.y]);
    }
  };

  /**
   * Render connector components.
   */
  renderConnectors = () => {
    const { connectors } = this.props;

    const { w, h } = this.state;

    return connectors.map(connectorType => {
      return (
        <Connector
          key={connectorType}
          type={connectorType}
          size={CONNECTOR_SIZE}
          x={this.connectorsMap[connectorType].calculateX(w)}
          y={this.connectorsMap[connectorType].calculateY(h)}
          onStart={this.connectorsMap[connectorType].onStart}
          onMove={this.connectorsMap[connectorType].onMove}
          onEnd={this.connectorsMap[connectorType].onEnd}
        />
      );
    });
  };

  render() {
    const { children, isDisabled, zIndex } = this.props;

    const { x, y, w, h, isSelected } = this.state;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          padding: CONNECTOR_SIZE / 2,
          zIndex: isSelected ? zIndex + 1 : zIndex,
        }}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            {children}
          </View>
        </TouchableWithoutFeedback>

        {isDisabled ? null : this.renderConnectors()}
      </SafeAreaView>
    );
  }
}

DragResizeBlock.defaultProps = {
  x: 0,
  y: Dimensions.get('window').height / 2 - 80,
  w: Dimensions.get('window').width,
  h: Dimensions.get('window').height / 2,
  minW: 0,
  minH: Dimensions.get('window').height / 2,
  axis: AXIS_ALL,
  limitation: {
    x: 0,
    y: 0,
    w: Dimensions.get('window').width,
    h: Dimensions.get('window').height,
  },
  isDisabled: false,
  zIndex: DEFAULT_Z_INDEX,
  isDraggable: true,
  isResizable: true,
  connectors: [CONNECTOR_TOP_MIDDLE],

  onPress: null,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null,
};

DragResizeBlock.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  w: PropTypes.number,
  h: PropTypes.number,
  minW: PropTypes.number,
  minH: PropTypes.number,
  zIndex: PropTypes.number,
  axis: PropTypes.oneOf([AXIS_X, AXIS_Y, AXIS_ALL]),
  limitation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
  }),
  isDisabled: PropTypes.bool,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
  connectors: PropTypes.array,

  onPress: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
};
