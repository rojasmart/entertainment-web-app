import { Box } from "@chakra-ui/react";

const BlurredBackground = ({ backgroundImage }) => (
  <Box
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      filter: "blur(10px)",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100%",
      zIndex: "-1",
      opacity: 0.5,
      backgroundColor: "black",
    }}
  />
);

export default BlurredBackground;
