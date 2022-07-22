import { FunctionComponent } from "react";

type Props = {
	slug: string;
};

const Notification: FunctionComponent<Props> = ({ slug }) => {
	const url = window.location.origin;
	return (
		<>
			<div className="alert alert-success shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-current flex-shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 className="font-bold">Copy your gnome</h3>
						<div className="text-xs">{`${url}/${slug}`}</div>
					</div>
				</div>
				<button
					className="btn btn-ghost"
					onClick={() => {
						navigator.clipboard.writeText(`${url}/${slug}`);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="fill-current"
					>
						<path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
					</svg>
				</button>
			</div>
		</>
	);
};

export default Notification;
