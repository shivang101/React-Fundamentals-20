import { useState } from "react";
import data from "./data";
import styles from "./Accordian.module.css"

function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {

        const findIndexOfCurrentId = multiple.indexOf(getCurrentId);
        console.log(findIndexOfCurrentId)

        if (findIndexOfCurrentId === -1) {
            /////////////////////////////////////////////////////
            //mutating the state Variable Directly causing unpredictable behavior  
            // multiple.push(getCurrentId);
            // setMultiple(multiple)
            // You can make a copy of state and then push in that copy
            /////////////////////////////////////////////////////
            // Correct Method 
            // creating a new array immutable
            setMultiple(prevMutiple => [...prevMutiple, getCurrentId])
        }
        else {
            // Slice is mutable method which changes on spot location of array, mutable method should not be used with useState
            // setMultiple(prevSetMultiple => prevSetMultiple.slice(findIndexOfCurrentId, 1));

            // Alternative Method
            // Not directly changing the state, 
            // let cpyMutiple = [...multiple];
            // cpyMutiple.splice(findIndexOfCurrentId, 1);
            // setMultiple(cpyMutiple);

            // Better Method
            // filter returns a new array, immutable method, 
            setMultiple(prevSetMultiple => prevSetMultiple.filter((element) => element !== getCurrentId))
        }

    }

    // function handleMultiSelection(getCurrentId) {
    //     let cpyMutiple = [...multiple];
    //     const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    //     console.log(findIndexOfCurrentId);
    //     if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    //     else cpyMutiple.splice(findIndexOfCurrentId, 1);

    //     setMultiple(cpyMutiple);
    // }

    console.log(selected, multiple);
    return (
        <div className={styles.accWrapper}>
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection, setMultiple([]))}>
                {enableMultiSelection && "Disable "}
                {!enableMultiSelection && "Enable "}

            </button>
            <div className={styles.accordian} >
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div key={dataItem.id} className={styles}>
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () => handleMultiSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className={styles.title}
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>

                            {enableMultiSelection
                                ? multiple.indexOf(dataItem.id) !== -1 && (
                                    <div className={styles.accContent}>{dataItem.answer}</div>
                                )
                                : selected === dataItem.id && (
                                    <div className={styles.accContent}>{dataItem.answer}</div>
                                )}
                        </div>
                    ))
                ) : (
                    <div>No data found !</div>
                )}
            </div>
        </div >
    );
}

export default Accordian