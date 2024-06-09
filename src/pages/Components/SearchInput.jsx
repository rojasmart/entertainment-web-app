import PropTypes from "prop-types";
import { Input, Stack, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

export const SearchInput = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Stack spacing={4} mt={10} mb={10}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" size={"lg"} />
        </InputLeftElement>
        <Input
          placeholder="search title movie"
          onChange={handleInputChange}
          color={"white"}
          size={"lg"}
          border="none"
        />
      </InputGroup>
    </Stack>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func,
};
