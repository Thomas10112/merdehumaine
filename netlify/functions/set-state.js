import { sql } from "@netlify/database";

const EDIT_PASSWORD = "sombremerde";

export default async (request) => {
    const pass = request.headers.get("x-edit-pass");
    if (pass !== EDIT_PASSWORD) {
        return new Response("Forbidden", { status: 403 });
    }

    const body = await request.json();

    await sql`
        update rank_state
        set payload = ${body}, updated_at = now()
        where id = 'main'
    `;

    return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
    });
};
