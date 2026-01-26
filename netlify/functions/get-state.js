import { sql } from "@netlify/database";

export default async () => {
    const rows = await sql`
        select payload
        from rank_state
        where id = 'main'
            limit 1
    `;

    return new Response(JSON.stringify(rows[0].payload), {
        headers: { "Content-Type": "application/json" }
    });
};
