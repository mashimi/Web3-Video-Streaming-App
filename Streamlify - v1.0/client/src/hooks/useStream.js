import { useContext } from 'react';
import StreamContext from '../providers/stream-context';

const useStream = () => {
    return useContext(StreamContext);
};

export default useStream;
