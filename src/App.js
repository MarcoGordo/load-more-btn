import { useEffect , useState } from "react";
import "./App.css";



function App() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        
        const fetchData = async () => {
            try{
                const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count ===  0 ? 0 : count * 20}`);
                const result = await response.json();
                setData(result.products);
                console.log(result);
                console.log(result.products.length);
            }catch(error){
                console.error('Error fetching data:', error);
            }finally{
                setLoading(false);
            }
        };
        
        fetchData();

    }, [count]);

    if(loading){
        return <div>Loading...</div>;
    }

    return(<div className="App">
            { data.map(item => <div key={item.id}>{item.title}</div>)}
            <button disabled={count > 8} onClick={() => setCount(count + 1)}>Load More</button>
        </div>
        );
}

export default App;
