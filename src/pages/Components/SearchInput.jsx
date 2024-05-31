import { Input, Stack, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

export const SearchInput = () => {
  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="search title movie" />
      </InputGroup>
    </Stack>
  );
};
