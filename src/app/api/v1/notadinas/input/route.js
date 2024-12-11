import prisma from "@/libs/prisma";

export async function POST (request) {
    try {
        const body = await request.json()
        const {
            tgl_surat,
            no_surat,
            kepada,
            perihal
        } = body

        if (!tgl_surat || !no_surat || !kepada || !perihal) {
            return new Response(
                JSON.stringify({ message: "Data tidak lengkap" }),
                { status: 400 }
            );
        }

        // simpan ke database
        const notadinas = await prisma.notadinas.create({
            data: {
                tgl_surat,
                no_surat,
                kepada,
                perihal
            }
        });
        return new Response(JSON.stringify({ message: "Berhasil disimpan", notadinas }), {
            status: 201,
          });

    } catch (error) {
        console.error("Error saat menyimpan data:", error);
        return new Response(
            JSON.stringify({ message: "Terjadi kesalahan saat menyimpan data", error: error.message }),
            { status: 500 }
        );
    }
}