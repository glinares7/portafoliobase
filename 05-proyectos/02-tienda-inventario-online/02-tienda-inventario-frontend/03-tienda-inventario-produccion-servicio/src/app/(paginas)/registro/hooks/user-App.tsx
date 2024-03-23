export default function userApp() {
    const server = process.env.NEXT_PUBLIC_SERVER || 'http://localhost:3000';


    const userPostAuth = async (payload: any) => {
        const userPost = await fetch(`${server}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        return userPost.json();
    }

    return {
        userPostAuth,
        server
    }
}