export default async function Page() {
    // simulate loading time for 8 seconds 
    await new Promise(resolve => setTimeout(resolve, 8000)); return <h4>FOLDER 2 COMPONENT LOADED TWO SECONDS LATER</h4>
    // return (
    //     <>
    //         <h1>El folder numero 2 el ultimo</h1>
    //     </>
    // )
}