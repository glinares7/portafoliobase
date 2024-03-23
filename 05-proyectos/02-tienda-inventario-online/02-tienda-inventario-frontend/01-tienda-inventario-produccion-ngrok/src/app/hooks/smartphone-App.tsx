

export default function smartphoneApp() {

    const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

    const smartphoneGet = async () => {

        const smartphoneGet = await fetch(`${server}/smartphone`,
            {

                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },

            }
        )
        return await smartphoneGet.json()

    }
    const smartphoneGetOne = async (getIdSmart: any) => {
        const smartGetOne = await fetch(`${server}/smartphone/${getIdSmart}`,
            {

                headers: {
                    "ngrok-skip-browser-warning": "69420",

                },

            }
        )

        return await smartGetOne.json()
    }

    return {
        smartphoneGet,
        smartphoneGetOne,
        server
    }
}