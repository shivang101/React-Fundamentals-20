import { useEffect, useState } from "react";

function RandomColor() {

    const [typeOfColor, setTypeOfColor] = useState('rgb');
    const [bgColor, setBgColor] = useState("#000000");
    const [paintDrop, setPaintDrop] = useState(bgColor)

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        setPaintDrop("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
    }

    function handleColorChange(event) {
        setTypeOfColor('hex');
        setBgColor(event.target.value)
        console.log(bgColor);
    }

    function handleCreateRandomColor() {

        if (typeOfColor === 'hex') {
            const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

            let hexCode = "#"
            for (let i = 0; i < 6; i++) {
                hexCode += hex[Math.floor(Math.random() * hex.length)]
            }
            console.log(hexCode);
            setPaintDrop(hexCode)
            setBgColor(hexCode);

        } else {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)

            setBgColor(`rgb(${r},${g}, ${b})`);
            rgbToHex(r, g, b);

        }
    }

    useEffect(() => {
        handleCreateRandomColor();
    }, [typeOfColor])

    return (
        <>
            <div style={{
                width: '100vw',
                height: '100vw',
                background: bgColor
            }}>
                <button onClick={() => setTypeOfColor('hex')}>Create HEX COLORS</button>
                <button onClick={() => setTypeOfColor("rgb")}>Create RGB COLORS</button>
                <button onClick={handleCreateRandomColor}>Create New Random Colors</button>
                <label style={{
                    background: '#1a1a1a',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    padding: '0.6em 1.2em',
                    fontSize: '1em',
                    fontWeight: '500',
                    fontFamily: 'inherit',
                    cursor: 'pointer',

                }}>Select a Color</label> <input
                    //  value={typeOfColor === 'hex' ? bgColor : paintDrop}
                    value={paintDrop}
                    type="color" onChange={handleColorChange} ></input>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '60px',
                    marginTop: '50px',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h3>{typeOfColor === 'rgb' ? "RGB Color" : "HEX Color"}</h3>
                    <h1>{bgColor}</h1>
                </div>

            </div >
        </>
    );

}
export default RandomColor;

