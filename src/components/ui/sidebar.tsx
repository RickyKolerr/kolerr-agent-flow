
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return <div className={cn("sidebar", className)} {...props} />;
};

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarContent = ({ className, ...props }: SidebarContentProps) => {
  return <div className={cn("sidebar-content", className)} {...props} />;
};

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => {
  return <div className={cn("sidebar-group", className)} {...props} />;
};

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => {
  return <div className={cn("sidebar-header", className)} {...props} />;
};

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => {
  return <div className={cn("sidebar-footer", className)} {...props} />;
};

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarProvider = ({ className, children, ...props }: React.PropsWithChildren<SidebarProviderProps>) => {
  return <div className={cn("sidebar-provider", className)} {...props}>{children}</div>;
};

export interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SidebarTrigger = ({ className, ...props }: SidebarTriggerProps) => {
  return <button className={cn("sidebar-trigger", className)} {...props} />;
};

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarGroupLabel = ({ className, ...props }: SidebarGroupLabelProps) => {
  return <div className={cn("sidebar-group-label", className)} {...props} />;
};

export interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentProps) => {
  return <div className={cn("sidebar-group-content", className)} {...props} />;
};

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
}

export const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => {
  return <ul className={cn("sidebar-menu", className)} {...props} />;
};

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
}

export const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => {
  return <li className={cn("sidebar-menu-item", className)} {...props} />;
};

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  asChild?: boolean;
}

export const SidebarMenuButton = ({
  className,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? React.Fragment : "button";
  const childProps = asChild ? {} : props;
  
  return (
    <Comp {...childProps} className={asChild ? undefined : cn("sidebar-menu-button", className)}>
      {asChild ? props.children : null}
    </Comp>
  );
};
