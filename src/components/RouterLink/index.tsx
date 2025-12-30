import { Link } from "react-router";

type RouterLinkProp = {
	href: string;
} & React.ComponentProps<"a">;

export const RouterLink = ({ href, children, ...props }: RouterLinkProp) => {
	return (
		<Link to={href} {...props}>
			{children}
		</Link>
	);
};
