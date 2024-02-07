import { Box, SimpleGrid } from '@chakra-ui/react';
import { Children, isValidElement, useMemo } from 'react';

export const ProductGrid = (props: { children: React.ReactNode }) => {
  const columns = useMemo(() => {
    const count = Children.toArray(props.children).filter(
      isValidElement
    ).length;
    return {
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(5, count),
    };
  }, [props.children]);

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}>
      <SimpleGrid
        columns={columns}
        columnGap={{
          base: '4',
          md: '6',
        }}
        rowGap={{
          base: '8',
          md: '10',
        }}
        {...props}
      />
    </Box>
  );
};
