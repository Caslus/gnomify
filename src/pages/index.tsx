import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

import { trpc } from "../../utils/trpc";
import { useState } from "react";

type Form = {
	url: string;
};

const Home: NextPage = () => {
	const [form, setForm] = useState<Form>({ url: "" });
	const [slug, setSlug] = useState("");
	const createSlug = trpc.useMutation(["createSlug"], {
		onSuccess: (slug) => {
			setSlug(slug || "");
		},
	});
	const [audio] = useState(
		typeof Audio !== "undefined" && new Audio("./gnome.mp3"),
	);

	return (
		<>
			<Head>
				<title>Gnomify</title>
				<meta name="description" content="Make any URL as short as a gnome" />
				<link rel="icon" href="/logo.svg" />
			</Head>
			<main className="bg-neutral min-h-screen flex flex-col justify-between">
				<form
					className="flex flex-col justify-center items-center flex-grow"
					onSubmit={(e) => {
						e.preventDefault();
						createSlug.mutate({ ...form });
						if (audio) {
							audio.play();
						}
					}}
				>
					<Image src="/logo.svg" width={250} height={250}></Image>
					<h1 className="text-6xl font-bold text-gnome-white p-2">
						<a className="text-primary">Gnomi</a>
						fy
					</h1>

					<input
						type="url"
						placeholder="URL"
						className="input input-bordered w-full max-w-xs m-2"
						onChange={(e) => {
							setForm({
								...form,
								url: e.target.value,
							});
						}}
						required
					/>
					<button className="btn btn-primary m-2">Make it short</button>
				</form>
				<div className="toast">
					{createSlug.isSuccess ? <Notification slug={slug} /> : ""}
				</div>
				<Footer />
			</main>
		</>
	);
};

export default Home;
