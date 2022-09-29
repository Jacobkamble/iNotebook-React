import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';

export default function Alert(props) {
    const context = useContext(NoteContext);
    const { alert } = context;

    
    return (
        <>
            <div style={{ height: "50px" }}>
                {
                    alert && <div className={`alert alert-${alert.type} alert-dimissible fade show`}
                        role="alert">
                        <strong>{alert.message}</strong>
                    </div>
                }
            </div>
        </>
    )
}
