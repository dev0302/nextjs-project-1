import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';

import DeleteMessageButton from './DeleteMessageButton';

// ShadCN UI
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';



const cardVariants = cva(
  'w-full max-w-2xl mx-auto rounded-xl border bg-i-black2 text-card-foreground shadow-sm flex flex-col transition-colors',
  {
    variants: {
      isExpanded: {
        true: 'h-auto',
        false: 'h-auto',
      },
    },

    defaultVariants: {
      isExpanded: true,
    },
  }
);

export interface EmailClientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {

      messageId?: string;

      avatarSrc?: string;

      avatarFallback: string;

      senderName: string;

      senderEmail: string;

      timestamp: string;

      message: string;

      onDelete?: (messageId: string) => void;
    }

const EmailClientCard = React.forwardRef<
  HTMLDivElement,
  EmailClientCardProps
>(
  (
    { 
      messageId,
      className,
      avatarSrc,
      avatarFallback,
      senderName,
      senderEmail,
      timestamp,
      message,
      isExpanded,
      onDelete,
      ...props
    },
    ref
  ) => {

    return (

      <div
        ref={ref}
        className={cn(
          cardVariants({ isExpanded }),
          className
        )}
        {...props}
      >

        {/* Header */}

        <div className="p-4 sm:py-4 sm:px-6 flex items-start gap-4 border-b">

          <Avatar className="w-8 h-8 border mt-1">

            <AvatarImage
              src={avatarSrc}
              alt={senderName}
            />

            <AvatarFallback>
              {avatarFallback}
            </AvatarFallback>

          </Avatar>

          <div className="flex-grow">

            <p className="font-semibold text-card-foreground text-sm">
              {senderName}
            </p>

            <p className="text-xs text-muted-foreground">
              {senderEmail}
            </p>

          </div>

          <div className="flex items-center gap-4 text-muted-foreground">

            <span className="text-xs hidden sm:inline">
              {timestamp}
            </span>

            <DeleteMessageButton onDelete={onDelete ?? (() => {})} messageId={messageId ?? ""}></DeleteMessageButton>

            {/* <button
              className="
                mr-[-16px]
                w-8
                h-8
                flex
                items-center
                justify-center
                rounded-md
                hover:bg-muted
                transition
                cursor-pointer
              "
            >

              <Trash className="w-4 h-4" />

            </button> */}

          </div>

        </div>

        {/* Body */}

        <div className="p-4 sm:p-6 text-xs text-foreground/90 leading-relaxed">

          <p>
            {
              message.length > 250
                ? `${message.slice(0, 150)}...`
                : message
            }
          </p>

        </div>

      </div>
    );
  }
);

EmailClientCard.displayName = 'EmailClientCard';

export { EmailClientCard, cardVariants };