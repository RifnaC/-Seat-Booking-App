import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeminars } from '../features/seminar/seminarSlice';
import { useNavigate } from 'react-router-dom';

const SeminarList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   console.log(useSelector((state) => state.seminar));

  const { seminars, status, error } = useSelector((state) => state.seminar);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSeminars());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Seminars</h2>
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar._id} onClick={() => navigate(`/seminar/${seminar._id}`)}>
            <img src={seminar.image} alt={seminar.title} />
            <h3>{seminar.title}</h3>
            <p>{new Date(seminar.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeminarList;
