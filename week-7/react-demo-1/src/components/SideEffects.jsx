import { useState, useEffect } from 'react'

function SideEffects() {
    let [users, setUsers] = useState([]);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                let res = await fetch("https://dogapi.dog/api/v2/facts?limit=1");
                if (!res.ok) throw new Error("Failed to fetch");
                let data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])

    if (loading) return <h1>Loading...</h1>
    if (error)   return <h1 className="text-red-500">{error}</h1>

    return (
        <div>
            {users.data?.map((item, index) => (
                <p key={index}>{item.attributes.body}</p>
            ))}
        </div>
    )
}

export default SideEffects