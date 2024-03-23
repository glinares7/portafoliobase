export default function smartphoneApp() {

    const smartphoneGet = async () => {

        const smartphoneGet = await fetch('http://localhost:3000/smartphone')
        return smartphoneGet.json()

    }
    const smartphoneGetOne = async (getIdSmart: any) => {
        const smartGetOne = await fetch(`http://localhost:3000/smartphone/${getIdSmart}`)

        return smartGetOne.json()
    }

    return {
        smartphoneGet,
        smartphoneGetOne
    }
}