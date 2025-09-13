import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { chatId, text } = await req.json()

    if (!chatId || !text) {
      return NextResponse.json(
        { success: false, error: "chatId and text are required" },
        { status: 400 }
      )
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
