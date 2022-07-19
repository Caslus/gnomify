import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (
		req.nextUrl.pathname.startsWith("/api/getUrl/") ||
		req.nextUrl.pathname === "/"
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
