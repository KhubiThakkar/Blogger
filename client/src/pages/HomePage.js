import { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function HomePage() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((posts) => {
            setPosts(posts);
          });
        } else {
          response.json().then((error) => {
            alert(error.e);
          });
        }
      })
      .catch((err) => alert(err));
    fetch('https://www.nseindia.com/api/search/autocomplete?q=AXIS%20MF%20-%20AXIS%20GOLD%20ETF', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
      })
  }, []);

  
  return <div>{post.length > 0 && post.map((post) => <Post {...post} />)}</div>;
}
