import * as React from 'react';

import { createTVUnstyledSlots } from '@mijn-ui/react-core';
import {
  textareaStyles,
  UnstyledProps,
} from '@mijn-ui/react-theme';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  UnstyledProps

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ unstyled, className, ...props }, ref) => {
    const { base } = createTVUnstyledSlots(textareaStyles(), unstyled)
    return <textarea className={base({ className })} ref={ref} {...props} />
  },
)
Textarea.displayName = "Textarea"

export { Textarea };
