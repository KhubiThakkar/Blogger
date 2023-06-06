import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('files', files[0]);
    ev.preventDefault();
    await fetch(`${process.env.REACT_APP_BASE_URL}/post`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then((response) => {
        if (response.ok) {
          setRedirect(true);
        } else {
          response.json().then((error) => {
            alert(error.e);
          });
        }
      })
      .catch((error) => alert(error));
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
      <input type="summary" placeholder="Summary" value={summary} onChange={(ev) => setSummary(ev.target.value)} />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}
