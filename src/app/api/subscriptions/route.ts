
export async function POST(request:Request){
    try {
        const{email, amount, plan}= await request.json()
    } catch (error) {
        return Response.json({error}, {status:500} )
    }
}