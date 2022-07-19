import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.statusCode = 400;
		res.json({ message: "bad request" });
		return;
	}

	const data = await prisma?.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		res.statusCode = 404;
		res.json({ message: "slug not found" });
		return;
	}

	return res.json({ url: data.url });
};
