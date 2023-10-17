import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Heading,
} from "@chakra-ui/react";

function SpeedPicker({
  onChangeWebsite,
  onChangeBanner,
}: {
  onChangeWebsite: any;
  onChangeBanner: any;
}) {
  return (
    <Box marginBottom={10}>
      <Heading size={"xs"}>{`Banner Speed`}</Heading>
      <Slider
        aria-label="slider-ex-1"
        min={1}
        max={100}
        defaultValue={30}
        onChange={(event) => {
          onChangeBanner(event);
        }}
      >
        <SliderTrack bg="blackAlpha.300">
          <SliderFilledTrack bg="black" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Heading size={"xs"}>{`Website Speed`}</Heading>
      <Slider
        aria-label="slider-ex-1"
        min={1}
        max={100}
        defaultValue={30}
        onChange={(event) => {
          onChangeBanner(event);
        }}
      >
        <SliderTrack bg="blackAlpha.300">
          <SliderFilledTrack bg="black" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export { SpeedPicker };
