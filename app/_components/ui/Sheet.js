"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../_lib/utils";

const SheetContext = React.createContext({ isOpen: false });

const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
};

const Sheet = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false,
  );

  React.useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <SheetContext.Provider value={{ isOpen }}>
      <SheetPrimitive.Root {...props} onOpenChange={handleOpenChange}>
        {children}
      </SheetPrimitive.Root>
    </SheetContext.Provider>
  );
};

const SheetTrigger = SheetPrimitive.Trigger;

const SheetPortal = SheetPrimitive.Portal;

const SheetClose = SheetPrimitive.Close;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b border-border",
      bottom: "inset-x-0 bottom-0 border-t border-border",
      left: "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r border-border",
      right:
        "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l border-border",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

const SheetContent = React.forwardRef(
  (
    {
      side = "right",
      className,
      transition = { type: "spring", stiffness: 150, damping: 25 },
      children,
      ...props
    },
    ref,
  ) => {
    const { isOpen } = useSheet();

    return (
      <AnimatePresence>
        {isOpen && (
          <SheetPortal forceMount>
            <SheetOverlay asChild forceMount>
              <motion.div
                key="sheet-overlay"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </SheetOverlay>
            <SheetPrimitive.Content asChild forceMount ref={ref} {...props}>
              <motion.div
                key="sheet-content"
                initial={
                  side === "right"
                    ? { x: "100%", opacity: 0 }
                    : side === "left"
                      ? { x: "-100%", opacity: 0 }
                      : side === "top"
                        ? { y: "-100%", opacity: 0 }
                        : { y: "100%", opacity: 0 }
                }
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={
                  side === "right"
                    ? { x: "100%", opacity: 0 }
                    : side === "left"
                      ? { x: "-100%", opacity: 0 }
                      : side === "top"
                        ? { y: "-100%", opacity: 0 }
                        : { y: "100%", opacity: 0 }
                }
                transition={transition}
                className={cn(sheetVariants({ side }), className)}
              >
                {children}
                <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              </motion.div>
            </SheetPrimitive.Content>
          </SheetPortal>
        )}
      </AnimatePresence>
    );
  },
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
));
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
));
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  useSheet,
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
