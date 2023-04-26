import { useState } from "react"


const App = () =>{
  const [images, setimages] = useState(null)
  const [value, setvalue] = useState(null)
  const [error, seterror] = useState(second)
  const surpriseOptions = [
    'A blue ostrich eating melone',
    'a matisse style shark on the telephone',
    'a pineaple sunbathing on an island'

  ]

  const surpriseMe = ()=>{
    setimages(null)
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setvalue(randomValue)
  }


  const getImages = async()=> {
    setimages(null)
    if(value == null){
      setError('Error! Must have a search term')
      return
    }
    try{
      const options = {
        method: "GET",
        body: JSON.stringify(
          {
            message: value,
            
          }),
        headers: {
          "Content-type": "application/json"
        }
        
      }
     const response = await fetch('http://localhost:8000/images', options)
     const data = await response.json()
     console.log(data)
     setimages(data)
    }catch (error){
      console.log(error)
    }
  }


  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description 
          <span className="surprise" onClick={surpriseMe()}>surprise me</span>
        </p>
        <div className="input-container">
          <input value={value} placeholder="an artistic oil painting of a sunflower in a purple vase ..." onChange={e => setvalue(e.target.value)}/>
          <button onClick={getImages}>Generate</button>
        </div>
        {error && <p>{error}</p>}
      </section>
      <section className="images-section">
        {images?.map((image, _index)=>(
          <img key={_index} src={image.url} alt={`Generated image of ${value}`}/>
        ))}
      </section>
    </div>
  );
}

export default App;
