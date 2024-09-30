function Test({setConteur}: {setConteur: (prev: number) => void}) { 

    const add = () => {
      setConteur((prev) => prev + 1);
    }

    return (
        <div>
          <button onClick={add}> clique</button>
        </div>
      );
}

export default Test