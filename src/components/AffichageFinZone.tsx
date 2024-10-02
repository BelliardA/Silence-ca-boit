function AffichageFinZone({setIndexArrayZones}: {setIndexArrayZones: any}) {

    const handleClick = () => {
        setIndexArrayZones((prevIndex: number) => prevIndex + 1);
    }

    

    return (
        <div>
           <button onClick={handleClick}>click</button>
        </div>
    )
}

export default AffichageFinZone;