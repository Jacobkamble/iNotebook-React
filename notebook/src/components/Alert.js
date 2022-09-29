import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';

export default function Alert(props) {
    const context = useContext(NoteContext);
    const { alert } = context;

    // const capatalize = (word) => {
    //     if(word==='danger'){
    //         word='error'
    //     }
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    // }
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
