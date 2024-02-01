import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

export default function ColorModeBtn() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button mr={0} onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
