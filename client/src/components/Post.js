import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, createdAt, cover, content, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${process.env.REACT_APP_BASE_URL}/${cover}`} alt="/"></img>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <span href="" className="author">
            {author.username}
          </span>
          <time>{moment({ createdAt }).utc().format('YYYY-MM-DD')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
