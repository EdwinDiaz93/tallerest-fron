import {Routes,Route} from 'react-router-dom';
interface Props {
    children: React.ReactNode;
}

const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <Routes>
            {children}
            <Route path='*' element={<div>Not Found</div>} />
        </Routes>
    )
}
export default RoutesWithNotFound