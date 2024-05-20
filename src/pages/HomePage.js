import { gql, useQuery } from '@apollo/client';
import { GET_SONGS } from '../apolloClient.js';

export default function HomePage() {

    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <div>
            <h1>Hello, Music Lover</h1>
            <div>
                {data.songs.map((s, index) => (<li key={index}>{s.name}</li>))}
            </div>
        </div>
    )
}