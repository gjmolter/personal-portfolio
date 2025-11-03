import clsx from "clsx";
import { NavbarItemType } from "./NavbarItem";

export const BubbleItem = ({
  item,
  isActive,
}: {
  item: NavbarItemType;
  isActive: boolean;
}) => {
  const isExternal = item.href.startsWith("http");
  if (item.href === "#") isActive = true;

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      className={clsx(
        "hover:text-orange text-medgray transition-colors min-w-6 min-h-6",
        isActive && "text-orange"
      )}
    >
      <item.Icon size="small" />
    </a>
  );
}; 