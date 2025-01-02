"use client"

import * as React from 'react';

import { createTVUnstyledSlots } from '@mijn-ui/react-core';
import {
  labelStyles,
  LabelVariantProps,
  UnstyledProps,
} from '@mijn-ui/react-theme';
import * as LabelPrimitive from '@radix-ui/react-label';

export type LabelProps = React.ComponentPropsWithRef<
  typeof LabelPrimitive.Root
> &
  LabelVariantProps &
  UnstyledProps

const Label = ({ unstyled, className, ...props }: LabelProps) => {
  const { base } = createTVUnstyledSlots(labelStyles(), unstyled)

  return <LabelPrimitive.Root className={base({ className })} {...props} />
}

export { Label };
