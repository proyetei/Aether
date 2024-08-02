import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';

const API_URL = 'http://localhost:8080/api/nickname'; 

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(API_URL);
        return NextResponse.json( response.data);
    } catch (error: any) {
        console.log("Error with GET API endpoint", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = await req.body;
        const response = await axios.post(API_URL, body, {
          headers: {
            'Content-Type': 'application/json'
        }
        })
        return NextResponse.json(response.data);
    } catch (error: any) {
      console.log("Error with POST API endpoint ", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}
