import { neon } from "@netlify/neon";

const EDIT_PASSWORD = "sombremerde";

export default async (request) => {
    const pass = request.headers.get("x-edit-pass");
    if (pass !== EDIT_PASSWORD) {
        return new Response("Forbidden", { status: 403 });
    }

    const body = await request.json();
    const sql = neon();

    await sql`
        UPDATE rank_state
        SET payload = ${body}, updated_at = now()
        WHERE id = 'main'
    `;

    return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
    });
};
