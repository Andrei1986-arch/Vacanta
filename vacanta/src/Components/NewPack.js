import { useState } from "react";
import * as React from 'react';
const NewPack = ({onNewPack}) =>{
    // display item name (one with the selected characteristic
    // ex:cold/ hot or beach/mountain)
    // const[ itemName , setItemName ] = useState("");

    // number of items depends on the number of days selected
    // display number of those items
    const[nbItemSelected , setNbItemSelected] = useState();


    return(
        <form className = "pack-form">
            <div id="items-list">
              <table>
                <thead>
                    <tr>
                        <th>Item to pack</th>
                        <th>Number of items</th>
                        <th>Is packed</th>
                    </tr>
                </thead>
                <tr>
                    <td>Item</td>
                    <td>5</td>
                    <td>true</td>
                </tr>
              </table>
            </div>
        </form>
    )

} // end of NewPack

export default NewPack