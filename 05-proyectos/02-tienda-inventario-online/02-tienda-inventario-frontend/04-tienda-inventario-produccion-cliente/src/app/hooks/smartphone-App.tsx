

export default function smartphoneApp() {

    const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

    const smartphoneGet = async () => {

        const smartphoneGet = await fetch(`${server}/smartphone`)
        return smartphoneGet.json()

    }
    const smartphoneGetPagination = async (getIdSmart: any) => {
        const smartGetPagination = await fetch(`${server}/smartphone/${getIdSmart + 1}/pagination`)

        return smartGetPagination.json()
    }
    const smartphoneGetOne = async (getIdSmart: any) => {
        const smartGetOne = await fetch(`${server}/smartphone/${getIdSmart}`)

        return smartGetOne.json()
    }

    return {
        smartphoneGet,
        smartphoneGetPagination,
        smartphoneGetOne,
        server
    }
}