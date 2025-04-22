"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "../../_lib/utils";

const AccordionItemContext = React.createContext(undefined);

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem");
  }
  return context;
};

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
        <AccordionPrimitive.Item
          ref={ref}
          className={cn("border-b border-border", className)}
          {...props}
        >
          {children}
        </AccordionPrimitive.Item>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  (
    {
      className,
      children,
      transition = { type: "spring", stiffness: 150, damping: 17 },
      chevron = true,
      ...props
    },
    ref,
  ) => {
    const triggerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => triggerRef.current);
    const { isOpen, setIsOpen } = useAccordionItem();

    React.useEffect(() => {
      const node = triggerRef.current;
      if (!node) return;

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.attributeName === "data-state") {
            const currentState = node.getAttribute("data-state");
            setIsOpen(currentState === "open");
          }
        });
      });
      observer.observe(node, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
      const initialState = node.getAttribute("data-state");
      setIsOpen(initialState === "open");
      return () => {
        observer.disconnect();
      };
    }, [setIsOpen]);

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={triggerRef}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-start font-medium hover:underline",
            className,
          )}
          {...props}
        >
          {children}

          {chevron && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={transition}
            >
              <ChevronDown className="size-5 shrink-0" />
            </motion.div>
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  (
    {
      className,
      children,
      transition = { type: "spring", stiffness: 150, damping: 17 },
      ...props
    },
    ref,
  ) => {
    const { isOpen } = useAccordionItem();

    return (
      <AnimatePresence>
        {isOpen && (
          <AccordionPrimitive.Content forceMount {...props}>
            <motion.div
              key="accordion-content"
              initial={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
              animate={{ height: "auto", opacity: 1, "--mask-stop": "100%" }}
              exit={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
              transition={transition}
              style={{
                maskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
                WebkitMaskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
              }}
              className="overflow-hidden"
              ref={ref}
            >
              <div className={cn("pb-4 pt-0 text-sm", className)}>
                {children}
              </div>
            </motion.div>
          </AccordionPrimitive.Content>
        )}
      </AnimatePresence>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
};
