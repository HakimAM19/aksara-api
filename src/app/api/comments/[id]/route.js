import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function DELETE(
  request,
  context
) {

  try {

    const params = await context.params;

    const id = params.id;

    await connection.execute(
      `
      DELETE FROM comments
      WHERE id = ?
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  }

}