import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeminars } from '../features/seminar/seminarSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const SeminarList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seminars, status, error } = useSelector((state) => state.seminar);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSeminars());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className='text-white'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='text-red-600'>Error: {error}</div>;
  }
  return (
    <div className='text-white w-screen'>
      <h2 className='text-2xl font-bold text-center my-5'>Seminars</h2>
      <ul className='flex justify-around items-start'>
        {seminars.map((seminar) => (
          <li className='text-center' key={seminar._id} onClick={() => navigate(`/seminar/${seminar._id}`)}>
            <img className='w-80 h-60' src={seminar.image} alt={seminar.title} />
            <div className='flex justify-between'>
              <h3 className='my-3 mx-auto'>{seminar.title}</h3>
            </div>
          </li>
  ))
}
      </ul >
    </div >
  );
};

export default SeminarList;
