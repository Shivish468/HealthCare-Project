import {FcStatistics, FcStatistics} from 'react-icons/fc';

function Icon({ name }) {
    if(name == 'condition') {
        return <FcStatistics />;
    }
    else if(name == 'observation') {
        return <FcStatistics />;
    }
}

export default Icon;