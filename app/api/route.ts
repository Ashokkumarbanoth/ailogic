import {NextResponse} from "next/server";
import {validCredentials} from "@/lib/auth";


export async function POST(request: Request) {
    let body;
    try{
       body = await request.json();
    }
    catch (error) {
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
    const email = body.email;
    const password = body.password;

    if(!validCredentials({email, password})){
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
    return NextResponse.json({ message: "Login successful" });
}
