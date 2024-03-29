import React, { useState } from 'react'
import { Await } from 'react-router-dom';

function Temp() {

    const handleFileUpload =  (event) => {
        const file = event.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = (e) => {
            try {
                const text =  e.target.result;
                const rows = text.split('\n').map(row => row.split(','));
                const headers = rows[0];
                console.log(rows);
            } catch (error) {
                console.log(error)
            }
        };
        
        
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {/* <table>
                <thead>
                    <tr>
                        <th>qno</th>
                        <th>answer</th>
                        <th>marks</th>
                    </tr>
                </thead>
                <tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.qno}</td>
                            <td>{row.answer}</td>
                            <td>{row.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};
export default Temp