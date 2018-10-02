import React, { Component } from "react";
import { View, Animated, PanResponder } from "react-native";

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {
        position.setValue({ x: 0, y: 0 });
      }
    });
    this.state = { panResponder, position };
  }

  getCardStyle() {
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate: "-45deg" }]
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      return index === 0 ? (
        <Animated.View
          key={item.id}
          style={this.getCardStyle()}
          {...this.state.panResponder.panHandlers}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      ) : (
        this.props.renderCard(item)
      );
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
