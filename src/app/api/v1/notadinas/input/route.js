import prisma from "@/libs/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body || typeof body !== "object") {
            return new Response(
                JSON.stringify({ message: "Payload tidak valid" }),
                { status: 400 }
            );
        }

        const { tgl_surat, no_surat, kepada, perihal, type_notadinas } = body;

        if (!tgl_surat || !no_surat || !kepada || !perihal || !type_notadinas) {
            return new Response(
                JSON.stringify({ message: "Data tidak lengkap" }),
                { status: 400 }
            );
        }

        const notaDinas = await prisma.notadinas.create({
            data: { tgl_surat, no_surat, kepada, perihal, type_notadinas }
        });

        return new Response(
            JSON.stringify({ message: "Berhasil disimpan", notaDinas }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("Error encountered:", error.message);
        return new Response(
            JSON.stringify({ message: "Terjadi kesalahan", error: error.message }),
            { status: 500 }
        );
    }
}
