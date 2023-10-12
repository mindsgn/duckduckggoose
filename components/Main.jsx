import { Component } from "react";
import styled from "styled-components";
import Row from "./Row";
import BR from "./Break";
import Button from "./Button";
import Input from "./Input";
import Title from "./Title";
import Logo from "./Logo";
import { SketchPicker } from "react-color";
import io from "socket.io-client";
import { motion } from "framer-motion";
import {
  MOBILE_S,
  MOBILE_M,
  MOBILE_L,
  TABLET,
  LAPTOP_S,
  LAPTOP_L,
  DESKTOP,
} from "../redux/constant";

//redux
let socket = io("https://mqtt.goodgoodgood.co.za", {
  transports: ["websocket"],
});

const ImageButtons = [
  { image: "assets/ducks.png", input: "~" },
  { image: "assets/fullducks.png", input: "`" },
  { image: "assets/hearts.png", input: "^" },
  { image: "assets/bat.png", input: "{" },
  { image: "assets/drops.png", input: "}" },
  { image: "assets/message.png", input: "[" },
  { image: "assets/drinks.png", input: "]" },
];

const MainStyle = styled.div`
  display: flex;
  padding: 20px;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageBackgroundButton = styled.button`
  width: 250px;
  height: 100px;
  background-color: none;
  background-image: url(${(props) => props.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
`;

const ColorStyle = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${MOBILE_S}) {
    flex-direction: column;
  }

  @media (min-width: ${MOBILE_M}) {
    flex-direction: column;
  }

  @media (min-width: ${MOBILE_L}) {
    flex-direction: column;
  }

  @media (min-width: ${TABLET}) {
    flex-direction: row;
  }

  @media (min-width: ${LAPTOP_S}) {
    flex-direction: row;
  }

  @media (min-width: ${LAPTOP_L}) {
    flex-direction: row;
  }

  @media (min-width: ${DESKTOP}) {
    flex-direction: row;
  }
`;

const Colordiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RangeInput = styled.input`
  width: 100vw;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      click: false,
      isScrolling: false,
      speed: 1,
      websiteSpeed: 1,
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      },
      colorHex: "#000000",
      background: {
        r: "244",
        g: "230",
        b: "230",
        a: "1",
      },
      backgroundHex: "#ffffff",
      isReady: false,
      isAuth: false,
      isDisabled: true,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleWebsiteSpeedChange = this.handleWebsiteSpeedChange.bind(this);
  }

  handleTextChange = (color) => {
    this.setState({ color: color.rgb, colorHex: color.hex });
    socket.emit("color-change", { color: color });
  };

  handleSpeedChange = (speed) => {
    this.setState({ speed: speed.target.value });
  };

  handleWebsiteSpeedChange = (speed) => {
    this.setState({ websiteSpeed: speed.target.value });
  };

  handleBackgroundChange = (color) => {
    this.setState({ background: color.rgb, backgroundHex: color.hex });
    socket.emit("background-change", { color: color });
  };

  //update Text
  updateText(
    text,
    color,
    background,
    colorHex,
    backgroundHex,
    speed,
    websiteSpeed
  ) {
    this.setState({ click: true, isReady: false });
    try {
      let data = {
        text: text,
        color: color,
        background: background,
        colorHex: colorHex,
        backgroundHex: backgroundHex,
        speed: speed,
        websiteSpeed: websiteSpeed,
      };
      socket.emit("scroll", data);
      setTimeout(() => {
        this.setState({ click: false, isReady: true });
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  }

  allOff() {
    socket.emit("all-off");
  }

  allOn() {
    socket.emit("all-on");
  }

  handleNameChange(event) {
    this.setState({ text: event.target.value, isDisabled: false });
  }

  componentDidMount() {
    socket.emit("update");

    socket.on("done", () => {
      this.updateMe();
    });

    setInterval(() => {
      this.setState({ isReady: true });
    }, 4000);
  }

  render() {
    return (
      <MainStyle>
        <Row>
          <Input
            value={this.state.text}
            placeholder="whats on your mind?."
            onChange={this.handleNameChange}
          />
        </Row>
        <BR />
        <Row>
          {ImageButtons.map((item, index) => {
            return (
              <ImageBackgroundButton
                key={index}
                text={`${item.image}`}
                backgroundImage={item.image}
                onClick={() => {
                  this.setState({ text: `${this.state.text} ${item.input}` });
                }}
              />
            );
          })}
        </Row>

        <BR />
        <Row>
          <Title text={"LED Speed"} />
        </Row>
        <Row>
          <RangeInput
            type="range"
            name="speed"
            id="speed"
            min="0"
            max="100"
            step="0.00000000001"
            onChange={this.handleSpeedChange}
          />
        </Row>
        <BR />
        <Row>
          <Title text={"Website Speed"} />
        </Row>
        <Row>
          <RangeInput
            type="range"
            name="speed"
            id="speed"
            min="0"
            max="100"
            step="0.00000000001"
            onChange={this.handleWebsiteSpeedChange}
          />
        </Row>
        <BR />
        <ColorStyle>
          <Colordiv>
            <Title text={"Text Color"} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleTextChange}
            />
          </Colordiv>

          <Colordiv>
            <Title text={"Background Color"} />
            <SketchPicker
              color={this.state.background}
              onChange={this.handleBackgroundChange}
            />
          </Colordiv>
        </ColorStyle>
        <BR />
        <Row>
          {!this.state.click ? (
            <Button
              text={"Post"}
              isDisabled={this.state.isDisabled}
              onClick={() =>
                this.updateText(
                  this.state.text,
                  this.state.color,
                  this.state.background,
                  this.state.colorHex,
                  this.state.backgroundHex,
                  this.state.speed,
                  this.state.websiteSpeed
                )
              }
            />
          ) : null}
        </Row>
        {!this.state.isReady ? (
          <LoadingContainer>
            <motion.div animate={{ scale: [0, 1], opacity: [0, 1] }}>
              <Logo />
            </motion.div>
          </LoadingContainer>
        ) : null}
      </MainStyle>
    );
  }
}

export default Main;
