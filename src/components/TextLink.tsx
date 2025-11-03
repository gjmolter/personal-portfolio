import Link, { LinkProps } from "next/link";

const TextLink = ({ children, href, className, ...props }: { children: React.ReactNode, href: string, className?: string, props?: LinkProps }) => {
  const isExternal = href.startsWith("http");
  return <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className={`text-orange font-semibold hover:opacity-80 underline underline-offset-2 hover:underline-offset-4 transition-all duration-300 ${className}`} {...props}>{children}</Link>;
};

export default TextLink;