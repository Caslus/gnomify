import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (
		req.nextUrl.pathname.startsWith("/api/") ||
		req.nextUrl.pathname === "/" ||
		req.nextUrl.pathname.includes(".") // prevents misquerying database using resource files as slug
	) {
		return;
	}
	const slug = req.nextUrl.pathname.split("/").pop();
	const data = await (
		await fetch(`${req.nextUrl.origin}/api/getUrl/${slug}`)
	).json();
	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
}
