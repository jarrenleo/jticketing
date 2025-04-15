"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "motion/react";

import { cn } from "../../_lib/utils";

const Tabs = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(
  (
    {
      className,
      activeClassName,
      transition = {
        type: "spring",
        bounce: 0,
        stiffness: 200,
        damping: 25,
      },
      ...props
    },
    ref,
  ) => {
    const localRef = React.useRef(null);
    React.useImperativeHandle(ref, () => localRef.current);

    const [indicatorStyle, setIndicatorStyle] = React.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });

    const updateIndicator = React.useCallback(() => {
      if (!localRef.current) return;

      const activeTab = localRef.current.querySelector('[data-state="active"]');
      if (!activeTab) return;

      const activeRect = activeTab.getBoundingClientRect();
      const tabsRect = localRef.current.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    }, []);

    React.useEffect(() => {
      updateIndicator();
      window.addEventListener("resize", updateIndicator);
      const observer = new MutationObserver(updateIndicator);

      if (localRef.current) {
        observer.observe(localRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      return () => {
        window.removeEventListener("resize", updateIndicator);
        observer.disconnect();
      };
    }, [updateIndicator]);

    return (
      <div className="relative" ref={localRef}>
        <TabsPrimitive.List
          data-slot="tabs-list"
          className={cn(
            "inline-flex h-10 w-fit items-center justify-center rounded-md bg-muted p-[4px] text-muted-foreground",
            className,
          )}
          {...props}
        />
        <motion.div
          className={cn(
            "absolute rounded-md bg-accent shadow-sm",
            activeClassName,
          )}
          animate={{
            left: indicatorStyle.left,
            top: indicatorStyle.top,
            width: indicatorStyle.width,
            height: indicatorStyle.height,
          }}
          transition={transition}
        />
      </div>
    );
  },
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "z-[1] inline-flex h-full items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  (
    {
      className,
      children,
      transition = {
        duration: 0.5,
        ease: "easeInOut",
      },
      ...props
    },
    ref,
  ) => {
    return (
      <TabsPrimitive.Content
        asChild
        data-slot="tabs-content"
        className={cn("flex-1 outline-none", className)}
        {...props}
      >
        <motion.div
          ref={ref}
          layout
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={transition}
        >
          {children}
        </motion.div>
      </TabsPrimitive.Content>
    );
  },
);
TabsContent.displayName = "TabsContent";

const TabsContents = React.forwardRef(
  (
    {
      children,
      className,
      transition = { type: "spring", stiffness: 200, damping: 25 },
    },
    ref,
  ) => {
    const containerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => containerRef.current);

    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        const newHeight = entries[0].contentRect.height;
        requestAnimationFrame(() => {
          setHeight(newHeight);
        });
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [children]);

    React.useLayoutEffect(() => {
      if (containerRef.current) {
        const initialHeight =
          containerRef.current.getBoundingClientRect().height;
        setHeight(initialHeight);
      }
    }, [children]);

    return (
      <motion.div
        layout
        animate={{ height: height }}
        transition={transition}
        className={className}
      >
        <div ref={containerRef}>{children}</div>
      </motion.div>
    );
  },
);
TabsContents.displayName = "TabsContents";

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents };
