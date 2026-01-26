import { neon } from "@netlify/neon";

export default async () => {
    const sql = neon();

    const [row] = await sql`
        SELECT payload
        FROM rank_state
        WHERE id = 'main'
            LIMIT 1
    `;

    return new Response(JSON.stringify(row.payload), {
        headers: { "Content-Type": "application/json" }
    });
};
