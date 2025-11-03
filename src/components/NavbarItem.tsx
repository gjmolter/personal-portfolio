import Link from "next/link";
import { clsx } from "clsx";

export type NavbarItemType = {
  href: string;
  label: string;
  Icon: React.ElementType;
  bubbly?: boolean;
};

export const NavbarItem = ({
  item,
  isOpen,
  isActive,
  tooltipId
}: {
  item: NavbarItemType;
  isOpen: boolean;
  isActive: boolean;
  tooltipId: string;
}) => {
  const isExternal = item.href.startsWith("http");
  return (
    <li
      className={clsx(
        "w-full",
        // Items marked as `bubbly` should not appear in the bottom bar on mobile (they will be shown in the bubble instead)
        item.bubbly ? "max-md:hidden" : "max-md:flex-1"
      )}
    >
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={clsx(
          "flex h-16 w-full items-center group transition-colors px-2 md:px-5 hover:bg-white/5 focus:bg-white/5 max-md:justify-center max-md:flex-col max-md:gap-1",
          isOpen ? "md:gap-4" : "md:gap-0",
          isActive
            ? "text-orange"
            : "text-gray-400 hover:text-orange focus:text-orange"
        )}
        {...(isOpen
          ? {}
          : {
              "data-tooltip-id": tooltipId,
              "data-tooltip-content": item.label,
            })}
      >
        <item.Icon
          className={clsx(
            "size-6 md:size-8 min-w-6 md:min-w-8",
            isActive ? "text-orange" : "text-medgray group-hover:text-orange"
          )}
        />
        <span
          className={clsx(
            "whitespace-nowrap text-[10px] md:text-lg md:transition-all md:duration-300 md:origin-left font-semibold",
            isOpen 
              ? "opacity-100 scale-100"
              : "md:opacity-0 md:scale-0 md:absolute md:left-[4.2rem]"
          )}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );
};
