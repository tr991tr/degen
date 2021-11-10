import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { IconUserSolid } from '../icons'

type Props = {
  as?: 'img' | React.ComponentType
  label: string
  placeholder?: boolean
  size?: BoxProps['height']
  src?: string
}

export const Avatar = ({
  as = 'img',
  label,
  placeholder,
  size = '12',
  src,
}: Props) => {
  return (
    <Box
      backgroundColor="foregroundSecondary"
      borderRadius="full"
      height={size}
      minWidth={size}
      position="relative"
      width={size}
    >
      {placeholder ? (
        <Box
          alignItems="center"
          aria-label={label}
          display="flex"
          height="full"
          justifyContent="center"
        >
          <Box maxWidth="3/4">
            <IconUserSolid color="textSecondary" size="full" />
          </Box>
        </Box>
      ) : (
        <Box
          alt={label}
          as={as}
          borderRadius="full"
          height="full"
          src={src}
          width="full"
          {...{
            decoding: 'async',
            layout: typeof as === 'string' ? undefined : 'fill',
          }}
        />
      )}
    </Box>
  )
}
