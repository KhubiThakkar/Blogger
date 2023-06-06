import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post/` + id)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((postInfo) => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        } else {
          response.json().then((error) => {
            alert(error.e);
          });
        }
      })
      .catch((err) => alert(err));
  }, []);
  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('files', files[0]);
    }
    await fetch(`${process.env.REACT_APP_BASE_URL}/post`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          setRedirect(true);
        } else {
          response.json().then((error) => alert(error.e));
        }
      })
      .catch((err) => alert(err));
  }
  if (redirect) {
    console.log("-------redirect editpost---");
    return <Navigate to={'/post/' + id} />;
  }
  return (
    <form onSubmit={updatePost}>
      <input type="title" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
      <input type="summary" placeholder="Summary" value={summary} onChange={(ev) => setSummary(ev.target.value)} />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}
